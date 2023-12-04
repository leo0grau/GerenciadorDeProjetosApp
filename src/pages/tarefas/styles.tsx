import {StyleSheet, StatusBar} from 'react-native';

const styles = StyleSheet.create({
  linha: {
    flexDirection: 'row',
    marginHorizontal: 64,
    justifyContent: 'space-between',
    marginTop: 30,
  },
  selected: {
    backgroundColor: 'black',
    borderRadius: 12,
    flex: 1,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  normal: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    flex: 1,
  },
  selectedTxt: {
    color: 'white',
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
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
  linha2: {
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
  btnSalvar: {
    backgroundColor: 'black',
    borderRadius: 100,
    elevation: 10,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    marginTop: 30,
  },
  salvarTxt: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: 'white',
  },
});

export default styles;
