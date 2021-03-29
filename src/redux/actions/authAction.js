export const AUTH_SUCCEED = 'AUTH-SUCCEED';
import AsyncStorage from '@react-native-community/async-storage';
// import {KeepRoom} from './activeRoomAction';


//FOREIGN ACTIONS
// import {}
export const Authenticate = (creds) => {
  return (dispatch) => {
    AsyncStorage.setItem('creds', JSON.stringify(creds)).then(() => {
      dispatch(AuthSucceed(creds));
    });
  };
};

export const CloseSesion = () => {
  return (dispatch) => {
    AsyncStorage.removeItem('profile').then(() => {
      AsyncStorage.removeItem('profileMedia').then(() => {
        AsyncStorage.removeItem('creds').then(() => {
          AsyncStorage.removeItem('creds').then(() => {
            dispatch(
              AuthSucceed({
                token: '',
                tokenExpiration: '',
                userId: '',
                refresh_token: '',
                refresh_tokenExpiration: '',
              }),
            );
            // dispatch(KeepRoom(undefined));
            // dispatch(updateProfile(''));
          });
        });
      });
    });
  };
};
export const AuthSucceed = (creds) => {
  return {
    token: creds.token,
    tokenExpiration: creds.tokenExpiration,
    userId: creds.userId,
    refresh_token: creds.refresh_token,
    refresh_tokenExpiration: creds.refresh_tokenExpiration,
    type: AUTH_SUCCEED,
  };
};
