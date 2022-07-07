import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AllDeliveryNotes from './AllDeliveryNotes';
import DeliveryNotesDetails from './DeliveryNotesDetails';

const Stack = createNativeStackNavigator();

const DeliveryNotes = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="AllDeliveryNotes" component={AllDeliveryNotes} />
      <Stack.Screen name="DeliveryNotesDetails" component={DeliveryNotesDetails} />
      {/* <Stack.Screen name="QuotationComment" component={QuotationComment} /> */}
    </Stack.Navigator>
  );
};

export default DeliveryNotes;
