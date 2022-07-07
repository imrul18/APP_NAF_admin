import React, {useState, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';

import Employees from './employees/Employees';
import Designatios from './designations/Designatios';
import Roles from "./roles/Roles";

const Tab = createBottomTabNavigator();

const UserManagement = () => {
  const {user} = useSelector(state => state.authStore);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {(user?.role === 'Admin' ||
        user?.permissions.includes('employees_access')) && (
        <Tab.Screen
          name="Employess"
          component={Employees}
          options={{
            tabBarIcon: ({focused, size}) => {
              let color = focused ? 'red' : 'black';
              return <FontAwesome5 name="users" size={size} color={color} />;
            },
          }}
        />
      )}
      {(user?.role === 'Admin' ||
        user?.permissions.includes('designations_access')) && (
        <Tab.Screen
          name="Designatios"
          component={Designatios}
          options={{
            tabBarIcon: ({focused, size}) => {
              let color = focused ? 'red' : 'black';
              return <FontAwesome5 name="sitemap" size={size} color={color} />;
            },
          }}
        />
      )}
      {user?.role === 'Admin' && (
        <Tab.Screen
          name="Roles"
          component={Roles}
          options={{
            tabBarIcon: ({focused, size}) => {
              let color = focused ? 'red' : 'black';
              return (
                <FontAwesome5 name="user-shield" size={size} color={color} />
              );
            },
          }}
        />
      )}
    </Tab.Navigator>
  );
};

export default UserManagement;
