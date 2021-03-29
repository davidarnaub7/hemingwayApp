import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { COLORS } from '../../../../constants/constants';

const EmptyPostMessage = (propr) => {
  const theme = useTheme();
  const nav = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={[styles.emptyPost, {color: theme.colors.text}]}>
        No hay publicaciones
      </Text>
      <TouchableOpacity onPress={() => nav.navigate('creator')}>
        <Text style={[styles.little, {color: theme.colors.text}]}>
          Crea tu primera publicación
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => nav.navigate('EditProfile')}>
        <Text style={[styles.little, {color: COLORS.socialButton}]}>
          Empieza editando tu perfil
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    justifyContent: 'center',
  },
  emptyPost: {
    fontFamily: 'System',
    fontSize: 35,
    fontWeight: '600',
    alignSelf: 'center',
  },
  little: {
    fontFamily: 'System',
    fontSize: 18,
    fontWeight: '600',
    alignSelf: 'center',
    marginTop:20,
  },
});

export default EmptyPostMessage;
