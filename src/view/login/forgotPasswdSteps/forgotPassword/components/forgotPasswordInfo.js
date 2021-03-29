import {useTheme} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ForgotPasswdInfo = (props) => {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={[styles.impText]}>Vamos a recuperar tu contraseña</Text>
        <Text style={[styles.letter]}>
          Enviaremos un código al correo asociado.
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 0.2,
    justifyContent: 'space-around',
  },
  textContainer: {
    width: Dimensions.get('window').width / 1.2,
    alignSelf: 'center',
    height: Dimensions.get('window').height / 6,
    justifyContent: 'space-between',
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

export default ForgotPasswdInfo;
