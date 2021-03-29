import AsyncStorage from '@react-native-community/async-storage';

export const UPDATEMEDIA = 'UPDATEMEDIA';

export const updateMedia = (img) => {
  return (dispatch) => {
    AsyncStorage.setItem(
      'profileMedia',
      JSON.stringify({
        img,
      }),
    );

    dispatch(updateSucceed(img));
  };
};

export const updateSucceed = (img, bck) => {
  return {
    img,
    bck,
    type: UPDATEMEDIA,
  };
};
