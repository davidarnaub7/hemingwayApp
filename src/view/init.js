/**
 * @file: init.js
 *
 * this func initialize all the app. Reading frm asyncstorage and passing data to redux. (It is called from App.js)
 * Once the data is fetched we paint the routes.
 */
import React, {useEffect} from 'react';

import {useDispatch} from 'react-redux'; //DISPATCH
import {AuthSucceed} from '../redux/actions/authAction'; //AUTH ACTION

import AsyncStorage from '@react-native-community/async-storage'; //ASYNCSTORAGE
import MainRoute from '../routes/mainRoutes';
import {updateProfile} from '../redux/actions/profileAction';
import {updateMedia} from '../redux/actions/mediaActions';
import {confirmPostChanges} from '../redux/actions/postAction';

const Init = () => {
  const dispatch = useDispatch();
  const [fetching, setFetching] = React.useState(true);

  useEffect(() => {
    const init = async () => {
      await AsyncStorage.getItem('profile').then(profile => {
        AsyncStorage.getItem('profileMedia').then(mediaStr => {
          //UPDATING PROFILE
          const media =
            mediaStr === null ? {img: '', bck: ''} : JSON.parse(mediaStr);
          dispatch(updateMedia(media.img, media.bck));
          dispatch(updateProfile(profile === null ? '' : JSON.parse(profile)));
          AsyncStorage.getItem('posts').then(posts => {
            dispatch(confirmPostChanges(JSON.parse(posts)));
            AsyncStorage.getItem('creds').then(creds => {
              dispatch(
                AuthSucceed(
                  creds === null
                    ? {
                        token: '',
                        tokenExpiration: '',
                        userId: '',
                        refresh_token: '',
                        refresh_tokenExpiration: '',
                      }
                    : JSON.parse(creds),
                ),
              );
              setFetching(false);
            });
          });
        });
      });
    };
    init();
  }, [dispatch]);

  return fetching ? <></> : <MainRoute />;
};

export default Init;
