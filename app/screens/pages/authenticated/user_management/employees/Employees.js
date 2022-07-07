import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AllEmployess from './AllEmployee';
import AddEmployee from './AddEmployee';
import EditEmployee from './EditEmployee';
const Stack = createNativeStackNavigator();

const Employess = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="AllEmployees" component={AllEmployess} />
      <Stack.Screen name="AddEmployee" component={AddEmployee} />
      <Stack.Screen name="EditEmployee" component={EditEmployee} />
    </Stack.Navigator>
  );
};

export default Employess;
