import React, {useEffect, useState} from 'react';
import {Image, View, TouchableOpacity} from 'react-native';
import getStoredStateMigrateV4 from 'redux-persist/lib/integration/getStoredStateMigrateV4';
import imagesConstants from '../../../constants/imagesConstants';
import {BoldText, RegularText} from '../Common';
import styles from './style';

export default props => {
  let {booking_member_id, test_price} = props?.data;
  const [testData, setTestData] = useState({});
  // useEffect(() => {
  //   getData();
  // });

  // const getData = async () => {
  //   let data = await props.data;

  //   setTestData(data);
  // };

  return (
    <View style={styles.testListItem}>
      <View style={styles.profilePicSection}>
        <BoldText style={styles.nameText} title={booking_member_id} />
        <RegularText style={styles.emailText} title={'4 Test included'} />
        <View style={styles.timeSection}>
          <Image
            style={{height: 10, width: 10}}
            source={imagesConstants.camera}
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
          title={`Rs. ${testData.test_price}`}
        />
        <View style={styles.offSection}>
          <RegularText
            style={[styles.amountTextTwo, {textAlign: 'right'}]}
            title={`Rs. ${testData.TotalMRP}`}
          />
          <RegularText
            style={styles.percentText}
            title={`${testData.DiscountPercentage}%`}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={props.onDeleteTest}
        style={styles.relationSection}>
        <Image style={styles.crossImg} source={imagesConstants.cancelRed} />
      </TouchableOpacity>
    </View>
  );
};
