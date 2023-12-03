import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import DatePicker from 'react-native-date-picker';
import styles from './styles';
import ModalTarefa from './modalTarefa';
import getRealm from '../../database/realm';
import Toast from 'react-native-toast-message';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

export function formatarDataParaDDMMYYYY(data: Date) {
  // Garanta que 'data' seja um objeto Date
  if (!(data instanceof Date)) {
    console.error('O argumento fornecido não é um objeto Date.');
    return null;
  }

  // Obtém os componentes da data (dia, mês, ano)
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0'); // Meses são indexados de 0 a 11
  const ano = data.getFullYear();

  // Formata a data como "dd/mm/yyyy"
  const dataFormatada = `${dia}/${mes}/${ano}`;

  return dataFormatada;
}

export default function AddProjetoPage() {
  const [nome, setNome] = useState('');

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [date2, setDate2] = useState(new Date());
  const [open2, setOpen2] = useState(false);

  const [tarefas, setTarefas] = useState<any>([]);
  const [tarefaModal, setTarefaModal] = useState(false);
  const [indexId, setIndex] = useState(-1);

  const [loading, setLoading] = useState(false);
  const navigation: any = useNavigation();
  const handleSubmit = async (
    nome: string,
    desc: string,
    dataInicio: Date,
    dataFim: Date,
  ) => {
    try {
      // const realm = await getRealm();
      if (!nome || !desc || !dataInicio || !dataFim) {
        setTarefaModal(false);
        Toast.show({
          autoHide: true,
          text1: 'Campo Vazio',
          text2: 'Preencha todos os campos',
          type: 'error',
        });
        return;
      }
      let aux = JSON.parse(JSON.stringify(tarefas));
      console.log(aux, indexId);
      if (indexId !== -1) {
        aux[indexId] = {
          nome,
          desc,
          dataInicio: formatarDataParaDDMMYYYY(dataInicio),
          dataFim: formatarDataParaDDMMYYYY(dataFim),
        };
        setIndex(-1);
      } else {
        aux.push({
          nome,
          desc,
          dataInicio: formatarDataParaDDMMYYYY(dataInicio),
          dataFim: formatarDataParaDDMMYYYY(dataFim),
        });
      }

      setTarefas(aux);
      setTarefaModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveProjeto = async () => {
    try {
      setLoading(true);
      const realm = await getRealm();
      const idProjeto = new Date().getTime();
      if (!nome) {
        Toast.show({
          text1: 'Campo vazio',
          text2: 'Preecnha o nome do projeto',
          type: 'error',
        });
        setLoading(false);

        return;
      }

      realm.write(() => {
        realm.create('Projetos', {
          id_projeto: idProjeto,
          nome_projeto: nome,
          inicio: formatarDataParaDDMMYYYY(date),
          fim: formatarDataParaDDMMYYYY(date2),
          finalizado: false,
        });

        for (let i = 0; i < tarefas.length; i++) {
          const element = tarefas[i];

          realm.create('Tarefas', {
            id_tarefa: new Date().getTime(),
            nome_tarefa: nome,
            desc: element.desc,
            dataInicio: element.dataInicio,
            dataFim: element.dataFim,
            projeto_id: idProjeto,
            status: 0,
          });
        }
      });
      navigation.navigate('ProjetosPage');
    } catch (error) {
      setLoading(false);

      console.log(error);
    }
  };

  function handleRemove(index: number) {
    let aux = JSON.parse(JSON.stringify(tarefas));

    // Verifica se o índice é válido
    if (index < 0 || index >= aux.length) {
      return null;
    }

    // Retorna o elemento removido, se necessário
    setTarefas(aux);
  }
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Nome do Projeto</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={v => {
          setNome(v);
        }}
      />

      <Text style={styles.label}>Data de inicio</Text>
      <TouchableOpacity
        style={styles.input2}
        onPress={() => {
          setOpen(true);
        }}>
        <Text>{formatarDataParaDDMMYYYY(date)}</Text>
      </TouchableOpacity>
      <DatePicker
        modal
        mode="date"
        style={styles.input}
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />

      <Text style={styles.label}>Data de fim</Text>
      <TouchableOpacity
        style={styles.input2}
        onPress={() => {
          setOpen2(true);
        }}>
        <Text>{formatarDataParaDDMMYYYY(date2)}</Text>
      </TouchableOpacity>
      <DatePicker
        modal
        mode="date"
        style={styles.input}
        open={open2}
        date={date2}
        onConfirm={date => {
          setOpen2(false);
          setDate2(date);
        }}
        onCancel={() => {
          setOpen2(false);
        }}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 30,
          marginHorizontal: 20,
        }}>
        <Text style={[styles.label, {marginTop: 0, marginLeft: 0}]}>
          Tarefas
        </Text>
        <TouchableOpacity
          style={styles.addBadge}
          onPress={() => {
            setTarefaModal(true);
          }}>
          <Text style={styles.label2}>Adicionar Tarefa</Text>
        </TouchableOpacity>
      </View>
      {tarefas.map((v: any, i: number) => {
        return (
          <View style={styles.itemTarefa} key={i}>
            <Text>{v.nome}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  setIndex(i);
                  setTarefaModal(true);
                }}
                style={[styles.badge, {backgroundColor: 'green'}]}>
                <IonIcons name="pencil" size={20} color={'white'} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.badge}
                onPress={() => handleRemove(i)}>
                <IonIcons name="trash-outline" size={20} color={'white'} />
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
      <TouchableOpacity style={styles.btnSalvar} onPress={handleSaveProjeto}>
        {loading ? (
          <ActivityIndicator size={'large'} color={'white'} />
        ) : (
          <Text style={styles.salvarTxt}>Salvar</Text>
        )}
      </TouchableOpacity>
      <View style={{height: 100}} />
      <ModalTarefa
        isVisible={tarefaModal}
        setIsVisible={setTarefaModal}
        handleSubmit={handleSubmit}
        data={tarefas[indexId]}
      />
    </ScrollView>
  );
}
