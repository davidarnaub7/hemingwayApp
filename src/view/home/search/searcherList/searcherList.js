import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';


//PARTS
import SearcherListItem from './SearcherListItem/searcherListItem';

const SearcherList = ({users, theme, navigate}) => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {users.map(user => (
          <SearcherListItem user={user} theme={theme} navigate={navigate} />
        ))}
      </ScrollView>
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
