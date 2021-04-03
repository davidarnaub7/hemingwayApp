import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';

import PexelsHeaderSelector from './pexelsHeaderSelector/pexelsHeaderSelector';

const PexelsHeader = ({setSelectedTheme, selectedTheme, options}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pexels</Text>
      <PexelsHeaderSelector
        options={options}
        setSelectedTheme={setSelectedTheme}
        selectedTheme={selectedTheme}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 8,
    justifyContent: 'flex-start',
  },
  text: {
    fontFamily: 'System',
    fontSize: 18,
    marginVertical: 10,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
  },
});

export default PexelsHeader;
