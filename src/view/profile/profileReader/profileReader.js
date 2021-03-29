import {StackActions, useNavigation, useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Dimensions,
} from 'react-native';

//REDUx
import {useDispatch} from 'react-redux';

//MODULES
import ActionSheet from 'react-native-actionsheet';

import ReaderHeader from './readerHeader/readerHeader';
import ReaderViewer from '.readerViewer/readerViewer';

import InfoPane from './infoPane/infoPane';
// import Tittle from '../../Home/HomeScroll/Tittle/tittle';
// import Sharer from '../../Sharer/sharer';

const ProfileReader = props => {
  const lecture = props.route.params.lecture;
  const profile = props.route.params.username;
  const theme = useTheme();
  const nav = useNavigation();

  const [sharer, setSharer] = useState(false);
  const [index, setIndex] = useState(0);

  const actionSheet = React.useRef();

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
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
        {/* <Tittle lecture={lecture} /> */}
        {lecture.pages.map(page => {
          return <ReaderViewer page={page} />;
        })}
      </ScrollView>
      <ReaderHeader tittle={lecture.tittle} lecture={lecture} index={index} />
      <InfoPane
        profile={profile}
        lecture={lecture}
        setModal={setSharer}
        index={index}
        actionSheet={actionSheet}
      />
      {/* {sharer ? (
        // <Sharer
        //   lecture={lecture}
        //   visible={sharer}
        //   setModal={setSharer}
        //   index={index}
        // />
      ) : (
        <></>
      )} */}

      <ActionSheet
        ref={actionSheet}
        options={['Eliminar', 'Cancelar']}
        cancelButtonIndex={2}
        destructiveButtonIndex={1}
        onPress={indx => {
          if (indx === 0) {
            // dispatch(DeletePost(lecture, profile));
            nav.dispatch(StackActions.popToTop());
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProfileReader;
