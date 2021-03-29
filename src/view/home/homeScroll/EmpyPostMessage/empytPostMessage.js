import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native';
import { COLORS } from '../../../../constants/constants';

const EmptyPostMessage = ({setModal}) => {
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
      <TouchableOpacity onPress={() => setModal(true)}>
        <Text style={[styles.little, {color: COLORS.socialButton}]}>
          Busca a nuevos amigos
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height /1.2,
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
    opacity: 1,
    alignSelf: 'center',
    marginTop:20,
  },
});

export default EmptyPostMessage;
