import React from 'react';
import {Image, View, TouchableOpacity} from 'react-native';
import imagesConstants from '../../../constants/imagesConstants';
import {BoldText, RegularText} from '../Common';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './style';

export default props => {
  let {image, title, timeAgo} = props?.data;
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.itemContainer}>
      <View style={styles.headSection}>
        <View style={{flex: 0.7, justifyContent: 'center'}}>
          <RegularText style={styles.cardTitleName} title={title} />
        </View>
        <View
          style={{flex: 0.3, alignItems: 'flex-end', justifyContent: 'center'}}>
          <RegularText style={styles.time} title={timeAgo} />
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image style={styles.img} source={{uri: image}} />
      </View>
      <View style={[styles.titleSection]}>
        {/* <RegularText
          style={styles.cardTitle}
          title={`${props.data?.description}...See More`}
        /> */}
      </View>
    </TouchableOpacity>
  );
};
