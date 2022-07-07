
import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AllDesignations from './AllDesignations';
// import Test from '../../Test';
import AddDesignation from './AddDesignation';
import GetDesignation from './GetDesignation';
import EditDesignation from './EditDesignation';

const Stack = createNativeStackNavigator();

const Designatios = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
    <Stack.Screen name="AllDesignations" component={AllDesignations} />
      <Stack.Screen name="AddDesignation" component={AddDesignation} />
      <Stack.Screen name="GetDesignation" component={GetDesignation} />
      <Stack.Screen name="EditDesignation" component={EditDesignation} />
    </Stack.Navigator>
  );
};

export default Designatios;