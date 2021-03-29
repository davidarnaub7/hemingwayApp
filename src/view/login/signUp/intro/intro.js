import React from 'react';
import {View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {useDispatch} from 'react-redux';
import {Authenticate} from '../../../../redux/actions/authAction';

import Slide from './slide/slide'; //PARTS

const Intro = (props) => {
  const creds = props.route.params.creds;
  const dispatch = useDispatch();

  const slides = [
    {
      title: 'Paso #1',
      label: 'Configura tu perfil',
      sublabel:
        'Debes tener como mínimo una foto de perfil y una cuenta de Instagram, Twitter o Facebook configurada para poder entrar en una zona',
      img: require('../../../../assets/intro/profile.png'),
    },
    {
      title: 'Paso #2',
      label: 'Entra la zona',
      sublabel:
        'A una zona se puede acceder de dos maneras: leyendo un código qr o introduciendo el código de la sala.',
      img: require('../../../../assets/intro/qr.png'),
    },
    {
      title: 'Paso #3',
      label: 'Una vez en la zona',
      sublabel:
        'Una vez dentro podrás ver los perfiles que se encuentran en dicha zona (normalmente una zona es una facultad)',
      img: require('../../../../assets/intro/zona.png'),
    },
    {
      label: 'Cosas a tener en cuenta',
      sublabel:
        'Solo podrás entrar en una zona(facultad) si te encuentras cerca de ella. Si te encuentras dentro de una zona y te marchas de dicha zona, se te expulsará por no estar lo suficientemente cerca.',
      img: require('../../../../assets/intro/social.png'),
    },
    {
      label: 'Cosas a tener en cuenta',
      sublabel:
        'Hemos habilitado un apartado de sugerencias y una encuesta para que nos deis vuestra opinión.',
      img: require('../../../../assets/intro/poll.png'),
    },
    {
      // img: require('../../../../assets/beyu/beyuw.png'),
    },
  ];

  const intializeApp = () => {
    dispatch(Authenticate(creds));
  };
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        decelerationRate={0}
        snapToInterval={Dimensions.get('window').width}>
        {slides.map((slide) => {
          return <Slide slide={slide} intializeApp={intializeApp} />;
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default Intro;
