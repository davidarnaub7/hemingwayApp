/**
 * @file ConfigurationOptions.js
 * 
 * @description It manages all the config options.It displays the primary options items. 
 */
import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';

//ICONS
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//CONSTANTS
import {COLORS} from '../../constants/constants';

//MODULES
import {useNavigation, useTheme} from '@react-navigation/native';

//THIRD PARTY LIBRARY
import FlashMessage from 'react-native-flash-message';

//PARTS
import ConfigurationHeader from './components/configurationHeader';
import ConfigurationButtons from './components/configurationButtons';

const ConfigurationOptions = () => {
  const navigation = useNavigation(); //NAV HANDLER
  const theme = useTheme(); // THEME HANDLER

  const [error, setError] = React.useState(''); //UI ERROR HANDLER

  const ref = React.useRef(); //REF USED BY FLASHMESSAGE IN CASE OF ERROR.

  React.useEffect(() => {
    let subscribe = true;
    if (error !== '' && subscribe) {
      ref.current.showMessage({
        message: error,
        type: 'info',
        duration: 2500,
        floating: true,
        backgroundColor: COLORS.primary,
        titleStyle: {
          fontFamily: 'System',
          fontWeight: 'bold',
          fontSize: 16,
        },
        style: {
          bottom: 10,
        },
      });
      setError('');
    }
    return () => {
      subscribe = false;
    };
  }, [error]);
  //PRIMARY OPTIONS ITEM
  const items = [
    // {
    //   name: 'Mi cuenta',
    //   icon: (
    //     <MaterialCommunityIcons
    //       name={'account-circle-outline'}
    //       size={25}
    //       style={styles.icon}
    //       color={theme.colors.text}
    //     />
    //   ),
    //   path: 'ConfigurationList',
    //   subPath: 'PrivateInfo',
    // },
    {
      name: 'Seguridad',
      icon: (
        <MaterialCommunityIcons
          name={'lock-outline'}
          size={25}
          style={styles.icon}
          color={theme.colors.text}
        />
      ),
      path: 'ConfigurationList',
    },
    {
      name: 'Política y condiciones de uso',
      icon: (
        <MaterialCommunityIcons
          name={'newspaper-variant-outline'}
          size={25}
          style={styles.icon}
          color={theme.colors.text}
        />
      ),
      path: 'ConfigurationList',
    },
    {
      name: 'Ayuda',
      icon: (
        <MaterialCommunityIcons
          name={'help-circle-outline'}
          size={25}
          style={styles.icon}
          color={theme.colors.text}
        />
      ),
      path: 'Help',
    },
  ];

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <ConfigurationHeader />
      <View style={styles.list}>
        {items.map((item) => {
          /** If we take a look we will be aware that we don't have any subcomponent. Instead of that, we navigat to each personalized view include in the item. */
          return (
            <TouchableOpacity
              style={styles.itemContaner}
              onPress={() => navigation.push(item.path, {label: item.name})}>
              <View style={styles.pack}>
                {item.icon}
                <Text style={[styles.itemText, {color: theme.colors.text}]}>
                  {item.name}
                </Text>
              </View>
              <Entypo
                name={'chevron-right'}
                size={20}
                style={styles.chevron}
                color={theme.colors.text}
              />
            </TouchableOpacity>
          );
        })}
      </View>
      {/* <ShareApp theme={theme} /> */}
      <View style={{flex:0.2}} />
      <ConfigurationButtons
        label={'Cuenta'}
        setError={setError}
        options={[
          {item: 'Cerrar Sesión', color: theme.colors.text},
          {item: 'Eliminar cuenta', color: COLORS.danger},
        ]}
      />
      {/* NECESARY TO HAVE A NICE ASPECT */}
      <View style={{flex: 0.25}} />
      <FlashMessage position="top" ref={ref} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  list: {
    marginTop: 10,
    flex: 0.5,
  },
  itemContaner: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  pack: {
    width: Dimensions.get('window').width / 1.1,
    height: Dimensions.get('window').height / 15,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  icon: {
    alignSelf: 'center',
    width: Dimensions.get('window').width / 10,
    marginLeft: 20,
  },
  itemText: {
    width: Dimensions.get('window').width / 1.3,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'System',
    alignSelf: 'center',
    color: COLORS.text,
  },
  chevron: {alignSelf: 'center', marginRight: 30, opacity: 0.6},
});

export default ConfigurationOptions;
