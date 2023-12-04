import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';

import styles from './styles';
import getRealm from '../../database/realm';
import Toast from 'react-native-toast-message';
import ModalConvitesComponent from './modalConvites';
// import {colors} from '../../utils/colors';
// import getRealm from '../../services/realm';
// import app from '../../services/axios';

type Props = {
  route: any;
};
export default function PerfilPage({route}: Props) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [modalEquipe, setModalEquipe] = useState(true);
  const [modalConvites, setModalConvites] = useState(false);
  const [loading, setLoading] = useState(false);
  const [register, setRegister] = useState(false);
  const navigation: any = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    const getData = async () => {
      const realm: any = await getRealm();
      const user = realm.objects('User');

      setNome(user[0].name);
      setEmail(user[0].email);
      setImage(user[0].image_user);
    };
    try {
      if (isFocused) {
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  }, [isFocused]);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <ScrollView style={{flex: 1, padding: 31, backgroundColor: '#F6F8FA'}}>
        <TextInput
          style={styles.input}
          value={nome}
          placeholder="Nome"
          onChangeText={v => {
            setNome(v);
          }}
        />
        <TextInput
          style={styles.input}
          value={email}
          editable={false}
          placeholder="E-mail"
          onChangeText={v => {
            setEmail(v);
          }}
          autoComplete={'email'}
        />
        <TouchableOpacity
          style={styles.loginBtn2}
          onPress={() => {
            setModalConvites(true);
          }}>
          <Text style={styles.loginText2}>Convites</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginBtn}
          disabled={loading}
          onPress={async () => {
            try {
              setLoading(true);
              const realm = await getRealm();
              const user: any = realm.objects('User');

              realm.write(() => {
                user[0].name = nome;
              });
              Toast.show({
                text1: 'Alterado com sucesso',
                text2: 'Nome atualizado com sucesso',
                type: 'success',
              });
              setLoading(false);
            } catch (error) {
              setLoading(false);
            }
          }}>
          {loading ? (
            <ActivityIndicator color={'white'} size={'large'} />
          ) : (
            <Text style={styles.loginText}>Salvar</Text>
          )}
        </TouchableOpacity>
        {/* <ModalEquipeComponent
          isVisible={modalEquipe}
          setIsVisible={setModalEquipe}
        />
        <ModalEquipeComponent
          isVisible={modalEquipe}
          setIsVisible={setModalEquipe}
        /> */}
        <ModalConvitesComponent
          isVisible={modalConvites}
          setIsVisible={setModalConvites}
        />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
