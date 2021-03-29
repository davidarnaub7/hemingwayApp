import {useTheme} from '@react-navigation/native';
import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons'; //ICONS
import {COLORS} from '../../../../../../constants/constants';

const PoliciesModalSelector = ({
  selectedOption,
  setSelectedOption,
  setModal,
}) => {
  const theme = useTheme();

  //INLINE STYLES
  const buttonTerms = {
    backgroundColor:
      selectedOption === 'Términos y condiciones'
        ? COLORS.primary
        : 'transparent',
  };
  const textTerms = {
    color:
      selectedOption === 'Términos y condiciones' ? 'white' : theme.colors.text,
  };
  const buttonsPolicy = {
    backgroundColor:
      selectedOption === 'Política de datos' ? COLORS.primary : 'transparent',
  };

  const textPolicy = {
    color: selectedOption === 'Política de datos' ? 'white' : theme.colors.text,
  };
  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={styles.exitIcon}>
        <Ionicons
          name="close"
          size={30}
          color={theme.colors.text}
          onPress={() => setModal(false)}
        />
      </View>
      <View style={styles.optContainer}>
        <TouchableOpacity
          style={[styles.button, buttonTerms]}
          onPress={() => setSelectedOption('Términos y condiciones')}>
          <Text style={[styles.text, textTerms]}>Términos y condiciones</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, buttonsPolicy]}
          onPress={() => setSelectedOption('Política de datos')}>
          <Text style={[styles.text, textPolicy]}>Política de datos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.2,
    height: Dimensions.get('window').height / 5,
    justifyContent: 'center',
    // marginTop: 20,
  },
  exitIcon: {
    margin: 20,
  },
  optContainer: {
    width: Dimensions.get('window').width / 1.2,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    width: Dimensions.get('window').width / 2.4,
    height: 40,
    justifyContent: 'center',
    borderRadius: 20,
  },
  text: {
    fontFamily: 'System',
    fontSize: Dimensions.get('window').width >= 375 ? 16 : 14,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

export default PoliciesModalSelector;
