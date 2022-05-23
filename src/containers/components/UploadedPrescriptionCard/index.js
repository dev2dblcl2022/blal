import React from 'react';
import {TouchableOpacity, View} from 'react-native';

import {BoldText, LightText, RegularText} from '../Common';
import styles from './style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../constants/colors';

export default props => {
  let {
    id,
    collection_type,
    status,
    documents,
    url,
    user_rating_number,
    total_mrp,
    created_at,
  } = props?.data;
  ``;
  let documentsData = documents.split(',');
  let documentsLength = documentsData.length;

  return (
    <TouchableOpacity onPress={props.onViewMore} style={styles.bookingCard}>
      <View style={styles.bookingCardPartOne}>
        <View style={{flex: 1}}>
          <>
            <RegularText style={styles.bookingIdText} title={`#${id}`} />
            <View style={{marginTop: hp('1%')}}>
              <LightText
                style={styles.bookingIdLabel}
                title={'Prescription ID'}
              />
            </View>
          </>
        </View>
        <View style={{flex: 1}}>
          <View style={styles.btnView}>
            <RegularText style={styles.btnViewText} title={'Pending'} />
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
          <View>
            <LightText style={styles.bookingIdLabel} title={'Date & Time'} />
          </View>
          <View style={{marginTop: hp('1%')}}>
            <RegularText style={styles.booingDateText} title={created_at} />
          </View>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <View style={{paddingRight: hp('2%')}}>
            <LightText
              style={styles.bookingIdLabel}
              title={'Collection Type'}
            />
          </View>
          <View style={{marginTop: hp('1%'), paddingRight: hp('2%')}}>
            <RegularText
              style={styles.booingDateText}
              title={collection_type === 'Home' ? 'Home' : 'Lab'}
            />
          </View>
        </View>
      </View>
      <View style={styles.cardPartTwo}>
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

        {/* <View style={{flex: 1, alignItems: 'flex-end'}}>
          {final_amount ? (
            <RegularText
              style={styles.bookingRateText}
              title={`${'\u20B9'} ${final_amount}`}
            />
          ) : null}
          <View
            style={{
              marginTop: hp('0.2%'),
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {total_mrp ? (
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
            ) : null}
          </View> */}
        {/* <TouchableOpacity
            hitSlop={{left: 15, right: 15, top: 15, bottom: 15}}
            onPress={props.onViewMore}
            style={{marginTop: hp('2%')}}>
            <LightText style={styles.viewMoreText} title={'View More'} />
          </TouchableOpacity> */}
        {/* {payment_mode === 'Pending' ? (
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
          ) : null} */}
        {/* </View> */}
      </View>
      <View>
        <BoldText
          style={{
            fontWeight: 'bold',
            fontSize: hp('2.5%'),
            color: colors.app_theme_dark_green,
          }}
          title={'Prescriptions'}
        />
        <View>
          {documentsData.map(item => {
            return (
              <TouchableOpacity
                onPress={() => props.onPressPrescription(`${url}/${item}`)}>
                <RegularText
                  style={{
                    marginVertical: hp('1%'),
                    color: colors.app_theme_light_green,
                    textDecorationLine: 'underline',
                  }}
                  title={item}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </TouchableOpacity>
  );
};
