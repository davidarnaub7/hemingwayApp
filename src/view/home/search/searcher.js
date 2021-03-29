import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, StyleSheet, Modal} from 'react-native';

//MODULES
import {UIActivityIndicator} from 'react-native-indicators';

//PARTS
import SearcherHeader from './searcherHeader/searcherHeader';
import SearcherElement from './searcherElement/searcherElement';
import SearcherList from './searcherList/searcherList';

const Searcher = ({setModal, modal, profile}) => {
  const theme = useTheme();
  const nav = useNavigation();

  const navigate = (pr, img) => {
    setModal(false);
    nav.navigate('UserProfile', {profile: pr, img});
  };

  const users = [];
  const [fetching, setFetching] = useState(false);

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
        <SearcherElement theme={theme} />
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
});

export default Searcher;
