import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Text,
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const InfoPane = ({setModal, index, actionSheet, username}) => {
  const nav = useNavigation();
  const theme = useTheme();
  const [img, setImg] = useState('');

  return (
    <View style={[styles.container]}>
      <View
        style={{
          justifyContent: 'space-evenly',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => actionSheet.current.show()}>
          <Ionicons
            name={'menu'}
            size={30}
            color={index === 0 ? 'white' : theme.colors.text}
            style={{alignSelf: 'center'}}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setModal(true)}>
          <FontAwesome
            name={'instagram'}
            size={30}
            color={index === 0 ? 'white' : theme.colors.text}
            style={{alignSelf: 'center'}}
          />
        </TouchableOpacity>
      </View>
      <View style={{marginRight: 20}}>
        <TouchableOpacity
          style={styles.buttonProfile}
          onPress={() => nav.navigate('profile')}>
          <Text
            style={[
              styles.username,
              {color: index === 0 ? 'white' : theme.colors.text},
            ]}>
            {username}
          </Text>
          <Image source={{uri: img}} style={styles.img} />
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
  button: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    marginRight: 20,
    flexDirection: 'row',
  },
  buttonProfile: {
    width: 150,
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
});

export default InfoPane;
