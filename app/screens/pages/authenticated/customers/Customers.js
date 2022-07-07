import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';

import Companies from './companies/Companies';
import Contracts from './contracts/Contracts';
const Tab = createBottomTabNavigator();

const Customers = () => {
  const {user} = useSelector(state => state.authStore);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {(user?.role === 'Admin' ||
        user?.permissions.includes('companies_access')) && (
        <Tab.Screen
          name="Companies"
          component={Companies}
          options={{
            tabBarIcon: ({focused, size}) => {
              let color = focused ? 'red' : 'black';
              return <FontAwesome5 name="building" size={size} color={color} />;
            },
          }}
        />
      )}
      {(user?.role === 'Admin' ||
        user?.permissions.includes('contracts_access')) && (
        <Tab.Screen
          name="Contracts"
          component={Contracts}
          options={{
            tabBarIcon: ({focused, size}) => {
              let color = focused ? 'red' : 'black';
              return <Ionicons name="document" size={size} color={color} />;
            },
          }}
        />
      )}
    </Tab.Navigator>
  );
};

export default Customers;
