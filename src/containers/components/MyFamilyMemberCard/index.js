import React from 'react';
import {Image, View, TouchableOpacity} from 'react-native';
import imagesConstants from '../../../constants/imagesConstants';
import {BoldText, RegularText} from '../Common';
import styles from './style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../constants/colors';

export default props => {
  let {data, deActiveView, selection, emailIdShown} = props;

  let uhid = props?.uhid;

  let selectView = props?.selectView;

  return (
    <View
      style={[
        styles.itemContainer,
        {
          backgroundColor:
            data.uhid_link === 'primary' && emailIdShown
              ? colors.gray
              : 'white',
        },
      ]}>
      <View style={styles.innerSection}>
        <View style={styles.profilePicSection}>
          <View style={styles.profilePicView}>
            <Image style={styles.profilePic} source={{uri: data?.photo}} />
          </View>
        </View>
        <View style={styles.dataSection}>
          <BoldText style={styles.nameText} title={data?.fullname} />
          {emailIdShown ? (
            <RegularText style={styles.emailText} title={data?.email} />
          ) : null}
          <RegularText style={styles.ageText} title={`${data?.age}`} />
        </View>
        <View style={styles.relationSection}>
          <RegularText style={styles.relationText} title={data?.relation} />

          {selection && selectView ? (
            <View>
              {data?.selected ? (
                <TouchableOpacity
                  style={{
                    height: hp('5%'),
                    width: hp('5%'),
                    justifyContent: 'center',
                    alignItems: 'center',

                    borderColor: colors.gray,
                  }}
                  hitSlop={{left: 50, right: 50, top: 50, bottom: 50}}
                  onPress={props.onSelectPrimary}>
                  <Image
                    style={{height: hp('3%'), width: hp('3%')}}
                    source={imagesConstants.tick}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  hitSlop={{left: 50, right: 50, top: 50, bottom: 50}}
                  onPress={props.onSelectPrimary}
                  style={{
                    height: hp('5%'),
                    width: hp('5%'),
                    justifyContent: 'center',
                    alignItems: 'center',

                    borderColor: colors.gray,
                  }}>
                  <Image
                    style={{height: hp('3%'), width: hp('3%')}}
                    source={imagesConstants.blankcircle}
                  />
                </TouchableOpacity>
              )}
            </View>
          ) : null}
        </View>
      </View>
      {deActiveView ? (
        <View style={styles.footer}>
          {/* <View style={styles.membersSection}>
          <Image style={styles.memberImg} source={imagesConstants.people} />
          <RegularText style={styles.membersText} title={'Members'} />
        </View> */}

          <View style={[styles.primaryUidView, {backgroundColor: 'white'}]}>
            {data.uhid === uhid ? (
              <BoldText
                style={[
                  styles.uhidText,
                  {
                    color: colors.app_theme_dark_green,
                    fontSize: hp('2%'),
                    fontWeight: 'bold',
                  },
                ]}
                title={'Primary UHID'}
              />
            ) : null}
          </View>

          {data.uhid !== uhid ? (
            <TouchableOpacity
              onPress={props.onPressDeactivate}
              style={[
                styles.primaryUidView,
                {backgroundColor: colors.purplishGrey, borderRadius: 0},
              ]}>
              <RegularText style={styles.uhidText} title={'Deactivate'} />
            </TouchableOpacity>
          ) : null}
        </View>
      ) : null}
    </View>
  );
};
