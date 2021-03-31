import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const InfoPane = ({lecture, setModal, img, profile, actionSheet}) => {
  //GLOBALS VARIABLES
  const nav = useNavigation();
  const theme = useTheme();

  return (
    <View style={[styles.container]}>
      <View style={styles.subContainer}>
        {profile.username === lecture.authorId ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => actionSheet.current.show()}>
            <Ionicons
              name={'menu'}
              size={30}
              color={'white'}
              style={{alignSelf: 'center'}}
            />
          </TouchableOpacity>
        ) : (
          <FastImage
            style={styles.imgpexels}
            source={require('../../../assets/socialNetworkLogos/pexe.png')}
          />
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setModal(true);
          }}>
          <FontAwesome
            name={'instagram'}
            size={30}
            color={'white'}
            style={{alignSelf: 'center'}}
          />
        </TouchableOpacity>
      </View>
      <View style={{marginRight: 20}}>
        <TouchableOpacity
          style={styles.buttonProfile}
          onPress={() => nav.navigate('UserProfile')}>
          {img === '' ? (
            <View style={styles.rounder}>
              <Ionicons
                name={'person-circle-outline'}
                size={30}
                style={{alignSelf: 'center'}}
                color={theme.colors.text}
              />
            </View>
          ) : (
            <FastImage source={{uri: img}} style={styles.img} />
          )}
          <Text style={[styles.username, {color: 'white'}]}>
            {lecture.authorId}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    position: 'absolute',
    borderRadius: 20,
    top: Dimensions.get('window').height / 1.1,
    zIndex: 10000,
    bottom: 0,
    right: 0,
    left: Dimensions.get('window').width / 20,
  },
  subContainer: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    height: Dimensions.get('window').height / 15,
  },
  rounder: {
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: 30,
    borderColor: 'white',
    borderWidth: 1,
    alignSelf: 'center',
  },
  button: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    marginRight: 20,
    flexDirection: 'row',
  },
  buttonProfile: {
    width: Dimensions.get('window').width / 2.2,
    height: 50,
    justifyContent: 'space-around',
    marginRight: 20,
    flexDirection: 'row',
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 25,
    alignSelf: 'center',
  },
  username: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: '600',
    alignSelf: 'center',
  },
  little: {
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 5,
    alignSelf: 'center',
    color: 'white',
  },
  likeButton: {
    justifyContent: 'space-evenly',
    width: 70,
    height: 50,
    marginRight: 10,
    flexDirection: 'row',
    alignSelf: 'center',
    borderRadius: 20,
  },
  imgpexels: {
    width: 30,
    height: 30,
    marginRight: 10,
    alignSelf: 'center',
  },
});

export default InfoPane;
