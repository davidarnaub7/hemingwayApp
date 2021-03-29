import {useTheme} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, Dimensions, TextInput} from 'react-native';

const FollowersViewerSearchBar = props => {
  const theme = useTheme();

  return (
    <View sytle={styles.container}>
      <View
        style={[styles.inputContainer, {backgroundColor: theme.colors.card}]}>
        <TextInput
          style={[styles.input, {color: theme.colors.text}]}
          placeholder={'Buscar'}
          placeholderTextColor={theme.colors.notification}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.1,
  },
  inputContainer: {
    width: Dimensions.get('window').width / 1.05,
    height: Dimensions.get('window').height / 18,
    borderRadius: 10,
    alignSelf: 'center',
  },
  input: {
    width: Dimensions.get('window').width / 1.4,
    height: Dimensions.get('window').height / 18,
    marginLeft: 10,
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default FollowersViewerSearchBar;
