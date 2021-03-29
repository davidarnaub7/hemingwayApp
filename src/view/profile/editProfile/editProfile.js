import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Dimensions} from 'react-native';

import Axios from 'axios'; //AXIOS

import {useSelector, useDispatch} from 'react-redux'; //REDUX
import {updateMedia} from '../../../redux/actions/mediaActions'; //ACTIONS

import {refresh_TokenAPI} from '../../../funcs/refresh_token'; //API CALL
//PARTS
import EditProfilePhotoChooser from './components/editProfilePhotoChooser/editProfilePhotoChooser';
import EditProfileLabels from './components/EditProfileLabels/EditProfileLabels';
import ActionSheetModal from './modals/actionSheetModal/actionSheetModal';

//NAVIGATION
import {useTheme} from '@react-navigation/native';
import EditProfileHeader from './components/editProfileHeader/editProfileHeader';

import {COLORS} from '../../../constants/constants'; //STYLING
import AsyncStorage from '@react-native-community/async-storage'; //ASYNC STORAGE
//THID PARTY LIBRARIES
import {launchImageLibrary} from 'react-native-image-picker';
import FlashMessage from 'react-native-flash-message';
import RNFS from 'react-native-fs';
// import {logCustomEvent} from '../../../analytics/analytics';

const EditProfile = props => {
  //ACTION MODAL HANDLER
  const [modal, setModal] = useState(undefined);

  const [fetching, setFetching] = useState(false); //UI FECTHING HANDLER
  const [error, setError] = useState(''); //UI ERROR HOOK
  const [message, setMessage] = useState('');
  const ref = React.useRef();

  //GLOBAL VARIABLE
  const theme = useTheme();

  //REDUX
  const dispatch = useDispatch();

  const selector = useSelector(state => state);
  const profile = JSON.parse(selector.profile.profile); //CATCHING PROFILE INFO
  const profileMedia = selector.profileMedia; //CTACHING MEDIA LOCAL REFS

  //HANDLER OF BCK AND PHOTOS.
  const [img, setImg] = useState(profileMedia.img);
  const [img64, setImg64] = useState({base64: '', type: ''});

  const [remove, setRemove] = useState(false);
  const [update, setUpdate] = useState(false);

  const socialInfo = [
    {
      label: 'Redes sociales',
      info: '',
      path: 'SocialNetworks',
      params: '',
    },
  ];

  const showImageLibrary = flag => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
        maxHeight: flag === 'photo' ? 400 : 1024,
        maxWidth: flag === 'photo' ? 400 : 1024,
        quality: 0.8,
        bckQuality: 'high',
      },
      response => {
        if (response.uri !== undefined) {
          const imageData = response.base64;
          const imagePath = `${RNFS.TemporaryDirectoryPath}image.jpg`;

          if (response.type === 'image/png') {
            RNFS.writeFile(imagePath, imageData, 'base64').then(() =>
              RNFS.readFile(imagePath, 'base64').then(base64 => {
                setImg(response.uri);
                setImg64({base64, type: response.type});
              }),
            );
          } else {
            setImg(response.uri);
            setImg64({base64: response.base64, type: response.type});
          }

          setUpdate(true);
          setModal(undefined);
        }
      },
    );
  };

  const confirmChanges = async event => {
    event.preventDefault();

    //QUERIES
    const imgQuery = {
      operationName: 'UpdateImageMedia',
      query: `mutation UpdateImageMedia{
                  updateProfileImage (img:{
                    base64: "${checkIfChange(img64.base64)}",
                    type: "${img64.type}"
                  }, username:"${profile.username}")
                }`,
      variables: null,
    };

    //CHECKING IF WE HAvE TO MAKE ONE, TWO OR NO CALLS.

    if (checkIfChange(img64.base64) !== '') {
      if (remove) {
        // logCustomEvent('updateProfile', {
        //   item: 'img',
        //   action: 'remove',
        //   type: 'media',
        // });
        updateMediaHandler(imgQuery, false, 'img');
      }
      if (update) {
        // logCustomEvent('updateProfile', {
        //   item: 'img',
        //   action: 'update',
        //   type: 'media',
        // });
        updateMediaHandler(imgQuery, true, 'img');
      } else {
        setMessage('Cambios confirmados');
      }
    }
  };

  /**
   * @func checkIfChange
   *
   * Checks if a key must be changed.
   *
   * @param {String} key
   */
  const checkIfChange = key => {
    if (key === '') {
      return '';
    } else {
      return key;
    }
  };

  /**
   * @func signUpHandler
   *
   * It calls to the API and tries to signUp the user.
   */
  const updateMediaHandler = async (requestBody, shouldUpdate, flag) => {
    setFetching(true);
    //AXIOS INTERCERPTOR
    const axiosApiInstance = Axios.create();
    const creds = JSON.parse(await AsyncStorage.getItem('creds'));

    // Response interceptor for API calls
    axiosApiInstance.interceptors.response.use(
      async response => {
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
      },
      err => {
        return Promise.reject(err);
      },
    );

    axiosApiInstance
      .post('http://192.168.1.38:3000/graphql', JSON.stringify(requestBody), {
        headers: {
          Authorization: 'Bearer ' + creds.token + ' ' + profile.username,
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
        if (flag === 'bck') {
          if (resData.updateProfileBck === 'Success') {
            setMessage(
              shouldUpdate ? 'Foto de fondo actualizada!' : 'Item borrado!',
            );
            dispatch(updateMedia(img));
          }
        } else {
          if (resData.updateProfileImage === 'Success') {
            setMessage(
              shouldUpdate ? 'Foto de perfil actualizada!' : 'Item borrado!',
            );
            dispatch(updateMedia(img));
          }
        }
        setFetching(false);
      })
      .catch(err => {
        if (
          err.toString().split(':')[1].trim() ===
          'Request failed with status code 413'
        ) {
          setError(
            'Esta foto es demasiado grande.\n\nActualmente no podemos soportarla, estamos trabajando para mejorar nuestro servicio. Disculpe las molestías.',
          );
        }
        setError(err.toString().split(':')[1].trim());
        setFetching(false);
      });
  };

  /**
   * @func removeMedia
   *
   * Removes some media item
   */
  const removeMedia = flag => {
    setImg('');
    setImg64({base64: 'remove', type: ''});
    setRemove(true);
    setModal(undefined);
  };

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

    if (message !== '' && subscribe) {
      ref.current.showMessage({
        message: message,
        type: 'info',
        duration: 5000,
        floating: true,
        backgroundColor: COLORS.socialButton,
        icon: 'success',
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
    <View style={[styles.container, {color: theme.colors.background}]}>
      <EditProfileHeader confirmChanges={confirmChanges} fetching={fetching} />
      <ScrollView
        style={styles.scrollStyle}
        contentContainerStyle={{opacity: modal ? 0.6 : 1}}>
        <EditProfilePhotoChooser setModal={setModal} img={img} />
        <EditProfileLabels info={[{label: 'Nombre', info: profile.name}]} />
      </ScrollView>
      <ActionSheetModal
        visible={modal}
        setModal={setModal}
        showImageLibrary={showImageLibrary}
        removeMedia={removeMedia}
        options={['Elegir de la fototeca', 'Borrar foto']}
      />
      <FlashMessage position="bottom" ref={ref} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  scrollStyle: {
    marginTop: 30,
    flex: 1,
  },
});

export default EditProfile;
