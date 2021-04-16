import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Modal} from 'react-native';

//MODULES
import {UIActivityIndicator} from 'react-native-indicators';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

//AUXILARY FUNCTIONSM
import {refresh_TokenAPI} from '../../../funcs/refresh_token';

//PARTS
import SearcherHeader from './searcherHeader/searcherHeader';
import SearcherElement from './searcherElement/searcherElement';
import SearcherList from './searcherList/searcherList';
import getErrorMsg from '../../../errors/errors';
import searchUsersByTerm from '../../../servers/searchUsers';

const Searcher = ({setModal, modal, profile}) => {
  const theme = useTheme();
  const nav = useNavigation();

  const navigate = selectedProfile => {
    setModal(false);
    if(profile.username === selectedProfile.username) {

      nav.navigate('profile');
    }else{

      nav.navigate('UserProfile', {profile: selectedProfile});
    }
  };

  //UI HOOKS
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState('');

  //DATA HOOKS
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const refTerm = React.useRef('');

  const axiosApiInstance = Axios.create();

  const fetchUsersHandler = async () => {
    // If it is empty
    if (searchTerm === '') {
      setUsers([]);
      return '';
    }
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
      //CHECKING IF WE HAVE TO UPDATE THE QUERY
      const refreshItems = refTerm === searchTerm ? false : true;
      refTerm.current = refreshItems ? searchTerm : refreshItems;

      //GETTING NEW OR MORE USERS
      const newUsers = await searchUsersByTerm(
        true,
        axiosApiInstance,
        profile.username,
        searchTerm,
        creds,
      );
      if (newUsers && refreshItems) {
        setUsers([...newUsers]);
      } else {
        setUsers([...users, ...newUsers]);
      }
      setFetching(false);
    } catch (err) {
      setFetching(false);
      setError(getErrorMsg(err.toString().split(':')[1].trim()));
    }
  };

  useEffect(() => {
    if (searchTerm !== '') {
      fetchUsersHandler();
    }
  }, [searchTerm]);

  return (
    <Modal
      animated
      animationType={'fadeInOut'}
      transparent={true}
      useNativeDriver={true}
      onRequestClose={() => {
        setModal(undefined);
      }}
      visible={modal}>
      <View
        style={[styles.container, {backgroundColor: theme.colors.background}]}>
        <SearcherHeader theme={theme} setModal={setModal} />
        <SearcherElement
          theme={theme}
          search={searchTerm}
          setSearch={setSearchTerm}
        />
        {fetching ? (
          <View style={styles.activity}>
            <UIActivityIndicator color={theme.colors.text} />
          </View>
        ) : (
          <SearcherList users={users} theme={theme} navigate={navigate} />
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  activity: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Searcher;
