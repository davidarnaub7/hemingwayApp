import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

//PARTS
import SearcherListItem from './SearcherListItem/searcherListItem';

const SearcherList = ({users, theme, navigate}) => {
  const renderUsers = ({item, index}) => {
    return <SearcherListItem user={item} theme={theme} navigate={navigate} />;
  };
  return (
    <View style={styles.container}>
      <FlatList renderItem={renderUsers} data={users} extraData={users} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.78,
  },
  activity: {
    flex: 0.8,
    justifyContent: 'center',
  },
});

export default SearcherList;
