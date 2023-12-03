import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import DatePicker from 'react-native-date-picker';
import styles from './styles';

function formatarDataParaDDMMYYYY(data: Date) {
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
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Nome do Projeto</Text>
      <TextInput style={styles.input} />

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

      <Text style={styles.label}>Tarefas</Text>

      <TouchableOpacity style={styles.btnSalvar}>
        <Text style={styles.salvarTxt}>Salvar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
