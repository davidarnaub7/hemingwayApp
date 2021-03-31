import {useTheme} from '@react-navigation/native';
import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';

const FollowersViewerSelector = ({setSelectedOption, selectedOption}) => {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          style={[
            styles.button,
            {
              borderColor:
                selectedOption === 'Seguidores'
                  ? theme.colors.text
                  : theme.colors.notification,
              borderBottomWidth: 0.5,
            },
          ]}
          onPress={() => setSelectedOption('Seguidores')}>
          <Text
            style={[
              styles.text,
              {color: theme.colors.text},
              selectedOption === 'Seguidores' ? {fontSize: 16} : {opacity: 0.6},
            ]}>
            Seguidores
          </Text>
        </TouchableOpacity>
        <View style={styles.sticky} />
        <TouchableOpacity
          style={[
            styles.button,
            
            {
              borderColor:
                selectedOption === 'Siguiendo'
                  ? theme.colors.text
                  : theme.colors.notification,
              borderBottomWidth: 0.5,
            },
          ]}
          onPress={() => setSelectedOption('Siguiendo')}>
          <Text
            style={[
              styles.text,
              {color: theme.colors.text},
              selectedOption === 'Siguiendo' ? {fontSize: 16} : {opacity: 0.6},
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
    height: Dimensions.get('window').height / 10,
    justifyContent: 'center',
    zIndex: 10000,
    borderRadius: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  button: {
    alignSelf: 'center',
    width: Dimensions.get('window').width / 2,
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'System',
    fontWeight: '600',
    fontSize: 16,
    color: 'white',
    alignSelf: 'center',
    marginBottom: 10,
  },
  sticky: {
    borderWidth: 0.3,
    height: Dimensions.get('window').height / 40,
    borderColor: 'white',
    opacity: 0.6,
  },
});

export default FollowersViewerSelector;
