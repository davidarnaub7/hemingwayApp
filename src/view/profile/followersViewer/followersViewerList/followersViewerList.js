import React from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';

import FollowersViewerListItem from './FollowersViewerListItem/followersViewerListItem';

const FollowersViewerList = ({users}) => {
  const renderUsers = ({item, index}) => {
    return <FollowersViewerListItem user={item} />;
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={renderUsers}
        extraData={users}
        onEndReachedThreshold={0.5}
        onEndReached={() => setLookForMore()}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
});

export default FollowersViewerList;
