import React from 'react';
import {Image, View, TouchableOpacity} from 'react-native';
import imagesConstants from '../../../constants/imagesConstants';
import {BoldText, RegularText} from '../Common';
import style from './style';

import styles from './style';

export default props => {
  let {image, title, subtitle} = props?.data;
  return (
    // <TouchableOpacity style={styles.itemContainer}>
    //   <View style={styles.imgSection}>
    //     <Image style={styles.img} source={imagesConstants.award} />
    //   </View>
    //   <View style={[styles.titleSection]}>
    //     <RegularText
    //       numberOfLines={2}
    //       style={styles.cardTitle}
    //       title={props.data?.name}
    //     />
    //   </View>
    // </TouchableOpacity>
    <View style={styles.itemContainer}>
      <View style={styles.imgSection}>
        <Image style={styles.img} source={{uri: image}} />
      </View>
      <View style={style.titleSection}>
        <RegularText
          numberOfLines={3}
          style={styles.cardTitle}
          title={`${title} ${subtitle}`}
        />
      </View>
    </View>
  );
};
