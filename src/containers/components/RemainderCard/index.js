import React from 'react';
import {Image, View, TouchableOpacity} from 'react-native';

import imagesConstants from '../../../constants/imagesConstants';
import {RegularText} from '../Common';
import styles from './style';

export default props => {
  let {title, body, is_readed} = props?.data;
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        styles.itemContainer,
        {backgroundColor: is_readed ? 'white' : 'rgba(0,0,0,0.10)'},
      ]}>
      <View style={styles.logoSection}>
        <View style={styles.imageView}>
          <Image style={styles.img} source={imagesConstants.notiBell} />
        </View>
      </View>
      <View style={styles.textSection}>
        <RegularText style={styles.headText} title={title} />
        <RegularText style={styles.messageText} title={body} />
      </View>
    </TouchableOpacity>
  );
};
