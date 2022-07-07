import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AllBoxHeadings from './AllBoxHeading';
import GetBoxHeading from './GetBoxHeading';
import EditBoxHeading from './EditBoxHeading';
import AddBoxHeading from './AddBoxHeading';



const Stack = createNativeStackNavigator();

const Box_Heading = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
    <Stack.Screen name="AllBoxHeadings" component={AllBoxHeadings} />
      <Stack.Screen name="AddBoxHeading" component={AddBoxHeading} />
      <Stack.Screen name="GetBoxHeading" component={GetBoxHeading} />
      <Stack.Screen name="EditBoxHeading" component={EditBoxHeading} />
    </Stack.Navigator>
  );
};

export default Box_Heading;