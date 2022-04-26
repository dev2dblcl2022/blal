import React from 'react';
import {Image, View, TouchableOpacity} from 'react-native';
import imagesConstants from '../../../constants/imagesConstants';
import {BoldText, RegularText} from '../Common';
import styles from './style';

export default props => {
  return (
    <View style={styles.itemSection}>
      <RegularText
        style={styles.instructionText}
        title={
          '1. Any Lab request.View our request here.We will try our best to convey it.'
        }
      />
    </View>
  );
};
