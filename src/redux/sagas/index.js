import {select, put, take, takeEvery, fork, call, END} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';
import { database } from '../../firebase/firebase';
import { db } from '../../firebase';

const fb = () => {
  const postsRef = database.ref('posts');
  return eventChannel(emit => {
    postsRef.on('child_added', (snapshot) => {
      db.onceGetPosts().then(snapshot => {
        emit({
          type: 'POSTS_SET',
          posts: snapshot.val(),
        });
      });
    });

    return () => {};
  })
}

function* connect() {
  let channel = yield call(fb);
  while(true){
    const action = yield take(channel);
     yield put(action)
  }
}

function* connector() {
  yield fork(connect);
}

function* mySaga() {
  yield takeEvery("REQUEST_CONNECT", connector);
}

export default mySaga;
