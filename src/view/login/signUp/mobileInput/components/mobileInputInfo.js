
import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

const MobileInputInfo = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={[styles.impText, {color: 'white'}]}>email</Text>
        <Text style={[styles.letter, {color: 'white'}]}>
          Introduce tú email de la UV. Este email no se compartirá con nadie.
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 0.17,
    justifyContent: 'space-around',
  },
  textContainer: {
    width: Dimensions.get('window').width / 1.2,
    alignSelf: 'center',
    height: Dimensions.get('window').height / 6,
    justifyContent: 'space-around',
  },
  impText: {
    fontFamily: 'System',
    fontWeight: 'bold',
    fontSize: 30,
    alignSelf: 'center',
    textAlign: 'center',
  },
  letter: {
    fontFamily: 'System',
    fontWeight: '500',
    fontSize: 14,
    alignSelf: 'center',
    opacity: 0.8,
    textAlign: 'center',
  },
});

export default MobileInputInfo;
