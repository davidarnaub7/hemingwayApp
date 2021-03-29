import {useTheme} from '@react-navigation/native';
import React from 'react';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';

const EditProfilePhotoChooser = ({setModal, img}) => {
  const theme = useTheme();

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={styles.item}>
        <TouchableOpacity onPress={() => setModal('photo')}>
          <ImageBackground
            source={
              img === ''
                ? require('../../../../../assets/flatIcons/user.png')
                : {uri: img}
            }
            style={styles.img}
            imageStyle={styles.imageStyles}
          />
        </TouchableOpacity>
        <Text style={[styles.text, {color: theme.colors.text}]}>
          Foto de Perfil
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 0.3,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  item: {
    width:
      Dimensions.get('window').width / (Dimensions.get('window').width / 150),
    height:
      Dimensions.get('window').height / (Dimensions.get('window').height / 150),
    justifyContent: 'space-between',
  },
  img: {
    width:
      Dimensions.get('window').width / (Dimensions.get('window').width / 120),
    height:
      Dimensions.get('window').height / (Dimensions.get('window').height / 120),
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  imageStyles: {
    borderRadius: 60,
  },
  text: {
    fontFamily: 'System',
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: '500',
  },
});

export default EditProfilePhotoChooser;
