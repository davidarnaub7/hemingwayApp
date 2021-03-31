import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';

const FollowersViewerHeader = ({username}) => {
  const theme = useTheme();
  const nav = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Entypo
          name={'chevron-left'}
          size={30}
          color={theme.colors.text}
          style={{alignSelf: 'center'}}
          onPress={() => nav.goBack()}
        />
        <Text style={[styles.username, {color: theme.colors.text}]}>
          {username}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.15,
    justifyContent: 'flex-end',
  },
  row: {flexDirection: 'row', marginHorizontal: 10},
  username: {
    fontFamily: 'System',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
    alignSelf: 'center',
  },
});

export default FollowersViewerHeader;
