import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import IonIcons from 'react-native-vector-icons/Ionicons';
import styles from '../perfil/styles';
import {api} from '../../services/api';
import getRealm from '../../database/realm';

export default function ModalEquipeComponent({
  isVisible,
  setIsVisible,
  handleConvidados,
}: any) {
  const [email, setEmail] = useState('');
  const close = () => {
    setIsVisible(false);
  };
  const handleConvite = async () => {
    try {
      handleConvidados(email);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={close}
      backdropTransitionOutTiming={0}
      onBackButtonPress={close}
      backdropOpacity={0.8}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}>
      <View style={{backgroundColor: 'white', borderRadius: 10, padding: 15}}>
        <Text style={[styles.titulo, {textAlign: 'center'}]}>Equipe</Text>

        <Text style={[styles.titulo, {fontSize: 16, marginTop: 15}]}>
          Adicionar membros
        </Text>

        <View
          style={{flexDirection: 'row', width: '100%', alignItems: 'center'}}>
          <TextInput
            value={email}
            style={[styles.input, {flex: 1, marginTop: 0, marginRight: 15}]}
            onChangeText={v => {
              setEmail(v);
            }}
          />
          <TouchableOpacity
            style={{
              width: 50,
              height: 50,
              backgroundColor: 'green',
              borderRadius: 1000,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={handleConvite}>
            <IonIcons name="add" color={'white'} size={25} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
