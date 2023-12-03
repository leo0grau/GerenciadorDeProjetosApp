import {StyleSheet, StatusBar} from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 153,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 10,
    marginHorizontal: 12,
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingTop: 38,
  },
  titulo: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#363942',
  },
  projeto: {
    fontFamily: 'Poppins-Light',
    fontSize: 12,
  },
  linha: {
    backgroundColor: '#BFBFBF',
    height: 1,
    borderRadius: 100,
    opacity: 0.5,
    marginTop: 15,
    marginBottom: 10,
  },
  linear: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dentroData: {
    backgroundColor: '#4B7BE5',

    padding: 8,
    borderRadius: 100,
  },
  txtDentro: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
  },
});

export default styles;
