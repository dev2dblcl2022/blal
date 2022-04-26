import React from 'react';
import {Image, View, TouchableOpacity} from 'react-native';

import {BoldText, RegularText} from '../Common';
import styles from './style';

export default props => {
  let {
    NAME,
    packageWiseTestListModels,
    PackageTestList,
    Rate,
    DiscountPercentage,
    TotalMRP,
  } = props?.data;

  // console.log(
  //   'homeimage',
  //   `https://lims.blallab.com/ExceUploadApp/AppImages/Package/${NAME}.jpg`,
  // );

  return (
    <TouchableOpacity onPress={props.onPress} style={styles.itemContainer}>
      <View style={styles.itemContainerInner}>
        <View style={styles.profilePicSection}>
          <View style={styles.profilePicView}>
            {/* <Image
              style={styles.profilePic}
              source={{
                uri: `https://lims.blallab.com/ExceUploadApp/AppImages/Package/${NAME}.jpg`,
              }}
            /> */}
            <Image
              style={styles.profilePic}
              source={{uri: props?.data.Image}}
            />
          </View>
        </View>
        <View style={styles.dataSection}>
          <View style={styles.packageNameSection}>
            <RegularText
              numberOfLines={2}
              style={styles.testName}
              title={NAME}
            />
          </View>

          {PackageTestList?.length > 0 ? (
            <RegularText
              style={styles.emailText}
              title={`${PackageTestList.length} Test Included`}
            />
          ) : null}
        </View>
        <View style={styles.relationSection}>
          <View style={styles.rateSection}>
            <View style={styles.amountSection}>
              <BoldText style={styles.amountText} title={Rate} />
              <RegularText
                style={[
                  styles.amountCutText,
                  {
                    textDecorationLine: DiscountPercentage
                      ? 'line-through'
                      : 'none',
                  },
                ]}
                title={TotalMRP}
              />
            </View>

            <BoldText
              style={styles.presentText}
              title={`${DiscountPercentage}% off`}
            />
          </View>
          <View style={styles.bookNowSection}>
            <BoldText style={styles.bookNowText} title={'Book Now'} />
          </View>
        </View>
        <View style={styles.bestSellerSection}>
          <RegularText style={styles.bestSellerText} title={'Best Seller'} />
        </View>
      </View>
    </TouchableOpacity>
  );
};
