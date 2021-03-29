/**
 * @file help.js
 *
 * @description Help View composed wiht a Scroll which contains a header and a several items of  common questions.
 */
import {useTheme} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {ScrollView, View, StyleSheet, Dimensions} from 'react-native';

// import {logScreenView} from '../../../../analytics/analytics'; //ANALYTICS

//CONSTANTS
import {CONFIGURATION_ITEMS} from '../../../../constants/constants';

//PARTS
import HelpHeader from './components/helpHeader';
import HelpListItem from './components/helpListItem';

const Help = (props) => {
  const label = props.route.params.label;
  const options = CONFIGURATION_ITEMS[label];
  const theme = useTheme();

  useEffect(() => {
    // logScreenView('help');
  }, []);
  return (
    <ScrollView
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <HelpHeader />
      {options.map((opt) => {
        return <HelpListItem item={opt} />;
      })}
      <View style={{height: 80}} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  item: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  chevron: {alignSelf: 'center', marginRight: 30, opacity: 0.6},
});

export default Help;
