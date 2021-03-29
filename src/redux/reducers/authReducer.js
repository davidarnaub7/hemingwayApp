/**
 * @file profileReducer.js
 *
 * @description: This sheet holds all profileReducer.
 */

import {AUTH_SUCCEED} from '../actions/authAction'; //ACTIONS

const initialAuthState = {
  //INITIAL DATA -> passed when the app start up.
  token: '',
  tokenExpiration: '',
  userId: '',
  refresh_token: '',
  refresh_tokenExpiration: '',
};

/**
 * @function AuthReducer
 *
 * Main reducer function.
 *
 * @param {initialStateAuth} state
 * @param {Action} action
 */
const AuthReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case AUTH_SUCCEED:
      return {
        ...state,
        token: action.token,
        tokenExpiration: action.tokenExpiration,
        userId: action.userId,
        refresh_token: action.refresh_token,
        refresh_tokenExpiration: action.refresh_tokenExpiration,
      };
    default:
      return state;
  }
};
export default AuthReducer;
