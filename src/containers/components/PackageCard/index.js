import React from 'react';

import {Image, View, TouchableOpacity} from 'react-native';
import colors from '../../../constants/colors';
import imagesConstants from '../../../constants/imagesConstants';
import {BoldText, RegularText} from '../Common';
import styles from './style';

export default props => {
  let {
    Id,

    NAME,
    Description,
    No_of_dependent,
    CardValid,
    CardValidity,
    Amount,
  } = props.data;
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity style={styles.profilePicView}>
        <Image style={styles.profilePic} source={{uri: props?.data.Image}} />
      </TouchableOpacity>

      <View style={styles.dataSection}>
        <View style={{flex: 0.7}}>
          <BoldText style={styles.nameText} title={NAME} />
          <RegularText
            style={styles.emailText}
            title={`${'\u20B9'} ${Amount}`}
          />
        </View>
        <View
          style={{flex: 0.3, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity onPress={props.onCardBuy} style={styles.buyNowBtn}>
            <BoldText style={styles.buyNowText} title={'Buy Now'} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
