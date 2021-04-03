import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

//STYLE & ICONS
import Ionicons from 'react-native-vector-icons/Ionicons';

import FastImage from 'react-native-fast-image'; //THIRD PARTY MODULE

const LectureFooter = ({lecture, profile, giveLike, mg, icon, nav}) => {
  //RETURN FUNC
  return (
    <View style={[styles.container]}>
      <View style={styles.linearRow}>
        <TouchableOpacity
          style={styles.row}
          onPress={() => {
            return lecture.authorId === profile.username
              ? nav.navigate('profile')
              : nav.navigate('UserProfile', {
                  profile: {username: lecture.authorId, imgUrl: lecture.img},
                });
          }}>
          {lecture.img === '' ? (
            <View style={styles.rounder}>
              <Ionicons
                name={'person'}
                size={15}
                style={{alignSelf: 'center'}}
                color={'white'}
              />
            </View>
          ) : (
            <FastImage style={styles.img} source={{uri: lecture.img}} />
          )}
          <Text style={styles.text}>{lecture.authorId}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={giveLike}>
          <Ionicons
            name={icon}
            size={30}
            color={'#ED547D'}
            style={{alignSelf: 'center'}}
          />
          <Text style={styles.little}>{mg}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.15,
    justifyContent: 'center',
    width: Dimensions.get('window').width,
  },
  linearRow: {flexDirection: 'row', justifyContent: 'space-between'},
  rounder: {
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: 30,
    borderColor: 'white',
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    margin: 20,
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
  text: {
    fontFamily: 'System',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 5,
    alignSelf: 'center',
    color: 'white',
  },
  little: {
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 5,
    alignSelf: 'center',
    color: 'white',
  },
  button: {
    justifyContent: 'space-evenly',
    width: 70,
    height: 40,
    marginRight: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: 'rgba(256,256,256,0.1)',
    borderRadius: 20,
  },
});

export default LectureFooter;
