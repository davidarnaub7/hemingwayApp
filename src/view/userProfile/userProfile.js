import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';

import Axios from 'axios';

import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import getPostsOfUser from '../../servers/getPostsOfUser';

import {refresh_TokenAPI} from '../../funcs/refresh_token';
import {updateProfile} from '../../redux/actions/profileAction';
import {useTheme} from '@react-navigation/native';

//PARTS
import UserProfileHeader from './userProfileHeader/userProfileHeader';
import ProfileFollow from './profileFollow/profileFollow';
import Lecture from '../lecture/lecture';

const UserProfile = props => {
  const theme = useTheme();
  //DATA HOOKS
  const profile = props.route.params.profile;
  //REDUX
  const myProfile = useSelector(state => JSON.parse(state.profile.profile));
  const [posts, setPosts] = useState(undefined);
  const [userInfo, setUserInfo] = useState(undefined);
  const dispatch = useDispatch();

  //UI HOOKS
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [fetchingUserInfo, setFetchingUserInfo] = useState(true);
  const [fetchingPosts, setFetchingPosts] = useState(true);

  // STATE HOOKS
  const [isFollowing, setIsFollowing] = useState(
    myProfile.following.includes(profile.username),
  );

  const renderItem = ({item, index}) => {
    return <Lecture lecture={item} username={profile.username} home={false} />;
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await fetchUserData(true);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    fetchUserData(true);
  }, []);

  const axiosApiInstance = Axios.create();

  /**
   * @func fetchUserData
   *
   * It calls to the api and get user data from username.
   */
  const fetchUserData = async refresh => {
    setFetchingUserInfo(true);
    const creds = JSON.parse(await AsyncStorage.getItem('creds'));

    //AXIOS INTERCEPTOR LOCALLY IN ORDER TO DISPATCH NEW CREDS
    axiosApiInstance.interceptors.response.use(async response => {
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

    try {
      let requestBody = {
        operationName: 'GetUserInfo',
        query: `query GetUserInfo{
             getUserInfo(username:"${myProfile.username}", userOf:"${profile.username}"){
                username
                name
                following
                followers
              }
          }`,
      };

      axiosApiInstance
        .post('http://192.168.1.37:3000/graphql', JSON.stringify(requestBody), {
          headers: {
            Authorization: 'Bearer ' + creds.token + ' ' + myProfile.username,
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
          const newUserInfo = resData.getUserInfo;

          if (newUserInfo) {
            setUserInfo(newUserInfo);
            setFetchingUserInfo(false);
          }
        })
        .catch(err => {
          setFetchingUserInfo(false);
          throw err;
        });

      setFetchingPosts(true);
      getPostsOfUser(
        refresh,
        axiosApiInstance,
        myProfile.username,
        creds,
        profile.username,
      ).then(newPosts => {
        console.log('DATA RECIVED');
        console.log(newPosts);
        setPosts(newPosts);
        setRefreshing(false); //STOPPIN LOADING SPINNER UI
        setFetchingPosts(false);
      });
    } catch (err) {
      console.log(err);
      setFetchingPosts(false);
      setError('Se ha producido un problema');
      setRefreshing(false); //STOPING FECTHING UI COMPONENT
    }
  };

  //FOLLLOW LOGIC
  const follow = async () => {
    const creds = JSON.parse(await AsyncStorage.getItem('creds'));

    let requestBody = {
      operationName: 'FollowTo',
      query: `mutation FollowTo{
          follow(username:"${myProfile.username}", followedUsername:"${profile.username}")
        }`,
    };
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
          Authorization: 'Bearer ' + creds.token + ' ' + myProfile.username,
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
        if (resData.follow === 'Success') {
          if (myProfile.following.includes(profile.username)) {
            myProfile.following = myProfile.following.filter(
              f => f !== profile.username,
            );
            userInfo.followers = userInfo.followers.filter(
              f => f !== myProfile.username,
            );
          } else {
            myProfile.following.push(profile.username);
            userInfo.followers.push(myProfile.username);
          }
          dispatch(updateProfile(myProfile));
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <View style={styles.container}>
      <UserProfileHeader profile={profile} img={profile.imgUrl} />
      <View style={styles.listContainer}>
        <FlatList
          ListHeaderComponent={
            <ProfileFollow
              fetching={fetchingUserInfo}
              follow={follow}
              profile={userInfo}
              img={profile.imgUrl}
              isFollowing={isFollowing}
              setIsFollowing={setIsFollowing}
            />
          }
          ListHeaderComponentStyle={styles.listHeader}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={styles.container}
          data={posts}
          extraData={posts}
          renderItem={renderItem}
          numColumns={2}
          ItemSeparatorComponent={<View style={{height: 10}} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  listContainer: {flex: 0.8, marginLeft: 3},
  listHeader: {paddingBottom: 20},
});

export default UserProfile;
