/**
 * @func usernameInput.js
 * @description It displays a info about username
 */
import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

const UsernameInputInfo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={[styles.impText]}>Nombre de usuario</Text>
        <Text style={[styles.letter]}>
          Tu nombre de usuario de te identifcará en Beyu. Será único.
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
    fontWeight: 'bold',
    fontSize: 25,
    alignSelf: 'center',
    textAlign: 'center',
    color: 'white',
  },
  letter: {
    fontFamily: 'System',
    fontWeight: '600',
    fontSize: 14,
    alignSelf: 'center',
    opacity: 0.8,
    textAlign: 'center',
    color: 'white',
  },
});

export default UsernameInputInfo;
