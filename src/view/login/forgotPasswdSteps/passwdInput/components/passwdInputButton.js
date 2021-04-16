import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';

import Axios from 'axios'; //AXIOS (FECTHING DATA)

import {StackActions, useNavigation, useTheme} from '@react-navigation/native'; //NAV AND THEMES

import {COLORS} from '../../../../../constants/constants'; //STATIC COLOR

import {BarPasswordStrengthDisplay} from 'react-native-password-strength-meter'; //THIRD PARTY LIBRARY

import Ionicons from 'react-native-vector-icons/Ionicons'; //ICONS
// import getErrorMsg from '../../../../../errors/errors';

const WIDTH = Dimensions.get('window').width / 1.2;
const HEIGHT = Dimensions.get('window').height / 15;

const PasswdInputButton = ({email, enteredCode, setError}) => {
  const [passwd, setPasswd] = useState(''); // PASSWD TEXTINPUT HANDLER
  const [securyEntry, setSecuryEntry] = useState(true); // SECURY ENTTRY HANDLER -> IT INDICATES IF PASSWD MUST SHOW OR NOT
  const passwdRegex = React.useRef(
    /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})/,
  ); //REGEX TO COMPROVE THAT PASSWD HAVE A MINIUM SECURE REQUIREMENTS.

  //GLOBAL HOOKS
  const nav = useNavigation();
  const theme = useTheme();

  //ANIMATED
  const [opacity, _] = useState(new Animated.Value(0.5));

  React.useEffect(() => {
    //IF PASSWD MATHC THE REGEX THE BUTTON TO CONTINUE HAVE ALL ITS OPACITY VALUE
    if (passwdRegex.current.test(passwd)) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    } else if (opacity !== 0.5) {
      Animated.timing(opacity, {
        toValue: 0.8,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }
  }, [nav, opacity, passwd, passwdRegex]);

  /**
   * API CALLS AND QUERIES
   */
  let requestBody = {
    operationName: 'ChangePasswd',
    query: `mutation ChangePasswd{
      changePasswd(email:"${email}", newPasswd:"${passwd}", enteredCode: "${enteredCode}") 
    }`,
    variables: null,
  };
  /**
   * @func signUpHandler
   *
   * It calls to the API and tries to signUp the user.
   */
  const changePasswdHandler = async (event) => {
    event.preventDefault();
    Axios.post(
      'http://192.168.1.37:3000/graphql',
      JSON.stringify(requestBody),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }

        if (res.data.errors) {
          throw new Error(res.data.errors[0].message);
        }

        return res.data.data;
      })
      .then((resData) => {
        if (resData.changePasswd === 'Success') {
          nav.dispatch(StackActions.popToTop());
        }
      })
      .catch((err) => {
        //@TODO: HANDLES ERROR SHOW AN STATE IF ERROR PRODUCED SHOWS A POP UP FROM HERE.
        // setError(getErrorMsg(err.toString().split(':')[1].trim()));
      });
  };

  //INLINE STYLES
  const textInputContainerInline = {borderColor: theme.colors.notification};

  return (
    <View style={[styles.container]}>
      <View style={[styles.TextInputContainer, textInputContainerInline]}>
        <TextInput
          value={passwd}
          style={styles.textInput}
          autoFocus={true}
          textContentType={'password'}
          secureTextEntry={securyEntry}
          onChangeText={(text) => {
            setPasswd(text);
          }}
          placeholder={'Contraseña'}
          passwordRules={
            'minlength: 8; required: lower; required: upper; required: digit'
          }
          placeholderTextColor={theme.colors.notification}
        />

        <TouchableOpacity
          style={{justifyContent: 'center'}}
          onPress={() => setSecuryEntry(!securyEntry)}>
          <Ionicons
            name={securyEntry ? 'eye-off' : 'eye'}
            size={20}
            style={{alignSelf: 'center', marginRight: 10}}
            barColor={'#1db954'}
          />
        </TouchableOpacity>
      </View>
      <BarPasswordStrengthDisplay
        password={passwd}
        width={WIDTH}
        barContainerStyle={{alignSelf: 'center'}}
        barStyle={{right: 10}}
        labelStyle={{marginRight: 20}}
      />
      <Animated.View style={{opacity}}>
        <TouchableOpacity
          style={[
            styles.sendButton,
            {backgroundColor: theme.colors.background},
          ]}
          onPress={(event) => {
            if (passwdRegex.current.test(passwd)) {
              changePasswdHandler(event);
            } else {
              setError('La contraseña no cumple con los requisitos mínimos');
            }
          }}>
          <Text style={[styles.sendText, {color: theme.colors.text}]}>
            Continuar
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.25,
    justifyContent: 'space-evenly',
  },
  TextInputContainer: {
    width: WIDTH,
    height: HEIGHT,
    marginBottom: 10,
    justifyContent: 'space-between',
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 0.3,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  iconContainer: {
    width: 50,
    height: HEIGHT,
    marginRight: 20,
    justifyContent: 'center',
  },
  textInput: {
    marginLeft: 20,
    fontFamily: 'System',
    fontSize: 13,
    fontWeight: '600',
    width: WIDTH / 1.2,
  },
  sendButton: {
    width: WIDTH,
    height: HEIGHT,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },
  sendText: {
    fontFamily: 'System',
    fontWeight: '600',
    fontSize: 16,
    color: 'white',
    alignSelf: 'center',
  },
});

export default PasswdInputButton;
