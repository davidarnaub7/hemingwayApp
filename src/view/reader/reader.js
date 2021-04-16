import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Dimensions, Text} from 'react-native';

import ReaderHeader from './readerHeader/readerHeader';
import ReaderViewer from './readerViewer/readerViewer';

//REDUX
import {useDispatch, useSelector} from 'react-redux';

//THIRD PARTY
import Axios from 'axios';
import ActionSheet from 'react-native-actionsheet';
import AsyncStorage from '@react-native-community/async-storage';
//AUXILARY FUNCS
import {refresh_TokenAPI} from '../../funcs/refresh_token';

//PARTS
import InfoPane from './infoPane/infoPane';
import Title from '../components/title/title';
import {removePost} from '../../redux/actions/postAction';
import getErrorMsg from '../../errors/errors';
// import Sharer from '../Sharer/sharer';

const Reader = props => {
  //AUX PARAMS
  const lecture = props.route.params.lecture;

  //GLOBALS PARAMS
  const nav = useNavigation();

  //STATES
  const [sharer, setSharer] = useState(false);
  const [index, setIndex] = useState(0);
  const [error, setError] = useState('');

  //REF for actionSheet
  const actionSheet = React.useRef();

  //REDUX
  const profile = useSelector(state => JSON.parse(state.profile.profile));

  const dispatch = useDispatch();

  const axiosApiInstance = Axios.create();

  const removePostHandler = async index => {
    const creds = JSON.parse(await AsyncStorage.getItem('creds'));

    //AXIOS INTERCEPTOR LOCALLY IN ORDER TO DISPATCH NEW CREDS
    axiosApiInstance.interceptors.response.use(async response => {
      if (response.data.errors) {
        if (response.data.errors[0].message === 'Next time machine') {
          const newcreds = await refresh_TokenAPI(
            profile._id,
            profile.username,
          );
          await AsyncStorage.setItem('creds', JSON.stringify(newcreds));
          const originalRequest = response.config;
          originalRequest.headers.Authorization =
            'Bearer ' + newcreds.token + ' ' + profile.username;

          return axiosApiInstance.request(originalRequest);
        }
      }
      return response;
    });

    try {
      let requestBody = {
        operationName: 'RemovePost',
        query: `  mutation RemovePost{
            removePost(username:"${profile.username}", postID:"${lecture._id}")
        }`,
      };

      console.log(requestBody);

      try {
        return await axiosApiInstance
          .post(
            'http://192.168.1.37:3000/graphql',
            JSON.stringify(requestBody),
            {
              headers: {
                Authorization: 'Bearer ' + creds.token + ' ' + profile.username,
                'Content-Type': 'application/json',
              },
            },
          )
          .then(res => {
            if (res.status !== 200 && res.status !== 201) {
              throw new Error('Failed!');
            }

            if (res.data.errors) {
              throw new Error(res.data.errors[0].message);
            }

            return res.data.data;
          })
          .then(resData => {
            if (resData.removePost === 'Success') {
              dispatch(removePost(lecture._id));
              nav.goBack();
            }
          })
          .catch(err => {
            throw err;
          });
      } catch (err) {
        throw err;
      }
    } catch (err) {
      setError(getErrorMsg(err.toString().split(':')[1].trim()));
    }
  };
  // It is necesary cause react-native-view-shoot takes the screen an avoid modal. So Sharer must be a normal View.
  return (
    <View style={[styles.container, {backgroundColor: '#010101'}]}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        snapToInterval={Dimensions.get('window').width}
        scrollEventThrottle={16}
        onScroll={({nativeEvent}) => {
          //Floor and ceil depending on what index we are in order to a faster icon colo repaint.
          setIndex(
            Math.round(
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
        img={lecture.img}
        removePost={removePost}
      />
      {/* Modal use it in case the post is done by himself */}
      <ActionSheet
        ref={actionSheet}
        options={['Eliminar', 'Cancelar']}
        cancelButtonIndex={2}
        destructiveButtonIndex={1}
        onPress={indx => {
          if (indx === 0) {
            removePostHandler();
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
