
import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AllContracts from './AllContracts';
import AddContract from './AddContract';
import EditContract from './EditContract';
import ContractDetails from './ContractDetails';


const Stack = createNativeStackNavigator();

const Contracts = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
    <Stack.Screen name="AllContracts" component={AllContracts} />
      <Stack.Screen name="GetContract" component={ContractDetails} />
      <Stack.Screen name="AddContract" component={AddContract} />
      <Stack.Screen name="EditContract" component={EditContract} />
    </Stack.Navigator>
  );
};

export default Contracts;