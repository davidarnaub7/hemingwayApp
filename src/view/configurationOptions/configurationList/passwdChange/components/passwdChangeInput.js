/**
 * @file passwdChangeInput.js
 *
 * @description Passwd Inputs.
 */
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Text,
  useColorScheme,
} from 'react-native';

//THEME
import {useTheme} from '@react-navigation/native';

//THIRD PARTY LIBRARIES
import {BarPasswordStrengthDisplay} from 'react-native-password-strength-meter';
import {UIActivityIndicator} from 'react-native-indicators';

//STYLES AND ICONS
import {COLORS} from '../../../../../constants/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

//CONSTANTS
const WIDTH = Dimensions.get('window').width / 1.2;
const HEIGHT = Dimensions.get('window').height / 15;

const PasswdChangeInput = ({
  fetching,
  oldPasswd,
  passwd,
  setOldPasswd,
  setPasswd,
  changePasswdHandler,
}) => {
  const theme = useTheme();
  const schema = useColorScheme();

  //UI HOOKS
  const [securyEntry, setSecuryEntry] = useState(true); // IT HANDLES THAT THE PASSWD BEING VISIBLE OR NOT
  const [securyEntryOld, setSecuryEntryOld] = useState(true);

  //INLINE STYLES
  const textInputInline = {
    borderColor: schema === 'dark' ? theme.colors.notification : '#D0D0D0',
  };
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
        },
      ]}>
      <View style={[styles.TextInputContainer, textInputInline]}>
        <TextInput
          value={oldPasswd}
          style={[styles.textInput, {color: theme.colors.text}]}
          autoFocus={true}
          textContentType={'password'}
          secureTextEntry={securyEntryOld}
          onChangeText={(text) => {
            setOldPasswd(text);
          }}
          placeholder={'Contraseña Actual'}
          passwordRules={
            'minlength: 20; required: lower; required: upper; required: digit'
          }
          placeholderTextColor={theme.colors.notification}
        />
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setSecuryEntryOld(!securyEntryOld)}>
          <Ionicons
            name={securyEntryOld ? 'eye-off' : 'eye'}
            size={20}
            style={styles.icon}
            barColor={'#1db954'}
          />
        </TouchableOpacity>
      </View>

      <View>
        <View style={[styles.TextInputContainer, textInputInline]}>
          <TextInput
            value={passwd}
            style={[styles.textInput, {color: theme.colors.text}]}
            textContentType={'password'}
            secureTextEntry={securyEntry}
            onChangeText={(text) => {
              setPasswd(text);
            }}
            placeholder={'Nueva contraseña'}
            passwordRules={
              'minlength: 20; required: lower; required: upper; required: digit'
            }
            placeholderTextColor={theme.colors.notification}
          />
          <TouchableOpacity
            style={styles.eyeButton}
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
      </View>
      <TouchableOpacity
        style={styles.sendButton}
        onPress={(event) => {
          changePasswdHandler(event);
        }}>
        {fetching ? (
          <UIActivityIndicator color={'white'} style={{alignSelf: 'center'}} />
        ) : (
          <Text style={[styles.sendText, {color: 'white'}]}>Confirmar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.3,
    justifyContent: 'space-evenly',
  },
  inputContainer: {
    width: WIDTH,
    height: HEIGHT,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    borderColor: '#D0D0D0',
    borderWidth: 0.3,
  },
  textInput: {
    marginLeft: 20,
    fontFamily: 'System',
    fontWeight: '600',
    fontSize: 13,
    width: WIDTH / 1.4,
  },
  //BUTTON
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
    alignSelf: 'center',
  },
  //PASSWD
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
  //ICONS
  eyeButton: {justifyContent: 'center'},
  icon: {alignSelf: 'center', marginRight: 10},
});

export default PasswdChangeInput;
