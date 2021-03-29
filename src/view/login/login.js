import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Animated,
} from 'react-native';

//STYLING
import {useTheme} from '@react-navigation/native'; //THEME
import {COLORS} from '../../constants/constants'; //COLORS

import Axios from 'axios'; //AXIOS (FECTHING DATA)
import RNFS from 'react-native-fs'; //FETCH

// THIRD PARTY LIBRARIES
import {UIActivityIndicator} from 'react-native-indicators';
import FlashMessage from 'react-native-flash-message';

//REDUX
import {useDispatch} from 'react-redux';
import {Authenticate} from '../../redux/actions/authAction'; //REDUX ACTION
import {updateProfile} from '../../redux/actions/profileAction';

//PARTS
import LoginFooter from './components/loginFooter';
import LogInHeader from './components/logInHeader';
import SignIn from './components/signIn';
import LogInCreateAccountButton from './components/logInCreateAccountButton';
import {updateMedia} from '../../redux/actions/mediaActions';
import { savePostChanges } from '../../redux/actions/postAction';
// import getErrorMsg from '../../errors/errors';

const LogIn = () => {
  //HOOKS
  const [username, setUsername] = useState('');
  const [passwd, setPasswd] = useState('');

  // FECTHING UI HANDLERS
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState('');

  const theme = useTheme(); //THEME HANDLER

  const ref = React.useRef(); //REF USED BY FLASHMESSAGE IN CASE OF ERROR.

  const dispatch = useDispatch(); //REDUX DISPATCH

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

  /** API CALLS  */

  /**
   * Login Query and method
   */
  let requestLoginBody = {
    operationName: 'Login',
    query: `query Login{
      login (username: "${username}", passwd:"${passwd}") {
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
   * @func loginHandler
   *
   * It calls to the API and comprove if username and passwd are valid.
   * @param {Event} event
   */
  const loginHandler = async event => {
    event.preventDefault();

    setFetching(true);

    Axios.post(
      'http://192.168.1.38:3000/graphql',
      JSON.stringify(requestLoginBody),
      {
        headers: {
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
        fetchUserData(resData.login);
      })
      .catch(err => {
        // setError(getErrorMsg(err.toString().split(':')[1].trim()));
        setFetching(false); //STOPING FECTHING UI COMPONENT
      });
  };

  /**
   * Get User Api Call. Query and Method
   */
  let requestUser = {
    operationName: 'GetUserInfo',
    query: `query GetUserInfo {
      user(username: "${username}"){
        user{
           _id
            username
            name
            followers
            following
            posts
            likes
            image
            privateInfo{
              email
              telephone
            }
        }
        urls{
          imgUrl
        }
      }
      getAllPostMyProfile(username: "${username}"){
        title
        authorId
        imageInfo{
          bck
          url
          author
        }
        content
        likes{
          username
          name
          img
          likedOn
        }
        createdOn
      }
    }`,
  };

  /**
   * @func fetchUserData
   *
   * It calls to the api and get user data from username.
   */
  const fetchUserData = creds => {
    Axios.post(
      'http://192.168.1.38:3000/graphql',
      JSON.stringify(requestUser),
      {
        headers: {
          Authorization: 'Bearer ' + creds.token + ' ' + username,
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
      .then(async resData => {
        const myUser = resData.user.user;
        const posts = resData.getAllPostMyProfile;

        await getPhotoAndDownloadMedia(
          myUser.username + 'img.jpg',
          resData.user.urls.imgUrl,
        );
        setFetching(false); //STOPPIN LOADING SPINNER UI
        dispatch(savePostChanges(posts));
        dispatch(updateProfile(myUser));
        dispatch(Authenticate(creds));
      })
      .catch(err => {
        console.log(err);
        setError('Se ha producido un problema');
        setFetching(false); //STOPING FECTHING UI COMPONENT
      });
  };

  /**
   * Fetches data from s3 url and keep in on localStorage in order to do not call anymore to fetch s3 data.
   * @param {String} imgPath
   * @param {String} bckPath
   */
  const getPhotoAndDownloadMedia = async (img, imgUrl) => {
    let imgPath = '';

    if (imgUrl !== '') {
      imgPath = `${RNFS.DocumentDirectoryPath}/${img}`;
      await RNFS.downloadFile({
        fromUrl: imgUrl,
        toFile: imgPath,
      }).promise;
    }

    dispatch(updateMedia(imgPath));
  };
  return (
    <ImageBackground
      source={require('../../assets/images/bck11.jpg')}
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
        },
      ]}>
      {fetching && (
        <View style={styles.activity}>
          <UIActivityIndicator color={theme.colors.text} />
        </View>
      )}
      <Animated.View
        style={[
          styles.container,
          {
            backgroundColor: 'rgba(0,0,0,0.3)',
          },
        ]}>
        <View style={styles.paned}>
          <LogInHeader />
          <SignIn
            usernameState={{username, setUsername}}
            passwdState={{passwd, setPasswd}}
            loginHandler={loginHandler}
          />
          <LogInCreateAccountButton />
        </View>
        <LoginFooter />
      </Animated.View>
      <FlashMessage position="top" ref={ref} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },
  paned: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  //signInContainer
  signInContainer: {
    flex: 0.2,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  inputContainer: {
    borderColor: '#F0F0F0',
    borderWidth: 0.3,
    width: Dimensions.get('window').width / 1.2,
    height: Dimensions.get('window').height / 18,
    alignSelf: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  input: {
    fontFamily: 'System',
    fontSize: 15,
    paddingLeft: 20,
  },
  activity: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.2)',
    zIndex: 10000,
  },
});

export default LogIn;
