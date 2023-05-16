// Stack navigator serves as a linker between screens. The main function that glues toghether each page and can transition from one another
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { MainScreen } from '../screens/MainScreen';
import { FormScreen } from '../screens/FormScreen';
import { AlbaranScreenDetail } from '../screens/AlbaranScreenDetail';
import { ScannerScreen } from '../screens/ScannerScreen';
import { EditAlbaranScreen } from '../screens/EditAlbaranScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { HistoryScreen } from '../screens/HistoryScreen';
import { ScannerCodeScreen } from '../screens/ScannerCodeScreen';
import { ManualAddScreen } from '../screens/ManualAddScreen';

const Stack = createStackNavigator();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
            cardStyle: {
                backgroundColor: '#303030'
                
            },
        }}
    >
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="FormScreen" component={FormScreen} />
      <Stack.Screen name="AlbaranScreenDetail" component={AlbaranScreenDetail} />
      <Stack.Screen name="ScannerScreen" component={ScannerScreen} />
      <Stack.Screen name="EditAlbaranScreen" component={EditAlbaranScreen} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
      <Stack.Screen name="ScannerCodeScreen" component={ScannerCodeScreen} />
      <Stack.Screen name="ManualAddScreen" component={ManualAddScreen} />
    </Stack.Navigator>
  );
}

export default StackNavigator;