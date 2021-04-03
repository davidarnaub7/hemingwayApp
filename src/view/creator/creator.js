import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';

import CreatorHeader from './creatorHeader/creatorHeader';
import CreatorStudio from './creatorStudio/creatorStudio';

const Creator = () => {
  const theme = useTheme();
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const nav = useNavigation();

  const navigateToLauncher = () => {
    let ind = 0;
    let auxText = '';
    const content = [];

    text.split(' ').forEach(txt => {
      if (ind !== 60) {
        auxText += txt + ' ';
        ind++;
      } else {
        content.push(auxText);
        auxText = txt + ' ';
        ind = 0;
      }
    });

    content.push(auxText);

    nav.navigate('CreatorLauncher', {
      lecture: {
        content,
        title,
      },
    });
  };
  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <CreatorHeader
        title={title}
        setTitle={setTitle}
        navigateToLauncher={navigateToLauncher}
      />
      <CreatorStudio text={text} setText={setText} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#d0d0d0',
    justifyContent: 'center',
    position: 'absolute',
    top: Dimensions.get('window').height / 2,
    left: Dimensions.get('window').width / 1.2,
    bottom: 0,
    right: 0,
    zIndex: 100000000,
  },
});

export default Creator;
