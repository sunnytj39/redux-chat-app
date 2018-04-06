import { database } from './firebase';

// User API
export const SignUp = (id, username, email) => {
  database.ref(`users/${id}`).set({
    username,
    email,
  });
}

export const MessagePost = (id, name, message) => {
  database.ref(`posts/${id}`).set({
    name,
    message,
  });
}

export const clearPosts = () => {
  //database.ref(`posts`).set(null);
  alert();
}

export const onceGetUsers = () =>
  database.ref('users').once('value');

// Other database APIs ...
export const onceGetPosts = () =>
  database.ref('posts').once('value');
