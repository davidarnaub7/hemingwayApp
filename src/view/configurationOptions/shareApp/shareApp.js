import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';

import Share from 'react-native-share'; // THIRD-PARTY-LIBRARY
import {IMAGE_3} from '../../../assets/base64/images.js'; // IMAGE BSE64 ENCODED

const InviteFriends = ({theme}) => {
  const share = async (platform) => {
    const getPlatformInput = () => {
      switch (platform) {
        case 'Twitter':
          return {
            message: '!Únete a Beyu! \n @beyou_es\n',
            url: 'https://beyouio.com',
            social: Share.Social.TWITTER,
          };
        case 'Whatsapp':
          return {
            message: '!Únete a Beyu! \n @beyou_es\n',
            url: 'https://beyouio.com',
            social: Share.Social.WHATSAPP,
          };
        case 'Instagram':
          return {
            method: Share.InstagramStories.SHARE_BACKGROUND_IMAGE,
            title: 'HOLA',
            backgroundImage: IMAGE_3,
            social: Share.Social.INSTAGRAM_STORIES,
          };
        default:
          break;
      }
    };

    Share.shareSingle(getPlatformInput()).catch((err) => {
      err && console.log(err);
    });
  };
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.labelContainer,
          {
            borderBottomColor: theme.colors.border,
          },
        ]}>
        <Text style={[styles.label, {color: theme.colors.text}]}>
          Comparte con tus amigos
        </Text>
      </View>
      <View style={styles.joiner}>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={[styles.touchable]}
            onPress={() => share('Instagram')}>
            <Image
              source={require('../../../assets/socialNetworkLogos/instagram.png')}
              style={styles.imageIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.touchable]}
            onPress={() => share('Twitter')}>
            <Image
              source={require('../../../assets/socialNetworkLogos/twitter.png')}
              style={styles.imageIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.touchable]}
            onPress={() => share('Whatsapp')}>
            <Image
              source={require('../../../assets/socialNetworkLogos/whatsapp.png')}
              style={styles.imageIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    flex: 0.135,
    marginVertical: 10,
  },
  joiner: {
    flex: 1,
    justifyContent: 'space-around',
  },
  //LABEL
  labelContainer: {
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
  },
  label: {
    marginBottom: 10,
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 20,
    opacity: 0.8,
  },
  text: {
    fontFamily: 'System',
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    alignSelf: 'center',
  },
  buttons: {
    width: Dimensions.get('window').width / 1.8,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginVertical: 5,
    marginTop: 20,
  },
  touchable: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
  },
  imageIcon: {
    width: 25,
    height: 25,
    alignSelf: 'center',
    opacity: 1,
  },
});

export default InviteFriends;
