import {StyleSheet, StatusBar} from 'react-native';

const styles = StyleSheet.create({
  linear: {
    height: 150,
    borderRadius: 12,
    marginLeft: 21,
    elevation: 10,
    width: 203,
    marginBottom: 50,
  },
  linhaBranca: {
    backgroundColor: 'white',
    height: 59,
    width: '100%',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    padding: 18,
  },
  emcima: {
    height: 91,
    padding: 18,
  },
  titulo: {
    fontFamily: 'Poppins-Regular',
    color: 'white',
    fontSize: 16,
  },
  pendente: {
    marginBottom: 8,
    fontSize: 12,
    fontFamily: 'Poppins-Light',
    color: 'white',
  },
  barAtras: {
    width: 98,
    backgroundColor: '#EBEBEB',
    height: 2,
    borderRadius: 100,
  },
  barFrente: {
    height: 2,
    borderRadius: 100,
  },
  porcentagem: {
    color: '#363942',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  },
});

export default styles;
