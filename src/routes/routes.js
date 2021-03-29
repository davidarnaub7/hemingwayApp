/**
 * @file: routes.js
 *
 * Manage all the main App Routes (including the tab and all its subActions)
 */

import 'react-native-gesture-handler';
import React from 'react';
import {View, Dimensions, StyleSheet, Image} from 'react-native';

//STACK
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//ICONS
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
Feather.loadFont();

//CONFIGS STACKS
import ConfigurationOptions from '../view/configurationOptions/configurationOptions';
import ConfigurationList from '../view/configurationOptions/configurationList/configurationList';
import Acknowledgements from '../view/configurationOptions/configurationList/politicsAndConditions/Acknowledgements/Acknowledgements';
import TermsAndConditions from '../view/configurationOptions/configurationList/politicsAndConditions/TermsAndConditions/termsAndConditions';
import Authors from '../view/configurationOptions/configurationList/politicsAndConditions/authors/authors';
import Policy from '../view/configurationOptions/configurationList/politicsAndConditions/Politica/policy';
import Help from '../view/configurationOptions/configurationList/help/help';
import PrivateInfo from '../view/configurationOptions/configurationList/privateInfo/privateInfo';
import PasswdChange from '../view/configurationOptions/configurationList/passwdChange/passwdChange';

//HOME STACK
import Home from '../view/home/home';

//PROFILE
import Profile from '../view/profile/profile';
import EditProfileStack from './editProfileRoutes';
import FollowersViewer from '../view/profile/followersViewer/followersViewer';

//REDUX
import {COLORS} from '../constants/constants';
import {useTheme} from '@react-navigation/native';
import Reader from '../view/reader/reader';

//CREATING STACKS AND TAB
const OStack = createStackNavigator();
const PStack = createStackNavigator();
const MainStack = createBottomTabNavigator();
const RoutesStack = createStackNavigator();

/**
 * @function: OptionsStack
 *
 * Manage all the options Routes
 */
const OptionsStack = () => {
  return (
    <OStack.Navigator>
      <OStack.Screen
        name="Options"
        component={ConfigurationOptions}
        options={{
          headerShown: false,
        }}
      />
      <OStack.Screen
        name="ConfigurationList"
        component={ConfigurationList}
        options={{
          headerShown: false,
        }}
      />
      <OStack.Screen
        name="Help"
        component={Help}
        options={{
          headerShown: false,
        }}
      />
      <OStack.Screen
        name="InformacionPersonal"
        component={PrivateInfo}
        options={{
          headerShown: false,
        }}
      />
      <OStack.Screen
        name="PasswdChange"
        component={PasswdChange}
        options={{
          headerShown: false,
        }}
      />
      <OStack.Screen
        name="Agradecimientos"
        component={Acknowledgements}
        options={{
          headerShown: false,
        }}
      />
      <OStack.Screen
        name="Authors"
        component={Authors}
        options={{
          headerShown: false,
        }}
      />
      <OStack.Screen
        name="CondicionesDeUso"
        component={TermsAndConditions}
        options={{
          headerShown: false,
        }}
      />
      <OStack.Screen
        name="PoliticaDatos"
        component={Policy}
        options={{
          headerShown: false,
        }}
      />
    </OStack.Navigator>
  );
};

/**
 * @function : ProfileStack
 *
 * Manage all the profile Routes
 */
const ProfileStack = () => {
  return (
    <PStack.Navigator mode={'modal'}>
      <PStack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
    </PStack.Navigator>
  );
};

/**
 * @function
 *
 * @description: Main Joiner func. It joins all previous jsx funcs with a tab Container.
 */
const Tab = props => {
  //Getting the current tab index in order to give it some difference between the not selected ones.
  const index = props.route.state === undefined ? 0 : props.route.state.index;
  const theme = useTheme();

  return (
    <MainStack.Navigator
      initialRouteName={'Home'}
      // Defining the tab options. Icons and giving some color to that icons depending on their current state.
      screenOptions={({route}) => ({
        tabBarLabel: ({focused, color}) => {
          return <></>;
        },
        tabBarIcon: ({focused, color, size}) => {
          let component;

          if (route.name === 'profile') {
            component = (
              <View style={{flexDirection: 'row'}}>
                <View style={[styles.bButton]}>
                  <Ionicons
                    name="person-circle-outline"
                    size={30}
                    color={index !== 1 ? '#a0a0a0' : theme.colors.text}
                    style={{alignSelf: 'center'}}
                  />
                </View>
              </View>
            );
          } else if (route.name === 'home') {
            component = (
              <View style={{flexDirection: 'row'}}>
                <View
                  style={[
                    styles.bButton,
                    {
                      backgroundColor:
                        index === 1 ? 'transparent' : theme.colors.background,
                    },
                  ]}>
                  <AntDesign
                    name="home"
                    size={30}
                    color={index === 1 ? '#a0a0a0' : theme.colors.text}
                    style={{alignSelf: 'center'}}
                  />
                </View>
              </View>
            );
          }
          return component;
        },
      })}
      //Basiclly, tab style.
      tabBarOptions={{
        tabStyle: styles.tabStyle,
        activeTintColor: 'black',
        inactiveTintColor: 'black',
        style: [styles.tabStyling, {backgroundColor: theme.colors.background}],
      }}>
      {/* tab Stacks */}
      <MainStack.Screen
        name="home"
        component={Home}
        options={{headerShown: false}}
      />
      <MainStack.Screen name="profile" component={ProfileStack} />
      {/* End of tab stacks */}
    </MainStack.Navigator>
  );
};

/**
 * @funciton Routes
 *
 * @description Function which manage all the previous ones. Here are the tab and all the view which we want to show without
 * any tab view, this is the reason because they are out of the main func tab. If this was not like it is, all views shows a
 * tab too, being so confuse to the user.
 *
 * @example: Tiktok show locals video view, must no show a tab because it is a subview.
 */
const Routes = () => {
  return (
    <RoutesStack.Navigator mode={'modal'}>
      <RoutesStack.Screen
        name="main"
        component={Tab}
        options={{headerShown: false}}
      />
      <RoutesStack.Screen
        name="EditProfile"
        component={EditProfileStack} // -> calling to another js sheet in which are contained all the editProfileRoutes.
        options={{headerShown: false}}
      />
      <RoutesStack.Screen
        name="Reader"
        component={Reader} // -> calling to another js sheet in which are contained all the editProfileRoutes.
        options={{headerShown: false}}
      />
      <RoutesStack.Screen
        name="ConfigurationOptions"
        component={OptionsStack} // -> calling to another js sheet in which are contained all the optionsRoutes.
        options={{headerShown: false}}
      />
      <RoutesStack.Screen
        name="FollowersViewer"
        component={FollowersViewer}
        options={{headerShown: false}}
      />
    </RoutesStack.Navigator>
  );
};

const styles = StyleSheet.create({
  bButton: {
    width: 35,
    height: 35,
    borderRadius: 40,
    justifyContent: 'center',
  },
  bButtontext: {
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  tabStyle: {
    width: Dimensions.get('window').width / 1.8,
    height: Dimensions.get('window').height / 14,
    backgroundColor: 'transparent',
  },
  tabStyling: {
    borderRadius: 100,
    borderTopWidth: 0,
    borderColor: 'transparent',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.8,
    shadowRadius: 5,
    position: 'absolute',
    bottom:
      Dimensions.get('window').height / (Dimensions.get('window').height / 40),
    width: Dimensions.get('window').width / 1.8,
    left: Dimensions.get('window').width / 4.5,
    height: Dimensions.get('window').height / 14,
    alignItems: 'center',
  },
});

export default Routes;
