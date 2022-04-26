import React from 'react';
import {Image, View, TouchableOpacity} from 'react-native';
import imagesConstants from '../../../constants/imagesConstants';
import {BoldText, RegularText} from '../Common';
import styles from './style';

export default props => {
  return (
    <TouchableOpacity style={styles.itemContainer}>
      <View style={styles.itemContainerInner}>
        <View style={styles.profilePicSection}>
          <RegularText style={styles.addressTypeText} title={'Home'} />
          <View style={styles.profilePicView}>
            <Image style={styles.profilePic} source={imagesConstants.house} />
          </View>
        </View>
        <View style={styles.dataSection}>
          <View style={styles.addressTextView}>
            <RegularText
              style={styles.testName}
              title={
                '31-B New Alfred Street Model Town, Mall Road Jaipur, Rajasthan'
              }
            />
          </View>
        </View>
        <View style={styles.relationSection}>
          <Image style={styles.tickImage} source={imagesConstants.tick} />
        </View>
      </View>
    </TouchableOpacity>
  );
};
