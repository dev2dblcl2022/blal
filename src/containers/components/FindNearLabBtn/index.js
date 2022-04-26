import React from 'react';
import {Image, View, TouchableOpacity} from 'react-native';

import imagesConstants from '../../../constants/imagesConstants';
import {RegularText} from '../Common';
import styles from './style';

export default props => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.findNearByLabsBtn}>
      <View style={styles.locationPinSection}>
        <Image
          style={styles.locationImg}
          source={imagesConstants.whiteLocationPin}
        />
      </View>
      <View style={styles.textSection}>
        <RegularText style={styles.btnText} title={'Find Nearby Labs'} />
      </View>
      <View style={styles.arrowSection}>
        <View style={styles.arrowCircle}>
          <Image
            style={{height: 20, width: 20}}
            source={imagesConstants.arrowRight}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
