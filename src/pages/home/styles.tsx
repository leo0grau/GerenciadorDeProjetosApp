import {StyleSheet, StatusBar} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    padding: 34,
    backgroundColor: 'black',
  },
  dia: {
    fontSize: 14,
    color: 'white',
    fontFamily: 'Poppins-Light',
  },
  nome: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
  },
  line: {
    padding: 21,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titulo: {
    color: '#363942',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
  },
  verTodos: {
    fontSize: 14,
    fontFamily: 'Poppins-Light',
  },
});

export default styles;
