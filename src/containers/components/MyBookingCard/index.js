import React from 'react';
import {TouchableOpacity, View} from 'react-native';

import {LightText, RegularText} from '../Common';
import styles from './style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../constants/colors';

export default props => {
  let {
    payment_mode,
    address_id,
    total_amount,
    rated,
    booking_hash,
    LisBookId,
    collection_type,
    status,
    total_discount,
    final_amount,
    user_rating_number,
    total_member_amount,
    total_mrp,
    created_at,
    booking_date_time,
    pickup_charge,
  } = props?.data;

  let discount = Number(total_discount).toFixed(0);
  // const num1 = parseInt(total_member_amount);
  // const num2 = parseInt(pickup_charge);
  // const totalAmount = num1 + num2;

  return (
    <TouchableOpacity onPress={props.onViewMore} style={styles.bookingCard}>
      <View style={styles.bookingCardPartOne}>
        <View style={{flex: 1}}>
          {payment_mode === 'Pending' ? null : (
            <>
              <RegularText
                style={styles.bookingIdText}
                title={`#${LisBookId}`}
              />
              <View style={{marginTop: hp('1%')}}>
                <LightText style={styles.bookingIdLabel} title={'Booking ID'} />
              </View>
            </>
          )}
        </View>

        <View style={{flex: 1}}>
          <View
            style={
              status === 'Successful'
                ? styles.btnView
                : status === 'Cancelled'
                ? styles.grayBtnView
                : styles.btnView
            }>
            <RegularText style={styles.btnViewText} title={status} />
          </View>
        </View>
      </View>
      <View style={styles.cardPartTwo}>
        <View style={{flex: 1}}>
          <RegularText
            style={[
              styles.booingDateText,
              {fontSize: hp('2.5%'), color: colors.app_theme_dark_green},
            ]}
            title={props?.data?.user_family_member?.fullname}
          />
          {/* <View style={{marginTop: hp('1%')}}>
            <LightText style={styles.bookingIdLabel} title={'Date & Time'} />
          </View> */}
        </View>
        <View style={{flex: 1}}>
          {/* <RegularText
            style={styles.booingDateText}
            title={collection_type === 'Home' ? 'Home' : 'Lab'}
          />
          <View style={{marginTop: hp('1%')}}>
            <LightText
              style={styles.bookingIdLabel}
              title={'Collection Type'}
            />
          </View> */}
        </View>
      </View>
      <View style={styles.cardPartTwo}>
        <View style={{flex: 1}}>
          <View style={{marginTop: hp('1%')}}>
            <RegularText style={styles.booingDateText} title={created_at} />
          </View>
          <View>
            <LightText style={styles.bookingIdLabel} title={'Date & Time'} />
          </View>

          <View style={{marginTop: hp('1%')}}>
            <RegularText
              style={styles.booingDateText}
              title={
                collection_type === 'Lab'
                  ? booking_date_time.split(' ')[0]
                  : booking_date_time
              }
            />
          </View>
          <View>
            <LightText
              style={styles.bookingIdLabel}
              title={'Appointment Date and Time'}
            />
          </View>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <View style={{marginTop: hp('1%'), paddingRight: hp('2%')}}>
            <RegularText
              style={styles.booingDateText}
              title={collection_type === 'Home' ? 'Home' : 'Lab'}
            />
          </View>
          <View style={{paddingRight: hp('2%')}}>
            <LightText
              style={styles.bookingIdLabel}
              title={'Collection Type'}
            />
          </View>
        </View>
      </View>
      <View style={styles.cardPartTwo}>
        {collection_type === 'Home' ? (
          <View style={{flex: 1}}>
            <RegularText style={styles.bookingDateText} title={''} />
            {status === 'Confirmed' || status === 'Accepted' ? (
              <View style={{marginTop: hp('3.5%')}}>
                <TouchableOpacity
                  hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}
                  onPress={props.onCancelBooking}>
                  <LightText
                    style={styles.cancelBookingText}
                    title={'Cancel Booking'}
                  />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        ) : (
          <View style={{flex: 1}}>
            <RegularText style={styles.bookingDateText} title={''} />
            {status === 'Upcoming' ? (
              <View style={{marginTop: hp('3.5%')}}>
                <TouchableOpacity
                  hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}
                  onPress={props.onCancelBooking}>
                  <LightText
                    style={styles.cancelBookingText}
                    title={'Cancel Booking'}
                  />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        )}
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          {final_amount ? (
            <RegularText
              style={styles.bookingRateText}
              title={`${'\u20B9'} ${
                props.data.bookingAmount - props.data.total_member_discounted
              }`}
            />
          ) : null}
          <View
            style={{
              marginTop: hp('0.2%'),
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {/* {total_mrp ? (
              <LightText
                style={[
                  styles.bookingIdLabel,
                  {
                    textDecorationLine: Number(total_discount)
                      ? 'line-through'
                      : 'none',
                  },
                ]}
                title={`${'\u20B9'} ${total_mrp}`}
              />
            ) : null}
            {total_discount ? (
              <LightText
                style={styles.percentText}
                title={`${Number(total_discount).toFixed(0)}% off`}
              />
            ) : null} */}
          </View>
          <TouchableOpacity
            hitSlop={{left: 15, right: 15, top: 15, bottom: 15}}
            onPress={props.onViewMore}
            style={{marginTop: hp('2%')}}>
            <LightText style={styles.viewMoreText} title={'View More'} />
          </TouchableOpacity>
          {payment_mode === 'Pending' ? (
            <TouchableOpacity
              hitSlop={{left: 15, right: 15, top: 15, bottom: 15}}
              onPress={props.onPrescriptionPay}
              style={{
                marginTop: hp('2%'),
                borderRadius: 10,
                paddingHorizontal: hp('5%'),
                paddingVertical: hp('1%'),
                backgroundColor: colors.app_theme_light_green,
              }}>
              <LightText
                style={[styles.viewMoreText, {color: 'white'}]}
                title={'Pay Now'}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      {status === 'Approved' ? (
        <View
          hitSlop={{left: 15, right: 15, top: 15, bottom: 15}}
          style={{
            marginTop: hp('2%'),
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={props.onPressRate}>
            <LightText
              style={{
                fontSize: hp('2.5%'),
                color: 'white',
                backgroundColor: colors.app_theme_dark_green,
                paddingRight: hp('2%'),
                paddingLeft: hp('2%'),
                paddingHorizontal: hp('2%'),
                paddingVertical: hp('2%'),
                borderRadius: 10,
              }}
              title={'Rate Us'}
            />
          </TouchableOpacity>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};
