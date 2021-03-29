import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const BackButton = ({theme, top}) => {
  const nav = useNavigation();
  return (
    <View style={[styles.container, {backgroundColor: 'transparent', top: top}]}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => nav.goBack('LogIn')}>
        <Ionicons
          name={'ios-arrow-back-outline'}
          size={20}
          color={'white'}
          style={{alignSelf: 'center'}}
        />
        <Text style={[styles.text, {color: 'white'}]}>Atrás</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.1,
    justifyContent: 'flex-start',
    bottom: 20,
  },
  button: {
    marginLeft: 20,
    flexDirection: 'row',
  },
  text: {
    fontFamily: 'System',
    fontWeight: '500',
    fontSize: 18,
    alignSelf: 'center',
    marginLeft: 10,
  },
});

export default BackButton;
