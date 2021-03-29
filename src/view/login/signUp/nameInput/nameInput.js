/**
 * @file nameInput.js
 *
 * @description: It handles name Page user SignUp.
 */
import React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';

import {useTheme} from '@react-navigation/native'; //THEME
import FlashMessage from 'react-native-flash-message'; //THIRD PARTY LIBRARY
//PARTS
import NameInputInfo from './components/nameInputInfo';
import NameInputButton from './components/nameInputButton';
import { COLORS } from '../../../../constants/constants';

const NameInput = (props) => {
  const theme = useTheme(); //THEME
  const email = props.route.params.email;
  const code = props.route.params.code;
  const career = props.route.params.career;

  const [error, setError] = React.useState('');
  const ref = React.useRef();

  //ERROR DISPLAYER
  React.useEffect(() => {
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
    return () => {
      subscribe = false;
    };
  }, [error]);

  return (
    <ImageBackground
      style={[styles.container, {backgroundColor: theme.colors.background}]}
      source={require('../../../../assets/images/bck10.jpg')}>
      <View style={[styles.container, {backgroundColor: 'rgba(0,0,0,0.2)'}]}>
        <NameInputInfo />
        <NameInputButton email={email} code={code} career={career} setError={setError} />
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

export default NameInput;
