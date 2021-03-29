/**
 * @file ConfigurationList.js
 *
 * @description It displays the differente configuration pages leading on a static content.
 */

import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';

//CONSTANTS
import {CONFIGURATION_ITEMS} from '../../../constants/constants';

//THEME
import {useTheme} from '@react-navigation/native';

//PARTS
import ConfigurationListHeader from './components/configuratioListHeader';
import ConfigurationListItem from './components/configuratioListItem';

const ConfigurationList = (props) => {
  const label = props.route.params.label; //LABEL CLICKED IN LAST VIEW (CONFIGURATION OPTIONS).

  const options = CONFIGURATION_ITEMS[label]; // STATIC DATA OBTAIN SINCE THE LABEL VALUE

  const theme = useTheme(); // THEME

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <ConfigurationListHeader label={label} />
      {options.map((opt) => {
        return <ConfigurationListItem item={opt} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  chevron: {alignSelf: 'center', marginRight: 30, opacity: 0.6},
});

export default ConfigurationList;
