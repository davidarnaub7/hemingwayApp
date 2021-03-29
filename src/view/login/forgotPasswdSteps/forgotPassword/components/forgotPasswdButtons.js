import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';

import {COLORS} from '../../../../../constants/constants'; //STYLINGS
import useColorScheme from 'react-native/Libraries/Utilities/useColorScheme'; //SCHEME
import {useNavigation, useTheme} from '@react-navigation/native'; //NAV AND THEME

//API CALLS
import askForCode from '../../../../../funcs/askForCode';
import getErrorMsg from '../../../../../errors/errors';
// import {logCustomEvent} from '../../../../../analytics/analytics';

const WIDTH = Dimensions.get('window').width / 1.2;
const HEIGHT = Dimensions.get('window').height / 15;

const ForgotPasswdButtons = ({setError}) => {
  //GLOBAL HOOKS
  const theme = useTheme();
  const schema = useColorScheme();
  const nav = useNavigation(); //NAV

  //DATA HOOKS
  const [email, setEmail] = useState('');

  const regex = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*$/;
  //INLINE STYLES
  const textInputContainerInline = {
    borderColor: schema === 'dark' ? theme.colors.notification : '#D0D0D0',
  };
  const textInputInline = {
    backgroundColor: 'transparent',
  };

  /**
   * @func createVerificationHandler
   *
   * It calls to the API and tries to Create Verification Number the user.
   */
  const createVerificationHandler = async event => {
    event.preventDefault();

    try {
      await askForCode(email, true).then(resData => {
        if (resData.createVerficationCodeChangePasswd) {
          // logCustomEvent('askForCode', {type: 'forgotPasswd'}); //ANALYTICS
          nav.push('ForgotPasswdEnterCode', {
            email, //PASSING TELEPHONE VALUE IN ORDER TO REGISTER THE USER
          });
        }
      });
    } catch (err) {
      setError(getErrorMsg(err.toString().split(':')[1].trim()));
    }
  };
  return (
    <View style={[styles.container]}>
      <View style={[styles.TextInputContainer, textInputContainerInline]}>
        <TextInput
          value={email}
          autoCapitalize={'none'}
          style={[styles.textInput, textInputInline]}
          autoFocus={true}
          onChangeText={text => {
            setEmail(text.toLowerCase());
          }}
          keyboardType={'email-address'}
          placeholder={'beyu@example.com'}
          placeholderTextColor={'#505050'}
        />
      </View>
      <TouchableOpacity
        style={[styles.sendButton, {backgroundColor: theme.colors.background}]}
        onPress={event => {
          if (!regex.test(email)) {
            setError(
              '¡Introduce un correo válido! El correo debe ser la de Universidad de Valencia',
            );
          } else {
            createVerificationHandler(event);
          }
        }}>
        <Text style={[styles.sendText, {color: theme.colors.text}]}>
          Enviar
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
    justifyContent: 'center',
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 10,
    borderColor: '#D0D0D0',
    borderWidth: 0.3,
  },
  textInput: {
    marginLeft: 20,
    fontFamily: 'System',
    fontWeight: '600',
    fontSize: 13,
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
    alignSelf: 'center',
    color: 'white',
  },
});

export default ForgotPasswdButtons;
