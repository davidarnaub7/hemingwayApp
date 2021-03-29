import React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';

import {useTheme} from '@react-navigation/native'; //THEME
import {COLORS} from '../../../../constants/constants'; //STYLING
import FlashMessage from 'react-native-flash-message'; //THIRD PARTY LIBARY

//PARTS
import MobileInputBackButton from './components/mobileInputBackButton';
import MobileInputInfo from './components/mobileInputInfo';
import MobileInputButton from './components/mobileInputButton';
import BackButton from '../components/backButton';

const MobileInput = (props) => {
  const theme = useTheme();
  const [error, setError] = React.useState('');
  const ref = React.useRef();

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
      source={require('../../../../assets/images/bck221.jpg')}>
      <View style={[styles.container, {backgroundColor: 'rgba(0,0,0,0.3)'}]}>
        <BackButton theme={theme} />
        <MobileInputInfo />
        <MobileInputButton setError={setError}/>
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

export default MobileInput;
