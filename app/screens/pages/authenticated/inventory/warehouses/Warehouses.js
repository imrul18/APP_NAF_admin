import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AllWarehouses from './AllWarehouses';
import AddWarehouse from './AddWarehouse';
import EditWarehouse from './EditWarehouse';
import GetWarehouse from './GetWarehouse';

const Stack = createNativeStackNavigator();

const Warehouses = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="AllWarehouses" component={AllWarehouses} />
      <Stack.Screen name="AddWarehouse" component={AddWarehouse} />
      <Stack.Screen name="GetWarehouse" component={GetWarehouse} />
      <Stack.Screen name="EditWarehouse" component={EditWarehouse} />
    </Stack.Navigator>
  );
};

export default Warehouses;
