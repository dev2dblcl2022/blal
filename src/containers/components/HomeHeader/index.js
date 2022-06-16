import {DrawerActions} from '@react-navigation/routers';
import React, {useEffect} from 'react';
import {Image, View, TouchableOpacity, TextInput, Alert} from 'react-native';
import colors from '../../../constants/colors';
import imagesConstants from '../../../constants/imagesConstants';
import {BoldText, RegularText} from '../Common';
import {useContext} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../../../context/context';

export default (props, navigation) => {
  const {signOut} = useContext(AuthContext);

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
        props.onPressMenu();
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
          onPress={() => onNext(0)}
          style={styles.backContainer}>
          <Image source={imagesConstants.menu} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onNext(1)}
          style={[styles.headerContainer]}>
          <Image source={imagesConstants.whitepin} />
          <BoldText
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={styles.headerTitle}
            title={props.label}
          />
        </TouchableOpacity>
        <View style={styles.bellCartSection}>
          {/* <TouchableOpacity onPress={() => onNext(2)}>
            <Image source={imagesConstants.bell} />
          </TouchableOpacity> */}

          <TouchableOpacity
            style={{marginRight: hp('0.5%')}}
            onPress={() => onNext(2)}>
            <Image source={imagesConstants.bell} />
            {props?.notificationCount !== 0 ? (
              <View style={styles.cartCountView}>
                <RegularText
                  style={{color: colors.white, fontSize: hp('1.3%')}}
                  title={props.notificationCount}
                />
              </View>
            ) : null}
          </TouchableOpacity>

          <TouchableOpacity
            style={{marginLeft: hp('0.5%')}}
            onPress={() => onNext(3)}>
            <Image source={imagesConstants.cart} />
            {props?.cartCount !== 0 ? (
              <View style={styles.cartCountView}>
                <RegularText
                  style={{color: colors.white, fontSize: hp('1.3%')}}
                  title={props.cartCount}
                />
              </View>
            ) : null}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.inputSection}>
          <TouchableOpacity
            onPress={props.onPressSearchBar}
            style={styles.textInputView}>
            <TextInput
              placeholderTextColor={colors.purplishGrey}
              style={styles.textInput}
              onPressIn={props.onPressSearchBar}
              placeholder={'Search test or package name'}
            />
            <Image style={styles.searchImg} source={imagesConstants.search} />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </View>
  );
};
