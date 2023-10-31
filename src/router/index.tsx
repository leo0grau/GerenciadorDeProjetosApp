import React from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Keyboard,
  Platform,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  NativeStackHeaderProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import FlashMessage from 'react-native-flash-message';
import styles from './styles';

import HomePage from '../pages/home';

import LoginPage from '../pages/home';

export type StackParamList = {
  HomePage: {cliente: boolean};
  LoginPage: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

export default function StackNavigation() {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.container}>
        <FlashMessage
          position="top"
          statusBarHeight={StatusBar.currentHeight}
        />
        <SafeAreaView style={styles.safeArea}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              animation: 'slide_from_right',
            }}>
            <Stack.Screen name="LoginPage" component={LoginPage} />
            <Stack.Screen name="HomePage" component={HomePage} />
          </Stack.Navigator>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
}
