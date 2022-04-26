import React from 'react';
import {Image, View, TouchableOpacity, Alert} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../../constants/colors';
import imagesConstants from '../../../constants/imagesConstants';
import {BoldText, RegularText} from '../Common';
import styles from './style';

export default props => {
  let {number, area1, area2, city, state, pincode, type, primary_address} =
    props?.data;

  const onConfirmDelete = () => {
    if (primary_address) {
      props.onDelete();
    } else {
      Alert.alert(
        'Are you sure want to delete this address',
        '',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => props.onDelete(),
          },
        ],
        {cancelable: false},
      );
    }
  };

  return (
    <View style={styles.itemContainer}>
      <View>
        <View hitSlop={{left: 20, right: 20, top: 20, bottom: 20}}>
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 10,

              justifyContent: 'space-between',
            }}>
            <View style={{flex: 0.78}}>
              {primary_address ? (
                <BoldText
                  style={{
                    fontWeight: 'bold',
                    fontSize: hp('1.8%'),
                    color: colors.app_theme_light_green,
                  }}
                  title={'Primary Address'}
                />
              ) : null}
            </View>
            <View
              style={{
                flex: 0.2,
                paddingHorizontal: hp('2%'),

                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <View>
                <TouchableOpacity onPress={() => props.onEditAddress()}>
                  <Image
                    style={{
                      height: 20,
                      width: 20,
                      tintColor: colors.app_theme_light_green,
                    }}
                    source={imagesConstants.eid}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity onPress={() => onConfirmDelete()}>
                  <Image
                    style={{
                      height: 20,
                      width: 20,
                      tintColor: colors.app_theme_light_green,
                    }}
                    source={imagesConstants.del}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.innerSection}>
        <View style={styles.profilePicSection}>
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
          <BoldText style={styles.nameText} title={`${number}`} />
          <BoldText style={styles.nameText} title={`${area1} ${area2}`} />
          <RegularText style={styles.emailText} title={`${city} ${state}`} />
          <RegularText style={styles.ageText} title={pincode} />
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.membersSection}>
          <RegularText style={styles.membersText} title={type} />
        </View>
      </View>
      <View style={{alignItems: 'flex-end'}}>
        <TouchableOpacity
          hitSlop={{left: 20, right: 20, top: 20, bottom: 20}}
          onPress={props.onSelectPrimaryAddress}>
          <View style={styles.typeUnSelect}>
            {primary_address ? <View style={styles.typeSelect} /> : null}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
