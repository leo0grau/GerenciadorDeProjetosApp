import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import IonIcons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import {api} from '../../services/api';
import getRealm from '../../database/realm';

export default function ModalConvitesComponent({isVisible, setIsVisible}: any) {
  const [convites, setConvites] = useState([]);
  const close = () => {
    setIsVisible(false);
  };
  const handleAceitar = async (id: number) => {
    try {
      await api.post('user/acceptConvite', {id: id});
      close();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getData = async () => {
      const realm = await getRealm();
      const user = realm.objects('User');
      const result = await api.post('/user/getConvites', {
        id_user: user[0].id_user,
      });
      console.log(result.data);
      setConvites(result.data);
    };
    try {
      if (isVisible) {
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  }, [isVisible]);

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={close}
      backdropTransitionOutTiming={0}
      onBackButtonPress={close}
      backdropOpacity={0.8}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}>
      <ScrollView>
        <View style={{backgroundColor: 'white', borderRadius: 10, padding: 15}}>
          <Text style={[styles.titulo, {textAlign: 'center'}]}>
            Lista de convites
          </Text>
          {convites.map((v: any, i: number) => (
            <View
              key={i}
              style={{
                backgroundColor: 'white',
                elevation: 10,
                borderRadius: 5,
                padding: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontFamily: 'Poppins-Bold', color: 'black'}}>
                {v.nome_projeto}
              </Text>
              <TouchableOpacity
                onPress={() => handleAceitar(v.usuario_times_id)}>
                <Text>Aceitar</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </Modal>
  );
}
