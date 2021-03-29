/**
 * @func usernameInput.js
 * 
 * @description it manages username input user signUp
 */
import React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';

import {useTheme} from '@react-navigation/native'; //THEME

//PARTS
import UsernameInputInfo from './components/usernameInputInfo';
import UsernameInputButton from './components/usernameInputButton';
import BackButton from '../components/backButton';

const UsernameInput = (props) => {
  const theme = useTheme();

  const user = {
    name: props.route.params.name,
    username: '',
    privateInfo: {
      passwd: '',
      telephone: '',
      email: props.route.params.email,
    },
    socialNetworks: {
      Instagram: '',
      Twitter: '',
      Facebook: '',
      Tiktok: '',
    },
    image: false,
    bck: false,
    career: props.route.params.career,
  };

  return (
    <ImageBackground
      style={[styles.container, {backgroundColor: theme.colors.background}]}
      source={require('../../../../assets/images/bck9.jpg')}>
      <View style={[styles.container, {backgroundColor: 'rgba(0,0,0,0.5)'}]}>
        <BackButton />
        <UsernameInputInfo />
        <UsernameInputButton user={user} code={props.route.params.code} />
        <View style={{flex: 0.3}} />
      </View>
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

export default UsernameInput;
