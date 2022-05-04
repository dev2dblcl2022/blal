import React from 'react';

import {Image, View, TouchableOpacity} from 'react-native';
import colors from '../../../constants/colors';
import imagesConstants from '../../../constants/imagesConstants';
import {BoldText, RegularText} from '../Common';
import styles from './style';

export default props => {
  let {Id, NAME, title, file, CardValid, CardValidity, Amount, timeAgo} =
    props.data;
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={props.onPress} style={styles.profilePicView}>
        <Image style={styles.profilePic} source={{uri: file}} />
      </TouchableOpacity>
      <TouchableOpacity onPress={props.onPress} style={styles.dataSection}>
        <View style={{flex: 0.7}}>
          <BoldText style={styles.nameText} title={title} />
        </View>
        <View
          style={{flex: 0.3, alignItems: 'center', justifyContent: 'center'}}>
          {/* <TouchableOpacity onPress={props.onCardBuy} style={styles.buyNowBtn}> */}
          <BoldText style={styles.buyNowText} title={timeAgo} />
          {/* </TouchableOpacity> */}
        </View>
      </TouchableOpacity>
    </View>
  );
};
