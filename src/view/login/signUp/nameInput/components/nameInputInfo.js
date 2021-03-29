/**
 * @file nameInputInfo
 * 
 * @description  It displays info to the name page user signUp.
 */
import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

const NameInputInfo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={[styles.impText]}>Nombre Completo</Text>
        <Text style={[styles.letter]}>
          Tu nombre será usado para identificarte personalmente y de manera
          formal.
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 0.17,
    justifyContent: 'space-around',
  },
  textContainer: {
    width: Dimensions.get('window').width / 1.2,
    alignSelf: 'center',
    height: Dimensions.get('window').height / 6,
    justifyContent: 'space-around',
  },
  impText: {
    fontFamily: 'System',
    fontWeight:'bold',
    fontSize: 25,
    alignSelf: 'center',
    textAlign: 'center',
    color: 'white',
  },
  letter: {
    fontFamily: 'System',
    fontWeight:'600',
    fontSize: 14,
    alignSelf: 'center',
    opacity: 0.8,
    textAlign: 'center',
    color: 'white',
  },
});

export default NameInputInfo;
