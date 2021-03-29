/**
 * @file: editProfileRoutes.js
 *
 * @description: It contains all the editProfile Routes.
 */

import 'react-native-gesture-handler';
import React from 'react';

// STACK CREATOR HANDLER
import {createStackNavigator} from '@react-navigation/stack';

//STACKS
import EditProfile from '../view/profile/editProfile/editProfile';
import EditProfileInputResolver from '../view/profile/editProfile/editProfileInputResolver/editProfileInputResolver';

//CRETING STACKS
const PStack = createStackNavigator();

/**
 * @function: EditProfileStack
 *
 * @description: It contains all the editProfileRoutes
 */
const EditProfileStack = props => {
  return (
    <PStack.Navigator>
      <PStack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false}}
      />
      <PStack.Screen
        name="EditProfileInputResolver"
        component={EditProfileInputResolver}
        options={{headerShown: false}}
      />
     </PStack.Navigator>
  );
};

export default EditProfileStack;
