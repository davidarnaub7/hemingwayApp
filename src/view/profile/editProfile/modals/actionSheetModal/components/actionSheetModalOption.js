import {useTheme} from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  View,
} from 'react-native';

const ActionSheetModalOption = ({
  showPexels,
  option,
  showImageLibrary,
  flag,
  removeMedia,
}) => {
  const theme = useTheme();
  return (
    <View style={[styles.container, {borderColor: theme.colors.border}]}>
      <TouchableOpacity
        onPress={() => {
          option === 'Pexels'
            ? showPexels()
            : option === 'Borrar foto'
            ? removeMedia(flag)
            : showImageLibrary(flag);
        }}>
        <Text style={[styles.text, {color: theme.colors.text}]}>{option}</Text>
      </TouchableOpacity>
    </View>
  );
};

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height / 12;
const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT,
    // borderBottomWidth: 0.3,
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'System',
    fontSize: 14,
    alignSelf: 'center',
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default ActionSheetModalOption;
