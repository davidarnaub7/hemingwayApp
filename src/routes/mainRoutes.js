/**
 *
 * @file mainRoutes.js
 *
 * @description This file manage the main Routes. With NavigationContainer we must select the correct route depending on user
 * is authenticated or not.
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {useEffect} from 'react';

//AUXILIAR IMPORTS
import {enableScreens} from 'react-native-screens';

//STACK
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

//THEMES define staticlly
import {DarkTheme, LightTheme} from '../constants/constants';

//SCHEME that helps us to know which theme are the user using.
import {useColorScheme} from 'react-native';

//REDUX
import {useSelector} from 'react-redux';

// //MAIN ROUTES
import Routes from './routes';

//LOGIN ROUTES
import LoginRoutes from './loginRoutes';

//Module required in React-Navigation docs.
enableScreens();

//Creating the new Stack which are gonna contain all the subRoutes.
const MainStack = createStackNavigator();

const MainRoute = () => {
  const auth = useSelector(state => state.auth);

  return (
    <NavigationContainer
      theme={useColorScheme() === 'dark' ? DarkTheme : LightTheme}>
      <MainStack.Navigator initialRouteName="routes" headerMode={'none'}>
        {/* If we are logged redirect to Routes if not go to LoginRoutes */}
        {auth.token !== '' ? (
          <MainStack.Screen name="routes" component={Routes} />
        ) : (
          <MainStack.Screen name="logIn" component={LoginRoutes} />
        )}
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default MainRoute;
