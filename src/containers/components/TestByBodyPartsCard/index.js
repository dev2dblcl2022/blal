import React from 'react';
import {Image, View, TouchableOpacity} from 'react-native';
import imagesConstants from '../../../constants/imagesConstants';
import {BoldText, RegularText} from '../Common';

import styles from './style';

export default props => {
  let {Name} = props?.data;
  let blogs = props?.blogs;

  return (
    <TouchableOpacity onPress={props.onPress} style={styles.itemContainer}>
      <View style={{flex: 0.7, justifyContent: 'center', alignItems: 'center'}}>
        {blogs ? (
          <Image style={styles.blogImg} source={{uri: props.data?.image}} />
        ) : (
          <Image
            style={styles.img}
            source={{
              uri: props?.data?.Image,
            }}
          />
        )}
      </View>
      <View style={styles.titleSection}>
        <RegularText
          style={styles.cardTitle}
          title={blogs ? props.data.name : Name}
        />
      </View>
    </TouchableOpacity>
  );
};
