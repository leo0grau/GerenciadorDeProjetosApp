import {View, Text, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import HomeProjetoListComponent from '../../components/homeProjeto';
import TarefasHomeComponent from '../../components/tarefaProjeto';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import getRealm from '../../database/realm';
import {converterParaFormatoDateAceito} from '../addProjeto/modalTarefa';
import {api, getConnection} from '../../services/api';
import {formatarDataParaDDMMYYYY} from '../addProjeto';
import messaging from '@react-native-firebase/messaging';

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
  const [usuario, setUsuario] = useState('');
  const isFocused = useIsFocused();
  const renderItem = ({item}) => {
    return <HomeProjetoListComponent item={item} />;
  };

  useEffect(() => {
    const getData = async () => {
      const realm = await getRealm();
      const user: any = realm.objects('User');
      if (await getConnection()) {
        const result = await api.post('projetos/getProjetos', {
          id_user: user[0].id_user,
        });
        const fcmToken = await messaging().getToken();
        await api.post('user/updateUser', {id_user: user[0].id_user, fcmToken});
        for (let i = 0; i < result.data.length; i++) {
          const element = result.data[i];
          let projeto = element.projeto;
          realm.write(() => {
            let inicio: any = projeto.inicio.split('T')[0].split('-');
            let fim = projeto.fim.split('T')[0].split('-');

            inicio = `${inicio[2]}/${inicio[1]}/${inicio[0]}`;

            fim = `${fim[2]}/${fim[1]}/${fim[0]}`;

            console.log();

            realm.create(
              'Projetos',
              {
                id_projeto: projeto.id_projeto,
                nome_projeto: projeto.nome_projeto,
                inicio: inicio,
                fim: fim,
                finalizado: false,
                usuario_criador: projeto.usuario_criador,
              },
              true,
            );

            for (let i2 = 0; i2 < element.tarefas.length; i2++) {
              const element2 = element.tarefas[i2];

              realm.create(
                'Tarefas',
                {
                  id_tarefa: element2.id_tarefa,
                  nome_tarefa: element2.nome_tarefa,
                  desc: element2.descricao,
                  dataInicio: element2.dataInicio,
                  dataFim: element2.dataFim,
                  projeto_id: element2.projeto_id,
                  status: element2.status,
                },
                true,
              );
            }
          });
        }
      }

      setUsuario(user[0].name);
      const projeto = realm.objects('Projetos').filtered('finalizado = false');
      const tarefasDeHoje = realm.objects('Tarefas').filtered('status != 2');

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
          <Text style={styles.nome}>{usuario}</Text>
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
