/**
 * @file configurationListHeader.js
 *
 * @description show Title and back button. Not important
 */
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

//NAV AND THEME
import {useNavigation, useTheme} from '@react-navigation/native';

//ICON
import Entypo from 'react-native-vector-icons/Entypo';

const ConfigurationListHeader = ({label}) => {
  const navigation = useNavigation(); //NAV
  const theme = useTheme(); //THEME

  return (
    <View style={styles.container}>
      <Entypo
        name={'chevron-left'}
        size={30}
        color={theme.colors.text}
        onPress={() => navigation.pop(1)}
        style={styles.icon}
      />
      <Text style={[styles.text, {color: theme.colors.text}]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 0.1,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  icon: {alignSelf: 'center'},
  text: {
    fontFamily: 'System',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginLeft: 10,
  },
});

export default ConfigurationListHeader;
