import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../../constants/constants';

import {useDispatch} from 'react-redux';

const ProfileFollow = ({profile, img, isFollowing, setIsFollowing}) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {img === '' ? (
        <View style={styles.rounder}>
          <Ionicons
            name={'person'}
            size={40}
            style={{alignSelf: 'center'}}
            color={theme.colors.text}
          />
        </View>
      ) : (
        <Image source={{uri: img}} style={styles.img} />
      )}
      <View style={styles.column}>
        <Text style={[styles.name, {color: theme.colors.text}]}>
          {profile.name.toUpperCase()}
        </Text>
        <Text style={[styles.publicaciones, {color: theme.colors.text}]}>
          {profile.followers.length + ' Seguidores'}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setIsFollowing(!isFollowing);
        }}>
        <Text style={styles.buttonText}>
          {isFollowing ? 'Siguiendo' : 'Seguir'}{' '}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height / 3.2,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  rounder: {
    width: 80,
    height: 80,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 40,
    justifyContent: 'center',
  },
  column: {
    flex: 0.8,
    justifyContent: 'space-around',
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  name: {
    fontFamily: 'System',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    alignSelf: 'center',
  },
  city: {
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: '600',
    opacity: 0.6,
    textAlign: 'center',
  },
  publicaciones: {
    fontFamily: 'System',
    fontSize: 20,
    fontWeight: '600',
    opacity: 0.6,
    textAlign: 'center',
  },
  button: {
    width: Dimensions.get('window').width / 2.5,
    height: Dimensions.get('window').height / 18,
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: COLORS.socialButton,
  },
  buttonText: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: 'white',
    marginVertical: 10,
  },
});

export default ProfileFollow;
