import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export const refresh_TokenAPI = async (userID, username) => {
  const creds = JSON.parse(await AsyncStorage.getItem('creds'));
  let requestBody = {
    operationName: 'RefreshToken',
    query: `query RefreshToken{
              refreshToken(userID: "${userID}",username:"${username}", token:"${creds.token}",refresh: "${creds.refresh_token}"){
                userId
                tokenExpiration
                token
                refresh_token
                refresh_tokenExpiration
              }
              }`,
  };

  return await Axios.post(
    'http://192.168.1.38:3000/graphql',
    JSON.stringify(requestBody),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
    .then((res) => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!');
      }

      if (res.data.errors) {
        throw new Error(res.data.errors[0].message);
      }

      return res.data.data;
    })
    .then((resData) => {
      return resData.refreshToken;
    })
    .catch((err) => {
      throw err;
    });
};
