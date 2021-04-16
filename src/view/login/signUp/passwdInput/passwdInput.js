/**
 * @func PasswdInput.js
 *
 * @description: it handles user paswd Input and call to the api.
 */
import React from 'react';
import {View, StyleSheet, ImageBackground, Dimensions} from 'react-native';

import Axios from 'axios'; //AXIOS

import FlashMessage from 'react-native-flash-message'; //THIRD PARTY LIBRARY

import {useDispatch} from 'react-redux';
import {useNavigation, useTheme} from '@react-navigation/native';
import {COLORS} from '../../../../constants/constants';

import {updateProfile} from '../../../../redux/actions/profileAction'; //PROFILE ACTION
//PARTS
import PasswdInputInfo from './components/passwdInputInfo';
import PasswdInputButton from './components/passwdInputButton';
import PoliciesModal from './policies/policiesModal';
import BackButton from '../components/backButton';
import getErrorMsg from '../../../../errors/errors';
// import {addLogSignUp} from '../../../../analytics/analytics';

const PasswdInput = props => {
  //GLOBAL HOOKS
  const theme = useTheme();
  const ref = React.useRef();
  const nav = useNavigation();

  //UI HOOKS
  const [error, setError] = React.useState('');
  const [modal, setModal] = React.useState(false);
  const [passwd, setPasswd] = React.useState('');

  //DATA
  const user = props.route.params.user; //CACTHING USER
  const code = props.route.params.code; //ENTERED CODE

  //REDUX
  const dispatch = useDispatch();

  //ERROR DISPLAYER
  React.useEffect(() => {
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

  /**
   * API CALLS AND QUERIES
   */
  const requestBody = {
    operationName: 'CreateUser',
    query: `mutation CreateUser{
      createUser(user:{username: "${user.username}", name: "${user.name}", privateInfo: {email: "${user.privateInfo.email}", telephone: "${user.privateInfo.telephone}", passwd:"${passwd}"}}, enteredCode: "${code}") {
        _id
        username
        name
        followers
        following
        posts
        likes
        image
        privateInfo {
          email
          telephone
          passwd
        }
      }
    }`,
  };

  let requestLoginBody = {
    operationName: 'Login',
    query: `query Login{
      login (username: "${user.username}", passwd:"${passwd}") {
        userId
        tokenExpiration
        token
        refresh_token
        refresh_tokenExpiration
      }
    }`,
    variables: null,
  };
  /**
   * @func signUpHandler
   *
   * It calls to the API and tries to signUp the user.
   */
  const signUpHandler = async () => {
    Axios.post('http://192.168.1.37:3000/graphql', JSON.stringify(requestBody), {
      headers: {
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
        dispatch(updateProfile(resData.createUser));
        // addLogSignUp(); //ANALYTICS
        //Calling to login in order to enter
        loginHandler();
      })
      .catch(err => {
        setError(getErrorMsg(err.toString().split(':')[1].trim()));
      });
  };

  const loginHandler = async () => {
    Axios.post('http://192.168.1.37:3000/graphql', JSON.stringify(requestLoginBody), {
      headers: {
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
        nav.navigate('Intro', {
          creds: resData.login,
        });
      })
      .catch(err => {
        setError(getErrorMsg(err.toString().split(':')[1].trim()));
      });
  };

  const openTermsAndConds = () => {
    setModal(true);
  };

  const createUserHandler = event => {
    event.preventDefault();
    setModal(false); //REMOIVNG MODAL
    signUpHandler(); //CALLING TO API
  };
  return (
    <ImageBackground
      style={[styles.container, {backgroundColor: theme.colors.background}]}
      source={require('../../../../assets/images/bck5.jpg')}>
      <View style={[styles.container, {backgroundColor: 'rgba(0,0,0,0.2)'}]}>
        <BackButton top={Dimensions.get('window').height / 40} />
        <PasswdInputInfo />
        <PasswdInputButton
          setError={setError}
          setPasswd={setPasswd}
          passwd={passwd}
          openTermsAndConds={openTermsAndConds}
        />
        <View style={{flex: 0.3}} />
      </View>
      <PoliciesModal
        modal={modal}
        setModal={setModal}
        createUserHandler={createUserHandler}
      />
      <FlashMessage position="top" ref={ref} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});

export default PasswdInput;
