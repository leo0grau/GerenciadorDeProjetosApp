import {View, StatusBar, Platform} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './src/router';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'black'} barStyle={'light-content'} />

      <StackNavigation />
    </NavigationContainer>
  );
}
