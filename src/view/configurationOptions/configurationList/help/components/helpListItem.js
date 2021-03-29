/**
 * @file helpListItem.js
 *
 * @description Basiclly it displays an item with a title and the answer to the question.
 *
 */
import React, {useState} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';

//THEME
import {useTheme} from '@react-navigation/native';

const TouchableAnimated = Animated.createAnimatedComponent(TouchableOpacity);

const HelpListItem = ({item}) => {
  const theme = useTheme(); // THEME

  const [showInfo, setShowInfo] = useState(false); //HOOK THAT CONTROLS IF THE ANSWER MUST BE SHOWED OR NOT.

  //ANIMATED VALUES
  const [rotate, _] = useState(new Animated.Value(0));
  const [yPos, __] = useState(new Animated.Value(-10));

  React.useEffect(() => {
    //ANIMATION DEPENDING ON SHOWING INFO OR NOT.
    if (showInfo) {
      Animated.parallel([
        Animated.timing(rotate, {
          toValue: 90,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(yPos, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(rotate, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(yPos, {
          toValue: -10,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [rotate, showInfo, yPos]);

  return (
    <Animated.View>
      <TouchableAnimated
        style={styles.item}
        onPress={() => setShowInfo(!showInfo)}>
        <Text style={[styles.text, {color: theme.colors.text}]}>
          {item.item}
        </Text>
      </TouchableAnimated>
      {showInfo ? (
        <Animated.View
          style={[
            {
              backgroundColor: theme.colors.background,
              transform: [{translateY: yPos}],
            },
          ]}>
          <Text style={[styles.info, {color: theme.colors.text}]}>
            {item.info}
          </Text>
        </Animated.View>
      ) : (
        <></>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  item: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginLeft: 10,
  },
  text: {
    width: Dimensions.get('window').width / 1.3,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'System',
    alignSelf: 'center',
    marginLeft: 10,
    marginTop: 2,
  },
  chevron: {alignSelf: 'center', marginRight: 30, opacity: 0.6},
  info: {
    width: Dimensions.get('window').width / 1.1,
    fontSize: 14,
    fontWeight: '300',
    fontFamily: 'System',
    alignSelf: 'center',
  },
});

export default HelpListItem;
