import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  BackHandler,
  Platform,
} from 'react-native';

import {SubmitButton} from '../../../components/Buttons';
import styles from './style';
import DefaultHeader from '../../../components/DefaultHeader';
import {BoldText, RegularText} from '../../../components/Common';
import {
  MainContainer,
  SpecialInstructionView,
  OrderSummaryCheckupList,
  BookingSuccessPopup,
  Toast,
  Loader,
  MyCartTestCard,
} from '../../../components';
import {ScrollView} from 'react-native-gesture-handler';
import AllInOneSDKManager from 'paytm_allinone_react-native';
import moment from 'moment';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import imagesConstants from '../../../../constants/imagesConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetworkRequest, {
  method,
  servicesPoints,
} from '../../../../services/NetworkRequest';
import {AuthContext} from '../../../../../context/context';
import {
  Api_Live_Url,
  Api_Local_Url,
  Date_Format,
  Pay_tmMerchantId,
} from '../../../../config/Setting';
import axios from 'axios';

import {useNavigation} from '@react-navigation/native';
const orderId = 'ORDERID_98766';
const merchantId = Pay_tmMerchantId;
const txnToken = '19d8f9353a83437a9c2c8abb360deaf31638774945508';

const index = ({navigation, route}) => {
  const {signOut} = React.useContext(AuthContext);
  const {lab} = route.params;
  const {selectedAddress} = route.params;
  const {bookingDate} = route.params;
  const {bookingDateLabel} = route.params;
  const {bookingTime} = route.params;
  const {selectedLabAddress} = route.params;
  const {selectedLabDate} = route.params;
  const {selectedLabCenterId} = route.params;
  const {selectedLabCenterCityId} = route.params;
  const {selectedLabItem} = route.params;
  const navigationOrder = useNavigation();
  const {selectedLabLatitude} = route.params;
  const {selectedLabLongitude} = route.params;

  const [online, setOnline] = useState(true);
  const [viewOfferClick, setViewOfferClick] = useState(false);
  const [profilesData, setProfilesData] = useState([2]);
  const [instruction, setInstuction] = useState([1, 2, 3, 4]);
  const [loader, setLoader] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [date, setDate] = useState('11/10/2021');
  const [transactionToken, setTransactionToken] = useState('');
  const [datePicker, setDatePicker] = useState(false);
  const [day, setDay] = useState('');
  const [fullDate, setFullDate] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [cartData, setCartData] = useState({});
  const [familyMembersData, setFamilyMembersData] = useState([]);
  const [refresh, setRefresh] = useState('');
  const [bookingSuccessPopup, setBookingSuccessPopup] = useState(false);
  const [cityId, setCityId] = useState('');
  const [addCityId, setAddCityId] = useState('');
  const [code, setCode] = useState('');
  const [panelId, setPanelId] = useState('');
  const [testType, setTestType] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [finalAmount, setFinalAmount] = useState('');
  const [pickupCharge, setPickupCharge] = useState('');
  const [totalDiscount, setTotalDiscount] = useState('');
  const [subTotal, setSubTotal] = useState('');
  const [membershipCoupon, setMembershipCoupon] = useState('');
  const [membershipCardId, setMembershipCardId] = useState('');
  const [discountReason, setDiscountReason] = useState('');
  const [membershipDiscount, setMembershipDiscount] = useState([]);
  const [bookingSuccessfulData, setBookingSuccessfulData] = useState({});
  const [totAmt, setTotAmt] = useState([]);
  const [totDisAmtVal, setTotDisAmtVal] = useState([]);
  const [discountedAmount, setDiscountedAmount] = useState('');
  const [sub_Total, set_SubTotal] = useState('');
  const [totalAmountCart, setTotalAmountCart] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getCoupon();
      getMyCartData();
    });
    return unsubscribe;
  }, [refresh]);

  // useEffect(() => {
  //   if (transactionToken) {
  //     onPayment();
  //   }
  // }, [transactionToken]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onStoreData);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onStoreData);
    };
  }, []);

  const getCoupon = async () => {
    let _code = await AsyncStorage.getItem('Code');
    let MembershipCode = await AsyncStorage.getItem('MembershipCode');
    let MembershipId = await AsyncStorage.getItem('MembershipCardId');
    if (_code) {
      setCode(_code);
      setMembershipCoupon(MembershipCode);
      setMembershipCardId(MembershipId);
    } else {
      setCode('');
      setMembershipCoupon('');
      setMembershipCardId('');
    }
  };

  // useEffect(() => {
  //   if (testArray.length > 0) {
  //     getPackageDetail();
  //   }
  // }, [testArray]);

  const getMyCartData = async () => {
    try {
      const requestConfig = {
        method: method.get,

        url: `${servicesPoints.bookingServices.myCart}?collection_type=${
          lab === 0 ? 'Home' : 'Lab'
        }`,
      };
      const response = await NetworkRequest(requestConfig);

      if (response) {
        const {success} = response;
        if (success) {
          setCartData(response.data);

          // setBookingMembersTests(response.data.booking_member_tests);

          setCityId(response.data?.bookings[0]?.city_id);
          setPanelId(response.data?.bookings[0]?.panel_id);
          setTotAmt(response?.data?.totAmt);
          setTotDisAmtVal(response?.data?.totDisAmtVal);
          setTotalAmountCart(response?.data?.total_amount);
          setDiscountedAmount(response?.data?.discounted_amount);
          set_SubTotal(response?.data?.sub_total);

          setTotalPrice(Number(response.data.total_amount));

          setPickupCharge(Number(response.data?.pickup_charge));
          setFinalAmount(Number(response.data?.final_amount));
          setTotalDiscount(Number(response.data?.discounted_amount));
          setSubTotal(Number(response.data?.sub_total));

          if (response.data.outsource_test_amount > 0) {
            alert(response.data.outsource_tests);
          }
          if (response.data.bookings.length === 0) {
            navigation.pop(2);
          }

          // let testArray = [];
          // let familyData = response.data?.family_members;
          // familyData.map(item => {
          //   item.booking_member_tests.map(itn => {
          //     testArray.push(itn);
          //   });
          // });
          // setTestArray(testArray);
          setLoader(false);
        } else {
          if (response === 'Network Error') {
            Toast('Network Error', 0);
            setLoader(false);
          } else if (response.status === 401) {
            signOut();
          } else {
            null;
          }
          setLoader(false);
        }
      }
    } catch (err) {
      setLoader(false);
    }
  };

  const onDeleteTest = async item => {
    try {
      setLoader(true);
      let data = {
        itemId: item.id.toString(),
      };
      const requestConfig = {
        method: method.post,
        data: data,
        url: servicesPoints.bookingServices.remove_member_item_from_cart,
      };

      const response = await NetworkRequest(requestConfig);

      if (response) {
        const {success} = response;
        if (success) {
          getMyCartData();
        } else {
          if (response === 'Network Error') {
            Toast('Network Error', 0);
            setLoader(false);
          } else if (response.status === 401) {
            signOut();
          } else {
            null;
          }
          setLoader(false);
        }
      }
    } catch (err) {
      setLoader(false);
    }
  };

  const onChoosePaymentType = () => {
    setOnline(online ? false : true);
  };

  const renderSelfTextCard = (item, index) => {
    let length = cartData.bookings.length - 1;
    return (
      // <MyCartTestCard  data={item} />
      <MyCartTestCard
        onPressItem={data => {
          navigation.navigate('FullBodyCheckup', {
            comeFromMyCart: true,
            testPackageData: {id: data.test_id, type: data.test_type},
          });
        }}
        length={length}
        index={index}
        cancel={true}
        onDeleteTest={data => onDeleteTest(data)}
        data={item}
      />
    );
  };

  const renderSpecialInstruction = () => {
    return <SpecialInstructionView />;
  };

  const formatDate = date => {
    return moment(date).format('DD/MM/YYYY');
  };

  const onSelectedLabsRow = () => {
    setSelectedPreviewBookingRow(true);
  };

  const handleDatePickerConfirm = date => {
    let newDate = moment(date).format(Date_Format);
    const selectedDate =
      date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

    const split_date = selectedDate.split('/');
    setDay(split_date[0]);
    setMonth(split_date[1]);
    setYear(split_date[2]);

    setDate(formatDate(date));
    setFullDate(newDate);
    setDatePicker(false);
  };

  const handleDatePickerCancel = () => {
    setDatePicker(false);
  };

  const onPaymentWork = () => {
    if (online) {
      onInitiateTransaction();
    } else {
      onClickMakePayment('Cash');
    }
  };

  const onClickMakePayment = async (
    payment_type,
    transaction_id,
    paymentDetail,
    orderID,
  ) => {
    try {
      setLoader(true);
      let data = {};
      if (payment_type === 'Cash') {
        data = {
          collection_type: lab === 0 ? 'Home' : 'Lab',
          booking_date_time:
            lab === 0 ? `${bookingDate} ${bookingTime}` : `${selectedLabDate} `,
          address_id:
            lab === 0
              ? `${selectedAddress.number} ${selectedAddress.area1} ${selectedAddress.area2} ${selectedAddress.city} ${selectedAddress.state} ${selectedAddress.pincode}`
              : `${selectedLabItem.Centre}#${selectedLabAddress}`,
          payment_mode: 'Cash',
          final_amount: finalAmount.toString(),
          coupon: code ? code : null,
          MembershipCardID: membershipCardId ? membershipCardId : null,
          locationId: code
            ? lab === 0
              ? addCityId
              : selectedLabCenterId
            : null,
          latitude: lab === 0 ? Number(selectedAddress.latitude) : null,
          longitude: lab === 0 ? Number(selectedAddress.longitude) : null,
          transactions: null,
          address_type: lab === 0 ? selectedAddress.type : null,
          CentreID: selectedLabCenterId ? selectedLabCenterId : null,
          member_discount: membershipDiscount,
          discountReason: discountReason,
          totDisAmtVal: totDisAmtVal,
          totAmt: totAmt,
          discounted_amount: discountedAmount,
          sub_total: sub_Total,
          pickup_charge: pickupCharge,
          total_amount: totalAmountCart,
        };
      } else {
        data = {
          collection_type: lab === 0 ? 'Home' : 'Lab',
          booking_date_time:
            lab === 0
              ? `${bookingDate} 11:30:00`
              : `${selectedLabDate} 11:30:00`,
          address_id:
            lab === 0
              ? `${selectedAddress.number} ${selectedAddress.area1} ${selectedAddress.area2} ${selectedAddress.city} ${selectedAddress.state} ${selectedAddress.pincode}`
              : selectedLabAddress,
          payment_mode: 'Online',
          final_amount: finalAmount.toString(),
          coupon: code ? code : null,
          MembershipCardID: membershipCardId ? membershipCardId : null,
          locationId: code
            ? lab === 0
              ? addCityId
              : selectedLabCenterId
            : null,
          latitude: lab === 0 ? Number(selectedAddress.latitude) : null,
          longitude: lab === 0 ? Number(selectedAddress.longitude) : null,
          transactions: transaction_id,
          txnOrderId: orderID,
          address_type: null,
          CentreID: selectedLabCenterId ? selectedLabCenterId : null,
          member_discount: membershipDiscount,
          discountReason: discountReason,
          totDisAmtVal: totDisAmtVal,
          totAmt: totAmt,
          pickup_charge: pickupCharge,
          discounted_amount: discountedAmount,
          sub_total: sub_Total,
          total_amount: totalAmountCart,
        };
      }

      const requestConfig = {
        method: method.post,
        data: data,
        url: servicesPoints.bookingServices.create_booking,
      };

      const response = await NetworkRequest(requestConfig);
      setBookingSuccessfulData(response.data);
      if (response) {
        const {success} = response;
        if (success) {
          setLoader(false);
          await AsyncStorage.removeItem('Code');
          // if (payment_type === 'Online') {
          //   onHitPaymentCheckApi(paymentDetail);
          // }

          onShowPopup();
        } else {
          if (response === 'Network Error') {
            Toast('Network Error', 0);
            setLoader(false);
          } else if (response.status === 401) {
            signOut();
          } else {
            null;
          }
          setLoader(false);
        }
      }
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };

  const onStoreData = async () => {
    await AsyncStorage.setItem(
      'cartBookingDate',
      lab === 0 ? bookingDate : selectedLabDate,
    );
    await AsyncStorage.setItem(
      'cartBookingTime',
      bookingTime ? bookingTime : '',
    );
    await AsyncStorage.setItem(
      'cartBookingAddress',
      JSON.stringify(lab === 0 ? selectedAddress : selectedLabAddress),
    );

    navigation.goBack();
  };
  const onShowPopup = async () => {
    setBookingSuccessPopup(true);
  };
  const onClosePopup = async () => {
    setBookingSuccessPopup(false);
    setTimeout(() => {
      navigation.navigate('MyBookings', {
        screen: 'OrderSummary',
      });
      // navigationOrder.reset({
      //   index: 0,
      //   routes: [{name: 'Home'}],
      // });
      // navigationOrder.navigate('MyBookings');
      // navigation.pop(4);
    });
  };

  const onApplyCuponCode = async coupon_code => {
    setLoader(true);

    try {
      let requestConfig = {};

      if (membershipCoupon === '1') {
        requestConfig = {
          method: method.get,
          url: `${
            servicesPoints.bookingServices.myCart
          }?membership_card_id=${coupon_code}&collection_type=${
            lab === 0 ? 'Home' : 'Lab'
          }&CityId=${cityId}&MembershipCardID=${membershipCardId}`,
        };
      } else {
        if (lab === 0) {
          requestConfig = {
            method: method.get,
            url: `${
              servicesPoints.bookingServices.myCart
            }?coupon=${coupon_code}&collection_type=${
              lab === 0 ? 'Home' : 'Lab'
            }&CityId=${cityId}`,
          };
        } else {
          requestConfig = {
            method: method.get,
            url: `${
              servicesPoints.bookingServices.myCart
            }?coupon=${coupon_code}&collection_type=${
              lab === 0 ? 'Home' : 'Lab'
            }&CityId=${cityId}&CenterId=${selectedLabCenterCityId}`,
          };
        }
      }

      const response = await NetworkRequest(requestConfig);

      if (response) {
        const {success} = response;
        if (success) {
          Toast(
            response.message === 'success'
              ? 'Discount coupon removed!'
              : response.message,
            response.message === 'Coupon code applied successfully!' ||
              response.message === 'success'
              ? 1
              : 0,
          );
          // setViewOfferClick(false);
          setTotalPrice(response.data.total_amount);
          setTotalAmountCart(response?.data?.total_amount);
          setPickupCharge(response.data.pickup_charge);
          setFinalAmount(response.data.final_amount);
          setTotalDiscount(response.data.discounted_amount);
          setSubTotal(response.data?.sub_total);
          setMembershipDiscount(response.data?.member_discount);
          setDiscountReason(response?.data?.discountReason);
          setTotAmt(response?.data?.totAmt);
          setTotDisAmtVal(response?.data?.totDisAmtVal);
          setCartData(response?.data);
          setDiscountedAmount(response?.data?.discounted_amount);
          set_SubTotal(response?.data?.sub_total);
          if (response?.data?.discounted_amount === 0) {
            // setCode('');
          }
          if (response.data.outsource_test_amount > 0) {
            alert(response.data.outsource_tests);
          }
          setLoader(false);
        } else {
          if (response === 'Network Error') {
            Toast('Network Error', 0);

            setLoader(false);
          } else if (response.status === 401) {
            signOut();
          } else {
            null;
          }
          setLoader(false);
        }
      }
    } catch (err) {
      setLoader(false);
    }
  };

  const onInitiateTransaction = async () => {
    let orderId = `${cartData.bookings[0].booking_hash}_${Date.now()}`;
    try {
      let data = {
        order_id: orderId,
        final_amount: cartData.final_amount,
        transaction_type: 'Booking',
      };
      // let data = {
      //   order_id: cartData.bookings[0].booking_hash,
      //   final_amount: parseFloat(finalAmount),
      //   transaction_type: 'Booking',
      // };
      const requestConfig = {
        method: method.post,
        data: data,
        url: servicesPoints.paymentServices.initiate_transaction,
      };

      const response = await NetworkRequest(requestConfig);
      if (response.status === 200) {
        const {success} = response;
        if (success) {
          let txnToken = response.data.body.txnToken;
          onPayment(txnToken, orderId);

          setTransactionToken(txnToken);
        } else {
          if (response === 'Network Error') {
            Toast('Network Error', 0);
            setLoader(false);
          } else if (response.status === 401) {
            signOut();
          } else {
            null;
          }
          setLoader(false);
        }
      } else {
        Toast('Try again, Payment Failure!', 0);
      }
    } catch (err) {
      setLoader(false);
    }
  };

  const onPayment = (token, orderID) => {
    if (Platform.OS === 'ios') {
      AllInOneSDKManager.startTransaction(
        orderID, // Booking Id
        merchantId, // Merchant Id
        token, // Txn token provided by backend
        finalAmount.toString(), //Total Amount

        `${Api_Live_Url}${servicesPoints.paymentServices.transaction_callback}?orderid=${orderID}`,
        false,

        false,
        `${'paytm'}${merchantId}`,
      )
        .then(res => {
          let paymentDetail = {
            mid: merchantId,
            orderId: orderID,
          };
          paymentSuccess(res, paymentDetail, orderID);
        })
        .catch(err => {
          Toast('Payment Failed! Try again');
        });
    } else {
      AllInOneSDKManager.startTransaction(
        orderID,
        merchantId,
        token,
        finalAmount.toString(),
        // 'https://www.npmjs.com/package/paytm_allinone_react-native',
        `${Api_Live_Url}${servicesPoints.paymentServices.transaction_callback}?orderid=${orderID}`,
        false,
        false,
        `${'paytm'}${merchantId}`,
      )
        .then(res => {
          // const parseData = JSON.parse(res);

          let paymentDetail = {
            mid: merchantId,
            orderId: orderID,
          };

          paymentSuccess(res, paymentDetail, orderID);
        })
        .catch(err => {
          console.log('error caught ', err);
          // Toast('Payment Failed! Try again');
        });
    }
  };

  const paymentSuccess = (res, paymentDetail, orderID) => {
    if (res.STATUS === 'TXN_SUCCESS') {
      onClickMakePayment('Online', res.TXNID, paymentDetail, orderID);
    } else {
      Toast('Try again, Payment Failure!', 0);
    }
  };

  const setCouponCode = cop_code => {
    setCode(cop_code);
    // if (viewOfferClick && code) {
    //   onApplyCuponCode(cop_code);
    // } else {
    //   null;
    // }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <DefaultHeader onBack={onStoreData} title={'Order Summary'} />

      <View
        style={styles.mainContainer}
        onPress={() => setBookingSuccessPopup(false)}>
        <ScrollView>
          <MainContainer>
            {/* <RegularText
              style={styles.headingPayment}
              title={'Select the payment mode'}
            /> */}
            {/* <View style={styles.selfSection}>
              <View style={styles.rowHeader}>
                <View style={styles.headerNameSection}>
                  <BoldText
                    style={styles.selfNameText}
                    title={'Raghav Upadhyay'}
                  />
                  <RegularText style={styles.ageText} title={'Male 25'} />
                </View>
                <View>
                  <RegularText style={styles.selfText} title={'Self'} />
                </View>
              </View>

              <View style={styles.selfTestList}>
                <FlatList
                  data={profilesData}
                  ItemSeparatorComponent={() => {
                    return <View style={styles.listSeparator} />;
                  }}
                  showsVerticalScrollIndicator={false}
                  extraData={profilesData}
                  renderItem={renderSelfTextCard}
                />
              </View>
            </View> */}

            {/* <View style={styles.parentSection}>
              <View style={styles.rowHeader}>
                <View style={styles.headerNameSection}>
                  <BoldText
                    style={styles.selfNameText}
                    title={'Anita Upadhyay'}
                  />
                  <RegularText style={styles.ageText} title={'Female 55'} />
                </View>
                <View>
                  <RegularText style={styles.selfText} title={'Parent'} />
                </View>
              </View>

              <View style={styles.selfTestList}>
                <FlatList
                  data={profilesData}
                  showsVerticalScrollIndicator={false}
                  extraData={profilesData}
                  renderItem={renderSelfTextCard}
                />
              </View>
            </View> */}

            <View style={styles.parentSection}>
              <View style={styles.selfTestList}>
                <FlatList
                  data={cartData.bookings}
                  showsVerticalScrollIndicator={false}
                  extraData={cartData.bookings}
                  renderItem={({item, index}) =>
                    renderSelfTextCard(item, index)
                  }
                />
              </View>
            </View>

            {/* <View style={[styles.specialInstructionSection]}>
              <View style={styles.instructionHeading}>
                <BoldText
                  style={styles.selfNameText}
                  title={'Special Instruction'}
                />
              </View>
              <View style={styles.instructionList}>
                <FlatList
                  data={instruction}
                  showsVerticalScrollIndicator={false}
                  extraData={instruction}
                  renderItem={renderSpecialInstruction}
                />
              </View>
            </View> */}
            <View style={styles.sectionSeparator} />
            <View style={[styles.specialInstructionSection]}>
              <View style={{flexDirection: 'row'}}>
                <BoldText
                  style={styles.selfNameText}
                  title={'Appointment Date and Time'}
                />
                <TouchableOpacity
                  onPress={onStoreData}
                  style={{position: 'absolute', right: 15, top: 10}}>
                  <Image style={{}} source={imagesConstants.edit} />
                </TouchableOpacity>
              </View>
              <View style={styles.calendarView}>
                <RegularText
                  style={styles.dateText}
                  title={
                    lab === 0
                      ? `${bookingDateLabel} ${bookingTime}`
                      : selectedLabDate
                  }
                />
                <View onPress={onStoreData}>
                  <Image
                    style={styles.calendarIcon}
                    source={imagesConstants.calendar}
                  />
                </View>
              </View>
            </View>

            <View style={styles.sectionSeparator} />
            <View style={[styles.specialInstructionSection]}>
              <View style={styles.instructionHeading}>
                <BoldText
                  style={styles.selfNameText}
                  title={'Sample Collection Address'}
                />
              </View>
              <View style={styles.editIconRight}>
                <RegularText
                  style={styles.selfAddressText}
                  title={lab === 0 ? 'Home' : 'Lab'}
                />
                <RegularText
                  style={styles.selfAddressData}
                  title={
                    lab === 0
                      ? `${selectedAddress.number} ${selectedAddress.area1} ${selectedAddress.area2} ${selectedAddress.city} ${selectedAddress.state} ${selectedAddress.pincode}`
                      : selectedLabAddress
                  }
                />

                <TouchableOpacity
                  onPress={onStoreData}
                  style={{marginRight: 15}}>
                  <Image style={{}} source={imagesConstants.edit} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.sectionSeparator} />
            <View style={[styles.specialInstructionSection]}>
              <View style={styles.instructionHeading}>
                <BoldText
                  style={styles.selfNameText}
                  title={'Select Payment Type (Required)'}
                />
              </View>
              <View style={styles.paymentRadioSection}>
                <View style={styles.radioContent}>
                  <TouchableOpacity
                    // onPress={onChoosePaymentType}
                    onPress={onChoosePaymentType}
                    style={styles.radioGroup}>
                    <View style={styles.radioView}>
                      {online ? <View style={styles.radioInnerView} /> : null}
                    </View>
                    <View>
                      <RegularText style={styles.female} title={'Online'} />
                      <RegularText
                        style={styles.paymentModeText}
                        title={'(Payment can be done online)'}
                      />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={onChoosePaymentType}
                    style={[styles.radioGroup]}>
                    <View style={styles.radioView}>
                      {!online ? <View style={styles.radioInnerView} /> : null}
                    </View>

                    <View>
                      <RegularText
                        style={styles.female}
                        title={'Cash on Collection'}
                      />
                      <RegularText
                        style={styles.paymentModeText}
                        title={'(Payment can be done at Collection)'}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.sectionSeparator} />
            <View style={styles.paymentSection}>
              <View style={styles.couponCodeSection}>
                <View style={styles.couponHeadingSection}>
                  <BoldText style={styles.selfNameText} title={'Coupon Code'} />
                  <TouchableOpacity
                    onPress={() => {
                      setViewOfferClick(true);
                      navigation.navigate('ViewOffers');
                    }}>
                    <RegularText
                      style={styles.selfText}
                      title={'View Offers'}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.textInputSection}>
                  <View style={styles.textInputView}>
                    <TextInput
                      placeholderTextColor={styles.placeholderColor}
                      style={styles.textInput}
                      value={code}
                      onChangeText={val => setCouponCode(val)}
                      placeholder={'Enter the Coupon Code'}
                    />

                    {code.length > 0 ? (
                      <TouchableOpacity
                        onPress={() => {
                          setCode('');
                          onApplyCuponCode('');
                        }}>
                        <View style={styles.arrowSection}>
                          <View style={[styles.arrowCircle, {marginTop: 10}]}>
                            <Image
                              // style={{marginTop: 10}}
                              source={imagesConstants.cancelRed}
                            />
                          </View>
                        </View>
                      </TouchableOpacity>
                    ) : null}
                  </View>
                  <View style={styles.applyBtnSection}>
                    <TouchableOpacity
                      onPress={() =>
                        code
                          ? onApplyCuponCode(code)
                          : Toast('Please Enter Coupon Code', 0)
                      }
                      style={styles.applyBtn}>
                      <RegularText style={styles.applyText} title={'Apply'} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              {!loader ? (
                <View style={styles.paymentDetailSection}>
                  <View style={styles.paymentHeadingSection}>
                    <BoldText
                      style={styles.selfNameText}
                      title={'Payment Detail'}
                    />
                  </View>
                  <View style={styles.paymentRatesSection}>
                    <View style={styles.testPriceSection}>
                      <RegularText style={styles.testPrice} title={'Total'} />
                      <RegularText
                        style={styles.rateText}
                        title={`${'\u20B9'} ${totalPrice}`}
                      />
                    </View>
                    {totalDiscount ? (
                      <View style={styles.testPriceSection}>
                        <RegularText
                          style={styles.testPrice}
                          title={'Coupon Discount'}
                        />
                        <RegularText
                          style={styles.rateText}
                          title={`(-) ${'\u20B9'} ${totalDiscount}`}
                        />
                      </View>
                    ) : null}
                    <View style={styles.testPriceSection}>
                      <RegularText
                        style={styles.testPrice}
                        title={'Sub Total'}
                      />
                      <RegularText
                        style={styles.rateText}
                        title={`${'\u20B9'} ${subTotal}`}
                      />
                    </View>
                    {pickupCharge ? (
                      <View style={styles.testPriceSection}>
                        <RegularText
                          style={styles.testPrice}
                          title={'Home Collection Charges'}
                        />
                        <RegularText
                          style={styles.rateText}
                          title={`${'\u20B9'} ${pickupCharge}`}
                        />
                      </View>
                    ) : null}
                    {/* <View style={styles.testPriceSection}>
                      <RegularText
                        style={styles.testPrice}
                        title={'Total (Amount)'}
                      />
                      <RegularText
                        style={styles.rateText}
                        title={`Rs. ${totalPrice}`}
                      />
                    </View> */}
                    <View style={styles.totalPayableSection}>
                      <BoldText
                        style={styles.payableText}
                        title={'Total (Payable)'}
                      />
                      <BoldText
                        style={styles.payableText}
                        title={`${'\u20B9'} ${finalAmount}`}
                      />
                    </View>
                  </View>
                </View>
              ) : null}
            </View>
          </MainContainer>
        </ScrollView>
        <View style={styles.btnSection}>
          <SubmitButton
            style={styles.submitBtn}
            title={online ? 'Make Payment' : 'Confirm Booking'}
            onPress={onPaymentWork}
          />
        </View>
      </View>
      {datePicker ? (
        <DateTimePickerModal
          date={selectedDate}
          isVisible={datePicker}
          mode="date"
          display={'spinner'}
          onConfirm={handleDatePickerConfirm}
          onCancel={handleDatePickerCancel}
        />
      ) : null}

      <BookingSuccessPopup
        uploadPrescription={false}
        data={bookingSuccessfulData}
        navigation={navigation}
        onClose={() => onClosePopup()}
        successVisible={bookingSuccessPopup}
      />
      <Loader display={loader} />
    </SafeAreaView>
  );
};

export default index;
