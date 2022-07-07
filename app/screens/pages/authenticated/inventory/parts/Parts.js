import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

// import AllMachines from './AllParts';
// import AddMachine from './AddMachine';
// import EditMachine from './EditMachine';
import AllParts from './AllParts';
import PartsDetails from './PartsDetails';
// import GetMachine from './GetMachine';

const Stack = createNativeStackNavigator();

const Parts = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="AllParts" component={AllParts} />
      <Stack.Screen name="PartsDetails" component={PartsDetails} />
      {/* <Stack.Screen name="EditMachine" component={EditMachine} />
      <Stack.Screen name="GetMachine" component={GetMachine} /> */}
    </Stack.Navigator>
  );
};

export default Parts;
