import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

//STYLE & ICONS
import Ionicons from 'react-native-vector-icons/Ionicons';

import FastImage from 'react-native-fast-image'; //THIRD PARTY MODULE

const LectureFooterProfile = ({lecture, profile, width, mg, icon}) => {
  //RETURN FUNC
  return (
    <View style={[styles.container]}>
      <View style={[styles.linearRow,{width:width+10}]}>
        <View style={styles.button}>
          <Ionicons
            name={icon}
            size={20}
            color={'#ED547D'}
            style={{alignSelf: 'center'}}
          />
          <Text style={styles.little}>{mg}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.25,
    justifyContent: 'center',
    width: Dimensions.get('window').width,
  },
  linearRow: {flexDirection: 'row', justifyContent: 'flex-end'},
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
    width: 50,
    height: 30,
    marginRight: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 20,
  },
});

export default LectureFooterProfile;
