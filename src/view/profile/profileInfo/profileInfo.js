import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfileInfo = ({profile, img}) => {
  const theme = useTheme();
  const nav = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.rounder}>
        <Ionicons
          name={'person'}
          size={40}
          style={{alignSelf: 'center', position: 'absolute'}}
          color={theme.colors.text}
        />
      </View>
      <Image source={{uri: img}} style={styles.img} />

      <View style={{justifyContent: 'space-around', flex: 0.6}}>
        <View style={styles.row}>
          <Text style={[styles.name, {color: theme.colors.text}]}>
            {profile.name.toUpperCase()}
          </Text>
          <MaterialCommunityIcons
            name={'account-edit'}
            onPress={() => nav.navigate('EditProfile')}
            size={25}
            color={theme.colors.text}
            style={{alignSelf: 'center', marginLeft: 5}}
          />
        </View>
        <Text style={[styles.city, {color: theme.colors.text}]}>
          {profile.city}
        </Text>
      </View>
      <View style={styles.infoRow}>
        <TouchableOpacity
          onPress={() =>
            nav.navigate('FollowersViewer', {
              opt: 'Seguidores',
            })
          }>
          <Text style={[styles.number, {color: theme.colors.text}]}>
            {profile.followers.length}
          </Text>
          <Text style={[styles.publicaciones, {color: theme.colors.text}]}>
            Seguidores
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            nav.navigate('FollowersViewer', {
              opt: 'Siguiendo',
            })
          }>
          <Text style={[styles.number, {color: theme.colors.text}]}>
            {profile.following.length}
          </Text>
          <Text style={[styles.publicaciones, {color: theme.colors.text}]}>
            Siguiendo
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:20,
    height: Dimensions.get('window').height/4,
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
    position:'absolute',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: Dimensions.get('window').width / 1.2,
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
    marginLeft: 20,
  },
  city: {
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: '600',
    opacity: 0.6,
    textAlign: 'center',
  },
  number: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: '700',
    opacity: 0.6,
    textAlign: 'center',
  },
  publicaciones: {
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: '600',
    opacity: 0.6,
    textAlign: 'center',
  },
});

export default ProfileInfo;
