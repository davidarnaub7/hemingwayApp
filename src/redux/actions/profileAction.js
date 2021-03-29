/**
 * @file profileAction.js
 *
 * @description It contains all the profile actions.
 */

//ASYNC STORAGE
import AsyncStorage from '@react-native-community/async-storage';

//ACTIONS ID's
export const UPDATEPROFILE = 'UPDATEPROFILE';


/**
 * @func updateProfile
 *
 * Updates the profile calling to GraphQl and then, keep the new update profile on asyncstorage.
 *
 * @param {Profile} profile
 * @param {Bool} all  -> if it's true means that I change some media profile data, if not means that
 * I only change text data so it's no necesary to call to putMedia method.
 */
export const updateProfile = (profile, all) => {
  return async (dispatch) => {
    //If everything works well, we adde the new update Profile to async storage.
    AsyncStorage.setItem('profile', JSON.stringify(profile)).then(() => {
      dispatch(confirmUpdate(profile));
    });
  };
};

/**
 * @func confirmUpdate
 * Passing the profile to the reducer.
 * @param {Profile} profile
 */
export const confirmUpdate = (profile) => {
  return {
    profile,
    type: UPDATEPROFILE,
  };
};
