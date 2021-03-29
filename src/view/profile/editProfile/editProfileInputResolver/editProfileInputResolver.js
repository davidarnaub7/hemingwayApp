import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Text, Dimensions} from 'react-native';

import {useTheme} from '@react-navigation/native'; //THEME

import {useNavigation} from '@react-navigation/native'; //NAVIGATION

import Axios from 'axios'; //AXIOS
import {useSelector, useDispatch} from 'react-redux'; //REDUX
import {updateProfile} from '../../../../redux/actions/profileAction';

import {refresh_TokenAPI} from '../../../../funcs/refresh_token'; //API ACTIONS

import AsyncStorage from '@react-native-community/async-storage'; //ASYNC STORAGE

//PARTS
import EditProfileInputResolverHeader from './editprofileInputResolverHeader/editProfileInputResolverHeader';
import FlashMessage from 'react-native-flash-message';
// import { logCustomEvent } from '../../../../analytics/analytics';

//CONST DIMENSIONS
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height / 12;

const EditProfileInputResolver = props => {
  const label = props.route.params.label; //ROUTES PARAMS

  const theme = useTheme(); //THEME
  const nav = useNavigation(); //NAVIGATION

  const ref = React.useRef(); // FLASHMESSAGE HANDLER
  const selector = useSelector(state => state); //SELECTOR
  const profile = JSON.parse(selector.profile.profile); //CATCHING PROFILE

  const dispatch = useDispatch(); //DISPATCHER;

  //HOOKS
  const [fetching, setFetching] = useState(false); //UI FECTHING HOOK
  const [error, setError] = useState(''); //UI FETCHING HOOK;
  const [newName, setNewName] = useState(profile.name);

  /**API CALLS AND QUERIES */
  const getQuery = id => {
    // HERE WE CAN DO IN A DYNAMICLLY WAY ALL THE QUERIES RELATED TO PROFILE INFO UPDATING
    switch (id) {
      case 'Nombre':
        /**
         * QUERY
         */
        return {
          operationName: 'UpdateProfile',
          query: `mutation UpdateProfile{
          updateProfileName(username:"${profile.username}", name:"${newName}")
        }
          `,
          variables: null,
        };

      default:
        break;
    }
  };
  /**
   * @func updateProfileHandler
   *
   * It calls to the API and update user Name
   * @param {Event} event
   */
  const updateProfileHandler = async event => {
    event.preventDefault();

    //AXIOS INTERCERPTOR
    const axiosApiInstance = Axios.create();
    const creds = JSON.parse(await AsyncStorage.getItem('creds'));
    // Response interceptor for REFRESHING TOKEN
    axiosApiInstance.interceptors.response.use(
      async response => {
        if (response.data.errors) {
          if (response.data.errors[0].message === 'Next time machine') {
            const newcreds = await refresh_TokenAPI(
              profile._id,
              profile.username,
            );

            await AsyncStorage.setItem('creds', JSON.stringify(newcreds)); // SAVING NEW CREDS

            const originalRequest = response.config;
            originalRequest.headers.Authorization =
              'Bearer ' + newcreds.token + ' ' + profile.username;

            return axiosApiInstance.request(originalRequest);
          }
        }
        return response;
      },
      err => {
        return Promise.reject(err);
      },
    );

    setFetching(true); //SHOWING ACTIVITY INDICATOR

    axiosApiInstance
      .post(
        'http://192.168.1.38:3000/graphql',
        JSON.stringify(getQuery(label)),
        {
          headers: {
            Authorization: 'Bearer ' + creds.token + ' ' + profile.username,
            'Content-Type': 'application/json',
          },
        },
      )
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
        setFetching(false);
        if (resData.updateProfileName === 'Success') {
          const newProfile = {...profile};
          // logCustomEvent('updateProfile', {
          //   type: 'name',
          //   item: 'name',
          //   action: 'change',
          // });
          newProfile.name = newName;
          dispatch(updateProfile(newProfile));
          nav.goBack();
        } else {
          setError('Algo ha ido mal. Inténtalo otra vez');
        }
      })
      .catch(err => {
        setError('Algo ha ido mal. Inténtalo otra vez');
        setFetching(false); //STOPING FECTHING UI COMPONENT
      });
  };

  React.useEffect(() => {
    if (error !== '') {
      ref.current.showMessage({
        message: error,
        type: 'danger',
        duration: 5000,
      });
      setError('');
    }
  }, [error]);
  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <EditProfileInputResolverHeader
        updateProfileHandler={updateProfileHandler}
        fetching={fetching}
        nav={nav}
        theme={theme}
      />
      <View style={styles.textContainer}>
        <Text style={[styles.label, {color: theme.colors.text}]}>{label}</Text>
        <TextInput
          style={[styles.textInput, {color: theme.colors.text}]}
          value={newName}
          onChangeText={text => {
            setNewName(text);
          }}
          clearButtonMode="always"
          returnkeyType="done"
          multiline={true}
        />
      </View>
      <View style={[styles.sticky, {borderBottomColor: theme.colors.card}]} />
      <View style={styles.extraInfoContainer}>
        <Text style={[styles.extraInfo, {color: theme.colors.text}]}>
          Este nombre solo se utilizará como información para aquellos que vean
          tu perfil.{' '}
        </Text>
      </View>
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
  //TEXINPUT
  textContainer: {
    height: HEIGHT,
    justifyContent: 'space-evenly',
    marginLeft: 10,
  },
  label: {
    alignSelf: 'flex-start',
    top: 10,
    marginLeft: 10,
    fontFamily: 'System',
    fontWeight: '600',
    fontSize: 12,
    opacity: 0.6,
  },
  textInput: {
    marginVertical: 10,
    top: 5,
    left: 10,
    fontFamily: 'System',
    fontWeight: '500',
    fontSize: 16,
  },
  //STICKY
  sticky: {
    borderBottomWidth: 1,
    height: 10,
    marginBottom: 10,
    bottom: 5,
  },
  //EXTRA INFO
  extraInfoContainer: {flex: 0.2, width: WIDTH / 1.01, alignSelf: 'center'},
  extraInfo: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    fontFamily: 'System',
    fontSize: 14,
    opacity: 0.7,
  },
});

export default EditProfileInputResolver;
