import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, RefreshControl} from 'react-native';

import Axios from 'axios';

import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import getPostsOfUser from '../../servers/getPostsOfUser';

//PARTS
import UserProfileHeader from './userProfileHeader/userProfileHeader';
import ProfileFollow from './profileFollow/profileFollow';
import Lecture from '../lecture/lecture';
import {refresh_TokenAPI} from '../../funcs/refresh_token';

const UserProfile = props => {
  //DATA HOOKS
  const profile = props.route.params.profile;
  const myProfile = useSelector(state => JSON.parse(state.profile.profile));
  const [posts, setPosts] = useState(undefined);

  //UI HOOKS
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [fetching, setFetching] = useState(false);

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
    setFetching(true);
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
      await getPostsOfUser(
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
        setFetching(false);
      });
    } catch (err) {
      console.log(err);
      setFetching(false);
      setError('Se ha producido un problema');
      setRefreshing(false); //STOPING FECTHING UI COMPONENT
    }
  };

  return (
    <View style={styles.container}>
      <UserProfileHeader profile={profile} img={profile.imgUrl} />
      <View style={styles.listContainer}>
        <FlatList
          ListHeaderComponent={
            <ProfileFollow
              profile={profile}
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
