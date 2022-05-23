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
  PermissionsAndroid,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SubmitButton} from '../../../components/Buttons';
import styles from './styles';
import PDFView from 'react-native-view-pdf';
var resources = {
  file:
    Platform.OS === 'ios'
      ? 'downloadedDocument.pdf'
      : '/sdcard/Download/downloadedDocument.pdf',
  url: 'http://www.africau.edu/images/default/sample.pdf',
  base64: 'JVBERi0xLjMKJcfs...',
};

const resourceType = 'url';
// import Pdf from 'react-native-pdf';
import RNFetchBlob from 'rn-fetch-blob';
import DefaultHeader from '../../../components/DefaultHeader';
import {BoldText, LightText, RegularText} from '../../../components/Common';
import colors from '../../../../constants/colors';

import {
  Loader,
  MyBookingCard,
  Toast,
  UploadedPrescriptionCard,
} from '../../../components';
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
  const [prescriptionShown, setPrescriptionShown] = useState(false);
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

  const resourceType = 'url';

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // if (apiHit) {
      getAllPrescriptionStarting(1);
      // }
    });
    return unsubscribe;
  }, [navigation]);

  // useEffect(() => {
  //   const backAction = () => {
  //     Alert.alert('Hold on!', 'Are you sure you want to close prescription?', [
  //       {
  //         text: 'Cancel',
  //         onPress: () => null,
  //         style: 'cancel',
  //       },
  //       {text: 'Yes', onPress: () => setPrescriptionShown(false)},
  //     ]);

  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );

  //   return () => backHandler.remove();
  // }, []);

  //   const getMyFamilyMembers = async () => {
  //     const requestConfig = {
  //       method: method.get,
  //       url: servicesPoints.userServices.my_family_mambers,
  //     };
  //     const response = await NetworkRequest(requestConfig);

  //     if (response) {
  //       const {success} = response;
  //       if (success) {
  //         let newData = [];
  //         let test = response.data;
  //         test.map(item => {
  //           newData.push({label: item.fullname, value: item.id});
  //           // return {label: item.fullname, value: item.id};
  //         });
  //         setPatients(newData);
  //         setLoader(false);
  //       } else {
  //         if (response === 'Network Error') {
  //           Toast('Network Error', 0);
  //           setLoader(false);
  //         }
  //         setLoader(false);
  //       }
  //     } else {
  //       setLoader(false);
  //     }
  //   };
  //   useEffect(() => {
  //     if (patientValues || timeValues || statusValue) {
  //       getAllBookings(2);
  //     }
  //   }, [patientValues, timeValues, statusValue]);

  const onOpenFile = url => {
    // resources = {
    //   file:
    //     Platform.OS === 'ios'
    //       ? 'downloadedDocument.pdf'
    //       : '/sdcard/Download/downloadedDocument.pdf',
    //   url: url,
    //   base64: 'JVBERi0xLjMKJcfs...',
    // };

    navigation.navigate('PrescriptionViewer', {
      url: url,
      screenName: 'Prescription',
    });

    // setPrescriptionShown(true);
  };

  const checkPermissionFileOpen = async url => {
    // Function to check the platform
    // If Platform is Android then check for permissions.

    if (Platform.OS === 'ios') {
      // setLoader(true);
      onOpenFile(url);
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'Application needs access to your storage to download File then it will show to you',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          // setLoader(true);
          await onOpenFile(url);
        } else {
          // If permission denied then show alert
          Alert.alert('Error', 'Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.log('++++' + err);
      }
    }
  };

  const getAllPrescriptionStarting = async val => {
    setLoader(true);

    try {
      const requestConfig = {
        method: method.get,
        url: `${servicesPoints.userServices.my_prescriptions}`,
      };

      const response = await NetworkRequest(requestConfig);

      if (response) {
        const {success} = response;
        if (success) {
          setBookings(response?.data);

          setLoader(false);
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

  //   function uniqueData(data) {
  //     let array = bookings;
  //     array = array.concat(data);
  //     let unique = array.reduce((res, itm) => {
  //       // Test if the item is already in the new array
  //       let result = res.find(item => item.id === itm.id);
  //       // If not lets add it
  //       if (!result) return res.concat(itm);
  //       // If it is just return what we already have
  //       return res;
  //     }, []);
  //     // setBookings(page === 1 ? data : [...bookings, ...data]);
  //     setBookings(unique);
  //     setLoader(false);
  //     setRefreshing(false);
  //     setFooterLoader(false);
  //     setPage(page + 1);
  //     getMyFamilyMembers();
  //   }

  //   const getAllBookings = async val => {
  //     setLoader(true);
  //     try {
  //       const requestConfig = {
  //         method: method.get,
  //         url: `${servicesPoints.bookingServices.mybookings}?member_id=${
  //           patientValues ? patientValues : ''
  //         }&status=${statusValue ? statusValue : ''}&time_period=${
  //           timeValues ? timeValues : ''
  //         }`,
  //       };

  //       const response = await NetworkRequest(requestConfig);

  //       if (response) {
  //         const {success} = response;
  //         if (success) {
  //           setBookings(response?.data?.docs);
  //           setRefreshing(false);
  //           getMyFamilyMembers();
  //         } else {
  //           if (response === 'Network Error') {
  //             Toast('Network Error', 0);
  //           }
  //           setLoader(false);
  //         }
  //       } else {
  //       }
  //     } catch (err) {
  //     }
  //   };

  const onRefresh = () => {
    setBookings([]);
    setRefreshing(true);
    getAllPrescriptionStarting(1);
  };

  //   const reset = () => {
  //     setLoader(true);
  //     setPatientValues(null);
  //     setTimeValues(null);
  //     setStatusValue(null);
  //     setLoader(false);
  //   };

  //   const cancelBooking = async item => {
  //     Alert.alert(
  //       'Are you sure want to cancel this booking',
  //       ``,
  //       [
  //         {
  //           text: 'Cancel',
  //           style: 'cancel',
  //         },
  //         {
  //           text: 'Ok',
  //           onPress: () => onCancel(item),
  //         },
  //       ],
  //       {cancelable: false},
  //     );
  //   };

  const loadMorBookings = () => {
    if (totalPage > currentPage) {
      setFooterLoader(true);
      // setPage(page + 1);
      getAllPrescriptionStarting();
    }
  };

  //   const onInitiateTransaction = async item => {
  //     let orderId = `${item.id}_${Date.now()}`;
  //     try {
  //       let data = {
  //         order_id: orderId,
  //         final_amount: item.final_amount,
  //         transaction_type: 'Booking',
  //       };
  //       const requestConfig = {
  //         method: method.post,
  //         data: data,
  //         url: servicesPoints.paymentServices.initiate_transaction,
  //       };
  //       const response = await NetworkRequest(requestConfig);
  //       if (response) {
  //         const {success} = response;
  //         if (success) {
  //           let txnToken = response.data.body.txnToken;
  //           onPayment(txnToken, item, orderId);
  //         } else {
  //           if (response === 'Network Error') {
  //             Toast('Network Error', 0);
  //             setLoader(false);
  //           } else if (response.status === 401) {
  //             signOut();
  //           } else {
  //             null;
  //           }
  //           setLoader(false);
  //         }
  //       }
  //     } catch (err) {
  //       setLoader(false);
  //     }
  //   };

  //   const paymentSuccess = (res, data, orderID) => {
  //     if (res.RESPCODE === '01' && res.TXNID) {
  //       onClickMakePayment(res.TXNID, data, orderID);
  //     }
  //   };

  //   const onClickMakePayment = async (transaction_id, values, orderID) => {
  //     try {
  //       setLoader(true);
  //       let data = {
  //         booking_id: values.id,
  //         transactions: transaction_id,
  //       };

  //       const requestConfig = {
  //         method: method.post,
  //         data: data,
  //         url: servicesPoints.bookingServices.create_pending_booking,
  //       };
  //       const response = await NetworkRequest(requestConfig);

  //       if (response) {
  //         const {success} = response;
  //         if (success) {
  //           // setLoader(false);

  //           // setRefresh(true);
  //           // Toast(response.message, 1);
  //           getAllBookingsStarting(1);
  //         } else {
  //           Toast(response.message, 0);
  //           if (response === 'Network Error') {
  //             Toast('Network Error', 0);
  //             setLoader(false);
  //           } else if (response.status === 401) {
  //             signOut();
  //           } else {
  //             null;
  //           }
  //           setLoader(false);
  //         }
  //       }
  //     } catch (err) {
  //       setLoader(false);
  //     }
  //   };
  //   const onClearNavigation = () => {
  //     navigationOrder.reset({
  //       index: 0,
  //       routes: [{name: 'Home'}],
  //     });
  //   };

  return (
    <>
      {prescriptionShown ? (
        <SafeAreaView style={styles.safeArea}>
          <DefaultHeader
            onBack={() => setPrescriptionShown(false)}
            title={`Prescription`}
          />
          <View style={[styles.container]}>
            <PDFView
              fadeInDuration={250.0}
              style={{height: '100%', width: '100%'}}
              resource={resources[resourceType]}
              resourceType={resourceType}
            />
          </View>
        </SafeAreaView>
      ) : (
        <SafeAreaView style={styles.safeArea}>
          <DefaultHeader
            onBack={() => navigation.goBack()}
            title={'Uploaded Prescription'}
          />
          <View style={styles.mainContainer}>
            <View style={{flexGrow: 1, backgroundColor: colors.white}}>
              <View style={styles.dataSection}>
                {/* <View>
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
              <View style={styles.dropDownSections}>
                <View style={styles.patientSection}>
                  <View style={styles.dropDownView}>
                    <DropDownPicker
                      open={patientOpens}
                      placeholder="Select Patients"
                      value={patientValues}
                      placeholderStyle={{color: colors.purplishGrey}}
                      style={styles.dropDownContainer}
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
                      placeholderStyle={{color: colors.purplishGrey}}
                      style={styles.dropDownContainer}
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
                      style={styles.dropDownContainer}
                      items={times}
                      dropDownContainerStyle={styles.dropDownContainer}
                      setOpen={setTimeOpens}
                      setValue={setTimeValues}
                    />
                  </View>
                </View>
              </View>
            </View> */}
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
                    keyExtractor={item => item.id}
                    onRefresh={onRefresh}
                    ListEmptyComponent={() => {
                      return (
                        <View style={styles.emptyView}>
                          {!loader ? (
                            <RegularText
                              style={styles.emptyText}
                              title={`No Prescription's found`}
                            />
                          ) : null}
                        </View>
                      );
                    }}
                    renderItem={({item}) => {
                      return (
                        <UploadedPrescriptionCard
                          onPressPrescription={data => {
                            checkPermissionFileOpen(data);
                          }}
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
      )}
    </>
  );
};

export default index;
