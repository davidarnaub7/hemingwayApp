/**
 * @func PasswdInput.js
 *
 * @description: it handles user paswd Input and call to the api.
 */
import React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';

import FlashMessage from 'react-native-flash-message'; //THIRD PARTY LIBRARY

import {useTheme} from '@react-navigation/native';
//PARTS
import PasswdInputInfo from './components/passwdInputInfo';
import PasswdInputButton from './components/passwdInputButton';
import { COLORS } from '../../../../constants/constants';

const ChangePasswdInput = (props) => {
  const theme = useTheme();
  const ref = React.useRef();

  const [error, setError] = React.useState('');

  React.useEffect(() => {
    let subscribe = true;

    if (error !== '' && subscribe) {
      ref.current.showMessage({
        message: error,
        type: 'info',
        icon: {icon: 'warning', position: 'left'},
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

    return () => {
      subscribe = false;
    };
  }, [error]);

  return (
    <ImageBackground
      style={[styles.container, {backgroundColor: theme.colors.background}]}
      source={require('../../../../assets/images/bck15_1.jpg')}>
      <View style={[styles.container, {backgroundColor: 'rgba(0,0,0,0.4)'}]}>
        <PasswdInputInfo />
        <PasswdInputButton
          setError={setError}
          email={props.route.params.email}
          enteredCode={props.route.params.enteredCode}
        />
        <View style={{flex: 0.3}} />
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
});

export default ChangePasswdInput;
