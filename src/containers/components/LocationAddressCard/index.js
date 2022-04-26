import React from 'react';
import {Image, View, TouchableOpacity} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../../constants/colors';
import imagesConstants from '../../../constants/imagesConstants';
import {BoldText, RegularText} from '../Common';
import styles from './style';

export default props => {
  let {
    area1,
    area2,
    number,
    city,
    state,
    type,
    pincode,
    selected,
    primary_address,
  } = props?.data;
  return (
    <TouchableOpacity onPress={props.onSelect} style={styles.itemContainer}>
      <View style={styles.itemContainerInner}>
        <View style={styles.profilePicSection}>
          <RegularText style={styles.addressTypeText} title={type} />
          <View style={styles.profilePicView}>
            <Image
              style={styles.profilePic}
              source={
                type === 'Home'
                  ? imagesConstants.house
                  : type === 'Office'
                  ? imagesConstants.office
                  : imagesConstants.other
              }
            />
          </View>
        </View>
        <View style={styles.dataSection}>
          <View style={styles.addressTextView}>
            <RegularText
              style={styles.testName}
              title={`${number} ${area1} ${area2} ${city} ${state} ${pincode}`}
            />
          </View>
        </View>
        <View
          style={[
            styles.relationSection,
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            },
          ]}>
          <View style={{flex: 0.5}}>
            {primary_address ? (
              <BoldText
                style={{
                  fontSize: hp('1.6%'),
                  fontWeight: 'bold',
                  color: colors.app_theme_dark_green,
                }}
                title={'Primary'}
              />
            ) : null}
          </View>
          <View style={{flex: 0.5}}>
            {selected ? (
              <View style={{justifyContent: 'flex-end'}}>
                <Image
                  style={[styles.tickImage, {alignSelf: 'flex-end'}]}
                  source={imagesConstants.tick}
                />
              </View>
            ) : (
              <View
                style={{
                  paddingLeft: 20,

                  alignItems: 'flex-end',
                }}>
                <View
                  style={{
                    height: 20,

                    width: 20,
                    borderRadius: 10,
                    borderColor: colors.gray,
                    borderWidth: 1,
                  }}
                />
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
