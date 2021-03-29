/**
 * @file profileReducer.js
 *
 * @description: This sheet holds all profileReducer.
 */

//ACTIVE LOCAL IDENTIFIERS
import {UPDATEPROFILE} from '../actions/profileAction';

//INITIAL DATA -> passed when the app start up.
const initialStateProfile = {
  profile: '{}',
};

/**
 * @function ProfileReducer
 *
 * Main reducer function.
 *
 * @param {initialStateProfile} state
 * @param {Action} action
 */
const ProfileReducer = (state = initialStateProfile, action) => {
  switch (action.type) {
    case UPDATEPROFILE:
      return {
        ...state,
        profile: JSON.stringify(action.profile),
      };
    default:
      return state;
  }
};
export default ProfileReducer;
