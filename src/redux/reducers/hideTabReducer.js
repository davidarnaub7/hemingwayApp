/**
 * @file : hideTabReducer.js
 *
 * @description: This sheet holds all hideTabActions.
 *
 */
import {TABSTATECHANGE} from '../actions/hideTabAction';

//INITIAL DATA -> passed when the app start up.
const initialStateHideTab = {
  show: false,
};

/**
 * @function activeRoomReducer
 *
 * Main reducer function.
 *
 * @param {LogInState} state
 * @param {Action} action
 */
const hideTabReducer = (state = initialStateHideTab, action) => {
  switch (action.type) {
    case TABSTATECHANGE:
      return {
        ...state,
        show: action.show,
      };
    default:
      return state;
  }
};
export default hideTabReducer;
