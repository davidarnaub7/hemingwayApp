import React, {useState} from 'react';

import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Text,
} from 'react-native';

import verifyCode from '../../../../../funcs/verifyCode'; //AXIOS

import {COLORS} from '../../../../../constants/constants'; //STYLIN

import {useNavigation} from '@react-navigation/native'; //THEME AND NAV
import getErrorMsg from '../../../../../errors/errors';

//DIMENSIONS CONS.
const WIDTH = Dimensions.get('window').width / 1.1;
const HEIGHT = Dimensions.get('window').height / 15;

const EnterCodeInput = ({email, setError}) => {
  const nav = useNavigation(); //NAVIGATION HOOK

  const [code, setCode] = useState(''); // ENTER CODE HANDLER

  /**
   * API CALLS
   */
  const verifyCodeHandler = async event => {
    event.preventDefault();

    try {
      await verifyCode(email, code).then(resData => {
        //Checking if we get the correct response. "Accepted"->response retuned from server indicating everything works correctly
        if (resData.verifyCode === 'Success') {
          nav.push('NameInput', {
            email, //PASSING EMAIL VALUE IN ORDER TO REGISTER THE USER
            code,
          });
        } else {
          throw new Error(
            'Algo ha ido mal. Pide otro código y vuelve a probar',
          );
        }
      });
    } catch (err) {
      setError(getErrorMsg(err.toString().split(':')[1].trim()));
    }
  };

  return (
    <View style={[styles.container]}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.textInput]}
          maxLength={6}
          keyboardType={'numeric'}
          onChangeText={text => setCode(text)}
        />
      </View>
      <TouchableOpacity
        style={[styles.sendButton]}
        onPress={event => {
          verifyCodeHandler(event);
        }}>
        <Text style={[styles.sendText]}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.3,
    justifyContent: 'space-evenly',
  },
  //INPUT CODE
  inputContainer: {
    width: WIDTH,
    height: HEIGHT,
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  textInput: {
    marginLeft: 20,
    width: WIDTH / 1.2,
    height: HEIGHT,
    fontFamily: 'System',
    fontWeight: '600',
    fontSize: 13,
  },
  //BUTTON
  sendButton: {
    width: WIDTH,
    height: HEIGHT,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#010101',
  },
  sendText: {
    fontFamily: 'System',
    fontWeight: '600',
    fontSize: 16,
    alignSelf: 'center',
    color: 'white',
  },
});

export default EnterCodeInput;
