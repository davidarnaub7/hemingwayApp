/**
 * @func usernameInputButton.js
 *
 * @description: It displays username input value and navigate to passwdPage.
 */
import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';

import {useNavigation, useTheme} from '@react-navigation/native'; // NAV AND THEME

import {COLORS} from '../../../../../constants/constants'; // STATIC COLORS

import Ionicons from 'react-native-vector-icons/Ionicons'; // STATIC ICONS

// DIMENSIONS
const WIDTH = Dimensions.get('window').width / 1.2;
const HEIGHT = Dimensions.get('window').height / 15;

const UsernameInputButton = ({user, code}) => {
  const [value, setValue] = useState(''); // textinput value handler

  const themes = useTheme(); //THEME HANDLER
  const nav = useNavigation(); //NAV HANDLER

  const usernameRegex = /^[a-z][a-z._0-9]+$/;

  //INLINE STYLES
  const textInputContainerInline = {borderColor: themes.colors.notification};
  const sendButtonInline = {
    backgroundColor: themes.colors.text,
    opacity: usernameRegex.test(value) ? 1 : 0.5,
  };
  return (
    <View style={styles.container}>
      <View style={[styles.TextInputContainer, textInputContainerInline]}>
        <TextInput
          value={value}
          style={styles.textInput}
          autoFocus={true}
          autoCapitalize={'none'}
          onChangeText={(text) => {
            user.username = text.toLowerCase();
            setValue(text.toLowerCase());
          }}
          placeholder={'luisuv10'}
          placeholderTextColor={themes.colors.notification}
        />
        {value === '' ? (
          <></>
        ) : usernameRegex.test(value) ? (
          <View style={styles.iconContainer}>
            <Ionicons
              name={'checkmark-circle-outline'}
              size={25}
              color={'#1db954'}
              style={{alignSelf: 'center'}}
            />
          </View>
        ) : (
          <View style={styles.iconContainer}>
            <Ionicons
              name={'ios-alert-circle-outline'}
              size={25}
              color={COLORS.danger}
              style={{alignSelf: 'center'}}
            />
          </View>
        )}
      </View>
      <TouchableOpacity
        disabled={!usernameRegex.test(value)}
        style={[styles.sendButton, sendButtonInline]}
        onPress={() =>
          //@TODO:HERE WE MUST COMPROVE IF USER IS AVALIABLE.
          nav.push('PasswdInput', {
            user: user,
            code,
          })
        }>
        <Text style={[styles.sendText, {color: themes.colors.background}]}>
          Continuar
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.2,
    justifyContent: 'space-evenly',
  },
  TextInputContainer: {
    width: WIDTH,
    height: HEIGHT,
    justifyContent: 'space-between',
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 0.3,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  iconContainer: {
    width: 50,
    height: HEIGHT,
    marginRight: 20,
    justifyContent: 'center',
  },
  textInput: {
    marginLeft: 20,
    fontFamily: 'System',
    fontWeight: '600',
    fontSize: 13,
    width: WIDTH / 1.3,
  },
  sendButton: {
    width: WIDTH,
    height: HEIGHT,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },
  sendText: {
    fontFamily: 'System',
    fontWeight: '600',
    fontSize: 16,
    color: 'white',
    alignSelf: 'center',
  },
});

export default UsernameInputButton;
