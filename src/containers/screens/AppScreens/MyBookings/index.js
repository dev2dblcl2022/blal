import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Platform,
  Alert,
  BackHandler,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SubmitButton} from '../../../components/Buttons';
import styles from './style';

import DefaultHeader from '../../../components/DefaultHeader';
import {BoldText, LightText, RegularText} from '../../../components/Common';
import colors from '../../../../constants/colors';
import AllInOneSDKManager from 'paytm_allinone_react-native';
import {
  Loader,
  MyBookingCard,
  MyFamilyMemberCard,
  Toast,
} from '../../../components';
import NetworkRequest, {
  method,
  servicesPoints,
} from '../../../../services/NetworkRequest';
import CollectionDetail from '../../AppScreens/ConnectionHandle/index';
import {useNavigation} from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import imagesConstants from '../../../../constants/imagesConstants';
import {AuthContext} from '../../../../../context/context';
import {Pay_tmMerchantId} from '../../../../config/Setting';
import {getRelease} from '../../../../env';

const merchantId = Pay_tmMerchantId;
const index1 = ({navigation, route}) => {
  const screen = route?.params?.screen;
  const [loader, setLoader] = useState(false);
  const [footerLoader, setFooterLoader] = useState(false);
  const navigationOrder = useNavigation();
  // const [apiHit, setApiHit] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(0);
  const [patientOpens, setPatientOpens] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [nextPage, setNextPage] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [patientValues, setPatientValues] = useState('');
  const [timeOpens, setTimeOpens] = useState(false);
  const [timeValues, setTimeValues] = useState('');
  const [statusOpen, setStatusOpen] = useState(false);
  const [statusValue, setStatusValue] = useState(null);
  const [patients, setPatients] = useState([]);
  const {signOut, signIn} = React.useContext(AuthContext);
  const [status, setStatus] = useState([
    {label: 'Booking Confirmed', value: 'Confirmed'},

    {label: 'PRO Assigned', value: 'Accepted'},
    {label: 'Started', value: 'Started'},

    {label: 'Collection Done', value: 'Successful'},
    {label: 'Sample Reached at Lab', value: 'Registered'},
    {label: 'Report Approved', value: 'Approved'},
    {label: 'Cancelled', value: 'Cancelled'},
  ]);

  const [times, setTimes] = useState([
    {label: 'Today', value: '1'},
    {label: 'Weekly', value: '2'},
    {label: 'Monthly', value: '3'},
    {label: 'Yearly', value: '4'},
  ]);
  const [handleConnectionState, setHandleConnectionState] = useState(false);
  const releaseEnvironment = getRelease();
  useEffect(() => {
    if (handleConnectionState) {
      navigation.navigate('ConnectionHandle');
    }
  }, [handleConnectionState]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // if (apiHit) {
      getAllBookingsStarting(1);
      // }
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onClearNavigation);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onClearNavigation);
    };
  }, []);

  const getMyFamilyMembers = async () => {
    const requestConfig = {
      method: method.get,
      url: servicesPoints.userServices.my_family_mambers,
    };

    const response = await NetworkRequest(requestConfig);

    if (response) {
      const {success} = response;
      if (success) {
        let newData = [];
        let test = response.data;
        test.map(item => {
          newData.push({label: item.fullname, value: item.id});
          // return {label: item.fullname, value: item.id};
        });
        setPatients(newData);
        setLoader(false);
      } else {
        if (response === 'Network Error') {
          Toast('Network Error', 0);
          setHandleConnectionState(true);
          setLoader(false);
        }
        setLoader(false);
      }
    } else {
      setLoader(false);
    }
  };
  useEffect(() => {
    if (patientValues || timeValues || statusValue) {
      getAllBookings(2);
    }
  }, [patientValues, timeValues, statusValue]);

  // const getGroupedBookingData = async (finalBookingList) => {
  //   try {
  //     let groupedBookingData = []
  //   let uniqueBookings=[];
  //   finalBookingList.map(item => {
  //     if(!uniqueBookings.includes(item.unique_booking_id)){
  //       uniqueBookings.push(item.unique_booking_id);
  //       groupedBookingData.push({
  //         "unique_booking_id": item.unique_booking_id,
  //         "data" : [item]
  //       })
  //     }else{
  //     let index = groupedBookingData.findIndex(data => data.unique_booking_id === item.unique_booking_id)
  //       groupedBookingData[index].data.push(item);
  //   }
  //   });
  //   return groupedBookingData;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  const getAllBookingsStarting = async val => {
    setLoader(true);

    try {
      const requestConfig = {
        method: method.get,
        url: `${
          servicesPoints.bookingServices.mybookings
        }?page=${page}&size=${100}`,
      };

      const response = await NetworkRequest(requestConfig);
      if (response) {
        const {success} = response;
        if (success) {
          const bookingNewData = refectorBookingData(response?.data?.docs);
          const finalBookingList = bookingNewData.map(booking => {
            response?.data?.bookingTransaction.map(refund => {
              if (booking.id.toString() === refund.reference_id.toString()) {
                booking.refundStatus = refund.current_status;
              }
            });
            return booking;
          });
          const filterData = filterBookingData(finalBookingList);
          setBookings(filterData);
          setLoader(false);
          getMyFamilyMembers();

          setRefreshing(false);
        } else {
          setLoader(false);

          if (response === 'Network Error') {
            Toast('Network Error', 0);
            setHandleConnectionState(true);
          }
          setLoader(false);
        }
      } else {
      }
    } catch (err) {
      console.log('err', err);
    }
  };

  function uniqueData(data) {
    let array = bookings;
    array = array.concat(data);
    let unique = array.reduce((res, itm) => {
      // Test if the item is already in the new array
      let result = res.find(item => item.id === itm.id);
      // If not lets add it
      if (!result) return res.concat(itm);
      // If it is just return what we already have
      return res;
    }, []);
    // setBookings(page === 1 ? data : [...bookings, ...data]);
    setBookings(unique);
    setLoader(false);
    setRefreshing(false);
    setFooterLoader(false);
    setPage(page + 1);
    getMyFamilyMembers();
  }

  const refectorBookingData = bookingData => {
    const arr = [];
    bookingData.map(_data => {
      _data.bookingAmount = (
        parseInt(_data.total_amount) + (parseInt(_data.pickup_charge) || 0)
      ).toFixed(2);
      // if (!arr.includes(_data.booking_hash)) {
      //   arr.push(_data.booking_hash);
      //   _data.bookingAmount =
      //     parseInt(_data.total_member_amount) + parseInt(_data.pickup_charge);
      // } else {
      //   _data.bookingAmount = _data.total_member_amount;
      // }
    });
    return bookingData;
  };

  const filterBookingData = bookingNewData => {
    let filterData = [];
    let uniqueBookings = [];
    bookingNewData.map(item => {
      if (!uniqueBookings.includes(item.booking_hash)) {
        uniqueBookings.push(item.booking_hash);
        filterData.push({
          booking_hash: item.booking_hash,
          data: [item],
        });
      } else {
        let index = filterData.findIndex(
          data => data.booking_hash === item.booking_hash,
        );
        filterData[index].data.push(item);
      }
    });
    return filterData;
  };

  const getAllBookings = async val => {
    setLoader(true);
    try {
      const requestConfig = {
        method: method.get,
        url: `${servicesPoints.bookingServices.mybookings}?member_id=${
          patientValues ? patientValues : ''
        }&status=${statusValue ? statusValue : ''}&time_period=${
          timeValues ? timeValues : ''
        }`,
      };

      const response = await NetworkRequest(requestConfig);

      if (response) {
        const {success} = response;
        if (success) {
          const bookingNewData = refectorBookingData(response?.data?.docs);
          const filterData = filterBookingData(bookingNewData);
          setBookings(filterData);
          setRefreshing(false);
          getMyFamilyMembers();
        } else {
          if (response === 'Network Error') {
            Toast('Network Error', 0);
            setHandleConnectionState(true);
          }
          setLoader(false);
        }
      } else {
      }
    } catch (err) {
      console.log('err', err);
    }
  };

  const onRefresh = () => {
    setBookings([]);
    setRefreshing(true);
    getAllBookingsStarting(1);
  };

  const reset = () => {
    setLoader(true);
    setPatientValues(null);
    setTimeValues(null);
    setStatusValue(null);
    getAllBookingsStarting(1);
    setLoader(false);
  };

  const cancelBooking = async item => {
    Alert.alert(
      'Are you sure want to cancel this booking',
      ``,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Ok',
          onPress: () => onCancel(item),
        },
      ],
      {cancelable: false},
    );
  };

  const onCancel = async item => {
    // setLoader(true);
    try {
      let data = {
        task_id: item.task_id,
        bookingId: item.unique_booking_id,
      };
      const requestConfig = {
        method: method.post,
        data: data,
        url: `${servicesPoints.bookingServices.cancelFullCheckout}`,
      };

      const response = await NetworkRequest(requestConfig);

      if (response) {
        const {success} = response;
        if (success) {
          setLoader(false);
          getAllBookings();
          Toast(response.message, 1);
        } else {
          Toast(response.message, 0);
          if (response === 'Network Error') {
            Toast('Network Error', 0);
            setHandleConnectionState(true);
            setLoader(false);
          } else if (response.status === 401) {
            signOut();
          } else {
            null;
          }
          setLoader(false);
        }
      } else {
        setLoader(false);
      }
    } catch (err) {
      console.log('err', err);
    }
  };

  // useEffect(() => {
  //   getAllBookingsStarting(page);
  // }, [page]);

  const loadMorBookings = () => {
    if (totalPage > currentPage) {
      setFooterLoader(true);
      // setPage(page + 1);
      getAllBookingsStarting();
    } else {
    }
  };

  const onInitiateTransaction = async item => {
    let orderId = `${item.id}_${Date.now()}`;
    try {
      let data = {
        order_id: orderId,
        final_amount: item.final_amount,
        transaction_type: 'Booking',
      };
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
          onPayment(txnToken, item, orderId);
        } else {
          if (response === 'Network Error') {
            Toast('Network Error', 0);
            setHandleConnectionState(true);
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

  const onPayment = (token, data, orderID) => {
    if (Platform.OS === 'ios') {
      AllInOneSDKManager.startTransaction(
        orderID, // Booking Id
        merchantId, // Merchant Id
        token, // Txn token provided by backend
        data.final_amount.toString(), //Total Amount

        `${releaseEnvironment.Api_Live_Url}${servicesPoints.paymentServices.transaction_callback}?orderid=${orderID}`,
        false,

        false,
        `${'paytm'}${merchantId}`,
      )
        .then(res => {
          paymentSuccess(res, data, orderID);
        })
        .catch(err => {
          console.log('error caught ', err);
          Toast('Payment Failed! Try again');
        });
    } else {
      AllInOneSDKManager.startTransaction(
        orderID,
        merchantId,
        token,
        data.final_amount.toString(),
        // 'https://www.npmjs.com/package/paytm_allinone_react-native',
        `${releaseEnvironment.Api_Live_Url}${servicesPoints.paymentServices.transaction_callback}?orderid=${orderID}`,
        false,
        false,
        `${'paytm'}${merchantId}`,
      )
        .then(res => {
          console.log('res caught ', res);
          // const parseData = JSON.parse(res.response);
          paymentSuccess(res, data, orderID);
        })
        .catch(err => {
          console.log('error caught ', err);
          // Toast('Payment Failed! Try again');
        });
    }
  };

  const paymentSuccess = (res, data, orderID) => {
    if (res.RESPCODE === '01' && res.TXNID) {
      onClickMakePayment(res.TXNID, data, orderID);
    } else {
      Toast('Try again, Payment Failure!', 0);
    }
  };

  const onClickMakePayment = async (transaction_id, values, orderID) => {
    try {
      setLoader(true);
      let data = {
        booking_id: values.id,
        transactions: transaction_id,
      };

      const requestConfig = {
        method: method.post,
        data: data,
        url: servicesPoints.bookingServices.create_pending_booking,
      };
      const response = await NetworkRequest(requestConfig);

      if (response) {
        const {success} = response;
        if (success) {
          // setLoader(false);

          // setRefresh(true);
          // Toast(response.message, 1);
          getAllBookingsStarting(1);
        } else {
          Toast(response.message, 0);
          if (response === 'Network Error') {
            Toast('Network Error', 0);
            setHandleConnectionState(true);
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
  const onClearNavigation = () => {
    navigationOrder.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <DefaultHeader
        onBack={() =>
          screen === 'OrderSummary' ? onClearNavigation() : navigation.goBack()
        }
        title={'My Bookings'}
      />
      <View style={styles.mainContainer}>
        <View style={{flexGrow: 1, backgroundColor: colors.white}}>
          <View style={styles.dataSection}>
            <View>
              {patientValues || timeValues || statusValue ? (
                <TouchableOpacity
                  style={{
                    paddingHorizontal: hp('1.4%'),
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                  }}
                  onPress={reset}>
                  <RegularText
                    style={{marginRight: 5, color: colors.red}}
                    title={'Reset'}
                  />
                  <Image source={imagesConstants.cancelRed} />
                </TouchableOpacity>
              ) : null}
              {/* <View style={styles.dropDownSections}>
                <View style={styles.patientSection}>
                  <View style={styles.dropDownView}>
                    <DropDownPicker
                      open={patientOpens}
                      placeholder="Select Patients"
                      value={patientValues}
                      placeholderStyle={{color: colors.purplishGrey}}
                      textStyle={{fontSize: hp('1.5%')}}
                      style={{borderColor: colors.purplishGrey, borderWidth: 1}}
                      dropDownContainerStyle={styles.dropDownContainer}
                      items={patients}
                      setOpen={setPatientOpens}
                      setValue={setPatientValues}
                    />
                  </View>
                </View>
                <View style={styles.patientSection}>
                  <View style={styles.dropDownView}>
                    <DropDownPicker
                      open={statusOpen}
                      placeholder="Status"
                      value={statusValue}
                      textStyle={{fontSize: hp('1.5%')}}
                      placeholderStyle={{color: colors.purplishGrey}}
                      style={{borderColor: colors.purplishGrey, borderWidth: 1}}
                      dropDownContainerStyle={styles.dropDownContainer}
                      items={status}
                      setOpen={setStatusOpen}
                      setValue={setStatusValue}
                    />
                  </View>
                </View>
                <View style={styles.timeSection}>
                  <View style={styles.dropDownView}>
                    <DropDownPicker
                      open={timeOpens}
                      placeholder="Duration"
                      placeholderStyle={{color: colors.purplishGrey}}
                      value={timeValues}
                      style={{borderColor: colors.purplishGrey, borderWidth: 1}}
                      items={times}
                      textStyle={{fontSize: hp('1.5%')}}
                      dropDownContainerStyle={styles.dropDownContainer}
                      setOpen={setTimeOpens}
                      setValue={setTimeValues}
                    />
                  </View>
                </View>
              </View> */}
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: hp('1.4%'),
                paddingVertical: hp('1%'),
              }}>
              <View style={styles.patientSection}>
                <View style={styles.dropDownView}>
                  <DropDownPicker
                    open={patientOpens}
                    placeholder="Select Patients"
                    value={patientValues}
                    placeholderStyle={{color: colors.purplishGrey}}
                    textStyle={{fontSize: hp('1.5%')}}
                    style={{
                      borderColor: colors.purplishGrey,
                      borderWidth: 1,
                      zIndex: 999,
                    }}
                    dropDownContainerStyle={styles.dropDownContainer}
                    items={patients}
                    setOpen={() => {
                      setPatientOpens(!patientOpens);
                      setStatusOpen(false);
                      setTimeOpens(false);
                    }}
                    setValue={setPatientValues}
                    setItems={setPatients}
                  />
                </View>
              </View>
              <View style={styles.patientSection}>
                <View style={styles.dropDownView}>
                  <DropDownPicker
                    open={statusOpen}
                    placeholder="Status"
                    value={statusValue}
                    textStyle={{fontSize: hp('1.5%')}}
                    placeholderStyle={{color: colors.purplishGrey}}
                    style={{
                      borderColor: colors.purplishGrey,
                      borderWidth: 1,
                      zIndex: 999,
                    }}
                    dropDownContainerStyle={styles.dropDownContainer}
                    items={status}
                    setOpen={() => {
                      setStatusOpen(!statusOpen);
                      setPatientOpens(false);
                      setTimeOpens(false);
                    }}
                    setValue={setStatusValue}
                    setItems={setStatus}
                  />
                </View>
              </View>
              <View style={styles.timeSection}>
                <View style={styles.dropDownView}>
                  <DropDownPicker
                    open={timeOpens}
                    placeholder="Duration"
                    placeholderStyle={{color: colors.purplishGrey}}
                    value={timeValues}
                    style={{
                      borderColor: colors.purplishGrey,
                      borderWidth: 1,
                      zIndex: 999,
                    }}
                    items={times}
                    textStyle={{fontSize: hp('1.5%')}}
                    dropDownContainerStyle={styles.dropDownContainer}
                    setOpen={() => {
                      setTimeOpens(!timeOpens);
                      setPatientOpens(false);
                      setStatusOpen(false);
                    }}
                    setValue={setTimeValues}
                    setItems={setTimes}
                  />
                </View>
              </View>
            </View>

            <View
              style={[
                styles.listSectionTwo,
                // {
                //   marginTop:
                //     patientOpens || timeOpens || statusOpen ? hp('18%') : 0,
                // },
              ]}>
              <FlatList
                data={bookings}
                showsVerticalScrollIndicator={false}
                extraData={bookings}
                refreshing={refreshing}
                ListFooterComponent={() => {
                  return (
                    //Footer View with Load More button
                    <View style={{padding: 5}}>
                      <View style={styles.loadMoreBtn}>
                        {footerLoader ? (
                          <ActivityIndicator
                            color={colors.app_theme_dark_green}
                          />
                        ) : null}
                      </View>
                    </View>
                  );
                }}
                // onEndReachedThreshold={0.5}
                keyExtractor={item => item.id}
                // onEndReached={loadMorBookings}
                onRefresh={onRefresh}
                ListEmptyComponent={() => {
                  return (
                    <View style={styles.emptyView}>
                      {!loader ? (
                        <RegularText
                          style={styles.emptyText}
                          title={`No Booking's found`}
                        />
                      ) : null}
                    </View>
                  );
                }}
                renderItem={({item, index}) => {
                  return (
                    <MyBookingCard
                      onCancelBooking={() => cancelBooking(item.data[0])}
                      index={index}
                      onViewMore={() =>
                        navigation.navigate('MyBookingDetail', {
                          screen: 'MyBookingTab',
                          myBookingData: item.data,
                        })
                      }
                      onPrescriptionPay={() =>
                        onInitiateTransaction(item.data[0])
                      }
                      onPressRate={() =>
                        navigation.navigate('Rating', {
                          myBookingData: item.data[0],
                        })
                      }
                      data={item.data}
                    />
                  );
                }}
              />
            </View>
          </View>
        </View>
      </View>

      <Loader display={loader} />
    </SafeAreaView>
  );
};

export default index1;
