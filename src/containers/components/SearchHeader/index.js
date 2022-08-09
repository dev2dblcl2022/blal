import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {Image, View, TouchableOpacity, TextInput, Alert} from 'react-native';
import {AuthContext} from '../../../../context/context';
import colors from '../../../constants/colors';
import imagesConstants from '../../../constants/imagesConstants';
import {BoldText, RegularText} from '../Common';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './style';

export default (props, navigation) => {
  const {signOut} = React.useContext(AuthContext);
  const onNext = async val => {
    let user = await AsyncStorage.getItem('userToken');
    if (user === 'GuestUser') {
      Alert.alert(
        `You are browsing as Guest, Please login to your account`,
        ``,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Login',
            onPress: () => signOut(),
          },
        ],
        {cancelable: false},
      );
    } else {
      if (val === 0) {
        props.onPressCart();
      } else if (val === 1) {
        props.onPressLocation();
      } else if (val === 2) {
        props.onPressNotification();
      } else if (val === 3) {
        props.onPressCart();
      } else {
        null;
      }
    }
  };
  return (
    <View style={[props.style, styles.container]}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          hitSlop={{left: 15, right: 15, top: 15, bottom: 15}}
          onPress={props.onBack}
          style={styles.backContainer}>
          <Image source={imagesConstants.backWhite} />
        </TouchableOpacity>
        <View style={styles.headerContainer}>
          <BoldText style={styles.headerTitle} title={props.title} />
        </View>
        {/* <TouchableOpacity
          hitSlop={{left: 15, right: 15, top: 15, bottom: 15}}
          onPress={() => onNext(0)}
          style={[styles.backContainer]}>
          {props.cartVisible ? <Image source={imagesConstants.cart} /> : null}
        </TouchableOpacity> */}
        {console.log('props.cartCount', props.cartCount)}
        <TouchableOpacity
          style={styles.backContainer}
          hitSlop={{left: 15, right: 15, top: 15, bottom: 15}}
          onPress={() => onNext(0)}>
          {props.cartVisible ? <Image source={imagesConstants.cart} /> : null}
          {props?.cartCount !== 0 && props.cartVisible ? (
            <View style={styles.cartCountView}>
              <RegularText
                style={{color: colors.white, fontSize: hp('1.6%')}}
                title={props.cartCount}
              />
            </View>
          ) : null}
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <View style={{flex: props.filterVisible ? 0.8 : 1}}>
          <View style={[styles.textInputView]}>
            <TextInput
              placeholderTextColor={colors.purplishGrey}
              style={[styles.textInput, {flex: 0.9}]}
              value={props.value}
              onChangeText={props.onChangeText}
              placeholder={props.placeholderText}
            />
            <View
              style={{
                flex: 0.1,

                alignItems: 'center',
              }}>
              {props.value.length > 0 ? (
                <TouchableOpacity onPress={props.onClearText}>
                  <Image
                    style={{
                      height: 20,
                      width: 20,
                      tintColor: colors.purplishGrey,
                    }}
                    source={imagesConstants.cancelRed}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </View>

        {props.filterVisible ? (
          <TouchableOpacity
            hitSlop={{left: 15, right: 15, top: 15, bottom: 15}}
            onPress={props.onPressFilter}
            style={[styles.filterBtnSection]}>
            <Image style={styles.filterImg} source={imagesConstants.filter} />
            <BoldText style={styles.filterText} title={'Filter'} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};
