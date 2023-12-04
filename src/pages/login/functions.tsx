import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
// import {appleAuth} from '@invertase/react-native-apple-authentication';
import getRealm from '../../database/realm';
import Toast from 'react-native-toast-message';
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

export async function handleSendToDataBase(
  json: jsonAfterLogin,
  verificar: boolean = false,
) {
  const realm = await getRealm();
  // const config: any = realm.objects('Config');
  // const gemClass = new GemManager(realm);
  // let uid = await getUniqueId();

  // let {data} = await app.post(
  //   `user/saveIfNotExists`,
  //   {
  //     name: json.name,
  //     email: json.email,
  //     image_user: json.image_user,
  //     platform: json.platform,
  //     age: json?.age ? json.age : 0,
  //     uid: uid,
  //     gender: json?.gender ? json.gender : 0,
  //     language: config[0].lingua,
  //   },
  //   {headers},
  // );

  realm.write(() => {
    realm.create(
      'User',
      {
        id_user: 1,
        name: json?.name ? json?.name : 'Guest',
        email: json.email,
        image_user: json.image_user ? json.image_user : '',
      },
      true,
    );
  });
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
