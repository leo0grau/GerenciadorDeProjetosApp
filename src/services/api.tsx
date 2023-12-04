import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';

export const api = axios.create({
  // baseURL: 'http://192.168.0.107:3011',
  // baseURL: 'http://192.168.1.19:3011',
  //   baseURL: 'https://apigraumeet.dev12br.com',
  baseURL: 'http://192.168.1.16:3007',

  timeout: 10000,
});

export async function getConnection() {
  try {
    let isConnected;
    await NetInfo.fetch().then(async state => {
      isConnected = state.isConnected;
    });
    return isConnected;
  } catch (error) {
    console.log('Error while getting connection: ', error);
    return false;
  }
}
