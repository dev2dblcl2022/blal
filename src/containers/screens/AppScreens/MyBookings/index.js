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
import {Loader, MyBookingCard, Toast} from '../../../components';
import NetworkRequest, {
  method,
  servicesPoints,
} from '../../../../services/NetworkRequest';
import {useNavigation} from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import imagesConstants from '../../../../constants/imagesConstants';
import {AuthContext} from '../../../../../context/context';
import {Api_Live_Url, Pay_tmMerchantId} from '../../../../config/Setting';
const merchantId = Pay_tmMerchantId;
const index = ({navigation, route}) => {
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
          setBookings(response?.data?.docs);
          setLoader(false);
          getMyFamilyMembers();

          setRefreshing(false);
        } else {
          setLoader(false);

          if (response === 'Network Error') {
            Toast('Network Error', 0);
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
          setBookings(response?.data?.docs);
          setRefreshing(false);
          getMyFamilyMembers();
        } else {
          if (response === 'Network Error') {
            Toast('Network Error', 0);
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
    setLoader(true);
    try {
      let data = {
        task_id: item.task_id,
        booking_id: item.id,
      };
      const requestConfig = {
        method: method.post,
        data: data,
        url: `${servicesPoints.bookingServices.cancelBooking}`,
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
    console.log('total page', totalPage, currentPage);
    if (totalPage > currentPage) {
      console.log('pagination called', totalPage);
      setFooterLoader(true);
      // setPage(page + 1);
      // console.log('page number ', page);
      getAllBookingsStarting();
    } else {
    }
  };

  const onInitiateTransaction = async item => {
    console.log('I am calling ', item);
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
      console.log('I am calling initate  request config ', requestConfig);
      const response = await NetworkRequest(requestConfig);
      console.log('I am calling response ', response);
      if (response) {
        const {success} = response;
        if (success) {
          console.log('response is transaction is', response);
          let txnToken = response.data.body.txnToken;
          console.log('txn token is here', txnToken);
          onPayment(txnToken, item, orderId);
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

  const onPayment = (token, data, orderID) => {
    console.log('cal android 1 ', token, data);
    if (Platform.OS === 'ios') {
      AllInOneSDKManager.startTransaction(
        orderID, // Booking Id
        merchantId, // Merchant Id
        token, // Txn token provided by backend
        data.final_amount, //Total Amount
        // 'https://www.npmjs.com/package/paytm_allinone_react-native',

        `${Api_Live_Url}${servicesPoints.paymentServices.transaction_callback}?orderid=${orderID}`,
        false,
        false,
      )
        .then(res => {
          paymentSuccess(res, data, orderID);
        })
        .catch(err => {
          console.log('error caught ', err);
          Toast('Payment Failed! Try again');
        });
    } else {
      console.log('cal android ', token, data);
      AllInOneSDKManager.startTransaction(
        orderID,
        merchantId,
        token,
        // '1',
        data.final_amount,
        // 'https://www.npmjs.com/package/paytm_allinone_react-native',
        `${Api_Live_Url}${servicesPoints.paymentServices.transaction_callback}?orderid=${orderID}`,
        false,
        false,
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
      console.log('before onclickmake ', res);
      onClickMakePayment(res.TXNID, data, orderID);
    }
  };

  const onClickMakePayment = async (transaction_id, values, orderID) => {
    console.log('inside onclick make ', transaction_id, orderID);
    try {
      // console.log('inside try ');
      setLoader(true);
      let data = {
        booking_id: values.id,
        transactions: transaction_id,
      };

      // console.log('REQUEST of payment', data);
      const requestConfig = {
        method: method.post,
        data: data,
        url: servicesPoints.bookingServices.create_pending_booking,
      };
      console.log('requestConfig of payment', requestConfig);
      const response = await NetworkRequest(requestConfig);

      if (response) {
        const {success} = response;
        if (success) {
          // setLoader(false);

          // setRefresh(true);
          // Toast(response.message, 1);
          // console.log('Response of Payment', response);
          getAllBookingsStarting(1);
        } else {
          Toast(response.message, 0);
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
  const onClearNavigation = () => {
    console.log('pppp', screen);
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
                zIndex: 2000,
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
                renderItem={({item}) => {
                  return (
                    <MyBookingCard
                      onCancelBooking={() => cancelBooking(item)}
                      onViewMore={() =>
                        navigation.navigate('MyBookingDetail', {
                          screen: 'MyBookingTab',
                          myBookingData: item,
                        })
                      }
                      onPrescriptionPay={() => onInitiateTransaction(item)}
                      onPressRate={() =>
                        navigation.navigate('Rating', {myBookingData: item})
                      }
                      data={item}
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

export default index;
