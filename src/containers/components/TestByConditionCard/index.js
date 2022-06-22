import React from 'react';
import {Image, View, TouchableOpacity} from 'react-native';
import imagesConstants from '../../../constants/imagesConstants';
import {BoldText, RegularText} from '../Common';
import styles from './style';

export default props => {
  let {Name} = props?.data;

  return (
    <TouchableOpacity onPress={props.onPress} style={[styles.itemContainer]}>
      <View style={{flex: 0.2}}>
        <Image
          style={styles.img}
          source={{
            uri: props?.data?.Image,
          }}
        />
      </View>
      <View style={{flex: 0.8}}>
        <RegularText style={styles.cardTitle} title={Name} />
      </View>
    </TouchableOpacity>
  );
};
