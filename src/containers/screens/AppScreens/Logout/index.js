import React, {useContext, useEffect} from 'react';
import {View, Text} from 'react-native';
import {AuthContext} from '../../../../../context/context';

const index = () => {
  const signOut = useContext(AuthContext);

  // signOut();
  return signOut();
};

export default index;
