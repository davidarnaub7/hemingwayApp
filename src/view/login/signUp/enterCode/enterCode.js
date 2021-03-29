/**
 * @file enterCode.js
 *
 * It verifies that the user introduces the correct code sneded by sms and displays an error in case of something fails.
 */
import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';

import {useTheme} from '@react-navigation/native'; //THEME
import {COLORS} from '../../../../constants/constants'; //STYLING
import FlashMessage from 'react-native-flash-message'; //THIRD PARTY LIBARY

import askForCode from '../../../../funcs/askForCode'; //API CALL

//PARTS
import EnterCodeHeader from './components/enterCodeHeader';
import EnterCodeInput from './components/enterCodeInput';
import getErrorMsg from '../../../../errors/errors';

const EnterCode = props => {
  //FECTHING DATA FROM ROUTE
  const email = props.route.params.email;

  const theme = useTheme(); //THEME

  const [error, setError] = useState(''); //ERROR HANDLER UI
  const [message, setMessage] = useState(''); // MESASGE HANDLER UI

  const ref = useRef(); //FLASH MESSAGE CONTROLLER

  /** ERROR DISPLAYER */
  useEffect(() => {
    let subscribe = true;

    if (error !== '' && subscribe) {
      ref.current.showMessage({
        message: error,
        type: 'info',
        duration: 5000,
        floating: true,
        backgroundColor: COLORS.primary,
        titleStyle: {
          fontFamily: 'System',
          fontWeight: 'bold',
          fontSize: 16,
        },
        style: {
          bottom: 10,
        },
      });
      setError('');
    }

    if (message !== '' && subscribe) {
      ref.current.showMessage({
        message: message,
        type: 'info',
        duration: 5000,
        floating: true,
        backgroundColor: COLORS.socialButton,
        titleStyle: {
          fontFamily: 'System',
          fontWeight: 'bold',
          fontSize: 16,
        },
        style: {
          bottom: 10,
        },
      });
      setMessage('');
    }
    return () => {
      subscribe = false;
    };
  }, [error, message]);

  const createVerificationHandler = async () => {
    try {
      await askForCode(email).then(resData => {
        if (resData.createVerficationCode) {
          setMessage('Cógio enviado. Tiene una validez de 3 minutos');
        }
      });
    } catch (err) {
      setError(getErrorMsg(err.toString().split(':')[1].trim()));
    }
  };
  return (
    <ImageBackground
      source={require('../../../../assets/images/bck3.jpg')}
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={styles.opaque}>
        <EnterCodeHeader
          email={email}
          createVerificationHandler={createVerificationHandler}
        />
        <EnterCodeInput email={email} setError={setError} />
        <View style={{flex: 0.2}} />
      </View>

      <FlashMessage position="top" ref={ref} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  opaque: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    flex: 1,
  },
});

export default EnterCode;
