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

import LoginPage from '../pages/login';
import Bottom from './bottom';
import Toast from 'react-native-toast-message';

export type StackParamList = {
  BottomTab: {cliente: boolean};
  LoginPage: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

interface Props {
  logado: boolean;
}
export default function StackNavigation({logado}: Props) {
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
            initialRouteName={logado ? 'BottomTab' : 'LoginPage'}
            screenOptions={{
              headerShown: false,
              animation: 'slide_from_right',
            }}>
            <Stack.Screen name="LoginPage" component={LoginPage} />
            <Stack.Screen name="BottomTab" component={Bottom} />
          </Stack.Navigator>
        </SafeAreaView>
        <Toast />
      </View>
    </TouchableWithoutFeedback>
  );
}
