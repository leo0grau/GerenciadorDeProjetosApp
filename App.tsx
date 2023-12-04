import {View, StatusBar, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './src/router';
import getRealm from './src/database/realm';

import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '931588742970-fiuamrla6aumbn37ca7usi6uu00ujfa4.apps.googleusercontent.com',
});

export default function App() {
  const [logado, setLogado] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const realm = await getRealm();
      const user = realm.objects('User');
      if (user.length) {
        setLogado(true);
      }
    };
    try {
      getData();
    } catch (error) {}
  }, []);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'black'} barStyle={'light-content'} />

      <StackNavigation logado={logado} />
    </NavigationContainer>
  );
}
