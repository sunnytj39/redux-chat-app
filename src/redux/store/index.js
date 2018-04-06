import { createStore, applyMiddleware } from 'redux';
import rootReducer from 'redux/reducers';
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger';

import mySaga from '../sagas'

const sagaMiddleware = createSagaMiddleware();
const logger = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(
    sagaMiddleware,
    logger
  )
);

sagaMiddleware.run(mySaga);

const postRequestAction = () => (
  { type: 'REQUEST_CONNECT' }
)

store.dispatch(postRequestAction());

export default store;
