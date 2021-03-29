import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';

//CONSTANTS
import {COLORS} from '../../../constants/constants';

const SignIn = ({usernameState, passwdState, loginHandler}) => {
  const navigation = useNavigation();
  const theme = useTheme();

  return (
    <View style={[styles.container]}>
      <View style={styles.signInContainer}>
        <View style={[styles.inputContainer, {borderColor: theme.colors.card}]}>
          <TextInput
            value={usernameState.username}
            autoCapitalize="none"
            onChangeText={text => usernameState.setUsername(text.toLowerCase())}
            style={[styles.input]}
            placeholder={'Nombre de usuario'}
            placeholderTextColor={'gray'}
          />
        </View>
        <View style={[styles.inputContainer, {borderColor: theme.colors.card}]}>
          <TextInput
            style={[styles.input]}
            autoCapitalize="none"
            value={passwdState.passwd}
            secureTextEntry={true}
            onChangeText={text => passwdState.setPasswd(text)}
            placeholder={'Contraseña'}
            placeholderTextColor={'gray'}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.passwdContainer}
        onPress={() => navigation.push('ForgotPasswd')}>
        <Text style={[styles.passwd, {color: 'white'}]}>
          ¿Has olvidado la contraseña?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.signIn,
          usernameState.username === '' || passwdState.passwd === ''
            ? {opacity: 0.8}
            : {},
          {backgroundColor: theme.colors.text},
        ]}
        disabled={usernameState.username === '' || passwdState.passwd === ''}
        onPress={loginHandler}>
        <Text style={[styles.signInText, {color: theme.colors.background}]}>
          Iniciar sesión
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.4,
    marginTop: 20,
    justifyContent: 'space-around',
  },
  //signInContainer
  signInContainer: {
    flex: 0.5,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  inputContainer: {
    borderWidth: 0.3,
    width: Dimensions.get('window').width / 1.2,
    height: Dimensions.get('window').height / 18,
    alignSelf: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(240,240,240,0.9)',
  },
  input: {
    fontFamily: 'System',
    fontWeight: '500',
    fontSize: 12,
    paddingLeft: 20,
    width: Dimensions.get('window').width / 1.2,
    height: Dimensions.get('window').height / 18,
    borderRadius: 10,
    opacity: 1,
  },
  passwdContainer: {
    flex: 0.1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  passwd: {
    fontFamily: 'System',
    fontWeight: '400',
  },
  //SIGNIN
  signIn: {
    width: Dimensions.get('window').width / 1.2,
    height: Dimensions.get('window').height / 18,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    borderRadius: 10,
  },
  signInText: {
    fontWeight: '500',
    fontSize: 18,
    alignSelf: 'center',
  },
});

export default SignIn;
