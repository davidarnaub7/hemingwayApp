/**
 * @file: reduxMain.js
 *
 * @description: holds all the reducers and wrap them in one. We add here the thunk middleware that
 * allows to us execute actions asyncronously.
 */
//REDUX
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

//REDUCERSs
import ProfileReducer from './reducers/profileReducer';
import AuthReducer from './reducers/authReducer';
import mediaReducer from './reducers/mediaReducer';
import postsReducer from './reducers/postReducer';

const rootReduces = combineReducers({
  auth: AuthReducer,
  profile: ProfileReducer,
  profileMedia: mediaReducer,
  myPosts: postsReducer,
});

export const STORE = createStore(rootReduces, applyMiddleware(thunk));
