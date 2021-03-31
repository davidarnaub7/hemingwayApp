import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

import Axios from 'axios'; //AXIOS

//REDUX
import {Compare} from '../../../constants/functions';
import {refresh_TokenAPI} from '../../../funcs/refresh_token'; //AUXLIARY FUNCS

import getFollowersPosts from '../../../servers/fetchPostsFollowers';
import getForMePosts from '../../../servers/fetchPostsForMe';

//PARTS
import Lecture from '../../lecture/lecture';

import EmptyPostMessage from './EmpyPostMessage/empytPostMessage';
import AsyncStorage from '@react-native-community/async-storage';
import getErrorMsg from '../../../errors/errors';

const HomeScroll = ({setModal, profile, flag}) => {
  //STYLES
  const theme = useTheme();

  // UI HOOKS
  const [refreshing, setRefreshing] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState('');

  //BARRIES
  const [noMore, setNoMore] = useState(false);

  //DATA HOOKS
  const [posts, setPosts] = useState([]);

  //AUX FUNCS
  const renderLecture = ({item, index}) => {
    return <Lecture lecture={item} key={index} home={true} />;
  };

  const axiosApiInstance = Axios.create();
  const getPostsHandler = async refreshItems => {
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
      let newPosts = [];
      if (flag === 'global') {
        newPosts = await getForMePosts(
          refreshItems,
          axiosApiInstance,
          profile.username,
          creds,
        ).catch(err => {
          throw err;
        });
      } else {
        newPosts = await getFollowersPosts(
          refreshItems,
          axiosApiInstance,
          profile.username,
          creds,
        ).catch(err => {
          throw err;
        });
      }

      newPosts = newPosts === undefined ? [] : newPosts;
      console.log('*************NO MORE CONDITION*************');
      console.log(newPosts.length);
      if (newPosts.length === 0 || (refreshItems && newPosts.length < 3)) {
        setNoMore(true);
      }

      if (refreshItems) {
        setPosts([...newPosts]);
      } else {
        if ([...posts, ...newPosts].length <= 4) {
          // if lower or equal four we want to prevent from repeat elements.
          const usersJoin = [...posts, ...newPosts].filter(
            (item, ind) => posts.indexOf(item) === ind,
          );
          setPosts(usersJoin);
        } else {
          setPosts([...posts, ...newPosts]);
        }
      }

      setFetching(false);
    } catch (err) {
      setError(getErrorMsg(err.toString().split(':')[1].trim()));
    }
  };

  React.useEffect(() => {
    getPostsHandler(true);
  }, []);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    setNoMore(false);
    await getPostsHandler(true);
    setRefreshing(false);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          fetching ? (
            <View
              style={styles.activityIndicator}>
              <ActivityIndicator size={'large'} />
            </View>
          ) : (
            <EmptyPostMessage setModal={setModal} />
          )
        }
        data={posts}
        extraData={posts}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            style={{color: theme.colors.text}}
          />
        }
        renderItem={renderLecture}
        onEndReachedThreshold={0.5}
        initialNumToRender={3}
        onEndReached={() => {
          if (!noMore) {
            getPostsHandler(false);
          }
        }}
        ListFooterComponent={<View style={{height: 80}} />}
        ListFooterComponentStyle={{height: 200}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  activityIndicator:{
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default HomeScroll;
