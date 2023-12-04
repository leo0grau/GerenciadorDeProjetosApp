import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

export default function ItemComponent({item}: any) {
  const navigation: any = useNavigation();
  return (
    <TouchableOpacity
      style={{
        marginHorizontal: 53,
        backgroundColor: 'white',
        elevation: 10,
        borderRadius: 16,
        padding: 24,
        marginBottom: 13,
      }}
      onPress={() => {
        console.log(item);
        navigation.navigate('TarefasListPage', {
          id_projeto: item.id_projeto,
          nome: item.nome_projeto,
        });
      }}>
      <Text
        style={{color: '#1C1243', fontSize: 18, fontFamily: 'Poppins-Light'}}>
        {item.nome_projeto}
      </Text>
    </TouchableOpacity>
  );
}
