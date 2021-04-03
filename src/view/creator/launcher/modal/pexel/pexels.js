import {useTheme} from '@react-navigation/native';
import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  useColorScheme,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {createClient} from 'pexels';
import PexelsHeader from './pexelsHeader/pexelsHeader';

const Pexels = props => {
  const theme = useTheme();
  const options = [
    'Nature',
    'People',
    'Reading',
    'Space',
    'City',
    'City Night',
  ];
  const [photos, setPhotos] = React.useState([]);
  const [enter, setEnter] = React.useState(false);
  const [selectedTheme, setSelectedTheme] = React.useState(options[1]);

  const client = createClient(
    '563492ad6f9170000100000123263e87bd5e4079adf91aaa38b27e5b',
  );

  React.useEffect(() => {
    if (!enter) {
      client.photos.search({query: selectedTheme, per_page: 6}).then(phts => {
        setPhotosHandler(phts.photos);
        setEnter(true);
      });
    }
  }, [client.photos, enter, selectedTheme]);

  const setPhotosHandler = phts => {
    const newPhotos = [[]];
    let index = 0;
    phts.forEach(p => {
      if (index === 3) {
        newPhotos.push([p]);
        index = 1;
      } else {
        newPhotos[newPhotos.length - 1].push(p);
        index++;
      }
    });
    setPhotos(newPhotos);
  };
  const setSelectedThemeHandler = it => {
    setSelectedTheme(it);
    setEnter(false);
  };
  return (
    <Modal
      animated
      animationType="fadeInUp"
      transparent={true}
      useNativeDriver={true}
      onRequestClose={() => {
        props.setModal(undefined);
      }}
      visible={props.modal}>
      <View style={{flex: 1}}>
        <TouchableWithoutFeedback
          onPressIn={() => props.setModal(false)}
          onPressOut={() => props.setModal(true)}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
        <View
          style={[
            styles.container,
            {
              backgroundColor: 'rgba(0,0,0,0.3)',
              shadowColor:
                useColorScheme() === 'dark'
                  ? theme.colors.primary
                  : theme.colors.text,
            },
          ]}>
          <ScrollView stickyHeaderIndices={[0]}>
            <PexelsHeader
              setSelectedTheme={setSelectedThemeHandler}
              selectedTheme={selectedTheme}
              options={options}
            />
            {photos === undefined ? (
              <></>
            ) : (
              photos.map(phts => {
                return (
                  <View style={styles.row}>
                    {phts.map(pht => {
                      return (
                        <TouchableOpacity
                          onPress={() =>
                           { props.setPexels({
                              bck: pht.src.portrait,
                              author: pht.photographer,
                              url: pht.photographer_url,
                            });
                            console.log(pht.src.portrait);}
                          }>
                          <Image
                            source={{
                              uri: pht.src.original,
                            }}
                            style={{width: 100, height: 100, borderRadius: 10}}
                          />
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                );
              })
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  container: {
    flex: 0.65,
    // marginLeft: 7,
    borderRadius: 20,
    top: Dimensions.get('window').height / 2.7,
    justifyContent: 'flex-start',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.8,
    shadowRadius: 100,
  },
  row: {
    flex: 0.15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    // backgroundColor:'red',
    marginVertical: 10,
  },
  img: {
    width: Dimensions.get('window').width / 3.5,
    height: Dimensions.get('window').height / 8,
    borderRadius: 5,
  },
});

export default Pexels;
