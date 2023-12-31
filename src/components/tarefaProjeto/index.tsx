import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import IonIcons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

interface Props {
  item: {
    id_tarefa: number;
    nome: string;
    prazo: string;
    nomeProjeto: string;
    status: string;
    color: string;
  };
}

export default function TarefasHomeComponent({item}: Props) {
  const navigation: any = useNavigation();
  // ItemTarefasPage
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ItemTarefasPage', {id_tarefa: item.id_tarefa});
      }}>
      <View style={styles.container}>
        <Text style={styles.titulo} numberOfLines={1}>
          {item.nome}
        </Text>
        <Text style={styles.projeto}>{item.nomeProjeto}</Text>
        <View style={styles.linha} />
        <View style={[styles.linear, {justifyContent: 'space-between'}]}>
          <View style={styles.linear}>
            <IonIcons name="stopwatch-outline" color={item.color} size={30} />
            <Text>{item.prazo}</Text>
          </View>
          <View style={[styles.dentroData, {backgroundColor: item.color}]}>
            <Text style={styles.txtDentro}>{item.status}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
