import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
// import {appleAuth} from '@invertase/react-native-apple-authentication';
import getRealm from '../../database/realm';
import Toast from 'react-native-toast-message';
import messaging from '@react-native-firebase/messaging';

import {api} from '../../services/api';
// import {translate} from '../../locale';
// import app, {headers} from '../../services/axios';
// import getRealm from '../../services/realm';
type jsonAfterLogin = {
  name: string | undefined | null;
  email: string | undefined | null;
  image_user: string | undefined | null;
  platform: string;
  gender?: number;
  age?: number;
};

export async function handleSendToDataBase(json: jsonAfterLogin) {
  try {
    const realm = await getRealm();
    const fcmToken = await messaging().getToken();

    let {data} = await api.post('user/saveIfNotExists', {
      name: json.name,
      email: json.email,
      fcmToken: fcmToken,
    });

    if (Array.isArray(data) && data.length) {
      data = data[0];
      realm.write(() => {
        realm.create(
          'User',
          {
            id_user: data.id_user,
            name: data?.name ? data?.name : 'Guest',
            email: data.email,
            image_user: json.image_user ? json.image_user : '',
          },
          true,
        );
      });
    } else {
      realm.write(() => {
        realm.create(
          'User',
          {
            id_user: data.insertedId,
            name: json?.name ? json?.name : 'Guest',
            email: json.email,
            image_user: json.image_user ? json.image_user : '',
          },
          true,
        );
      });
    }
  } catch (error) {
    console.log(error);
  }
}
// 40470
//409455216

export async function onGoogleButtonPress(
  handleLoading: (boolean?: boolean) => void,
) {
  handleLoading();

  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  // Get the users ID token
  const {idToken} = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth()
    .signInWithCredential(googleCredential)
    .then(async v => {
      handleLoading(false);
      // await handleSendToDataBase(json, false);
    });
}

// export async function onAppleButtonPress(
//   handleLoading: (boolean?: boolean) => void,
// ) {
//   handleLoading();
//   // Start the sign-in request
//   const appleAuthRequestResponse = await appleAuth.performRequest({
//     requestedOperation: appleAuth.Operation.LOGIN,
//     requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
//   });

//   // Ensure Apple returned a user identityToken
//   if (!appleAuthRequestResponse.identityToken) {
//     throw new Error('Apple Sign-In failed - no identify token returned');
//   }

//   // Create a Firebase credential from the response
//   const {identityToken, nonce} = appleAuthRequestResponse;
//   const appleCredential = auth.AppleAuthProvider.credential(
//     identityToken,
//     nonce,
//   );

//   // Sign the user in with the credential
//   return auth()
//     .signInWithCredential(appleCredential)
//     .then(async v => {
//       handleLoading(false);
//     })
//     .catch(() => {
//       handleLoading(false);
//     });
// }
