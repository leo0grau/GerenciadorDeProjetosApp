import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './styles';
import getRealm from '../../database/realm';
import {useIsFocused} from '@react-navigation/native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {converterParaFormatoDateAceito} from '../addProjeto/modalTarefa';
export default function TarefasListPage({navigation, route}: any) {
  const [tarefas, setTarefas] = useState([]);
  const [completo, setcompleto] = useState(false);
  const isFocused = useIsFocused();
  useEffect(() => {
    const getData = async () => {
      const realm = await getRealm();
      const tarefasBanco: any = realm
        .objects('Tarefas')
        .filtered(
          `projeto_id = ${route.params.id_projeto} AND status = ${
            completo ? 2 : 0
          } `,
        );

      setTarefas(tarefasBanco);
    };
    try {
      if (isFocused) {
        getData();
      } else {
        setTarefas([]);
        setcompleto(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, [route.params.id_projeto, isFocused, completo]);

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
          adjustsFontSizeToFit
          numberOfLines={2}
          style={{fontFamily: 'Poppins-Bold', color: 'black', fontSize: 28}}>
          {route?.params?.nome}
        </Text>
        <Text
          style={{fontFamily: 'Poppins-Bold', color: 'black', fontSize: 18}}>
          Lista de Tarefas
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
        {tarefas.map((v: any, i) => {
          let status = '';
          let cor = '';

          if (new Date() < converterParaFormatoDateAceito(v.dataFim)) {
            status = 'Dentro do prazo';
            cor = '#4b7be5';
          } else {
            status = 'Atrasado ';
            cor = '#e54b7b';
          }

          return (
            <TouchableOpacity
              style={styles.container}
              key={i}
              onPress={() => {
                navigation.navigate('ItemTarefasPage', {
                  id_tarefa: v.id_tarefa,
                });
              }}>
              <Text style={styles.titulo} numberOfLines={1}>
                {v.nome_tarefa}
              </Text>
              <View style={styles.linha2} />
              <View style={[styles.linear, {justifyContent: 'space-between'}]}>
                <View style={styles.linear}>
                  <IonIcons name="stopwatch-outline" color={cor} size={30} />
                  <Text>{v.dataFim}</Text>
                </View>
                <View style={[styles.dentroData, {backgroundColor: cor}]}>
                  <Text style={styles.txtDentro}>{status}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <Text></Text>
    </ScrollView>
  );
}
