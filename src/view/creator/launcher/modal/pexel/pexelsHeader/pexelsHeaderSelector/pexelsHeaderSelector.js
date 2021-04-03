import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';

const PexelsHeaderSelector = ({setSelectedTheme, selectedTheme, options}) => {
  
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {options.map((opt) => {
          return (
            <TouchableOpacity
              style={[
                styles.button,
                opt === selectedTheme ? {backgroundColor: 'white'} : {},
              ]}
              onPress={() => setSelectedTheme(opt)}>
              <Text
                style={[
                  styles.text,
                  opt === selectedTheme ? {color: 'black'} : {},
                ]}>
                {opt}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 0.5,
  },
  button: {
    width: Dimensions.get('window').width / 6,
    height: Dimensions.get('window').height / 23,
    borderRadius: 15,
    marginHorizontal: 10,
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    alignSelf: 'center',
  },
});

export default PexelsHeaderSelector;
