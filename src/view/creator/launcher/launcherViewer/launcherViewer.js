import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Keyboard,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';

const LauncherViewer = ({page}) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={[styles.container]}>
        <View style={{width: Dimensions.get('window').width}}>
          <Text style={[styles.text]}>{page}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.7,
    backgroundColor: '#010101',
    alignSelf: 'center',
  },
  text: {
    marginTop: 20,
    marginHorizontal: 10,
    fontFamily: 'courier',
    fontSize: 16,
    fontWeight: '400',
    alignSelf: 'center',
    lineHeight: 35,
    width: Dimensions.get('window').width / 1.1,
    color: 'white',
  },
});

export default LauncherViewer;
