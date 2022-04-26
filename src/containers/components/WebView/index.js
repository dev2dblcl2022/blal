import React from 'react';
import {Image, View, TouchableOpacity} from 'react-native';

import styles from './style';
import {WebView} from 'react-native-webview';
import {ABOUT_DR_BLAL_LINK} from '../../../config/Setting';
export default props => {
  let url = props.url;

  return <WebView source={{uri: url}} />;
};
