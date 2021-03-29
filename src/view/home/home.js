import {useTheme} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View, StyleSheet, Dimensions, Animated, FlatList} from 'react-native';

//REDUX
import {useSelector} from 'react-redux';

//PARTS
import HomeHeader from './homeHeader/homeHeader';
import HomeScroll from './homeScroll/homeScroll';
import HomeSegmentControl from './homeSegmentControl/homeSegmentControl';
import Searcher from './search/searcher';
import {ScrollView} from 'react-native-gesture-handler';

const Home = () => {
  const theme = useTheme();
  const [modal, setModal] = React.useState(false);
  const selector = useSelector(state => state);
  const profile = JSON.parse(selector.profile.profile);

  //SELECTED SEGMENT HANDLER
  const [selectedOption, setSelectedOption] = React.useState('Para ti');
  const [xPos, _] = React.useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(xPos, {
      toValue:
        selectedOption === 'Para ti' ? 0 : -Dimensions.get('window').width,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [selectedOption, xPos]);
  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <HomeHeader setModal={setModal} />
      <HomeSegmentControl
        setSelectedOption={setSelectedOption}
        selectedOption={selectedOption}
      />
      <Animated.View
        style={[styles.rowContainer, {transform: [{translateX: xPos}]}]}>
        <HomeScroll setModal={setModal} flag={'global'} profile={profile} />
        <HomeScroll setModal={setModal} flag={'followers'} profile={profile} />
      </Animated.View>
      <Searcher modal={modal} setModal={setModal} profile={profile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  duplicatedView: {
    flex: 1,
    width: Dimensions.get('window').width * 2,
    flexDirection: 'row',
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default Home;
