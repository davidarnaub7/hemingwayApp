/**
 * @file privateInfo.js
 *
 * @description It displays user private info.
 */
import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, TextInput, Text, Dimensions} from 'react-native';

import Axios from 'axios'; //AXIOS

import {useNavigation, useTheme} from '@react-navigation/native'; //THEME & NAV

import FlashMessage from 'react-native-flash-message'; // THIRD PARTY LIBRARY

//REDUX
import {useSelector, useDispatch} from 'react-redux';
import {updateProfile} from '../../../../redux/actions/profileAction';

import {COLORS} from '../../../../constants/constants'; //COLORS
import AsyncStorage from '@react-native-community/async-storage'; //ASYNCSTORAGE

//PARTS
import PrivateInfoHeader from './privateInfoHeader/privateInfoHeader';
import {refresh_TokenAPI} from '../../../../funcs/refresh_token';
import getErrorMsg from '../../../../errors/errors';

const PrivateInfo = () => {
  const theme = useTheme(); // THEME
  const nav = useNavigation(); // NAV

  //REF CONTROLLERS
  const ref = useRef(); //CONTROLS THE FLASHMESSAGE THIRD LIBRARY
  //REDUX
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const profile = JSON.parse(selector.profile.profile); //GETTING PROFILE

  //REGEX
  const emilaRegex = /^[a-z0-9]+@alumni.uv.es$/;
  const telfRegex = /^[679]{1}[0-9]{8}$/;

  //HOOKS
  const [email, setEmail] = useState(profile.privateInfo.email);
  const [telephone, setTelephone] = useState(profile.privateInfo.telephone);

  //UI HOOKS
  const [fetching, setFetching] = useState(false); //FETCHING UI HANDLER
  const [error, setError] = useState(''); // ERROR UI HANDLER
  const [message, setMessage] = useState(''); //MESSAGE UI HANDLER
  const [someChange, setSomeChange] = useState(false);

  const doActionHandler = () => {
    if (someChange) {
      doAction();
    } else {
      nav.goBack();
    }
  };
  /**
   * @func doAction
   *
   * Checks if the entrance are correct and then call to @func updaprofileHandler
   */
  const doAction = () => {
    if (!emilaRegex.test(email)) {
      setError('Introduce un email correcto');
    } else if (!telfRegex.test(telephone) && telephone.length !== 0) {
      setError('Introduce un teléfono correcto');
    } else {
      updateProfileHandler();
    }
  };
  /**API CALLS AND QUERIES */
  let requestSocialNetworkQuery = {
    operationName: 'UpdatePrivateInfoProfile',
    query: `mutation UpdatePrivateInfoProfile{
          updateUserPrivateProfile(username:"${profile.username}", email:"${email}", telephone:"${telephone}")
        }
          `,
    variables: null,
  };
  /**
   * @func updateProfileHandler
   *
   * It calls to the API and update user Name
   * @param {Event} event
   */
  const updateProfileHandler = async () => {
    setFetching(true);

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

    axiosApiInstance
      .post(
        'http:/192.168.1.38:30000/graphql',
        JSON.stringify(requestSocialNetworkQuery),
        {
          headers: {
            Authorization: 'Bearer ' + creds.token + ' ' + profile.username,
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
        setFetching(false);
        if (resData.updateUserPrivateProfile === 'Success') {
          const newProfile = {...profile};

          //UPDATING NEW PARAMS TO DISPATCH THE NEW PROFILE
          newProfile.privateInfo.email = email;
          newProfile.privateInfo.telephone = telephone;

          //DISPATCHING THE PROFILE AND GOING BACK
          dispatch(updateProfile(newProfile));
          setMessage('Los cambios se han realizado correctamente');
        } else {
          setError('Algo ha ido mal. Inténtalo otra vez');
        }
      })
      .catch((err) => {
        setError(getErrorMsg(err.toString().split(':')[1].trim()));
        setFetching(false); //STOPING FECTHING UI COMPONENT
      });
  };

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
    return () => {
      subscribe = false;
    };
  }, [error]);

  useEffect(() => {
    let subscribe = true;
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
  }, [message]);

  return (
    <View style={styles.container}>
      <PrivateInfoHeader
        doAction={doActionHandler}
        nav={nav}
        theme={theme}
        fetching={fetching}
      />
      <View style={styles.panel}>
        <Text style={[styles.label, {color: theme.colors.text}]}>Email</Text>
        <View
          style={[
            styles.textInputContainer,
            {
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.notification,
            },
          ]}>
          <TextInput
            value={email}
            onChangeText={(e) => {
              setSomeChange(true);
              setEmail(e);
            }}
            style={[styles.input, {color: theme.colors.text}]}
            placeholder={'email'}
          />
        </View>
        {/* <Text style={[styles.label, {color: theme.colors.text}]}>Teléfono</Text> */}
        {/* <View
          style={[
            styles.textInputContainer,
            {
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.notification,
            },
          ]}>
          <TextInput
            value={telephone}
            onChangeText={(e) => setTelephone(e)}
            style={[styles.input, {color: theme.colors.text}]}
            placeholder={'teléfono'}
          />
        </View> */}
      </View>
      <FlashMessage position="top" ref={ref} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    fontFamily: 'System',
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
    paddingHorizontal: 10,
  },
  panel: {
    marginVertical: 20,
    flex: 0.9,
  },
  textInputContainer: {
    width: Dimensions.get('window').width,
    height: 40,
    marginVertical: 10,
    borderBottomWidth: 1,
  },
  input: {
    width: Dimensions.get('window').width / 1.4,
    height: 40,
    marginLeft: 10,
    fontFamily: 'System',
    fontSize: 20,
    color: 'white',
    fontWeight: '500',
  },
});

export default PrivateInfo;
