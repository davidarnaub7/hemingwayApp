import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {COLORS} from '../../../../../constants/constants';

const Slide = ({slide, intializeApp}) => {
  const inlineText = {
    color: 'white',
    fontFamily: 'System',
    marginVertical: 10,
  };
  return slide.sublabel === undefined ? (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Image source={slide.img} style={styles.beyu} />
        <TouchableOpacity style={styles.button} onPress={intializeApp}>
            <Text style={[styles.text,inlineText]}>Empieza ahora</Text>
        </TouchableOpacity>
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        {slide.title && (
          <Text style={[styles.title, inlineText]}>{slide.title}</Text>
        )}
        {slide.label && (
          <Text style={[styles.label, inlineText]}>{slide.label}</Text>
        )}
        <Text style={[styles.sublabel, inlineText]}>{slide.sublabel}</Text>
      </View>
      <View style={styles.imgContainer}>
        <Image source={slide.img} style={styles.img} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    justifyContent: 'space-around',
    backgroundColor: COLORS.primary,
  },
  subContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  button: {
    justifyContent: 'center',
  },
  text: {
    fontSize: 25,
    alignSelf: 'center',
    fontWeight: '400',
    left:5,
    textAlign:'center',

  },
  textContainer: {
    flex: 0.5,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 40,
    alignSelf: 'center',
  },
  label: {
    fontWeight: '600',
    fontSize: 30,
    alignSelf: 'center',
  },
  sublabel: {
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: '300',
    width: Dimensions.get('window').width / 1.2,
  },
  imgContainer: {
    alignItems: 'center',
    flex: 0.5,
  },
  imgContainerWholeScreen: {
    alignItems: 'center',
    flex: 0.5,
  },
  img: {
    width: Dimensions.get('window').width / 1.3,
    height: Dimensions.get('window').height / 2.5,
    alignSelf: 'center',
    resizeMode:"contain",
  },
  beyu: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2,
  },
});

export default Slide;
