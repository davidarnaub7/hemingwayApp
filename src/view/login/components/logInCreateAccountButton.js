import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';

const LogInCreateAccountButton = (props) => {
  const nav = useNavigation();
  const theme = useTheme();
  return (
    <View style={[styles.container, {backgroundColor: 'transparent'}]}>
      <TouchableOpacity
        style={styles.signUp}
        onPress={() => nav.push('SignUp')}>
        <Text style={[styles.signUpText, {color: 'white'}]}>Crear cuenta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  //optionsContainer
  container: {
    flex: 0.05,
    marginTop: 30,
    justifyContent: 'space-around',
  },
  //SIGN UP
  signUp: {
    width: Dimensions.get('window').width / 1.2,
    alignSelf: 'center',
    height: Dimensions.get('window').height / 15,
  },
  signUpText: {
    fontFamily: 'System',
    fontWeight: '600',
    opacity: 0.8,
    fontSize: 16,
    alignSelf: 'center',
  },
});

export default LogInCreateAccountButton;
