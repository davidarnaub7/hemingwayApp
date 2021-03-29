/**
 * @file: passwdChangeHeader.js
 *
 * @description Header which displays info about how long and what should contain the passwd and a back button.
 */
import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

//NAV-THEME
import {useNavigation, useTheme} from '@react-navigation/native';
//ICONS
import Entypo from 'react-native-vector-icons/Entypo';
//CONSTANTS
import {COLORS} from '../../../../../constants/constants';

const PasswdChangeHeader = (props) => {
  const nav = useNavigation();
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
        },
      ]}>
      <View style={styles.textContainer}>
        <View style={styles.row}>
          <View style={styles.joiner}>
            <Entypo
              name={'chevron-left'}
              size={30}
              color={theme.colors.text}
              onPress={() => nav.goBack()}
            />
          </View>
          <Text style={[styles.impText, {color: theme.colors.text}]}>
            Cambio de contraseña
          </Text>
        </View>
        <Text style={styles.letter}>
          Recomendamos que tu contraseña tenga como mínimo 8 carácteres, una
          mayúscula, un número y uno de estos carácteres {'\n'} (/, *, ?, !,)
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 0.25,
    backgroundColor: 'red',
    justifyContent: 'flex-end',
  },
  joiner: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    width: Dimensions.get('window').width,
  },
  textContainer: {
    width: Dimensions.get('window').width,
    justifyContent: 'space-between',
  },
  impText: {
    fontFamily: 'System',
    fontWeight: 'bold',
    fontSize: 25,
    alignSelf: 'center',
    textAlign: 'center',
  },
  impTextLittle: {
    fontFamily: 'System',
    fontWeight: '600',
    fontSize: 18,
    alignSelf: 'center',
    textAlign: 'center',
    top: 20,
  },
  letter: {
    fontFamily: 'System',
    width: Dimensions.get('window').width / 1.2,
    fontWeight: '600',
    fontSize: 14,
    alignSelf: 'center',
    opacity: 1,
    textAlign: 'center',
    color: COLORS.primary,
    marginTop: 20,
  },
});

export default PasswdChangeHeader;
