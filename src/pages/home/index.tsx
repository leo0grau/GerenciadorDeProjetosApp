import {View, Text, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import HomeProjetoListComponent from '../../components/homeProjeto';
import TarefasHomeComponent from '../../components/tarefaProjeto';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import getRealm from '../../database/realm';
import {converterParaFormatoDateAceito} from '../addProjeto/modalTarefa';
export type Props = {
  id_projeto: number;
  nome: string;
  tarefasPendentes: number;
  porcentagem: number;
  fotos: string[];
};

export default function HomePage() {
  const navigation: any = useNavigation();
  const [data, setData] = useState<any[]>([]);
  const [tarefa, setTarefa] = useState<any[]>([]);
  const isFocused = useIsFocused();
  const renderItem = ({item}) => {
    return <HomeProjetoListComponent item={item} />;
  };

  useEffect(() => {
    const getData = async () => {
      const realm = await getRealm();
      const projeto = realm.objects('Projetos').filtered(`finalizado = false`);
      const tarefasDeHoje = realm.objects('Tarefas').filtered(`status != 2`);

      let aux = [];
      let auxDiario = [];
      for (let i = 0; i < projeto.length; i++) {
        const element = projeto[i];
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

      for (let i = 0; i < tarefasDeHoje.length; i++) {
        const element: any = tarefasDeHoje[i];
        const projetoNome = realm
          .objects('Projetos')
          .filtered(`id_projeto = ${element.projeto_id}`);
        let status = '';
        let color = '';
        if (new Date() < converterParaFormatoDateAceito(element.dataFim)) {
          status = 'Dentro do prazo';
          color = '#4b7be5';
        } else {
          status = 'Atrasado ';
          color = '#e54b7b';
        }

        let json = {
          id_tarefa: element.id_tarefa,
          nome: element.nome_tarefa,
          prazo: element.dataFim,
          nomeProjeto: projetoNome[0].nome_projeto,
          status: status,
          color: color,
        };

        if (new Date() > converterParaFormatoDateAceito(element.dataInicio)) {
          auxDiario.push(json);
        }
      }
      setData(aux);
      setTarefa(auxDiario);
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
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.dia}>Bom dia</Text>
          <Text style={styles.nome}>Leonardo</Text>
        </View>
        <View />
      </View>
      <ScrollView>
        <View style={styles.line}>
          <Text style={styles.titulo}>Projetos</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ProjetosPage');
            }}>
            <Text style={styles.verTodos}>Ver Todos</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          renderItem={renderItem}
          data={data}
          keyExtractor={v => '' + v.id_projeto}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        <View style={styles.line}>
          <Text style={styles.titulo}>Tarefas Hoje</Text>
        </View>
        {tarefa.map(v => {
          return <TarefasHomeComponent item={v} key={v.id_tarefa + ''} />;
        })}
        <View style={{height: 80}} />
      </ScrollView>
    </View>
  );
}
