import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

const PasswdInputInfo = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={[styles.impText, {color: 'white'}]}>Nueva Contraseña</Text>
        <Text style={[styles.letter, {color: 'white'}]}>
          La contraseña debe contener, como mínimo, 8 carácteres, una mayúscula,
          un número y, opcionalmente, uno o varios carácteres.
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 0.21,
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
  },
  letter: {
    fontFamily: 'System',
    fontWeight: '600',
    fontSize: 14,
    alignSelf: 'center',
    opacity: 0.8,
    textAlign: 'center',
  },
});

export default PasswdInputInfo;
