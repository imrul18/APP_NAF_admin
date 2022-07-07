// import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import React from 'react';

const PermissionAbility = async({
  children,
  permission
}) => {

  const {user} = useSelector(state => state.authStore);

  // let data = JSON.parse(await AsyncStorage.getItem('user'));
  // let user = data.user;
  let permissions = user?.permissions;

  if (user?.role === 'Admin')
    return children;

  if (!permission)
    return children;

  return permissions?.includes(permission)?children : null;
};

export default PermissionAbility;