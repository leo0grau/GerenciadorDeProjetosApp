import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {useIsFocused} from '@react-navigation/native';
import getRealm from '../../database/realm';
export default function ItemTarefasPage({navigation, route}: any) {
  const isFocused = useIsFocused();
  const [desc, setDesc] = useState('');
  const [nome, setNome] = useState('');
  const [showBtn, setShowBtn] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const realm = await getRealm();
      const tarefas: any = realm
        .objects('Tarefas')
        .filtered(`id_tarefa = ${route.params.id_tarefa}`);
      console.log(tarefas);
      setShowBtn(tarefas[0].status !== 2 ? true : false);
      setNome(tarefas[0].nome_tarefa);
      setDesc(tarefas[0].desc);
    };
    try {
      if (isFocused) {
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  }, [isFocused]);
  const handleEnd = async () => {
    try {
      const realm = await getRealm();
      const tarefas: any = realm
        .objects('Tarefas')
        .filtered(`id_tarefa = ${route.params.id_tarefa}`);

      const item: any = realm
        .objects('Projetos')
        .filtered(`id_projeto = ${tarefas[0].projeto_id}`);

      realm.write(() => {
        tarefas[0].status = 2;
      });
      navigation.navigate('TarefasListPage', {
        id_projeto: item[0].id_projeto,
        nome: item[0].nome_projeto,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ScrollView style={{flex: 1}}>
      <View
        style={{
          marginHorizontal: 19,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 41,
        }}>
        <Text
          style={{fontFamily: 'Poppins-Bold', color: 'black', fontSize: 18}}>
          {nome}
        </Text>
        <View />
      </View>

      <View style={{marginTop: 30}}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'Poppins-Regular',
            marginHorizontal: 30,
            color: 'black',
          }}>
          Descrição
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'Poppins-Regular',
            marginHorizontal: 30,
          }}>
          {desc}
        </Text>
      </View>
      {showBtn && (
        <TouchableOpacity style={styles.btnSalvar} onPress={handleEnd}>
          <Text style={styles.salvarTxt}>Finalizar tarefa</Text>
        </TouchableOpacity>
      )}
      <Text></Text>
    </ScrollView>
  );
}
