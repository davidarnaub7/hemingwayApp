/**
 * @func nameInputButton.js
 *
 * @description It manage name user Input and navigate to the other screen.
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

import {useNavigation, useTheme} from '@react-navigation/native'; //NAV AND THEME HANDLES

import {COLORS} from '../../../../../constants/constants'; //STATIC COLOR

const WIDTH = Dimensions.get('window').width / 1.2; // CONSTANT WIDTH
const HEIGHT = Dimensions.get('window').height / 15; //CONSTANT HEIGHT

const NameInputButton = ({email, code, career, setError}) => {
  const [value, setValue] = useState(''); // TEXTINPUT VALUE HANDLER
  const regex = /^[a-zA-Z ]+$/;
  const theme = useTheme(); //THEME
  const nav = useNavigation(); //NAVIGATION

  //INLINE STYLES
  const textInputContainerInline = {
    borderColor: theme.colors.notification,
  };

  return (
    <View style={styles.container}>
      <View style={[styles.TextInputContainer, textInputContainerInline]}>
        <TextInput
          value={value}
          style={styles.textInput}
          autoFocus={true}
          onChangeText={(text) => {
            setValue(text);
          }}
          placeholder={'Luis Uv'}
          placeholderTextColor={theme.colors.notification}
        />
      </View>
      <TouchableOpacity
        style={[styles.sendButton, {backgroundColor: theme.colors.text}]}
        onPress={() => {
          if (!regex.test(value.trim())) {
            setError('Debes introducir un nombre para continuar');
          } else {
            nav.push('UsernameInput', {
              name: value.trim(),
              email,
              code,
              career,
            });
          }
        }}>
        <Text style={[styles.sendText, {color: theme.colors.background}]}>
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
    width: WIDTH / 1.2,
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

export default NameInputButton;
