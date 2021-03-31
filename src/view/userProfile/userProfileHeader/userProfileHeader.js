import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';

const ProfileHeader = ({profile}) => {
  const theme = useTheme();
  const nav = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => nav.goBack()}>
          <Entypo
            name="chevron-left"
            style={{alignSelf: 'center'}}
            color={theme.colors.text}
            size={30}
          />
        </TouchableOpacity>
        <Text style={[styles.text, {color: theme.colors.text}]}>
          {'@' + profile.username}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.08,
    marginTop: 40,
    justifyContent: 'flex-end',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginHorizontal: 10,
  },
  text: {
    fontFamily: 'System',
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  button: {
    alignSelf: 'center',
    marginBottom: 10,
    marginRight: 10,
  },
});

export default ProfileHeader;
