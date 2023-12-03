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
});

export default styles;
