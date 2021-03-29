/**
 * @file mobilInputButton
 *
 * It manage mobile validation and ask to the server for a verifcation code in order to comprove the mobile introduced.
 *
 */
import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Text,
  StyleSheet,
  Dimensions,
  useColorScheme,
} from 'react-native';

import askForCode from '../../../../../funcs/askForCode';

import {useNavigation, useTheme} from '@react-navigation/native'; //THEME AND NAV
import {COLORS} from '../../../../../constants/constants'; //COLORS STYLING
import Entypo from 'react-native-vector-icons/Entypo'; //ICONS
Entypo.loadFont();
import getErrorMsg from '../../../../../errors/errors';
// import {logCustomEvent} from '../../../../../analytics/analytics';

//CONSTANTS DIMENSIONS
const WIDTH = Dimensions.get('window').width / 1.2;
const HEIGHT = Dimensions.get('window').height / 15;

const MobileInputButton = ({setError}) => {
  const [email, setEmail] = useState(''); // TEXTINPUT VALUE HANNDLER

  const theme = useTheme(); //THEME HANDLER

  const nav = useNavigation(); //NAVIGATION HANDLER

  const schema = useColorScheme(); //COLOR SCHEME HANDLER

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
      await askForCode(email, false).then(resData => {
        if (resData.createVerficationCode) {
          // logCustomEvent('askForCode', {type: 'register'}); //ANALYTICS
          nav.push('EnterCode', {
            email, //PASSING TELEPHONE VALUE IN ORDER TO REGISTER THE USER
          });
        }
      });
    } catch (err) {
      // setError(getErrorMsg(err.toString().split(':')[1].trim()));
    }
  };
  return (
    <View style={[styles.container, {backgroundColor: 'transparent'}]}>
      <View style={[styles.TextInputContainer, textInputContainerInline]}>
        <View style={[styles.iconContainer, textInputContainerInline]}>
          <Entypo name={'email'} size={20} style={{alignSelf: 'center'}} />
        </View>
        <TextInput
          value={email}
          autoCapitalize={false}
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
        style={[styles.sendButton, {backgroundColor: theme.colors.text}]}
        onPress={event => {
          if (!regex.test(email)) {
            setError('Introduce un correo válido');
          } else {
            createVerificationHandler(event);
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
    justifyContent: 'flex-start',
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 0.3,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  iconContainer: {
    width: 50,
    height: HEIGHT,
    justifyContent: 'center',
    borderRightWidth: 0.3,
  },
  textInput: {
    marginLeft: 20,
    fontFamily: 'System',
    fontWeight: '600',
    fontSize: 13,
    width: WIDTH / 1.35,
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
    color: COLORS.text,
    alignSelf: 'center',
  },
});

export default MobileInputButton;
