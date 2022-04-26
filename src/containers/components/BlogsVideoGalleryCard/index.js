import React from 'react';
import {Image, View, TouchableOpacity} from 'react-native';
import imagesConstants from '../../../constants/imagesConstants';
import {BoldText, RegularText} from '../Common';

import styles from './style';

export default props => {
  let {image, title, description} = props?.data;
  let screen = props?.home;
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.itemContainer}>
      <View style={{flex: 0.7}}>
        {screen ? (
          <Image style={styles.img} source={{uri: image}} />
        ) : (
          <Image style={styles.img} source={{uri: image}} />
        )}
      </View>
      <View style={[styles.titleSection]}>
        <RegularText
          numberOfLines={3}
          style={styles.cardTitle}
          title={props.data?.title}
        />
      </View>
    </TouchableOpacity>
  );
};
