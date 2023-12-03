import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Modal from 'react-native-modal';
import styles from './styles';
import DatePicker from 'react-native-date-picker';
import {formatarDataParaDDMMYYYY} from '.';
interface Props {
  isVisible: boolean;
  setIsVisible: (visivel: boolean) => void;
  handleSubmit: any;
  data: any;
}

function converterParaFormatoDateAceito(dataString: string) {
  // Divide a string nos caracteres "/"
  const partes = dataString.split('/');

  // Reorganiza as partes para o formato "mm/dd/yyyy"
  const dia = parseInt(partes[0], 10);
  const mes = parseInt(partes[1], 10); // Meses são indexados de 0 a 11 no objeto Date
  const ano = parseInt(partes[2], 10);

  // Cria um objeto Date com os componentes da data
  const dataConvertida = new Date(ano, mes - 1, dia);

  // Verifica se a data é válida

  return dataConvertida;
}
export default function ModalTarefa({
  isVisible,
  setIsVisible,
  handleSubmit,
  data,
}: Props) {
  const [nome, setNome] = useState('');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [date2, setDate2] = useState(new Date());
  const [open2, setOpen2] = useState(false);
  const close = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    if (data) {
      setNome(data.nome);
      setDesc(data.desc);

      setDate(converterParaFormatoDateAceito(data.dataInicio));
      setDate2(converterParaFormatoDateAceito(data.dataFim));
    } else {
      setNome('');
      setDesc('');
      setDate(new Date());
      setDate2(new Date());
    }
  }, [isVisible]);

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={close}
      backdropTransitionOutTiming={0}
      onBackButtonPress={close}
      backdropOpacity={0.8}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}>
      <ScrollView>
        <View style={styles.modalContainer}>
          <Text style={styles.label}>Nome da tarefa</Text>
          <TextInput
            style={styles.input}
            value={nome}
            onChangeText={v => {
              setNome(v);
            }}
          />

          <Text style={styles.label}>Descrição da tarefa</Text>
          <TextInput
            multiline
            style={styles.input}
            value={desc}
            onChangeText={v => {
              setDesc(v);
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

          <TouchableOpacity
            style={styles.btnSalvar}
            onPress={() => {
              handleSubmit(nome, desc, date, date2);
            }}>
            <Text style={styles.salvarTxt}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Modal>
  );
}
