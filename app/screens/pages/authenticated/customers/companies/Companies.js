
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AllCompany from './AllCompany';
import AddCompany from './AddCompany';
import EditCompany from './EditCompany';
import GetCompany from './GetCompany';

const Stack = createNativeStackNavigator();

const Companies = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AllCompanies" component={AllCompany} />
      <Stack.Screen name="GetCompany" component={GetCompany} />
      <Stack.Screen name="AddCompany" component={AddCompany} />
      <Stack.Screen name="EditCompany" component={EditCompany} />
    </Stack.Navigator>
  );
};

export default Companies;