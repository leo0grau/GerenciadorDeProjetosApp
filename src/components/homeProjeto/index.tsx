import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import {Props} from '../../pages/home';
import {useNavigation} from '@react-navigation/native';
export default function HomeProjetoListComponent({
  item,
  width = 0,
}: {
  item: Props;
  width?: number | string;
}) {
  const navigation: any = useNavigation();
  function calcularTamanho(porcentagem: number) {
    // Verifica se a porcentagem está no intervalo de 0 a 100
    if (porcentagem < 0 || porcentagem > 100) {
      console.error('Porcentagem deve estar entre 0 e 100');
      return 0;
    }

    // Calcula o tamanho relativo a 98
    const tamanho = (porcentagem / 100) * 98;
    return tamanho;
  }
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('TarefasListPage', {
          id_projeto: item.id_projeto,
          nome: item.nome,
        });
      }}>
      <LinearGradient
        colors={['#0093E9', '#80D0C7']}
        angle={94}
        useAngle={true}
        style={[styles.linear, width ? {width: width} : false]}
        angleCenter={{x: 0.5, y: 0.5}}>
        <View style={styles.emcima}>
          <Text style={styles.titulo} numberOfLines={1}>
            {item.nome}
          </Text>
          <Text style={styles.pendente}>
            {item.tarefasPendentes} tarefas pendentes
          </Text>
        </View>
        <View style={styles.linhaBranca}>
          <Text style={styles.porcentagem}>{item.porcentagem}%</Text>
          <View style={styles.barAtras}>
            <LinearGradient
              colors={['#0093E9', '#80D0C7']}
              style={[
                styles.barFrente,
                {width: calcularTamanho(item.porcentagem)},
              ]}
            />
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}
