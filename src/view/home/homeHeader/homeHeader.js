import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons'; //ICONS
import {COLORS} from '../../../constants/constants'; //COLORS

const HomeHeader = ({setModal}) => {
  const theme = useTheme();
  const nav = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={[styles.text, {color: theme.colors.text}]}>Hemingway</Text>
        <View style={styles.joiner}>
          <TouchableOpacity
            style={[
              styles.button,
              {backgroundColor: theme.colors.notification},
            ]}
            onPress={() => setModal(true)}>
            <Ionicons
              name={'search'}
              size={20}
              color={'white'}
              style={{alignSelf: 'center'}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: COLORS.socialButton}]}
            onPress={() => nav.navigate('creator')}>
            <Ionicons
              name={'pencil'}
              size={20}
              color={'white'}
              style={{alignSelf: 'center', left: 1}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.12,
    justifyContent: 'flex-end',
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignItems: 'flex-end',
  },
  joiner: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginRight: 10,
  },
  text: {
    fontFamily: 'System',
    fontSize: 30,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  button: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    marginRight: 10,
    borderRadius: 20,
    borderColor: 'gray',
    alignSelf: 'center',
    // borderWidth: 1,
  },
});

export default HomeHeader;
