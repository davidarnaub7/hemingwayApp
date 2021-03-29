/**
 * @file passwdChange.js
 *
 * @description passwdChange View.
 */
import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';

import Axios from 'axios'; //AXIOS
import AsyncStorage from '@react-native-community/async-storage'; //ASYNCSTORAGE

//THEME AND NAVIGATION
import {useTheme} from '@react-navigation/native';

//REDUX
import {useSelector} from 'react-redux';
import {refresh_TokenAPI} from '../../../../funcs/refresh_token'; // REFRESHER

//THIRD PARTY LIBRARI
import FlashMessage from 'react-native-flash-message';

import {COLORS} from '../../../../constants/constants'; //COLORS

//PARTS
import PasswdChageHeader from './components/passwdChangeHeader';
import PasswdChangeInput from './components/passwdChangeInput';
import getErrorMsg from '../../../../errors/errors';
// import { logScreenView } from '../../../../analytics/analytics';

const PasswdChange = (props) => {
  //GLOBAL
  const theme = useTheme(); //THEME
  const ref = useRef();

  //INPUTS HANDLER
  const [oldPasswd, setOldPasswd] = useState('');
  const [passwd, setPasswd] = useState('');

  //REDUX
  const profile = useSelector((state) => JSON.parse(state.profile.profile));

  //UI HOOKS
  const [fetching, setFetching] = useState(false);
  const [message, setMessage] = useState(''); //INFO MESSAGE HANDLER
  const [error, setError] = useState(''); //ERROR MESSAGE HANDLER

  useEffect(() => {
    // logScreenView('passwdChange');
  }, []);
  let requestBody = {
    operationName: 'UpdateNewPasswd',
    query: `mutation UpdateNewPasswd{
            updatePasswd(username:"${profile.username}", oldPasswd:"${oldPasswd}", newPasswd:"${passwd}")
          }
          `,
    variables: null,
  };

  const changePasswdHandler = async (event) => {
    event.preventDefault();

    //AXIOS INTERCERPTOR
    const axiosApiInstance = Axios.create();
    const creds = JSON.parse(await AsyncStorage.getItem('creds'));
    // Response interceptor for API calls
    axiosApiInstance.interceptors.response.use(async (response) => {
      if (response.data.errors) {
        if (response.data.errors[0].message === 'Next time machine') {
          const newcreds = await refresh_TokenAPI(
            profile._id,
            profile.username,
          );

          await AsyncStorage.setItem('creds', JSON.stringify(newcreds));
          const originalRequest = response.config;
          originalRequest.headers.Authorization =
            'Bearer ' + newcreds.token + ' ' + profile.username;

          return axiosApiInstance.request(originalRequest);
        }
      }
      return response;
    });

    setFetching(true);

    axiosApiInstance
      .post('http:/192.168.1.38:30000/graphql', JSON.stringify(requestBody), {
        headers: {
          Authorization: 'Bearer ' + creds.token + ' ' + profile.username,
          'Content-Type': 'application/json',
        },
      })
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
        setFetching(false);
        if (resData.updatePasswd === 'Success') {
          setMessage('Passwd Changes Successfully');
        } else {
          setError('Algo ha ido mal. Inténtalo otra vez');
        }
      })
      .catch((err) => {
        setError(getErrorMsg(err.toString().split(':')[1].trim()));
        setFetching(false); //STOPING FECTHING UI COMPONENT
      });
  };
  /**
   * HANDLING INFO MESSAGE WITH USEFFECT
   */
  useEffect(() => {
    let subscribe = true;

    if (error !== '' && subscribe) {
      ref.current.showMessage({
        message: error,
        type: 'info',
        duration: 5000,
        floating: true,
        backgroundColor: COLORS.primary,
        titleStyle: {
          fontFamily: 'System',
          fontWeight: 'bold',
          fontSize: 16,
        },
        style: {
          bottom: 10,
        },
      });
      setError('');
    }

    if (message !== '' && subscribe) {
      ref.current.showMessage({
        message: message,
        type: 'info',
        duration: 5000,
        floating: true,
        backgroundColor: COLORS.socialButton,
        titleStyle: {
          fontFamily: 'System',
          fontWeight: 'bold',
          fontSize: 16,
        },
        style: {
          bottom: 10,
        },
      });
      setMessage('');
    }
    return () => {
      subscribe = false;
    };
  }, [error, message]);

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <PasswdChageHeader />
      <PasswdChangeInput
        fetching={fetching}
        oldPasswd={oldPasswd}
        setPasswd={setPasswd}
        setOldPasswd={setOldPasswd}
        passwd={passwd}
        username={profile.username}
        changePasswdHandler={changePasswdHandler}
      />
      <FlashMessage position="top" ref={ref} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
});

export default PasswdChange;
