import {View, Text} from 'react-native';
import React from 'react';

export default function LogoComponent() {
  return (
    <View>
      <Text
        style={{
          fontFamily: 'Poppins-Bold',
          color: 'black',
          textAlign: 'center',
          fontSize: 30,
        }}>
        Taskfy
      </Text>
    </View>
  );
}
