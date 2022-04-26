import React from 'react';
import {Image, View, TouchableOpacity} from 'react-native';
import colors from '../../../constants/colors';
import imagesConstants from '../../../constants/imagesConstants';
import {BoldText, RegularText} from '../Common';
import styles from './style';

export default props => {
  let {
    NAME,
    Rate,
    DiscountPercentage,
    ReportGenerationTime,
    PreTestInfo,
    TotalMRP,
    TestType,
  } = props?.data;
  let type = props?.type;
  let imageType = props?.imageType;

  let testCountArray = [];

  if (props?.data.TestType === 'Test') {
    if (props?.data.ParameterName) {
      let data = props?.data.ParameterName;
      let testArray = data.split('#');
      if (data) {
        if (testArray.length) {
          let newArr = testArray.map(item => {
            return {Investigation: item, ParameterName: ''};
          });
          testCountArray = newArr;
        } else {
          testCountArray = {
            Investigation: props?.data.ParameterName,
            ParameterName: '',
          };
        }
      } else {
        testCountArray = [];
      }

      // setTestIncludedTest(newArr);
    } else {
      testCountArray = [];
    }
  }

  // console.log(
  //   'hello',
  //   `https://lims.blallab.com/ExceUploadApp/AppImages/${imageType}/${NAME}.jpg`,
  // );
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.itemContainer}>
      <View style={styles.profilePicSection}>
        <Image
          style={styles.img}
          source={{
            uri: props?.data.Image,
          }}
        />
      </View>

      <View style={styles.dataSection}>
        <BoldText style={styles.testNameText} title={NAME} />
        {/* {props.data.TestType === 'Test' && testCountArray.length ? (
          <RegularText
            style={styles.addressText}
            title={`${testCountArray.length} test included`}
          />
        ) : null}
        {props.data.TestType === 'Package' ? (
          <RegularText
            style={styles.addressText}
            title={`${testCountArray.length} test included`}
          />
        ) : null} */}
        <View style={styles.reportGenTimeView}>
          {/* <BoldText
            style={styles.testInclude}
            title={'Blood Test, Blood Pressure and 8 more'}
          /> */}
        </View>
        <View style={styles.reportGenTimeView}>
          <RegularText
            style={styles.addressText}
            title={'Report Generation Time'}
          />
        </View>

        <View style={styles.amountSection}>
          {/* <BoldText style={styles.timeText} title={'8-10 hours'} /> */}
          <BoldText style={styles.timeText} title={ReportGenerationTime} />
        </View>
        {PreTestInfo ? (
          <View style={[styles.timeSection, {flexDirection: 'row'}]}>
            <Image
              style={{
                height: 11,
                width: 11,
                marginTop: 5,
                tintColor: colors.app_theme_dark_green,
              }}
              source={imagesConstants.infoPre}
            />
            <RegularText
              style={[styles.hrsText, {marginLeft: 5, marginTop: 4}]}
              title={PreTestInfo}
            />
          </View>
        ) : null}
      </View>

      <View style={styles.amountRightSection}>
        <BoldText style={styles.testNameText} title={`${'\u20B9'} ${Rate}`} />
        <View style={styles.offSection}>
          <RegularText
            style={[styles.amountTextTwo, {textAlign: 'right'}]}
            title={TotalMRP}
          />
          {DiscountPercentage && DiscountPercentage !== '0' ? (
            <RegularText
              style={styles.percentText}
              title={`${'\u20B9'} ${DiscountPercentage}%off`}
            />
          ) : null}
        </View>
      </View>
      <View style={{position: 'absolute', top: -2, left: 0}}>
        {TestType === 'Test' ? (
          <Image source={imagesConstants.testCorner} />
        ) : (
          <Image source={imagesConstants.packageCorner} />
        )}
      </View>
    </TouchableOpacity>
  );
};
