import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation, useTheme} from '@react-navigation/native';

const ForgotPasswordBackButton = (props) => {
  const nav = useNavigation();
  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => nav.goBack('LogIn')}>
        <Ionicons
          name={'ios-arrow-back-outline'}
          size={20}
          color={'white'}
          style={{alignSelf: 'center'}}
        />
        <Text style={[styles.text, {color: 'white'}]}>Iniciar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.1,
    justifyContent: 'flex-start',
  },
  button: {
    marginLeft: 20,
    flexDirection: 'row',
  },
  text: {
    fontFamily: 'System',
    fontSize: 18,
    fontWeight: '600',
    alignSelf: 'center',
    marginLeft: 10,
  },
});

export default ForgotPasswordBackButton;
