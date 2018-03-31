import { db } from './firebase';

// User API

export const SignUp = (id, username, email) => {
  db.ref(`users/${id}`).set({
    username,
    email,
  });
}

export const MessagePost = (id, name, message) =>{
  db.ref(`posts/${id}`).set({
    name,
    message,
  });
}

export const onceGetUsers = () =>
  db.ref('users').once('value');

// Other db APIs ...
export const onceGetPosts = () =>
  db.ref('posts').once('value');
