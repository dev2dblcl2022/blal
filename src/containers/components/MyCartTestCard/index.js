import React, {useEffect, useState} from 'react';
import {Image, View, TouchableOpacity, FlatList} from 'react-native';
import colors from '../../../constants/colors';
import imagesConstants from '../../../constants/imagesConstants';
import {method} from '../../../services/NetworkRequest';
import NetworkRequestBlal, {
  blalServicesPoints,
} from '../../../services/NetworkRequestBlal';

import {BoldText, RegularText} from '../Common';
// import TestCard from '../TestCard';
import styles from './style';

export default props => {
  let {booking_member_tests, user_family_member} = props?.data;

  let cancel = props?.cancel;
  let length = props?.length;
  let index = props?.index;

  let bookingUser = user_family_member;
  let bookingTest = booking_member_tests;

  useEffect(() => {
    if (booking_member_tests) {
      getCartCollection(booking_member_tests[0]);
    }
  }, [booking_member_tests]);
  const getCartCollection = async data => {
    try {
      const requestConfig = {
        method: method.post,
        url: `${blalServicesPoints.blalUserServices.GetTestPackageDetails}?PanelId=${data.panel_id}&CityId=${data.city_id}&Id=${data.test_id}&Type=${data.test_type}`,
      };

      const response = await NetworkRequestBlal(requestConfig);

      if (response) {
        const {success_message, status_Code} = response;

        if (success_message && status_Code === 200) {
          props?.setCollectionType(response.data.HomeCollection);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View
      style={[
        styles.itemContainer,
        {
          borderBottomWidth: index === length ? 0 : 10,
          borderColor: 'rgba(0,0,0,0.10)',
        },
      ]}>
      <View style={[styles.selfSection]}>
        <View style={styles.rowHeader}>
          <View style={styles.headerNameSection}>
            <BoldText
              style={styles.selfNameText}
              title={bookingUser?.fullname}
            />
            <RegularText
              style={styles.ageText}
              title={`${bookingUser?.gender} ${bookingUser?.age}`}
            />
          </View>
          <View>
            <RegularText
              style={styles.selfText}
              title={bookingUser?.relation}
            />
          </View>
        </View>
      </View>

      {/* <View style={styles.separator} /> */}

      <View>
        <FlatList
          data={bookingTest}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => {
            return <View style={styles.separator} />;
          }}
          extraData={bookingTest}
          renderItem={({item}) => {
            // let fullItem = fullItemList.item;

            // let comingItem = fullItem;

            // let item = getPackageDetail(comingItem);

            return (
              // <TestCard
              //   onDeleteTest={() => props.onDeleteTest(item.id)}
              //   data={item}
              // />
              <View style={styles.testListItem}>
                <TouchableOpacity
                  onPress={() => props.onPressItem(item)}
                  style={styles.profilePicSection}>
                  <BoldText style={styles.nameText} title={item.test_name} />
                  {item.test_count ? (
                    <RegularText
                      style={styles.emailText}
                      title={`${item.test_count} Test included`}
                    />
                  ) : null}
                  <View style={styles.timeSection}>
                    <Image
                      style={{height: 10, width: 10}}
                      source={imagesConstants.camera}
                    />
                    {item.pre_test_info ? (
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image
                          style={{
                            height: 11,
                            width: 10.8,
                            tintColor: colors.app_theme_dark_green,
                          }}
                          source={imagesConstants.infoPre}
                        />
                        <RegularText
                          style={[
                            styles.hrsText,
                            {marginTop: 0, marginLeft: 5},
                          ]}
                          title={item.pre_test_info}
                        />
                      </View>
                    ) : null}
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => props.onPressItem(item)}
                  style={styles.dataSection}>
                  <BoldText
                    style={[styles.amountText, {textAlign: 'right'}]}
                    title={`${'\u20B9'} ${item.test_price}`}
                  />
                  <View style={styles.offSection}>
                    {item.mrp ? (
                      <RegularText
                        style={[
                          styles.amountTextTwo,
                          {
                            textAlign: 'right',
                            textDecorationLine: item.discount
                              ? 'line-through'
                              : 'none',
                          },
                        ]}
                        title={`${'\u20B9'} ${item.mrp}`}
                      />
                    ) : null}
                    {item.discount ? (
                      <RegularText
                        style={styles.percentText}
                        title={`${item.discount}%`}
                      />
                    ) : null}
                  </View>
                </TouchableOpacity>
                {cancel ? (
                  <TouchableOpacity
                    hitSlop={{left: 20, right: 20, top: 20, bottom: 20}}
                    onPress={() => props.onDeleteTest(item)}
                    style={styles.relationSection}>
                    <Image
                      style={styles.crossImg}
                      source={imagesConstants.cancelRed}
                    />
                  </TouchableOpacity>
                ) : null}
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};
