import React from 'react';
import {Image, View, TouchableOpacity} from 'react-native';
import imagesConstants from '../../../constants/imagesConstants';
import {BoldText, RegularText} from '../Common';
import styles from './style';

export default props => {
  return (
    <TouchableOpacity style={styles.itemContainer}>
      <View style={styles.profilePicSection}>
        <BoldText style={styles.nameText} title={'Blood test'} />
        <RegularText style={styles.emailText} title={'1 Test included'} />
        <View style={styles.nameRow}>
          <Image
            style={{height: 10, width: 10, top: 2, marginRight: 2}}
            source={imagesConstants.info}
          />
          <RegularText
            style={styles.hrsText}
            title={'2-3 hrs fasting is required'}
          />
        </View>
      </View>
      <View style={styles.dataSection}>
        <BoldText
          style={[styles.amountText, {textAlign: 'right'}]}
          title={`Rs. 499`}
        />
        <View style={styles.offSection}>
          <RegularText
            style={[
              styles.amountTextTwo,
              {textAlign: 'right', textDecorationLine: 'line-through'},
            ]}
            title={`Rs. 799`}
          />
          <RegularText style={styles.percentText} title={`10%`} />
        </View>
      </View>
      <View style={styles.relationSection}>
        <Image style={styles.crossImg} source={imagesConstants.cancelRed} />
      </View>
    </TouchableOpacity>
  );
};
