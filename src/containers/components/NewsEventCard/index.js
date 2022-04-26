import React from 'react';
import {Image, View, TouchableOpacity} from 'react-native';
import imagesConstants from '../../../constants/imagesConstants';
import {BoldText, RegularText} from '../Common';

import styles from './style';

export default props => {
  let {file, title} = props?.data;
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.itemContainer}>
      <View style={{flex: 0.7}}>
        <Image style={styles.img} source={{uri: file}} />
      </View>
      <View style={[styles.titleSection]}>
        <RegularText style={styles.cardTitle} title={title} />
      </View>
    </TouchableOpacity>
  );
};
