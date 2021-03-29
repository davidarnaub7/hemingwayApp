import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  Dimensions,
  Linking,
  TouchableOpacity,
  Image,
} from 'react-native';

const Author = ({author}) => {
  return (
    <ImageBackground source={author.source} style={styles.container}>
      <View style={[styles.container, {backgroundColor: 'rgba(0,0,0,0.2)'}]}>
        <View style={styles.authorInfo}>
          <TouchableOpacity
            onPress={() => Linking.openURL(author.url)}
            style={styles.button}>
            {author.web === 'pexels' ? (
              <Image
                source={require('../../../../../../assets/agradecimientos/pexelsLogo.png')}
                style={styles.img}
              />
            ) : (
              <Image
                source={require('../../../../../../assets/agradecimientos/unsplash.png')}
                style={styles.img}
              />
            )}
            <Text style={styles.authorName}>{author.name}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    justifyContent: 'flex-end',
  },
  authorInfo: {
    paddingVertical: 50,
    alignItems: 'flex-end',
    paddingHorizontal: 10,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  img: {
    width: 30,
    height: 30,
    borderRadius: 20,
    alignSelf: 'center',
    marginRight: 10,
  },
  authorName: {
    fontFamily: 'System',
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    alignSelf: 'center',
  },
});

export default Author;
