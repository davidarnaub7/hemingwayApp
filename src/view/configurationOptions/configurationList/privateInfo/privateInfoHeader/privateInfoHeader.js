/**
 * @file privateInfoheader.js
 * 
 * It displays the header and calls to its parent method in order to call the API or navigateback.
 */
import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';

//STYLING AND ICONS
import {COLORS} from '../../../../../constants/constants';
import Entypo from 'react-native-vector-icons/Entypo';

//THIDR PARTY LIBRARY
import {UIActivityIndicator} from 'react-native-indicators';

const PrivateInfoHeader = ({doAction, theme, nav, fetching}) => {
  return (
    <View style={styles.container}>
      <View style={styles.joiner}>
        <Entypo
          name={'chevron-left'}
          size={30}
          color={theme.colors.text}
          style={{alignSelf: 'center'}}
          onPress={() => nav.goBack()}
        />
        <Text style={[styles.headerText, {color: theme.colors.text}]}>
          Información Personal
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={doAction}>
        {fetching ? (
          <UIActivityIndicator
            color={theme.colors.text}
            style={{alignSelf: 'center'}}
          />
        ) : (
          <Text style={styles.text}>Confirmar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.12,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  joiner: {
    flexDirection: 'row',
  },
  headerText: {
    fontFamily: 'System',
    fontSize: 20,
    fontWeight: '600',
    paddingHorizontal: 5,
    alignSelf: 'center',
  },
  button: {
    width: Dimensions.get('window').width / 4,
    height: 30,
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    marginRight: 10,
  },
  text: {
    fontFamily: 'System',
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
    paddingHorizontal: 10,
  },
});

export default PrivateInfoHeader;
