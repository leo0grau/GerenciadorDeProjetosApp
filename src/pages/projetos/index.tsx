import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {useIsFocused} from '@react-navigation/native';
import getRealm from '../../database/realm';
import IonIcons from 'react-native-vector-icons/Ionicons';
import HomeProjetoListComponent from '../../components/homeProjeto';
export default function ProjetosPage() {
  const [completo, setcompleto] = useState(false);
  const [listaProjetos, setListaProjetos] = useState<any[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const getData = async () => {
      const realm = await getRealm();
      const projetos: any = realm
        .objects('Projetos')
        .filtered(`finalizado = ${completo}`);

      let aux = [];
      for (let i = 0; i < projetos.length; i++) {
        const element = projetos[i];
        const todasTarefas = realm
          .objects('Tarefas')
          .filtered(`projeto_id = ${element.id_projeto}`);

        const tarefaTrue = realm
          .objects('Tarefas')
          .filtered(`projeto_id = ${element.id_projeto} AND status = 2`);

        const tarefaFalse = realm
          .objects('Tarefas')
          .filtered(`projeto_id = ${element.id_projeto} AND status != 2`);
        let porcentagem = (tarefaTrue.length / todasTarefas.length) * 100;
        if (todasTarefas.length === 0) {
          porcentagem = 100;
        }
        let json = {
          id_projeto: element.id_projeto,
          nome: element.nome_projeto,
          tarefasPendentes: tarefaFalse.length,
          porcentagem: porcentagem,
        };
        aux.push(json);
      }
      setListaProjetos(aux);
    };
    try {
      getData();
    } catch (error) {
      console.log(error);
    }
  }, [completo, isFocused]);

  return (
    <ScrollView style={{flex: 1}}>
      <View
        style={{
          marginHorizontal: 19,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 41,
        }}>
        <Text
          style={{fontFamily: 'Poppins-Bold', color: 'black', fontSize: 18}}>
          Lista de Projetos
        </Text>
        <View />
      </View>
      <View style={styles.linha}>
        <TouchableOpacity
          style={[!completo ? styles.selected : styles.normal]}
          onPress={() => setcompleto(false)}>
          <Text style={[styles.selectedTxt, completo && {color: '#A29EB6'}]}>
            Incompletos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[completo ? styles.selected : styles.normal]}
          onPress={() => setcompleto(true)}>
          <Text style={[styles.selectedTxt, !completo && {color: '#A29EB6'}]}>
            Completos
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 30}}>
        {listaProjetos.map((v, i) => {
          return <HomeProjetoListComponent key={i} item={v} width={'90%'} />;
        })}
      </View>
      <Text></Text>
    </ScrollView>
  );
}
