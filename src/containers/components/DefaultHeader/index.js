import React from 'react';
import {Image, View, TouchableOpacity} from 'react-native';
import imagesConstants from '../../../constants/imagesConstants';

import {BoldText} from '../Common';

import styles from './styles';

export default (props, navigation) => {
  return props.bgHeader == false ? (
    <TouchableOpacity
      hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}
      onPress={props.onBack}
      style={styles.backContainer_trasparent}>
      <Image source={imagesConstants.backGreen} />
    </TouchableOpacity>
  ) : (
    <View style={[props.style, styles.container]}>
      <TouchableOpacity
        hitSlop={{left: 15, right: 15, top: 15, bottom: 15}}
        onPress={props.onBack}
        style={styles.backContainer}>
        <Image
          // style={{height: 10, width: 10}}
          source={imagesConstants.backWhite}
        />
      </TouchableOpacity>
      <View style={styles.headerContainer}>
        <BoldText style={styles.headerTitle} title={props.title} />
      </View>
      <TouchableOpacity style={styles.backContainer} />
    </View>
  );
};
