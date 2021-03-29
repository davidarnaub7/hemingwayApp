import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {COLORS} from '../../../../../constants/constants';

const EnterCodeHeader = ({email, createVerificationHandler}) => {
  const nav = useNavigation();
  const theme = useTheme();
  return (
    <View style={[styles.container]}>
      <View style={styles.textContainer}>
        <Text style={[styles.impText]}>Hemos enviado un código a {email}</Text>
      </View>
      <View style={styles.joiner}>
        <TouchableOpacity onPress={() => nav.goBack()} style={styles.button}>
          <Text style={[styles.letter]}>Cambiar el correo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => createVerificationHandler()}
          style={styles.button}>
          <Text style={[styles.letter]}>Pedir otro código</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 0.25,
    justifyContent: 'space-around',
  },
  textContainer: {
    alignSelf: 'center',
    flex: 0.5,
    justifyContent: 'space-between',
  },
  joiner: {
    flex: 0.6,
    justifyContent:'space-around',
  },
  button: {
    height: Dimensions.get('window').height / 20,

    justifyContent: 'center',
  },
  impText: {
    fontFamily: 'System',
    fontSize: 25,
    alignSelf: 'center',
    textAlign: 'center',
    color: 'white',
  },
  letter: {
    fontFamily: 'System',
    fontSize: 20,
    alignSelf: 'center',
    fontWeight:'600',
    textAlign: 'center',
    color: 'white',
  },
});

export default EnterCodeHeader;
