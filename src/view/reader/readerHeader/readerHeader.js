import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';

const ReaderHeader = ({tittle, lecture, index}) => {
  const theme = useTheme();
  const nav = useNavigation();
  return (
    <View style={[styles.container]}>
      <View style={styles.row}>
        <Entypo
          name={'chevron-left'}
          size={40}
          color={'white'}
          style={{alignSelf: 'center', marginLeft: 20}}
          onPress={() => nav.goBack()}
        />
        <Text style={[styles.index, {color:'white'}]}>
          {index + ' de ' + lecture.content.length}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height / 20,
    width: Dimensions.get('window').width,
    top: Dimensions.get('window').height / 19,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    zIndex: 40000,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  index: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    opacity: 0.6,
    alignSelf: 'center',
    marginRight: 20,
  },
});

export default ReaderHeader;
