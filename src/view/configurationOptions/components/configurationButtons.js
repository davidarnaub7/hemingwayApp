import {useTheme} from '@react-navigation/native';
import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Alert} from 'react-native';

import Axios from 'axios';

import {refresh_TokenAPI} from '../../../funcs/refresh_token'; //GRAPQHL QUERIES
import AsyncStorage from '@react-native-community/async-storage'; //ASYNC STORAGE

//REDUX
import {useDispatch, useSelector} from 'react-redux';
import {CloseSesion} from '../../../redux/actions/authAction';
import getErrorMsg from '../../../errors/errors';
// import { logCustomEvent } from '../../../analytics/analytics';

const ConfigurationButtons = ({setError, options, label}) => {
  const theme = useTheme();

  //REDUX
  const dispatch = useDispatch();
  const selector = useSelector(state => state); // SELECTOR

  //REDUX DATA
  const myUser = JSON.parse(selector.profile.profile); //MY PROFILE

  const apiCallHandler = option => {
    // logCustomEvent('logOut', {type: option}); //ANALYTICS
    let requestBody;
    let flag = '';
    if (option === 'Cerrar Sesión') {
      requestBody = {
        operationName: 'LogOutAction',
        query: `mutation LogOutAction{
          logOut(username:"${myUser.username}",userID:"${myUser._id}")
        }`,
      };
      flag = 'session';
    } else {
      requestBody = {
        operationName: 'RemoveAccountAction',
        query: `mutation RemoveAccountAction{
        removeAccount(username:"${myUser.username}",userID:"${myUser._id}")
        }`,
      };
      flag = 'account';
    }

    Alert.alert(
      flag === 'session' ? 'Cerrar Sesión' : 'Eliminar Cuenta',
      flag === 'session'
        ? '¿Estás seguro que deseas cerrar sesión?'
        : '¿Estás seguro que quieres eleminar tu cuenta? No podrás recuperar los datos',
      [
        {
          text: 'Continuar',
          style: flag === 'session' ? 'default' : 'destructive',
          onPress: () => closeSesionOrRemoveHanlder(requestBody, flag),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };
  /**
   * @func closeSesionOrRemoveHanlder
   *
   * Calling to API in order to exit from the room
   */
  const closeSesionOrRemoveHanlder = async (requestBody, flag) => {
    //AXIOS INTERCERPTOR
    const axiosApiInstance = Axios.create();
    const creds = JSON.parse(await AsyncStorage.getItem('creds'));
    // Response interceptor for API calls
    axiosApiInstance.interceptors.response.use(async response => {
      if (response.data.errors) {
        if (response.data.errors[0].message === 'Next time machine') {
          const newcreds = await refresh_TokenAPI(myUser._id, myUser.username);

          await AsyncStorage.setItem('creds', JSON.stringify(newcreds));

          const originalRequest = response.config;

          originalRequest.headers.Authorization =
            'Bearer ' + newcreds.token + ' ' + myUser.username;

          return axiosApiInstance.request(originalRequest);
        }
      }
      return response;
    });

    return await axiosApiInstance
      .post('http://192.168.1.37:3000/graphql', JSON.stringify(requestBody), {
        headers: {
          Authorization: 'Bearer ' + creds.token + ' ' + myUser.username,
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }

        if (res.data.errors) {
          throw new Error(res.data.errors[0].message);
        }

        return res.data.data;
      })
      .then(resData => {
        if (flag === 'session') {
          if (resData.logOut === 'Success') {
            dispatch(CloseSesion());
          } else {
            setError('Algo ha ido mal');
          }
        } else {
          if (resData.removeAccount === 'Success') {
            dispatch(CloseSesion());
          } else {
            setError('Algo ha ido mal');
          }
        }
      })
      .catch(err => {
        setError(getErrorMsg(err.toString().split(':')[1].trim()));
      });
  };

  return (
    <View style={[styles.container, {flex: 0.135 * options.length}]}>
      <View
        style={[
          styles.labelContainer,
          {
            flex: 0.45 / options.length,
            borderBottomColor: theme.colors.border,
          },
        ]}>
        <Text style={[styles.label, {color: theme.colors.text}]}>{label}</Text>
      </View>

      <View style={styles.buttonContainer}>
        {options.map(opt => {
          return (
            <TouchableOpacity
              style={styles.button}
              onPress={() => apiCallHandler(opt.item)}>
              <Text style={[styles.text, {color: opt.color}]}>{opt.item}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  //LABEL
  labelContainer: {
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
  },
  label: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 20,
    opacity: 0.8,
  },
  //BUTONS
  buttonContainer: {
    flex: 0.8,
    justifyContent: 'space-evenly',
  },
  button: {
    justifyContent: 'space-evenly',
  },
  text: {
    fontFamily: 'System',
    fontWeight: '500',
    fontSize: 14,
    marginLeft: 20,
  },
});

export default ConfigurationButtons;
