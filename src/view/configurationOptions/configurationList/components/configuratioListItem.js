/**
 * @file configurationListItem.js
 *
 * @description It displays an item of text
 */
import React, {useState} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Switch,
  View,
} from 'react-native';

//CONSTANTS
import Entypo from 'react-native-vector-icons/Entypo';
//MODULES
import {useNavigation, useTheme} from '@react-navigation/native';

const ConfigurationListItem = ({item}) => {
  const navigation = useNavigation(); // NAV
  const theme = useTheme(); //THEME

  /**
   * This two next variables are not being used right now because we don't have any true false option. For example having 
   * notifications activated.
   */
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () =>
    setIsEnabled(function (previousState) {
      return !previousState;
    });
  return (
    <View>
      {item.path !== '' ? (
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.push(item.path)}>
          <Text style={[styles.text, {color: theme.colors.text}]}>
            {item.item}
          </Text>

          <Entypo
            name={'chevron-right'}
            size={20}
            style={styles.chevron}
            color={theme.colors.text}
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.item}>
          <Text style={[styles.text, {color: theme.colors.text}]}>
            {item.item}
          </Text>

          <Switch
            style={styles.switch}
            trackColor={{false: '#767577', true: '#34a853'}}
            thumbColor={'#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginLeft: 10,
  },
  text: {
    width: Dimensions.get('window').width / 1.3,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'System',
    alignSelf: 'center',
    marginLeft: 10,
    marginTop: 2,
  },
  chevron: {alignSelf: 'center', marginRight: 30, opacity: 0.6},
  switch: {marginRight: 20, alignSelf: 'center'},
});

export default ConfigurationListItem;
