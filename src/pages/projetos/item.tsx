import {View, Text} from 'react-native';
import React from 'react';

export default function ItemComponent({item}: any) {
  return (
    <View
      style={{
        marginHorizontal: 53,
        backgroundColor: 'white',
        elevation: 10,
        borderRadius: 16,
        padding: 24,
        marginBottom: 13,
      }}>
      <Text
        style={{color: '#1C1243', fontSize: 18, fontFamily: 'Poppins-Light'}}>
        {item.nome_projeto}
      </Text>
    </View>
  );
}
