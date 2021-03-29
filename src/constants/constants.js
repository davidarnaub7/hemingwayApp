import React from 'react'
import FontAwesome5Brands from 'react-native-vector-icons/FontAwesome5';

export const DarkTheme = {
  dark: false,
  colors: {
    primary: '#1D1D1D',
    background: '#121212',
    card: '#262626',
    text: 'white',
    border: '#5A5A5A',
    notification: '#5A5A5A',
  },
};

export const LightTheme = {
  dark: false,
  colors: {
    primary: '#f0f0f0',
    background: 'white',
    card: '#F0F0F0',
    text: 'black',
    border: '#808080',
    notification: '#bbbbbb',
  },
};

export const COLORS = {
  primary: '#F07F7D',
  primaryFaded: '#F3A09F',
  socialButton: '#4285f4',
  socialButtonFaded: '#7EAAF7',
  invitationButton: '#55BA76',
  invitationButtonFaded: '#88D5AE',
  contactButton: '#ff9900',
  contactButtonFaded: '#F7B950',
  terniary: '#6E7681',
  ternaryFaded: '#A1A6AD',
  complementary: '#3f4d51',
  danger: '#ff0000',
  text: 'black',
  background: 'white',
  searcherBarColor: '#F0F0F0',
  searchBarIcon: '#808080',
  notificationsUsername: '#C9D1D1',
  opaqueButton: '#bbbbbb',
};



export const CONFIGURATION_ITEMS = {
  'Mi cuenta': [{item: 'Información personal', path: 'InformacionPersonal'}],
  Ayuda: [
    {
      item: '¿Qué es Hemingway?',
      path: 'Activar un local',
      info:
        'Hemingway te da la oportunidad de publicar tus escritos al mundo. Comparte, expone e interracciona con tus escritos y lo de los demás.',
    },
    {
      item: 'Como compartir un escrito en Instagram',
      path: 'Activar un local',
      info:
        'Accede al escrito que quieras compartir y clicka en el icono de Instagram. Automáticamente, la aplicación cogerá la foto elegida por el usuario del escrito y la página en la que te encuentres y la transformará a una historia de instagram. Si quieres compartirlo, solo tendrás que darle al botón de compartir y te llevará a Instagram para que lo hagas.',
    },
    {
      item: '¿Qué puedo publicar en Hemingway?',
      path: 'ExpliacionLocal',
      info:
        'Todo lo que quieras. Hemingway es una app de expresión escrita. Puedes publicar, ensayos, opiniones, escritos, frases motivadores, poemas. Cualquier cosa que puedas expresar en tú lengua. (Actualmente estamos trabajando para poder introducir guiones cinemátográficos y novelas largas) \n\n',
    },
    {
      item: 'Quiero mostrar mis redes solo a las personas que yo quiero',
      path: 'ExpliacionLocal',
      info:
        '¡Ya contábamos con eso! Por eso te damos la opción de que marques tu perfil como privado. En ese caso, si un usuario quiere ver tu perfil tendrá que mandarte una solicitud que tendrás que aceptar. De esta manera, conseguirás mostrar la información solo a personas que tu quieras.',
    },
    {
      item: '¿Es necesario tener una red social para usar la app?',
      path: 'ExpliacionLocal',
      info:
        'Si, nuestra aplicación es una red social de redes social. Servimos como pasarela para las grandes redes sociales',
    },
  ],
  'Política y condiciones de uso': [
    {item: 'Política de datos', path: 'PoliticaDatos'},
    {item: 'Condiciones de uso', path: 'CondicionesDeUso'},
    {item: 'Agradecimientos', path: 'Agradecimientos'},
  ],
  Seguridad: [{item: 'Cambio de contraseña', path: 'PasswdChange'}],
};

export const ACKNOWLEGDEMENTS = [
  require('../assets/agradecimientos/pexels.png'),
  require('../assets/agradecimientos/tailor.png'),
  require('../assets/agradecimientos/flaticon.png'),
  require('../assets/agradecimientos/freepik.png'),

];

export const SOCIALNETWORKS = [
  {
    name: 'Facebook',
    img: undefined,
    icon: (
      <FontAwesome5Brands
        name={'facebook'}
        size={25}
        color={'white'}
        style={{alignSelf: 'center', marginLeft: 10}}
      />
    ),
    biggerIcon: (
      <FontAwesome5Brands
        name={'facebook'}
        size={60}
        color={'white'}
        style={{alignSelf: 'center'}}
      />
    ),
    username: '',
    colors: ['#1877f2', '#1877f2'],
  },
  {
    name: 'Instagram',
    img: undefined,
    icon: (
      <FontAwesome5Brands
        name={'instagram'}
        size={30}
        color={'white'}
        style={{alignSelf: 'center', marginLeft: 10}}
      />
    ),
    username: '',
    biggerIcon:(
      <FontAwesome5Brands
        name={'instagram'}
        size={70}
        color={'white'}
        style={{alignSelf: 'center'}}
      />
    ),
    colors: [
      '#c32aa3',
      '#b537b0',
      '#a342bc',
      '#8f4cc7',
      '#7755cf',
      '#6d55d0',
      '#6256d1',
      '#5656d2',
      '#5d4ece',
      '#6546c9',
      '#6b3dc3',
      '#7232bd',
    ],
  },
  {
    name: 'Twitter',
    img: undefined,
    icon: (
      <FontAwesome5Brands
        name={'twitter'}
        size={25}
        color={'white'}
        style={{alignSelf: 'center', marginLeft: 10}}
      />
    ),
    username: '',
    biggerIcon: (
      <FontAwesome5Brands
        name={'twitter'}
        size={60}
        color={'white'}
        style={{alignSelf: 'center'}}
      />
    ),
    colors: ['#1da1f2', '#1da1f2'],
  },
  {
    name: 'Tiktok',
    img: require('../assets/socialNetworkLogos/tik-tok.png'),
    icon: undefined,
    username: '',
    colors: ['#69c9d0', '#69c9d0'],
  },
];

