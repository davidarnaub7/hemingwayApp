import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, RefreshControl} from 'react-native';

import Axios from 'axios';

//REDUX
import {useDispatch, useSelector} from 'react-redux';
//REDUX ACTIONS
import {savePostChanges} from '../../redux/actions/postAction';
import {updateProfile} from '../../redux/actions/profileAction';
//PARTS
import ProfileHeader from './profileHeader/profileHeader';
import ProfileInfo from './profileInfo/profileInfo';
import Lecture from '../lecture/lecture';
import AsyncStorage from '@react-native-community/async-storage';

const Profile = () => {
  const selector = useSelector(state => state);
  const profile = JSON.parse(selector.profile.profile);
  const profileMediaImg = selector.profileMedia.img;
  const posts = selector.myPosts.posts;

  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const renderItem = ({item, index}) => {
    return <Lecture lecture={item} username={profile.username} home={false} />;
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
  }, []);

  useEffect(() => {
    if (refreshing) {
      fetchUserData();
    }
  }, [fetchUserData, refreshing]);

  /**
   * @func fetchUserData
   *
   * It calls to the api and get user data from username.
   */
  const fetchUserData = useCallback(async () => {
    /**
     * Get User Api Call. Query and Method
     */
    let requestUser = {
      operationName: 'GetUserInfo',
      query: `query GetUserInfo {
      user(username: "${profile.username}"){
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
      getAllPostMyProfile(username: "${profile.username}"){
        title
        authorId
        imageInfo{
          bck
          url
          author
        }
        content
        likes
        createdOn
      }
    }`,
    };
    const creds = JSON.parse(await AsyncStorage.getItem('creds'));
    Axios.post(
      'http://192.168.1.38:3000/graphql',
      JSON.stringify(requestUser),
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
      .then(async resData => {
        const myUser = resData.user.user;
        const newPosts = resData.getAllPostMyProfile;

        console.log(newPosts);
        setRefreshing(false); //STOPPIN LOADING SPINNER UI
        dispatch(savePostChanges(newPosts));
        dispatch(updateProfile(myUser));
      })
      .catch(err => {
        console.log(err);
        setError('Se ha producido un problema');
        setRefreshing(false); //STOPING FECTHING UI COMPONENT
      });
  }, [dispatch, profile.username]);

  return (
    <View style={styles.container}>
      <ProfileHeader profile={profile} img={profileMediaImg} />
      <View style={styles.listContainer}>
        <FlatList
          ListHeaderComponent={
            <ProfileInfo profile={profile} img={profileMediaImg} />
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

export default Profile;
