import {useTheme} from '@react-navigation/native';
import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Keyboard,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';

const ReaderViewer = ({page}) => {
  const theme = useTheme();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={[styles.container, {backgroundColor: theme.colors.background}]}>
        <View style={{width: Dimensions.get('window').width}}>
          <Text style={[styles.text, {color: theme.colors.text}]}>{page}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.7,
    backgroundColor: 'white',
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

export default ReaderViewer;
