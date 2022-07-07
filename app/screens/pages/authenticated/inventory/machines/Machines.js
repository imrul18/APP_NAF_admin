import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AllMachines from './AllMachines';
import AddMachine from './AddMachine';
import EditMachine from './EditMachine';
// import GetMachine from './GetMachine';

const Stack = createNativeStackNavigator();

const Machines = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="AllMachines" component={AllMachines} />
      <Stack.Screen name="AddMachine" component={AddMachine} />
      <Stack.Screen name="EditMachine" component={EditMachine} />
      {/* <Stack.Screen name="GetMachine" component={GetMachine} /> */}
    </Stack.Navigator>
  );
};

export default Machines;
