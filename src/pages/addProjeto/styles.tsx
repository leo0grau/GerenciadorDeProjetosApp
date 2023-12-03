import {StyleSheet, StatusBar} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 100,
    elevation: 10,
  },
  input2: {
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 100,
    elevation: 10,
    padding: 15,
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
  label: {
    marginTop: 30,
    marginLeft: 20,
    color: 'black',
    fontFamily: 'Poppins-Regular',
  },
});

export default styles;
