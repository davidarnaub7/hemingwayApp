import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';
import {COLORS} from '../../../../../constants/constants';
import {UIActivityIndicator} from 'react-native-indicators'; //THIRD PARTY LIBRARY

const EditProfileHeader = ({confirmChanges, fetching}) => {
  const navigation = useNavigation();
  const theme = useTheme();
  return (
    <View style={[styles.container]}>
      <View style={styles.joiner}>
        <Entypo
          name={'chevron-left'}
          size={30}
          color={theme.colors.text}
          onPress={() => navigation.pop(1)}
          style={{alignSelf: 'center', marginLeft: 10}}
        />
        <Text style={[styles.text, {color: theme.colors.text}]}>
          Editar Perfil
        </Text>
      </View>

      <TouchableOpacity
        onPress={(ev) => {
          confirmChanges(ev);
        }}
        style={[styles.editContainer]}>
        {fetching ? (
          <UIActivityIndicator
            color={theme.colors.text}
            style={{alignSelf: 'center'}}
            size={30}
          />
        ) : (
          <Text style={[styles.edittext, {color: theme.colors.text}]}>
            Confirmar
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.13,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  joiner: {
    flexDirection: 'row',
    marginLeft: 10,
    justifyContent: 'space-between',
    width: Dimensions.get('window').width / 2.2,
  },
  icon: {alignSelf: 'center', opacity: 0.5},
  text: {
    fontFamily: 'System',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  editContainer: {
    width: Dimensions.get('window').width / 4.5,
    height: 35,
    borderRadius: 10,
    justifyContent: 'center',
    marginRight: 10,
    top: 4,
  },
  edittext: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: '500',
    alignSelf: 'center',
  },
});

export default EditProfileHeader;
