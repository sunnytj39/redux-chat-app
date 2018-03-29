import { combineReducers } from 'redux';
import sessionReducer from './session';
import userReducer from './user';
import chatReducer from './chat';

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  userState: userReducer,
  chatState: chatReducer,
});

export default rootReducer;
