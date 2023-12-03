import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';

export default function ProjetosPage() {
  const [completo, setcompleto] = useState(false);
  return (
    <View>
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

      <Text>Projetos</Text>
    </View>
  );
}
