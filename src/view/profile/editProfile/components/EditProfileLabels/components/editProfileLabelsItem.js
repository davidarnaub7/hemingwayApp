import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation, useTheme} from '@react-navigation/native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height / 17;

const EditProfileLabelsItem = ({info}) => {
  const navigation = useNavigation();
  const theme = useTheme();

  return (
    <View style={[styles.container, {borderColor: theme.colors.card}]}>
      <Text style={[styles.label, {color: theme.colors.text}]}>
        {info.label}
      </Text>
      <TouchableOpacity
        style={styles.userInfo}
        onPress={() => {
          navigation.navigate('EditProfileInputResolver', {
            label: info.label,
          });
        }}>
        <Text
          style={[
            styles.info,
            {
              fontSize: info.info.split(' ')[0].length > 15 ? 12 : 14,
              color: theme.colors.text,
            },
          ]}>
          {info.info}
        </Text>
        <Ionicons
          name={'ios-chevron-forward'}
          size={20}
          color={'gray'}
          style={{alignSelf: 'center'}}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  //LABEL
  labelContainer: {
    width: WIDTH / 2.5,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  label: {
    fontFamily: 'System',
    fontWeight: '500',
    fontSize: 15,
    marginLeft: 20,
    alignSelf: 'center',
  },
  //INFO
  userInfo: {
    width: WIDTH / 2.5,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginRight: 10,
  },
  info: {
    fontFamily: 'System',
    fontWeight: '400',
    width: WIDTH / 2.8,
    marginRight: 5,
    opacity: 0.6,
    alignSelf: 'center',
  },
});

export default EditProfileLabelsItem;
