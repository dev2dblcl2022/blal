import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import {WebView} from '../../../components';

const index = props => {
  return (
    <View style={{flex: 1, backgroundColor: 'red'}}>
      <WebView url={props.route.params.url} />
    </View>
  );
};

export default index;
