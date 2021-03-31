import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions, Animated} from 'react-native';

//REDUX
import {useSelector} from 'react-redux';

//PARTS
import FollowersViewerHeader from './followersViewerHeader/followersViewerHeader';
import FollowersViewerSelector from './followersViewerSelector/followersViewerSelector.js';
import FollowersViewerList from './followersViewerList/followersViewerList.js';
import FollowersViewerSearchBar from './followersViewerSearchBar/followersViewerSeacherBar';

const FollowersViewer = props => {
  //INDEX
  const opt = props.route.params.opt;
  //SELECTED SEGMENT HANDLER
  const [selectedOption, setSelectedOption] = React.useState(opt);

  //PROFILE
  const profile = useSelector(state => JSON.parse(state.profile.profile));

  //AUX FUNCS
  const setSelectedOptionHandler = option => {
    setLookForMore(true);
    setSelectedOption(option);
  };

  return (
    <View style={styles.container}>
      <FollowersViewerHeader username={profile.username} />
      <FollowersViewerSelector
        setSelectedOption={setSelectedOptionHandler}
        selectedOption={selectedOption}
      />
      <FollowersViewerSearchBar />
      <Animated.View
        style={[styles.paneContainer]}>
        <FollowersViewerList users={followers} />
        <FollowersViewerList users={followings} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  paneContainer: {
    flex: 1,
    width: Dimensions.get('window').width * 2,
    flexDirection: 'row',
  },
});

export default FollowersViewer;
