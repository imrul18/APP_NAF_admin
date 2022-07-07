import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';

import Warehouses from './warehouses/Warehouses';
import Parts from './parts/Parts';
import Machines from './machines/Machines';
import Box_Heading from './box_heading/Box_Heading';
import Test from '../Test';
const Tab = createBottomTabNavigator();

const Inventory = ({route}) => {
  const {user} = useSelector(state => state.authStore);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {(user?.role === 'Admin' ||
        user?.permissions.includes('warehouses_access')) && (
        <Tab.Screen
          name="Warehouses"
          component={Warehouses}
          options={{
            tabBarIcon: ({focused, size}) => {
              let color = focused ? 'red' : 'black';
              return (
                <FontAwesome5
                  name="warehouse"
                  size={size / 1.5}
                  color={color}
                />
              );
            },
          }}
        />
      )}
      {(user?.role === 'Admin' ||
        user?.permissions.includes('box_heading_access')) && (
        <Tab.Screen
          name="Box Heading"
          component={Box_Heading}
          options={{
            tabBarIcon: ({focused, size}) => {
              let color = focused ? 'red' : 'black';
              return (
                <FontAwesome5 name="box" size={size / 1.5} color={color} />
              );
            },
          }}
        />
      )}
      {(user?.role === 'Admin' ||
        user?.permissions.includes('machines_access')) && (
        <Tab.Screen
          name="Machines"
          component={Machines}
          options={{
            tabBarIcon: ({focused, size}) => {
              let color = focused ? 'red' : 'black';
              return (
                <FontAwesome5 name="cogs" size={size / 1.5} color={color} />
              );
            },
          }}
        />
      )}
      {(user?.role === 'Admin' ||
        user?.permissions.includes('parts_access')) && (
        <Tab.Screen
          name="Parts"
          component={Parts}
          initialParams={{routename: route.name}}
          options={{
            tabBarIcon: ({focused, size}) => {
              let color = focused ? 'red' : 'black';
              return (
                <FontAwesome5 name="tools" size={size / 1.5} color={color} />
              );
            },
          }}
        />
      )}
    </Tab.Navigator>
  );
};

export default Inventory;
