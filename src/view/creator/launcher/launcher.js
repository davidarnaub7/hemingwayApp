import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Dimensions} from 'react-native';

import LauncherHeader from './launcherHeader/launcherHeader';
import ReaderViewer from './launcherViewer/launcherViewer';

import InfoPane from './infoPane/infoPane';
import LauncherTitle from './launcherTitle/launcherTitle';
// import Sharer from '../../Sharer/sharer';
import Pexels from './modal/pexel/pexels';

const Launcher = props => {
  const theme = useTheme();
  const lecture = props.route.params.lecture;

  //UI HOOKS
  const [sharer, setSharer] = useState(false);
  const [index, setIndex] = useState(0);
  const [modal, setModal] = useState(false);
  const [pexels, setPexels] = useState({
    img: '',
    author: '',
    url: '',
  });

  console.log(lecture);
  return (
    <View style={[styles.container]}>
      <LauncherHeader lecture={lecture} index={index} />
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        snapToInterval={Dimensions.get('window').width}
        onScroll={({nativeEvent}) => {
          setIndex(
            Math.round(
              nativeEvent.contentOffset.x / Dimensions.get('window').width,
            ),
          );
        }}
        decelerationRate={0}
        pagingEnabled={true}>
        <LauncherTitle lecture={lecture} selectedImg={pexels.bck} />
        {lecture.content.map(page => {
          return <ReaderViewer page={page} />;
        })}
      </ScrollView>
      <InfoPane
        index={index}
        lecture={lecture}
        setModal={setModal}
        modal={modal}
        pexels={pexels}
      />
      {/* {sharer ? (
        <Sharer
          lecture={lecture}
          visible={sharer}
          setModal={setSharer}
          index={index}
        />
      ) : (
        <></>
      )} */}
      <Pexels
        lecture={lecture}
        modal={modal}
        setModal={setModal}
        setPexels={setPexels}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#010101',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
});

export default Launcher;
