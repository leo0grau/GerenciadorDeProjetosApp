import {StyleSheet, StatusBar} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#051C2F',
    paddingTop: StatusBar.currentHeight,
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  containerHeader: {
    backgroundColor: '#051C2F',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
  },
  title: {
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    flex: 1,
    fontSize: 29,
  },
  btnBack: {},
});

export default styles;
