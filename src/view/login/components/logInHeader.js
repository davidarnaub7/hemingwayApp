import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import { COLORS } from '../../../constants/constants';

const LogInHeader = (props) => {

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Text style={[styles.text]}>Hemingway</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.3,
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  text: {
    fontFamily: 'System',
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: 'white',
  },
  imgContainer:{
    width: Dimensions.get('window').width / 1.3,
    height: Dimensions.get('window').height / 5,
    alignSelf: 'center',
  },
  img:{
    width: Dimensions.get('window').width / 1.4,
    height: Dimensions.get('window').height / 4.8,
    alignSelf: 'center',
    // backgroundColor:'red',
  }
});

export default LogInHeader;
