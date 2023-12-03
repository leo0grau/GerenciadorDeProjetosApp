import {View, Text, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import HomeProjetoListComponent from '../../components/homeProjeto';
import TarefasHomeComponent from '../../components/tarefaProjeto';
import {useNavigation} from '@react-navigation/native';
import getRealm from '../../database/realm';
export type Props = {
  id_tarefa: number;
  nome: string;
  tarefasPendentes: number;
  porcentagem: number;
  fotos: string[];
};

export default function HomePage() {
  const navigation: any = useNavigation();
  const [data, setData] = useState<any[]>([]);
  const [tarefa, setTarefa] = useState<any[]>([]);

  const renderItem = ({item}) => {
    return <HomeProjetoListComponent item={item} />;
  };

  useEffect(() => {
    const getData = async () => {
      const realm = await getRealm();

      setData([
        {
          id_tarefa: 1,
          nome: 'nome',
          tarefasPendentes: 12,
          porcentagem: 12,
          fotos: [],
        },
        {
          id_tarefa: 2,
          nome: 'nome',
          tarefasPendentes: 12,
          porcentagem: 12,
          fotos: [],
        },
        {
          id_tarefa: 3,
          nome: 'nome',
          tarefasPendentes: 12,
          porcentagem: 12,
          fotos: [],
        },
      ]);
      setTarefa([
        {
          id_tarefa: 1,
          nome: 'Tarefa 1',
          prazo: '16/04/2001',
          nomeProjeto: 'Projeto 1',
          status: 'Dentro da data',
          color: '#4b7be5',
        },
        {
          id_tarefa: 2,
          nome: 'Tarefa 2',
          prazo: '16/04/2001',
          nomeProjeto: 'Projeto 1',
          status: 'Atrasado',
          color: '#e54b7b',
        },
        {
          id_tarefa: 3,
          nome: 'Tarefa 3',
          prazo: '16/04/2001',
          nomeProjeto: 'Projeto 1',
          status: 'Hoje',
          color: '#7be54b',
        },
      ]);
    };
    try {
      getData();
    } catch (error) {
      console.log(error);
    }
  }, []);

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
          keyExtractor={v => '' + v.id_tarefa}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        <View style={styles.line}>
          <Text style={styles.titulo}>Tarefas Hoje</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ProjetosPage');
            }}>
            <Text style={styles.verTodos}>Ver Todos</Text>
          </TouchableOpacity>
        </View>
        {tarefa.map(v => {
          return <TarefasHomeComponent item={v} key={v.id_tarefa + ''} />;
        })}
        <View style={{height: 80}} />
      </ScrollView>
    </View>
  );
}
