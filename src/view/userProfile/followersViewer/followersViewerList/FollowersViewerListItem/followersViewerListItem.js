import React, {useState, useEffect} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  View,
} from 'react-native';


//STYLE
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme, useNavigation} from '@react-navigation/native';

const FollowersViewerListItem = ({user}) => {
  const [img, setImg] = useState('');
  const theme = useTheme();
  const nav = useNavigation();

  return (
    <TouchableOpacity
      style={[styles.container, {borderBottomColor: theme.colors.notification}]}
      onPress={() => {
        nav.navigate('UserProfile', {profile: user, img});
      }}>
      <View style={styles.joiner}>
        <View style={styles.rounder}>
          <Ionicons
            name={'person'}
            size={15}
            style={{alignSelf: 'center', position: 'absolute'}}
            color={'white'}
          />
          <Image style={styles.img} source={{uri: img}} />
        </View>

        <Text style={[styles.username, {color: theme.colors.text}]}>
          {user.username}
        </Text>
      </View>
      <Text style={[styles.pub, {color: theme.colors.text}]}>
        {user.post.items.length +
          (user.post.items.length === 1 ? ' publicación' : ' publicaciones')}
      </Text>
    </TouchableOpacity>
  );
};

const WIDTH = Dimensions.get('window').width / 1.05;
const HEIGHT = Dimensions.get('window').height / 12;

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    borderBottomWidth: 0.3,
  },
  rounder: {
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: 30,
    borderColor: 'white',
    borderWidth: 1,
    alignSelf:'center',
    marginLeft: 10,
  },
  joiner: {
    flexDirection: 'row',
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginLeft: 5,
    marginRight: 10,
    alignSelf: 'center',
  },
  username: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: '600',
    alignSelf: 'center',
    marginLeft: 10,
  },
  pub: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: '600',
    opacity: 0.6,
    alignSelf: 'center',
  },
});

export default FollowersViewerListItem;
