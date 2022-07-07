import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AllRoles from './AllRoles';
import AddRole from './AddRole';
import GetRole from './GetRole';
const Stack = createNativeStackNavigator();

const Roles = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="AllRoles" component={AllRoles} />
      <Stack.Screen name="AddRole" component={AddRole} />
      <Stack.Screen name="GetRole" component={GetRole} />
    </Stack.Navigator>
  );
};

export default Roles;
