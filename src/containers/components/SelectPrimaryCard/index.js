import React, {useState} from 'react';
import {Image, View, TouchableOpacity} from 'react-native';
import imagesConstants from '../../../constants/imagesConstants';
import {BoldText, RegularText} from '../Common';
import styles from './styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default props => {
  let {data, members} = props;

  return (
    <View onPress={props.onPressPrimaryMember} style={[styles.itemContainer]}>
      <View
        style={{
          margin: hp('1%'),
          flexDirection: 'row',
          padding: hp('0.5%'),

          marginTop: hp('1%'),
        }}>
        <View style={styles.profilePicSection}>
          <View style={styles.profilePicView}>
            <Image style={styles.profilePic} source={{uri: data?.photo}} />
          </View>
        </View>
        <View style={[styles.dataSection]}>
          <BoldText style={styles.nameText} title={data?.fullname} />
          <RegularText style={styles.emailText} title={data?.email} />
          <RegularText style={styles.ageText} title={`${data?.age} Year(s)`} />
        </View>
      </View>

      <View style={styles.footer}>
        {/* {members ? (
          <TouchableOpacity
            onPress={props.onShowMember}
            style={styles.membersSection}>
            <Image style={styles.memberImg} source={imagesConstants.people} />
            <RegularText style={styles.membersText} title={'Members'} />
          </TouchableOpacity>
        ) : null} */}
        <View style={styles.primaryUidView}>
          <RegularText style={styles.uhidText} title={'Primary UHID'} />
        </View>
      </View>
    </View>
  );
};
