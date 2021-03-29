import React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';

//PARTS
import ForgotPasswordBackButton from './components/forgotPasswordBackButton';
import ForgotPasswdInfo from './components/forgotPasswordInfo';
import ForgotPasswdButton from './components/forgotPasswdButtons';
import FlashMessage from 'react-native-flash-message';
import {useTheme} from '@react-navigation/native';
import {COLORS} from '../../../../constants/constants';

const ForgotPasswd = (props) => {
  const theme = useTheme();
  //UI HOOKS
  const [error, setError] = React.useState(''); //UI HANDLER

  const ref = React.useRef(); //REF TO HANDLER FLASH MESSAGE

  React.useEffect(() => {
    let subscribe = true;

    if (error !== '' && subscribe) {
      ref.current.showMessage({
        message: error,
        type: 'info',
        duration: 2500,
        floating: true,
        backgroundColor: COLORS.primary,
        titleStyle: {
          fontFamily: 'System',
          fontWeight: 'bold',
          fontSize: 16,
        },
        style: {
          // bottom: 10,
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
      source={require('../../../../assets/images/bck12_1.jpg')}
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={styles.opaque}>
        <ForgotPasswordBackButton />
        <ForgotPasswdInfo />
        <ForgotPasswdButton setError={setError} />
        <View style={{flex: 0.3}} />
        <FlashMessage position="top" ref={ref} />
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
  opaque: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});

export default ForgotPasswd;
