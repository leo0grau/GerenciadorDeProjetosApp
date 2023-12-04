import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';

import {
  // onGoogleButtonPress,
  // onAppleButtonPress,
  handleSendToDataBase,
  onGoogleButtonPress,
} from './functions';
import styles from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import getRealm from '../../database/realm';
import LogoComponent from '../../components/logo';
// import {colors} from '../../utils/colors';
// import getRealm from '../../services/realm';
// import app from '../../services/axios';

type Props = {
  route: any;
};
export default function LoginPage({route}: Props) {
  const [user, setUser] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [register, setRegister] = useState(false);
  const navigation: any = useNavigation();
  const isFocused = useIsFocused();

  const handleLoading = (boolean?: boolean) => {
    setLoading(!loading);
    if (boolean === false) {
      setLoading(boolean);
    }
  };

  // useEffect(() => {
  //   setEmail('');
  //   setSenha('');
  //   Keyboard.dismiss();
  // }, [register]);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(async v => {
      if (v) {
        const content = v.providerData[0];
        let a = route?.params?.reLogin;
        if (!a) {
          const data = {
            name: content?.displayName,
            email: content?.email,
            image_user: content?.photoURL,
            platform: content?.providerId,
            age: 0,
            gender: 0,
          };
          await handleSendToDataBase(data);
          setUser(true);
        } else {
          a = false;
        }
      }
    });
    return subscriber;
  }, [isFocused]);

  const handleNavigation = async () => {
    if (user && isFocused) {
      navigation.navigate('BottomTab');
    }
  };

  useEffect(() => {
    setUser(false);
    try {
      handleNavigation();
    } catch (error) {
      console.log(error);
    }
  }, [user, isFocused]);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={{flex: 1, padding: 31, backgroundColor: '#F6F8FA'}}>
        <LogoComponent />
        <Text style={styles.titulo}>Login</Text>
        <Text style={styles.sub}>
          Digite suas informações abaixo para se logar
        </Text>
        <TextInput
          style={styles.input}
          value={email}
          placeholder="E-mail"
          onChangeText={v => {
            setEmail(v);
          }}
          autoComplete={'email'}
        />
        <View>
          <TextInput
            style={styles.input}
            value={senha}
            placeholder="Senha"
            onChangeText={v => {
              setSenha(v);
            }}
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
          style={styles.loginBtn}
          disabled={loading}
          onPress={async () => {
            try {
              setLoading(true);
              if (!email) {
                Toast.show({
                  text1: 'Email Vazio',
                  text2: 'Preencha o email para continuar',
                  type: 'error',
                  autoHide: true,
                });
                handleLoading(false);
                return;
              }
              if (!senha) {
                Toast.show({
                  text1: 'Senha vazia',
                  text2: 'Preencha a senha para continuar',
                  type: 'error',
                  autoHide: true,
                });
                handleLoading(false);
                return;
              }
              await auth()
                .signInWithEmailAndPassword(email, senha)
                .then(async v => {
                  setLoading(false);

                  // let json = {
                  //   name: v.user.displayName,
                  //   email: v.user.email,
                  //   image_user: '',
                  //   platform: 'Email/Senha',
                  // };

                  // const realm = await getRealm();
                  // realm.write(() => {
                  //   realm.create(
                  //     'User',
                  //     {
                  //       id_user: 1,
                  //       name: json?.name ? json?.name : 'Guest',
                  //       email: json.email,
                  //       image_user: json.image_user ? json.image_user : '',
                  //     },
                  //     true,
                  //   );
                  // });

                  // await handleSendToDataBase(json, false);
                })
                .catch(error => {
                  setLoading(false);
                  console.log(error);
                  if (error.code === 'auth/invalid-email') {
                    Toast.show({
                      text1: 'Email invalido',
                      text2: 'Preencha com uma email valido',
                      type: 'error',
                      autoHide: true,
                    });
                  }
                  if (error.code === 'auth/user-not-found') {
                    Toast.show({
                      text1: 'Erro ao logar',
                      text2: 'Email ou senha invalidos',
                      type: 'error',
                      autoHide: true,
                    });
                  }
                  if (error.code === 'auth/wrong-password') {
                    Toast.show({
                      text1: 'Erro ao logar',
                      text2: 'Email ou senha invalidos',
                      type: 'error',
                      autoHide: true,
                    });
                  }

                  if (error.code === 'auth/invalid-credential') {
                    Toast.show({
                      text1: 'Erro ao logar',
                      text2: 'Email ou senha invalidos',
                      type: 'error',
                      autoHide: true,
                    });
                  }
                });
            } catch (error) {
              setLoading(false);

              console.log(error);
            }
          }}>
          {loading ? (
            <ActivityIndicator color={'white'} size={'large'} />
          ) : (
            <Text style={styles.loginText}>LOGIN</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop: 18}}>
          <Text style={styles.esqueceu}>
            Esqueceu a senha ? <Text style={styles.decorar}>Recuperar</Text>
          </Text>
        </TouchableOpacity>
        <Text style={styles.ou}>OU</Text>

        <TouchableOpacity
          style={[styles.btnSocial]}
          onPress={() => onGoogleButtonPress(handleLoading)}>
          <MaterialCommunityIcons name="google" color={'black'} size={25} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.criarBtn}>
          <Text style={styles.criarConta}>Criar uma conta</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}
