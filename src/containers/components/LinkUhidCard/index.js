import React from 'react';
import {Image, View, TouchableOpacity} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import colors from '../../../constants/colors';
import imagesConstants from '../../../constants/imagesConstants';
import {BoldText, RegularText} from '../Common';
import styles from './style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default props => {
  let {data, selection} = props;
  if (data.uhid_link === 'linked') {
    return (
      <View style={{flexDirection: 'row', marginRight: hp('2%')}}>
        <View style={{flex: 0.01, alignItems: 'flex-end'}}>
          <View style={{backgroundColor: colors.black, width: 1, flex: 1}} />
        </View>
        <View
          style={{
            flex: 0.05,
            backgroundColor: colors.black,
            height: 1,
            alignSelf: 'center',
          }}
        />
        <View style={styles.itemContainer}>
          <View style={styles.profilePicSection}>
            <View style={styles.profilePicView}>
              <Image style={styles.profilePic} source={{uri: data.photo}} />
            </View>
          </View>
          <View style={styles.dataSection}>
            <BoldText style={styles.nameText} title={data.fullname} />
            <RegularText style={styles.emailText} title={data.email} />
            <RegularText style={styles.ageText} title={`${data.age} Year(s)`} />
          </View>
          <View style={styles.relationSection}>
            <RegularText style={styles.relationText} title={data.relation} />
            {/* <Image source={imagesConstants.blankcircle} /> */}
            {selection ? (
              <View>
                {data?.selected ? (
                  <TouchableOpacity
                    onPress={props.onSelectLinkedRemove}
                    style={{
                      height: hp('2%'),
                      width: hp('2%'),
                      borderRadius: hp('1%'),
                      backgroundColor: colors.app_theme_light_green,
                    }}
                  />
                ) : (
                  <TouchableOpacity onPress={props.onSelectLinkedRemove}>
                    <Image source={imagesConstants.blankcircle} />
                  </TouchableOpacity>
                )}
              </View>
            ) : null}
          </View>
        </View>
      </View>
    );
  } else {
    return null;
  }
};
