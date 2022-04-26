import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {AuthContext} from '../../../../../context/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
const index = () => {
  const {intro, signUp} = React.useContext(AuthContext);

  const onSubmit = async () => {
    await AsyncStorage.setItem('Intro', 'done');
    signUp(null, null);
  };
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <TouchableOpacity onPress={onSubmit}>
        <Text>{'Intro last Screen'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default index;
