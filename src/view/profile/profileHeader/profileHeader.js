import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfileHeader = ({profile}) => {
  const theme = useTheme();
  const nav = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={[styles.text, {color: theme.colors.text}]}>
          {'@' + profile.username}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => nav.navigate('ConfigurationOptions')}>
          <Ionicons
            name="menu"
            style={{alignSelf: 'center'}}
            color={theme.colors.text}
            size={30}
          />
        </TouchableOpacity>
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
    justifyContent: 'space-between',
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
  },
  img: {
    width: 30,
    height: 30,
    borderRadius: 40,
    top: Dimensions.get('window').height / 300,
    left: Dimensions.get('window').width / 20,
    position: 'absolute',
  },
});

export default ProfileHeader;
