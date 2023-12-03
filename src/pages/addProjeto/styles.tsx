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
    paddingLeft: 20,
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
  label2: {
    color: 'white',
    fontFamily: 'Poppins-Regular',
  },
  addBadge: {
    backgroundColor: 'black',
    padding: 5,
    borderRadius: 100,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingBottom: 30,
  },
  itemTarefa: {
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 10,
    padding: 10,
    marginTop: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 5,
    marginLeft: 10,
  },
});

export default styles;
