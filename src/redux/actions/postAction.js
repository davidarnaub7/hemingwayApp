import AsyncStorage from '@react-native-community/async-storage';

export const UPDATE_POST = 'UPDATE_POST';

export const removePost = (posts, postID) => {
  return async dispatch => {
    dispatch(savePostChanges(posts.filter(post => post._id !== postID)));
  };
};

export const updatePost = (posts, postToUpdate) => {
  return async dispatch => {
    dispatch(
      savePostChanges(
        posts.map(e => {
          return e._id === postToUpdate._id ? postToUpdate : e;
        }),
      ),
    );
  };
};

export const addPost = (posts, newPost) => {
  return async dispatch => {
    dispatch(savePostChanges(posts.push(newPost)));
  };
};

export const savePostChanges = newPosts => {
  return async dispatch => {
    AsyncStorage.setItem('posts', JSON.stringify(newPosts)).then(e => {
      dispatch(confirmPostChanges(newPosts));
    });
  };
};

// THIS METHJOD WILL BE CALLED ALSO WHEN WE WANT TO UPDATE SOME POST OR ADDED
export const confirmPostChanges = posts => {
  return {
    posts,
    type: UPDATE_POST,
  };
};
