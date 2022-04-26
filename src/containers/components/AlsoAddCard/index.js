import React from 'react';
import {Image, View, TouchableOpacity} from 'react-native';
import imagesConstants from '../../../constants/imagesConstants';
import {BoldText, RegularText} from '../Common';
import styles from './style';

export default props => {
  let {
    NAME,

    PackageTestList,
    Rate,
    DiscountPercentage,
    TotalMRP,
  } = props?.data;

  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemContainerInner}>
        <TouchableOpacity
          onPress={props.onPress}
          style={styles.profilePicSection}>
          <View style={styles.profilePicView}>
            <Image style={styles.profilePic} source={{uri: props.data.Image}} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.onPress} style={styles.dataSection}>
          <RegularText numberOfLines={2} style={styles.testName} title={NAME} />
          {PackageTestList?.length > 0 ? (
            <RegularText
              style={styles.emailText}
              title={`${PackageTestList.length} Test Included`}
            />
          ) : null}
        </TouchableOpacity>
        <View style={styles.relationSection}>
          <TouchableOpacity onPress={props.onPress} style={styles.rateSection}>
            <View style={styles.amountSection}>
              {Rate ? (
                <BoldText
                  style={styles.amountText}
                  title={`${'\u20B9'} ${Rate}`}
                />
              ) : null}
              {TotalMRP ? (
                <RegularText style={styles.amountCutText} title={TotalMRP} />
              ) : null}
            </View>

            {DiscountPercentage ? (
              <BoldText
                style={styles.presentText}
                title={`${DiscountPercentage}% off`}
              />
            ) : null}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.onPressAdd(props.data)}
            style={styles.bookNowSection}>
            <BoldText style={styles.bookNowText} title={'Add'} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
