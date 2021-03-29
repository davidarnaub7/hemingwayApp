/**
 * @file: loginRoutes
 * 
 * @description: manage all loginRoutes divided in the diferent actions we can do.
 */

import 'react-native-gesture-handler';
import React from 'react';

//NAVIGATION
import {createStackNavigator} from '@react-navigation/stack';


//LOGIN PAGE
import LogIn from '../view/login/login';
//FORGOT PASS
import ForgotPasswd from '../view/login/forgotPasswdSteps/forgotPassword/forgotPasswd';
import EnterCodePasswd from '../view/login/forgotPasswdSteps/enterCode/enterCodePasswd';
import ChangePasswdInput from '../view/login/forgotPasswdSteps/passwdInput/changePasswdInput';


//SIGNUP
import MobileInput from '../view/login/signUp/mobileInput/mobileInput';
import EnterCode from '../view/login/signUp/enterCode/enterCode';
import UsernameInput from '../view/login/signUp/usernameInput/usernameInput';
import NameInput from '../view/login/signUp/nameInput/nameInput';
import PasswdInput from '../view/login/signUp/passwdInput/passwdInput';
import Intro from '../view/login/signUp/intro/intro';

//CREATING STACKS
const LogInStack = createStackNavigator();
const FogotPasswdStack = createStackNavigator();
const SignUpStack = createStackNavigator();

/**
 * @function
 *
 * Manage ForgotPasswd routes.
 */
const FPStack = () => {
  return (
    <FogotPasswdStack.Navigator>
      <FogotPasswdStack.Screen
        name="ForgotPasswd"
        component={ForgotPasswd}
        options={{headerShown: false}}
      />
      <FogotPasswdStack.Screen
        name="ForgotPasswdEnterCode"
        component={EnterCodePasswd}
        options={{headerShown: false}}
      />
      <FogotPasswdStack.Screen
        name="ForgotPasswdChangePasswd"
        component={ChangePasswdInput}
        options={{headerShown: false}}
      />
    </FogotPasswdStack.Navigator>
  );
};

/**
 * @function
 *
 * @description: Manage SignUp routes.
 */
const SignupStack = () => {
  return (
    <SignUpStack.Navigator>
      <SignUpStack.Screen
        name="MobileInput"
        component={MobileInput}
        options={{headerShown: false}}
      />
      <SignUpStack.Screen
        name="EnterCode"
        component={EnterCode}
        options={{headerShown: false}}
      />
      <SignUpStack.Screen
        name="UsernameInput"
        component={UsernameInput}
        options={{headerShown: false}}
      />
      <SignUpStack.Screen
        name="NameInput"
        component={NameInput}
        options={{headerShown: false}}
      />
      <SignUpStack.Screen
        name="PasswdInput"
        component={PasswdInput}
        options={{headerShown: false}}
      />
      <SignUpStack.Screen
        name="Intro"
        component={Intro}
        options={{headerShown: false}}
      />
    </SignUpStack.Navigator>
  );
};

/**
 * @function
 *
 * Manage all the posibible routes. Acts like a parent. At the same time manage LogIn single page.
 */
const LoginRoutes = () => {
  return (
    <LogInStack.Navigator>
      <LogInStack.Screen
        name="LogIn"
        component={LogIn}
        options={{headerShown: false}}
      />
      <LogInStack.Screen
        name="SignUp"
        component={SignupStack}
        options={{headerShown: false}}
      />

      <LogInStack.Screen
        name="ForgotPasswd"
        component={FPStack}
        options={{headerShown: false}}
      />
    </LogInStack.Navigator>
  );
};

export default LoginRoutes;
