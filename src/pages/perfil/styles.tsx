//

import {StyleSheet, StatusBar, Dimensions, Platform} from 'react-native';

const {width} = Dimensions.get('screen');
const styles = StyleSheet.create({
  titulo: {
    fontFamily: 'Poppins-Regular',
    fontSize: 22,
    color: 'black',
  },
  sub: {
    fontFamily: 'Poppins-Light',
    fontSize: 16,
    color: '#585858',
  },
  input: {
    backgroundColor: 'white',
    marginTop: 20,
    borderRadius: 100,
    elevation: 5,
    height: 64,
    paddingLeft: 31,
    justifyContent: 'center',
  },
  loginBtn: {
    backgroundColor: 'black',
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    borderRadius: 100,
  },
  loginBtn2: {
    borderWidth: 2,
    borderColor: 'black',
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    borderRadius: 100,
  },
  loginText: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  loginText2: {
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  esqueceu: {
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Poppins-Light',
    fontSize: 14,
    color: '#585858',
  },
  decorar: {
    textDecorationLine: 'underline',
    color: 'black',
    fontFamily: 'Poppins-Regular',
  },
  ou: {
    marginVertical: 25,
    color: 'black',
    fontFamily: 'Poppins-Light',
    textAlign: 'center',
  },
  criarBtn: {
    height: 64,
    backgroundColor: 'rgba(20, 20, 20, 0.10)',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 44,
  },
  criarConta: {
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
    textTransform: 'uppercase',
  },
  btnSocial: {
    backgroundColor: 'white',
    elevation: 10,
    borderRadius: 100,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default styles;
