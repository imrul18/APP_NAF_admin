import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ShowProfile from './ShowProfile';
import EditProfile from './EditProfile';
const Stack = createNativeStackNavigator();

const Profile = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ShowProfile" component={ShowProfile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
};

export default Profile;
