import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  ImageBackground,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {updateProfile} from '../../redux/actions/profileAction';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

//PARTS
import LectureHeader from './lectureHeader/lectureHeader';
import LectureFooter from './LectureFooter/lectureFooter';
import LectureFooterProfile from './lectureFooterProfile/lectureFooterProfile';
import {refresh_TokenAPI} from '../../funcs/refresh_token';
import getErrorMsg from '../../errors/errors';

const Lecture = ({lecture, username, home}) => {
  const nav = useNavigation();

  const profile = useSelector(state => JSON.parse(state.profile.profile));

  const dispatch = useDispatch();
  //INLINE STYLES
  const cardDimensions = {
    width: home
      ? Dimensions.get('window').width
      : Dimensions.get('window').width / 2.2,
    height: home
      ? Dimensions.get('window').height / 1.5
      : Dimensions.get('window').height / 3.5,
  };

  const subCardDimensions = {
    width: home
      ? Dimensions.get('window').width
      : Dimensions.get('window').width / 2.2,
    height: home
      ? Dimensions.get('window').height / 1.5
      : Dimensions.get('window').height / 3.5,
    borderRadius: home ? 0 : 10,
  };
  const cardText = {
    fontSize: home ? 40 : 15,
    width: cardDimensions.width / 1.5,
    color: 'white',
  };

  ///DATA HOOKS
  const [error, setError] = useState('');
  const [icon, setIcon] = React.useState(
    profile.likes.includes(lecture._id) ? 'heart' : 'heart-outline',
  );
  const [mg, setMg] = React.useState(lecture.likes);

  const axiosApiInstance = Axios.create();
  const giveLike = async refreshItems => {
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

    console.log(profile);
    console.log(lecture);

    //@TODO: PASSING BACK THE WHOLE LECTURE ARRAY IN ORDER TO GET IT UPDATED (WE HAVE TO PASS ALL THESE INFORMATION THORW REDUX
    // IN ORDER TO GET IT GLOBALLY)
    try {
      let requestBody = {
        operationName: 'GiveLike',
        query: `mutation GiveLike {
            giveLike(likerUsername:"${profile.username}",
             , postID:"${lecture._id}", give: ${!profile.likes.includes(
          lecture._id,
        )})
        }`,
      };

      console.log(requestBody);

      try {
        return await axiosApiInstance
          .post(
            'http://192.168.1.38:3000/graphql',
            JSON.stringify(requestBody),
            {
              headers: {
                Authorization: 'Bearer ' + creds.token + ' ' + username,
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
            if (resData.giveLike === 'Success') {
              if (icon === 'heart') {
                //UPDATING LECTURE
                lecture.likes -= 1;
                //UPDATING PROFILE
                profile.likes = profile.likes.filter(like => {
                  return like !== lecture._id;
                });
                //UPDATING UI
                setMg(mg - 1 > 0 ? mg - 1 : 0);
                //KEEPING PROFILE
                dispatch(updateProfile(profile));
              } else {
                lecture.likes += 1;

                //UPDATING PROFILE
                profile.likes.push(lecture._id);
                //UPDATING UI
                setMg(mg + 1);
                //KEEPING PROFILE
                dispatch(updateProfile(profile));
              }
              setIcon(icon === 'heart' ? 'heart-outline' : 'heart');
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
  return (
    <TouchableOpacity
      onPress={() =>
        nav.navigate('Reader', {lecture: lecture, username: username})
      }>
      <ImageBackground
        source={{uri: lecture.imageInfo.bck}}
        style={[
          styles.container,
          {cardDimensions},
          home ? {} : styles.containerProfile,
        ]}
        imageStyle={{borderRadius: home ? 0 : 10}}>
        <View
          style={[
            styles.subContainer,
            subCardDimensions,
            {backgroundColor: 'rgba(0,0,0,0.2)'},
          ]}>
          <LectureHeader lecture={lecture} />
          <View style={{flex: 0.4, justifyContent: 'center'}}>
            <Text style={[styles.text, cardText]}>{lecture.title}</Text>
          </View>
          {home ? (
            <LectureFooter
              lecture={lecture}
              icon={icon}
              home={home}
              mg={mg}
              profile={profile}
              giveLike={giveLike}
              nav={nav}
            />
          ) : (
            <LectureFooterProfile
              lecture={lecture}
              width={cardDimensions.width}
              icon={icon}
              home={home}
              mg={mg}
              profile={profile}
              giveLike={giveLike}
            />
          )}
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  containerProfile: {
    marginHorizontal: 7,
    borderRadius: 11,
    marginVertical: 10,
  },
  subContainer: {
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: 'courier',
    fontWeight: '400',
    alignSelf: 'center',
    textAlign: 'center',
  },
});

export default React.memo(Lecture);
