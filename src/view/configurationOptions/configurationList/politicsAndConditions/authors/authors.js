import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';
// import {logScreenView} from '../../../../../analytics/analytics';

import {AUTHORS_DATA} from '../../../../../constants/constants';

//PARTS
import Author from './author/author';

const Authors = () => {
  const nav = useNavigation();

  useEffect(() => {
    // logScreenView('authors');
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => nav.goBack()}>
        <Entypo
          name={'chevron-left'}
          size={35}
          color={'white'}
          style={styles.icon}
        />
        <Text style={styles.text}>Atrás</Text>
      </TouchableOpacity>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        snapToInterval={Dimensions.get('window').width}
        decelerationRate={0}>
        {AUTHORS_DATA.map((author) => {
          return <Author author={author} />;
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    position: 'absolute',
    top: Dimensions.get('window').height / 12,
    width: Dimensions.get('window').width / 4,
    height: Dimensions.get('window').height / 25,
    left: Dimensions.get('window').width / 25,
    right: 0,
    bottom: 0,
    zIndex: 10000,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    alignSelf: 'center',
  },
  text: {
    alignSelf: 'center',
    fontFamily: 'System',
    fontWeight: '600',
    fontSize: 20,
    color: 'white',
  },
});

export default Authors;
