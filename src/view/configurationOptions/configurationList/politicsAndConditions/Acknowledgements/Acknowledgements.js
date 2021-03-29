/**
 * @file. Acknowlegmements.js
 *
 * @description It displays all the acknowlegments.
 */
import React, {useEffect} from 'react';
import {View, StyleSheet, Dimensions, Image} from 'react-native';
import useColorScheme from 'react-native/Libraries/Utilities/useColorScheme';
// import {logScreenView} from '../../../../../analytics/analytics';

//STATIC DATA
import {ACKNOWLEGDEMENTS} from '../../../../../constants/constants';

//PARTS
import AcknowledgementsHeader from './AcknowledgementsHeader/AcknowledgementsHeader';

const Acknowledgements = (props) => {
  const acknowledgmentslist = ACKNOWLEGDEMENTS;
  const scheme = useColorScheme();

  useEffect(() => {
    // logScreenView('acknowledgements');
  }, []);

  return (
    <View style={styles.container}>
      <AcknowledgementsHeader />
      <View style={{flex: 0.9, justifyContent: 'space-evenly'}}>
        {acknowledgmentslist.map((ack) => {
          return (
            <View style={styles.item}>
              {ack === 'unsplash' ? (
                <Image
                  source={
                    scheme === 'dark'
                      ? require('../../../../../assets/agradecimientos/unsplash_black.png')
                      : require('../../../../../assets/agradecimientos/unsplash_white.jpeg')
                  }
                  style={styles.img}
                />
              ) : ack === 'pexels' ? (
                <Image
                  source={
                    scheme === 'dark'
                      ? require('../../../../../assets/agradecimientos/pexels.png')
                      : require('../../../../../assets/agradecimientos/pexels_black.png')
                  }
                  style={styles.img}
                />
              ) : (
                <Image source={ack} style={styles.img} />
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: Dimensions.get('window').width / 1.4,
    height: Dimensions.get('window').height / 8.5,
    alignSelf: 'center',
    marginVertical: 20,
  },
  img: {
    width: Dimensions.get('window').width / 1.1,
    height: Dimensions.get('window').height / 8.5,
    alignSelf: 'center',
  },
});

export default Acknowledgements;
