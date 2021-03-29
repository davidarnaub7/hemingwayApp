/**
 * @file profileReducer.js
 *
 * @description: This sheet holds all profileReducer.
 */

import {UPDATE_POST} from '../actions/postAction'; //ACTIONS

const initialPostsState = {
  posts: [],
};

/**
 * @function AuthReducer
 *
 * Main reducer function.
 *
 * @param {initialStateAuth} state
 * @param {Action} action
 */
const PostReducer = (state = initialPostsState, action) => {
  switch (action.type) {
    case UPDATE_POST:
      return {
        ...state,
        posts: action.posts,
      };
    default:
      return state;
  }
};
export default PostReducer;
