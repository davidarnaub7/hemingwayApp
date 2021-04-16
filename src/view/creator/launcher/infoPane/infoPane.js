import AsyncStorage from '@react-native-community/async-storage';
import {StackActions, useNavigation, useTheme} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Axios from 'axios';
//REDUX
import {useSelector, useDispatch} from 'react-redux';
import {refresh_TokenAPI} from '../../../../funcs/refresh_token';
import {addPost} from '../../../../redux/actions/postAction';

const InfoPane = ({lecture, setModal, pexels, index}) => {
  //THEME
  const theme = useTheme();
  const nav = useNavigation();
  //REDUX
  const selector = useSelector(state => state);
  const profile = JSON.parse(selector.profile.profile);
  const posts = selector.myPosts.posts;

  const dispatch = useDispatch();
  //AIXOS INSTANCE
  const axiosApiInstance = Axios.create();
  console.log(lecture.content);
  //createPostHandler LOGIC
  const createPostHandler = async () => {
    const creds = JSON.parse(await AsyncStorage.getItem('creds'));
    const newPost = {
      title: lecture.title,
      authorId: profile.username,
      imageInfo: {
        url: pexels.url,
        bck: pexels.bck,
        author: pexels.author,
      },
      content: [...lecture.content],
    };
    let requestBody = {
      operationName: 'CreatePost',
      query: `mutation CreatePost{
          createPost(username:"${profile.username}", post:{
            title:"${newPost.title}",
            authorId:"${newPost.authorId}",
            imageInfo:{
              url:"${newPost.imageInfo.url}",
              bck:"${newPost.imageInfo.bck}",
              author:"${newPost.imageInfo.author}",
            },
            content: [${newPost.content.map(e => `"${e}"`)}]
          })
        }`,
    };
    console.log(newPost);
    console.log(requestBody);
    //AXIOS INTERCEPTOR LOCALLY IN ORDER TO DISPATCH NEW CREDS
    axiosApiInstance.interceptors.response.use(async response => {
      if (response.data.errors) {
        console.log(response.data.errors);
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

    return axiosApiInstance
      .post('http://192.168.1.37:3000/graphql', JSON.stringify(requestBody), {
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
        if (resData.createPost === 'Success') {
          dispatch(addPost(posts, newPost));
          nav.dispatch(StackActions.popToTop());
        }
      })
      .catch(err => console.log(err));
  };
  return (
    <View style={[styles.container]}>
      <TouchableOpacity style={styles.button} onPress={() => setModal(true)}>
        <FontAwesome
          name={'picture-o'}
          size={30}
          color={'white'}
          style={{alignSelf: 'center'}}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          createPostHandler();
        }}>
        <Text
          style={[
            styles.share,
            {color: index === 0 ? 'white' : theme.colors.text},
          ]}>
          Compartir
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width / 1.1,
    height: Dimensions.get('window').height / 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    position: 'absolute',
    borderRadius: 20,
    top: Dimensions.get('window').height / 1.1,
    zIndex: 10000,
    bottom: 0,
    right: 0,
    left: Dimensions.get('window').width / 10,
    // backgroundColor: 'red',
  },
  button: {
    width: 50,
    height: 50,
    justifyContent: 'center',
  },
  share: {
    fontFamily: 'System',
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
    width: Dimensions.get('window').width / 2,
    // backgroundColor: 'red',
    right: Dimensions.get('window').width / 8,
  },
});

export default InfoPane;
