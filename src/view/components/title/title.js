import {useTheme} from '@react-navigation/native';
import React from 'react';
import {
  ImageBackground,
  Text,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';

const Title = ({lecture}) => {
  return (
    <ImageBackground
      source={{uri: lecture.imageInfo.bck}}
      style={styles.container}>
      <View style={styles.shadower}>
        <Text style={styles.tittle}>{lecture.title}</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
  },
  shadower: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tittle: {
    fontFamily: 'System',
    fontSize: 40,
    fontWeight: '600',
    alignSelf: 'center',
    color: 'white',
    textAlign: 'center',
    width: Dimensions.get('window').width / 1.1,
  },
  name: {
    fontFamily: 'System',
    fontSize: 20,
    opacity: 0.8,
    fontWeight: '600',
    alignSelf: 'center',
    color: 'white',
    marginTop: 20,
  },
});

export default Title;
