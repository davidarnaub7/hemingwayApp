/**
 * @file configurationHeader.js
 * 
 * @description  COnfiguration option header which displays a identificative title and  one back button.
 */
import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';

//NAV
import {useNavigation, useTheme} from '@react-navigation/native';

//ICONS
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ConfigurationHeader = () => {
  const navigation = useNavigation(); //NAV
  const theme = useTheme(); //THEME

  return (
    <View style={styles.container}>
      <View style={styles.joiner}>
        <MaterialCommunityIcons
          name={'close'}
          size={30}
          color={theme.colors.text}
          onPress={() => navigation.pop(1)}
          style={styles.icon}
        />
        <Text style={[styles.text, {color: theme.colors.text}]}>
          Configuración
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.18,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  joiner: {
    flexDirection: 'row',
    marginLeft: 5,
    justifyContent: 'space-between',
    width: Dimensions.get('window').width / 2.2,
  },
  icon: {alignSelf: 'center'},
  text: {
    fontFamily: 'System',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

export default ConfigurationHeader;
