/**
 * @file : activeLocalReducer.js
 *
 * @description: This sheet holds all activeLocalActions.
 *
 */

//ACTIVE LOCAL IDENTIFIERS
import {UPDATEMEDIA} from '../actions/mediaActions';

//INITIAL DATA -> passed when the app start up.
const initialStateLogIn = {
  img: '',
};

/**
 * @function activeRoomReducer
 *
 * Main reducer function.
 *
 * @param {LogInState} state
 * @param {Action} action
 */
const mediaReducer = (state = initialStateLogIn, action) => {
  switch (action.type) {
    case UPDATEMEDIA:
      return {
        ...state,
        img: action.img,
      };
    default:
      return state;
  }
};
export default mediaReducer;
