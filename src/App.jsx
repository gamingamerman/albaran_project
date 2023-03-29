/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';

import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import { StackNavigator } from './navigator/StackNavigator';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#303030'
  },
};

const App = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <StackNavigator/>
    </NavigationContainer>
  );
}

export default App;
