import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
} from 'react-native';

const HomeSegmentControl = ({setSelectedOption, selectedOption}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setSelectedOption('Para ti')}>
          <Text
            style={[
              styles.text,
              selectedOption === 'Para ti' ? {fontSize: 18} : {opacity: 0.6},
            ]}>
            Para ti
          </Text>
        </TouchableOpacity>
        <View style={styles.sticky} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => setSelectedOption('Siguiendo')}>
          <Text
            style={[
              styles.text,
              selectedOption === 'Siguiendo' ? {fontSize: 18} : {opacity: 0.6},
            ]}>
            Siguiendo
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height / 20,
    justifyContent: 'center',
    position: 'absolute',
    top: Dimensions.get('window').height / 7,
    zIndex: 10000,
    left: Dimensions.get('window').width / 4,
    borderRadius: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: Dimensions.get('window').width / 2,
    alignSelf: 'center',
  },
  button: {
    alignSelf: 'center',
  },
  text: {
    fontFamily: 'System',
    fontWeight: '600',
    fontSize: 16,
    color: 'white',
    alignSelf: 'center',
  },
  sticky: {
    borderWidth: 0.3,
    height: Dimensions.get('window').height / 41,
    borderColor: 'white',
    opacity: 0.6,
  },
});
export default HomeSegmentControl;
