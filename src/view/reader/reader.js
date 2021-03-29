import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Dimensions, Text} from 'react-native';

import ReaderHeader from './readerHeader/readerHeader';
import ReaderViewer from './readerViewer/readerViewer';

//REDUX
import {useDispatch, useSelector} from 'react-redux';
import {DeletePost} from '../../redux/actions/profileAction';

import ActionSheet from 'react-native-actionsheet';

import InfoPane from './infoPane/infoPane';
import Title from '../components/title/title';
// import Sharer from '../Sharer/sharer';

const Reader = props => {
  //AUX PARAMS
  const lecture = props.route.params.lecture;

  console.log(lecture);

  //GLOBALS PARAMS
  const theme = useTheme();
  const nav = useNavigation();
  //STATES
  const [sharer, setSharer] = useState(false);
  const [index, setIndex] = useState(0);
  //REF for actionSheet
  const actionSheet = React.useRef();
  //REDUX
  const dispatch = useDispatch();
  const profile = useSelector(state => JSON.parse(state.profile.profile));

  // It is necesary cause react-native-view-shoot takes the screen an avoid modal. So Sharer must be a normal View.
  return (
    <View
      style={[styles.container, {backgroundColor: '#010101'}]}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        snapToInterval={Dimensions.get('window').width}
        scrollEventThrottle={16}
        onScroll={({nativeEvent}) => {
          //Floor and ceil depending on what index we are in order to a faster icon colo repaint.
          setIndex(
            Math.floor(
              nativeEvent.contentOffset.x / Dimensions.get('window').width,
            ),
          );
        }}
        decelerationRate={0}
        pagingEnabled={true}>
        <Title lecture={lecture} />
        {lecture.content.map(page => {
          //Each page.
          return <ReaderViewer page={page} />;
        })}
        <View style={{height: 150}} />
        {/* </ScrollView> */}
      </ScrollView>

      {/* Sticky components to avoid colisions with the main panes */}
      <ReaderHeader tittle={lecture.title} lecture={lecture} index={index} />
      {/* Footer one */}
      <InfoPane
        lecture={lecture}
        profile={profile}
        setModal={setSharer}
        actionSheet={actionSheet}
        index={index}
        img={lecture.img}
      />
      {/* Modal use it in case the post is done by himself */}
      <ActionSheet
        ref={actionSheet}
        options={['Eliminar', 'Cancelar']}
        cancelButtonIndex={2}
        destructiveButtonIndex={1}
        onPress={indx => {
          if (indx === 0) {
            dispatch(DeletePost(lecture, profile));
            nav.goBack();
          }
        }}
      />
    </View>
  );
  // );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Reader;
