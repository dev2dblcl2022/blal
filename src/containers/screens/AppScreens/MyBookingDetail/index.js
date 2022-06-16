/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
  Platform,
  Text,
  Linking,
  BackHandler,
} from 'react-native';
// import Pdf from 'react-native-pdf';
import imagesConstants from '../../../../constants/imagesConstants';
import RNFS from 'react-native-fs';

import {
  DefaultHeader,
  Loader,
  MainContainer,
  MyCartTestCard,
  PrescriptionViewer,
  Toast,
} from '../../../components';
import FileViewer from 'react-native-file-viewer';
import {BoldText, LightText, RegularText} from '../../../components/Common';
import styles from './style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import NetworkRequest, {
  method,
  servicesPoints,
} from '../../../../services/NetworkRequest';
import RNFetchBlob from 'rn-fetch-blob';
import colors from '../../../../constants/colors';
import {CancelButton} from '../../../components/Buttons';
import {AuthContext} from '../../../../../context/context';
import PDFView from 'react-native-view-pdf';
import {getStagingReportURL} from '../../../../apis/env';
let resources = {
  file:
    Platform.OS === 'ios'
      ? 'downloadedDocument.pdf'
      : '/sdcard/Download/downloadedDocument.pdf',
  url: 'http://www.africau.edu/images/default/sample.pdf',
  base64: 'JVBERi0xLjMKJcfs...',
};

const resourceType = 'url';

const index = ({navigation, route}) => {
  const {signOut, signIn} = React.useContext(AuthContext);
  const myBookingData = route.params.myBookingData;
  const screen = route.params.screen;

  const [familyMembersData, setFamilyMembersData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [bookingDetailData, setBookingDetailData] = useState({});
  const [prescriptionShown, setPrescriptionShown] = useState(false);

  const [labAddress, setLabAddress] = useState('');
  const [labName, setLabName] = useState('');
  const [handleConnectionState, setHandleConnectionState] = useState(false);
  useEffect(() => {
    if (handleConnectionState) {
      navigation.navigate('ConnectionHandle');
    }
  }, [handleConnectionState]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getMyBookingDetail();
    });
    return unsubscribe;
  }, [navigation]);

  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', onClearNavigation);
  //   return () => {
  //     BackHandler.removeEventListener('hardwareBackPress', onClearNavigation);
  //   };
  // }, []);

  // const onClearNavigation = () => {
  //   if (prescriptionShown) {
  //     setPrescriptionShown(false);
  //   } else {
  //     navigation.pop();
  //   }
  // };

  const getMyBookingDetail = async () => {
    try {
      const requestConfig = {
        method: method.get,

        url: `${servicesPoints.bookingServices.booking_details}/${myBookingData.id}`,
      };

      const response = await NetworkRequest(requestConfig);
      if (response) {
        const {success} = response;
        if (success) {
          setBookingDetailData(response.data);
          if (response?.data?.collection_type === 'Lab') {
            let address = response.data.address_id.split('#');
            if (address.length) {
              setLabName(address[0]);
              setLabAddress(address[1]);
            }
          }

          setLoader(false);
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

  const cancelBooking = async val => {
    setLoader(true);
    try {
      let data = {
        task_id: myBookingData.task_id,
        booking_id: myBookingData.id,
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
          Toast(response.message, 1);
          navigation.pop();
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

  const renderSelfTextCard = item => {
    // let testList = getPackageDetail(item);
    return (
      // <MyCartTestCard  data={item} />
      <MyCartTestCard
        onPressItem={data => {
          navigation.navigate('FullBodyCheckup', {
            comeFromMyCart: true,
            testPackageData: {id: data.test_id, type: data.test_type},
          });
        }}
        cancel={false}
        onDeleteTest={data => onDeleteTest(data)}
        data={item}
      />
    );
  };

  const onDeleteTest = async item => {
    try {
      //   setLoader(true);
      let data = {
        itemId: item.toString(),
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
          //   getMyCartData();
        } else {
          if (response === 'Network Error') {
            // Toast('Network Error', 0);
            // setLoader(false);
          } else if (response.status === 401) {
            // signOut();
          } else {
            null;
          }
          //   setLoader(false);
        }
      }
    } catch (err) {
      //   setLoader(false);
    }
  };

  const onOpenFile = url => {
    resources = {
      file:
        Platform.OS === 'ios'
          ? 'downloadedDocument.pdf'
          : '/sdcard/Download/downloadedDocument.pdf',
      url: url,
      base64: 'JVBERi0xLjMKJcfs...',
    };
    // navigation.navigate('PrescriptionViewer', {
    //   url: url,
    //   screenName: 'Upload Prescription',
    // });

    setPrescriptionShown(true);
    // return (
    //   <View style={styles.container}>
    //     <Pdf
    //       source={source}
    //       style={styles.pdf}
    //     />
    //   </View>
    // );
    // return <PrescriptionViewer url={url} />;
  };

  const onDownloadInvoice = () => {
    const fileUrl = getStagingReportURL(
      `/Design/Finanace/ReceiptBill.aspx?LedgerTransactionNo=${bookingDetailData.LedgerTransactionNo}&Status=0&TYPE=LAB`,
    );

    checkPermission(fileUrl);
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

  const checkPermission = async url => {
    // Function to check the platform
    // If Platform is Android then check for permissions.

    if (Platform.OS === 'ios') {
      setLoader(true);
      downloadFile(url);
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'Application needs access to your storage to download File',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          setLoader(true);
          downloadFile(url);
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

  const downloadFile = url => {
    // Get today's date to add the time suffix in filename
    let date = new Date();
    // File URL which we want to download
    let FILE_URL = url;
    // Function to get extention of the file url
    let file_ext = getFileExtention(FILE_URL);

    file_ext = '.' + file_ext[0];

    // config: To get response by passing the downloading related options
    // fs: Root directory path to download
    const {config, fs} = RNFetchBlob;
    let RootDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        path:
          RootDir +
          '/file_' +
          ' ' +
          '(' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ').pdf',
        // file_ext,
        description: 'downloading file...',
        notification: true,
        // useDownloadManager works with Android only
        useDownloadManager: true,
      },
    };
    config(options)
      .fetch('GET', FILE_URL)
      .then(res => {
        // Alert after successful downloading
        setLoader(false);
        Toast(`Invoice Downloaded Successfully!`, 1);
      })
      .catch(err => {
        setLoader(false);
        alert('Invoice Downloaded Successfully.');
      });
  };

  const getFileExtention = fileUrl => {
    // To get the file extension
    return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
  };

  const dialCall = call => {
    let contact = call;
    // let firstPhoneNumber = Contact.split(',');
    let firstPhoneNumber = contact;
    // let phoneNumber = firstPhoneNumber[0];
    let phoneNumber = firstPhoneNumber;
    let CallNumber = '';
    if (Platform.OS === 'android') {
      CallNumber = `tel:${phoneNumber}`;
    } else {
      CallNumber = `telprompt:${phoneNumber}`;
    }

    Linking.openURL(CallNumber);
  };

  return (
    <>
      {prescriptionShown ? (
        <SafeAreaView style={styles.safeArea}>
          <DefaultHeader
            onBack={() => setPrescriptionShown(false)}
            title={'Uploaded Prescription'}
          />
          <View
            style={[
              styles.container,
              {
                flexGrow: 1,
                alignItems: 'flex-start',
              },
            ]}>
            {/* <Pdf
              source={source}
              style={styles.pdf}
            /> */}

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
            title={`My Booking #${bookingDetailData.LisBookId}`}
          />
          <MainContainer>
            <ScrollView style={styles.scroll}>
              <View style={styles.fullContainer}>
                <View style={styles.bookingSuccessfulView}>
                  <View style={styles.whiteSection}>
                    <View style={styles.logoContainer}>
                      <Image
                        style={styles.logo}
                        source={imagesConstants.booking_success}
                      />
                    </View>
                    <View style={styles.animatedLoaderSection}></View>
                    <View style={styles.textSection}>
                      <BoldText
                        style={styles.successText}
                        title={
                          bookingDetailData.status === 'Confirmed'
                            ? 'Booking Confirmed'
                            : bookingDetailData.status === 'Accepted'
                            ? 'Booking Pro Accepted'
                            : bookingDetailData.status === 'Started' ||
                              bookingDetailData.status === 'Arrived'
                            ? 'Booking Pro Started'
                            : bookingDetailData.status === 'Successful'
                            ? 'Booking Successful'
                            : bookingDetailData.status === 'Registered'
                            ? 'Booking Registered'
                            : bookingDetailData.status === 'Cancelled'
                            ? 'Booking Cancelled'
                            : bookingDetailData.status === 'Upcoming'
                            ? 'Booking Upcoming'
                            : 'Booking Report Approved'
                        }
                      />
                      {/* <RegularText
                        style={styles.dateTimeText}
                        title={`Thank you for Submitting the Prescriptions.Our team will get back to you soon.`}
                      /> */}
                    </View>
                  </View>
                </View>
                {bookingDetailData.collection_type === 'Home' ? (
                  <View style={styles.bookingStatus}>
                    <Image
                      style={styles.statusImage}
                      source={
                        bookingDetailData.status === 'Confirmed'
                          ? imagesConstants.bookingConfirmed
                          : bookingDetailData.status === 'Accepted'
                          ? imagesConstants.proAssign
                          : bookingDetailData.status === 'Started' ||
                            bookingDetailData.status === 'Arrived'
                          ? imagesConstants.started
                          : bookingDetailData.status === 'Successful'
                          ? imagesConstants.collectionDone
                          : bookingDetailData.status === 'Batch Received'
                          ? imagesConstants.sampleAtLab
                          : bookingDetailData.status === 'Approved'
                          ? imagesConstants.reportApproved
                          : imagesConstants.bookingConfirmed
                      }
                    />
                    <View style={styles.bookingStatusSection}>
                      <View style={styles.section1}>
                        <LightText
                          style={styles.bookingConfirmedText}
                          title={
                            bookingDetailData.status === 'Cancelled'
                              ? 'Booking Cancelled'
                              : 'Booking Confirmed'
                          }
                        />
                      </View>
                      <View style={styles.section2}>
                        <LightText
                          style={styles.proAssignText}
                          title={'Pro Assigned'}
                        />
                      </View>
                      <View style={styles.section3}>
                        <LightText
                          style={styles.proAssignText}
                          title={'Started'}
                        />
                      </View>
                      <View style={styles.section4}>
                        <LightText
                          style={styles.collectionDoneText}
                          title={'Collection Done'}
                        />
                      </View>
                      <View style={styles.section5}>
                        <LightText
                          style={styles.collectionDoneText}
                          title={'Sample reached at the lab (LIS)'}
                        />
                      </View>
                      <View style={styles.section6}>
                        <LightText
                          style={styles.reportApprovedText}
                          title={'Report Approved'}
                        />
                      </View>
                    </View>
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingHorizontal: hp('3%'),
                    }}>
                    <View style={styles.bookingStatus2}>
                      <View style={styles.emptyView}>
                        <Image
                          source={
                            bookingDetailData.status === 'Upcoming'
                              ? imagesConstants.marker
                              : imagesConstants.point
                          }
                        />
                      </View>
                      <View style={styles.lineView}>
                        <View style={styles.line} />
                      </View>

                      <View style={styles.emptyView}>
                        <Image
                          source={
                            bookingDetailData.status === 'Batch Received'
                              ? imagesConstants.marker
                              : imagesConstants.point
                          }
                        />
                      </View>
                      <View style={styles.lineView}>
                        <View style={styles.line} />
                      </View>
                      <View style={styles.emptyView}>
                        <Image
                          source={
                            bookingDetailData.status === 'Approved'
                              ? imagesConstants.marker
                              : imagesConstants.point
                          }
                        />
                      </View>
                    </View>
                    <View style={styles.statusText2}>
                      <View style={styles.view1}>
                        <LightText
                          style={styles.bookingConfirmedText}
                          title={'Upcoming'}
                        />
                      </View>

                      <View style={styles.view2}>
                        <LightText
                          style={styles.proAssignText}
                          title={'Collection reached on lab'}
                        />
                      </View>
                      <View style={styles.view3}>
                        <LightText
                          style={styles.proAssignText}
                          title={'Report Approved'}
                        />
                      </View>
                    </View>
                  </View>
                )}
                <View style={styles.BookingCard}>
                  <View style={styles.bookingCard}>
                    <View style={styles.bookingCardPartOne}>
                      <View style={{flex: 1}}>
                        <RegularText
                          style={styles.bookingIdText}
                          title={`#${bookingDetailData.LisBookId}`}
                        />
                        <View style={{marginTop: hp('1%')}}>
                          <LightText
                            style={styles.bookingIdLabel}
                            title={'Booking ID'}
                          />
                        </View>
                      </View>
                      <View style={{flex: 1}}>
                        <View style={styles.btnView}>
                          <RegularText
                            style={styles.btnViewText}
                            title={bookingDetailData.status}
                          />
                        </View>
                      </View>
                    </View>
                    <View
                      style={[
                        styles.bookingCardPartOne,
                        {marginTop: hp('2%')},
                      ]}>
                      {/* <View style={{flex: 1}}>
                        <RegularText
                          style={styles.bookingIdText}
                          title={`#${bookingDetailData.LisBookId}`}
                        />
                        <View style={{marginTop: hp('1%')}}>
                          <LightText
                            style={styles.bookingIdLabel}
                            title={'Booking ID'}
                          />
                        </View>
                      </View> */}
                      <View style={{flex: 1}}></View>
                    </View>
                    <View style={styles.cardPartTwo}>
                      <View style={{flex: 1}}>
                        <View>
                          <LightText
                            style={styles.bookingIdLabel}
                            title={'Date & Time'}
                          />
                        </View>

                        <View style={{marginTop: hp('1%')}}>
                          <RegularText
                            style={styles.booingDateText}
                            title={bookingDetailData.created_at}
                          />
                        </View>
                      </View>

                      <View style={{flex: 1}}>
                        <View>
                          <LightText
                            style={styles.bookingIdLabel}
                            title={'Appointment Date and Time'}
                          />
                        </View>

                        <View style={{marginTop: hp('1%')}}>
                          <RegularText
                            style={styles.booingDateText}
                            title={bookingDetailData.booking_date_time}
                          />
                        </View>
                      </View>

                      <View style={{flex: 1, alignItems: 'flex-end'}}>
                        <View style={{paddingRight: hp('2%')}}>
                          <LightText
                            style={styles.bookingIdLabel}
                            title={'Collection Type'}
                          />
                        </View>
                        <View
                          style={{marginTop: hp('1%'), paddingRight: hp('2%')}}>
                          <RegularText
                            style={styles.booingDateText}
                            title={
                              bookingDetailData.collection_type === 'Home'
                                ? 'Home'
                                : 'Lab'
                            }
                          />
                        </View>
                      </View>
                    </View>
                    <View style={styles.cardPartTwo}>
                      {/* <View style={{flex: 1}}>
                       
                        <View style={{flex: 1}}>
                          <RegularText
                            style={styles.booingDateText}
                            title={
                              bookingDetailData.collection_type === 'Home'
                                ? 'Home Pickup'
                                : 'Lab Pickup'
                            }
                          />
                          <View style={{marginTop: hp('1%')}}>
                            <LightText
                              style={styles.bookingIdLabel}
                              title={'Collection Type'}
                            />
                          </View>
                        </View>
                      </View> */}
                      <View style={{flex: 1, alignItems: 'flex-end'}}>
                        <RegularText
                          style={styles.bookingRateText}
                          title={`${'\u20B9'} ${
                            bookingDetailData.total_member_amount
                          }`}
                        />
                        {/* <View
                          style={{
                            marginTop: hp('0.2%'),
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          {bookingDetailData.total_mrp ? (
                            <LightText
                              style={[
                                styles.bookingIdLabel,
                                {
                                  textDecorationLine:
                                    bookingDetailData.total_discount
                                      ? 'line-through'
                                      : 'none',
                                },
                              ]}
                              title={`${'\u20B9'} ${
                                bookingDetailData.total_mrp
                              }`}
                            />
                          ) : null}
                          {bookingDetailData.total_discount ? (
                            <LightText
                              style={styles.percentText}
                              title={`${bookingDetailData.total_discount}% off`}
                            />
                          ) : null}
                        </View> */}
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{paddingHorizontal: hp('3%')}}>
                  <View style={styles.parentSection}>
                    <View style={styles.selfTestList}>
                      <FlatList
                        data={[bookingDetailData]}
                        showsVerticalScrollIndicator={false}
                        extraData={[bookingDetailData]}
                        renderItem={({item}) => renderSelfTextCard(item)}
                      />
                    </View>
                  </View>
                </View>
                {bookingDetailData.collection_type === 'Home' ? (
                  <View>
                    {bookingDetailData.status === 'Accepted' ||
                    bookingDetailData.status === 'Started' ||
                    bookingDetailData.status === 'Successful' ||
                    bookingDetailData.status === 'Approved' ? (
                      <View style={styles.PROSection}>
                        <View style={styles.BookingCard}>
                          <View
                            style={[
                              styles.bookingCard,
                              {paddingTop: hp('3%')},
                            ]}>
                            <RegularText
                              style={styles.bookingIdText}
                              title={`Phlebotomist(PRO) Details`}
                            />

                            <View style={styles.cardPartTwo}>
                              <View style={{flex: 0.2}}>
                                <View
                                  style={{
                                    height: hp('7%'),
                                    width: hp('7%'),
                                    borderRadius: hp('3.5%'),
                                    justifyContent: 'center',
                                    overflow: 'hidden',
                                    alignItems: 'center',
                                  }}>
                                  <Image
                                    style={{
                                      height: '100%',
                                      width: '100%',
                                      borderRadius: hp('2.5%'),
                                    }}
                                    source={{
                                      uri: bookingDetailData?.fleet_image?.includes(
                                        'https',
                                      )
                                        ? bookingDetailData?.fleet_image
                                        : 'https://tookan.s3.amazonaws.com/fleet_profile/user.png',
                                    }}
                                  />
                                </View>
                              </View>

                              <View
                                style={{
                                  flex: 0.6,
                                  paddingLeft: hp('2%'),
                                  justifyContent: 'center',
                                }}>
                                <LightText
                                  style={[styles.addressText, {marginTop: 0}]}
                                  title={bookingDetailData.fleet_name}
                                />
                              </View>
                              <View
                                style={{
                                  flex: 0.4,
                                  flexDirection: 'row',

                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                }}>
                                <TouchableOpacity
                                  onPress={() =>
                                    dialCall(bookingDetailData.fleet_phone)
                                  }
                                  style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                  }}>
                                  <Image source={imagesConstants.callBooking} />
                                  <RegularText
                                    style={{fontSize: hp('1.5%')}}
                                    title={'Call'}
                                  />
                                </TouchableOpacity>
                                {bookingDetailData.status === 'Accepted' ||
                                bookingDetailData.status === 'Started' ? (
                                  <TouchableOpacity
                                    onPress={() =>
                                      navigation.navigate('TrackProScreen', {
                                        url: bookingDetailData.full_tracking_link,
                                      })
                                    }
                                    style={{
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                    }}>
                                    <Image source={imagesConstants.trackPro} />
                                    <RegularText
                                      style={{fontSize: hp('1.5%')}}
                                      title={'Track Pro'}
                                    />
                                  </TouchableOpacity>
                                ) : null}
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    ) : null}
                  </View>
                ) : null}
                {bookingDetailData.collection_type === 'Home' ? (
                  <View>
                    {bookingDetailData.status === 'Confirmed' ? (
                      <View style={styles.PROSection}>
                        <View style={styles.BookingCard}>
                          <View
                            style={[
                              styles.bookingCard,
                              {paddingTop: hp('3%')},
                            ]}>
                            <View style={styles.bookingCardPartOne}>
                              <View style={{flex: 1}}>
                                <RegularText
                                  style={styles.bookingIdText}
                                  title={`Phlebotomist(PRO) Details`}
                                />
                              </View>
                            </View>
                            <View style={styles.cardPartTwo}>
                              <View style={{flex: 0.1}}>
                                <Image source={imagesConstants.timer} />
                              </View>

                              <View
                                style={{flex: 0.7, justifyContent: 'center'}}>
                                <LightText
                                  style={[styles.addressText, {marginTop: 0}]}
                                  title={'Waiting for the PRO assignment'}
                                />
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    ) : null}
                  </View>
                ) : null}
                {bookingDetailData.collection_type === 'Lab' ? (
                  <View style={styles.PROSection}>
                    <View style={styles.BookingCard}>
                      <View
                        style={[styles.bookingCard, {paddingTop: hp('3%')}]}>
                        <View style={styles.bookingCardPartOne}>
                          <View style={{flex: 1}}>
                            <RegularText
                              style={styles.bookingIdText}
                              title={`Lab Details`}
                            />
                          </View>
                        </View>

                        <View style={styles.cardPartTwo}>
                          <View style={{flex: 0.1}}>
                            <Image source={imagesConstants.labtool} />
                          </View>
                          <View style={{flex: 0.7, justifyContent: 'center'}}>
                            <RegularText
                              style={[styles.addressText, {marginTop: 0}]}
                              title={labName}
                            />
                            <LightText
                              style={[styles.addressText, {marginTop: 0}]}
                              title={labAddress}
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                ) : null}
                {bookingDetailData.prescriptions_id ? (
                  <View style={[styles.uploadedPrescription]}>
                    <View style={styles.BookingCard}>
                      <View style={styles.uploadBookingCard}>
                        <View style={styles.bookingCardPartOne}>
                          <View style={{flex: 1}}>
                            <RegularText
                              style={styles.bookingIdText}
                              title={`Uploaded Prescription`}
                            />
                          </View>
                        </View>
                        <View style={{marginTop: 20}}>
                          <FlatList
                            horizontal
                            data={bookingDetailData.prescription_attachments}
                            extraData={
                              bookingDetailData.prescription_attachments
                            }
                            renderItem={({item}) => {
                              return (
                                <TouchableOpacity
                                  onPress={() => checkPermissionFileOpen(item)}
                                  style={{
                                    height: hp('10%'),
                                    width: hp('10%'),
                                    marginHorizontal: hp('1%'),
                                    backgroundColor: 'white',
                                    borderColor: colors.app_theme_dark_green,
                                    borderStyle: 'dashed',
                                    borderWidth: 1,
                                    borderRadius: 5,
                                  }}>
                                  <Image
                                    style={{
                                      height: hp('9%'),
                                      width: hp('9%'),
                                      borderRadius: 5,
                                    }}
                                    source={imagesConstants.pdf}
                                  />
                                </TouchableOpacity>
                              );
                            }}
                          />
                        </View>

                        {/* <View style={styles.cardPartTwo}>
                          <TouchableOpacity
                            // onPress={checkPermissionFileOpen}
                            onPress={() => alert('Under Development')}
                            style={{flex: 0.3, justifyContent: 'center'}}>
                            <LightText
                              style={styles.uploadedFile}
                              title={'Prescription.pdf'}
                            />
                          </TouchableOpacity>
                          <View style={{flex: 0.7, justifyContent: 'center'}}>
                            <Image
                              style={{tintColor: colors.app_theme_dark_green}}
                              source={imagesConstants.download}
                            />
                          </View>
                        </View> */}
                      </View>
                    </View>
                  </View>
                ) : null}
                {bookingDetailData.collection_type === 'Home' ? (
                  <View style={styles.pickupAddress}>
                    <RegularText
                      style={styles.pickupAddLabel}
                      title={'Pickup Address'}
                    />
                    <View>
                      <View style={styles.itemContainer}>
                        <View style={styles.itemContainerInner}>
                          <View style={styles.profilePicSection}>
                            <View style={styles.profilePicView}>
                              <Image
                                style={styles.profilePic}
                                source={
                                  bookingDetailData.address_type === 'Home'
                                    ? imagesConstants.house
                                    : bookingDetailData === 'Office'
                                    ? imagesConstants.office
                                    : imagesConstants.other
                                }
                              />
                            </View>

                            {bookingDetailData.address_type ? (
                              <RegularText
                                style={{
                                  marginTop: hp('1%'),
                                  color: colors.app_theme_light_green,
                                  fontSize: hp('1.8%'),
                                }}
                                title={bookingDetailData.address_type}
                              />
                            ) : null}
                          </View>
                          <View style={styles.dataSection}>
                            <View>
                              <RegularText
                                style={styles.addNameText}
                                title={bookingDetailData?.address_name}
                              />

                              <RegularText
                                style={[
                                  styles.addressText,
                                  {
                                    marginTop: bookingDetailData?.address_name
                                      ? hp('1.6%')
                                      : 0,
                                  },
                                ]}
                                title={bookingDetailData.address_id}
                              />
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                ) : null}
                <View style={styles.amountSection}>
                  <View style={styles.paymentDetailSection}>
                    <View style={styles.paymentRatesSection}>
                      <View style={styles.testPriceSection}>
                        <RegularText
                          style={styles.paymentDetailText}
                          title={'Payment Details'}
                        />
                        <RegularText
                          style={styles.paidText}
                          title={
                            bookingDetailData.payment_mode === 'Online'
                              ? `Paid (${bookingDetailData.payment_mode})`
                              : 'Amount'
                          }
                        />
                      </View>
                      <View style={styles.testPriceSection}>
                        <RegularText
                          style={styles.testPrice}
                          title={'Test Price'}
                        />
                        <RegularText
                          style={styles.rateText}
                          title={`${'\u20B9'} ${
                            bookingDetailData.total_member_amount
                          }`}
                        />
                      </View>

                      {/* <View style={styles.testPriceSection}>
                        <RegularText
                          style={styles.testPrice}
                          title={'Coupon Discount'}
                        />
                        <RegularText
                          style={styles.rateText}
                          title={`${'\u20B9'} ${bookingDetailData.total_amount}`}
                        />
                        )
                      </View> */}
                      {Number(bookingDetailData.total_member_discounted) ? (
                        <View style={styles.testPriceSection}>
                          <RegularText
                            style={styles.testPrice}
                            title={'Coupon Discount'}
                          />
                          <RegularText
                            style={styles.rateText}
                            title={`(-) ${'\u20B9'} ${
                              bookingDetailData.total_member_discounted
                            }`}
                          />
                        </View>
                      ) : null}

                      {Number(bookingDetailData.pickup_charge) ? (
                        <View style={styles.testPriceSection}>
                          <RegularText
                            style={styles.testPrice}
                            title={'Home Collection Charges'}
                          />
                          <RegularText
                            style={styles.rateText}
                            title={`(+) ${'\u20B9'} ${
                              bookingDetailData.pickup_charge
                            }`}
                          />
                        </View>
                      ) : null}
                      <View style={styles.testPriceSection}>
                        <RegularText
                          style={styles.testPrice}
                          title={'Total (Amount)'}
                        />
                        <RegularText
                          style={styles.rateText}
                          title={`${'\u20B9'} ${
                            parseFloat(bookingDetailData.total_member_amount) +
                            (bookingDetailData.pickup_charge
                              ? parseFloat(bookingDetailData.pickup_charge)
                              : 0) -
                            (bookingDetailData.total_member_discounted
                              ? parseFloat(
                                  bookingDetailData.total_member_discounted,
                                )
                              : 0)
                          }`}
                        />
                      </View>
                      <View style={styles.totalPayableSection}>
                        <BoldText
                          style={styles.payableText}
                          title={`Total (${
                            bookingDetailData.payment_mode === 'Online'
                              ? 'Paid'
                              : 'You Need to Pay'
                          })`}
                        />
                        <BoldText
                          style={styles.payableText}
                          title={`${'\u20B9'} ${
                            parseFloat(bookingDetailData.total_member_amount) +
                            (bookingDetailData.pickup_charge
                              ? parseFloat(bookingDetailData.pickup_charge)
                              : 0) -
                            (bookingDetailData.total_member_discounted
                              ? parseFloat(
                                  bookingDetailData.total_member_discounted,
                                )
                              : 0)
                          }`}
                        />
                      </View>
                    </View>
                  </View>
                </View>
                {bookingDetailData.LedgerTransactionNo ? (
                  <View style={styles.downloadBtnView}>
                    <TouchableOpacity
                      onPress={onDownloadInvoice}
                      style={styles.downloadInvoiceBtn}>
                      <BoldText
                        style={styles.downloadText}
                        title={'Download Invoice'}
                      />
                      <Image
                        style={styles.downloadIcon}
                        source={imagesConstants.download}
                      />
                    </TouchableOpacity>
                  </View>
                ) : null}
                <View style={styles.separator} />
                {bookingDetailData.status === 'Confirmed' ||
                bookingDetailData.status === 'Accepted' ? (
                  <View style={styles.cancelBookingBtn}>
                    <CancelButton
                      onPress={cancelBooking}
                      title={'Cancel Booking'}
                    />
                  </View>
                ) : route?.params?.myBookingData?.refundStatus ? (
                  <View style={styles.cancelBookingBtn}>
                    <RegularText
                      style={styles.refundStatus}
                      title={`Refund Status: ${route?.params?.myBookingData?.refundStatus}`}
                    />
                  </View>
                ) : null}
              </View>
            </ScrollView>
            <Loader display={loader} />
          </MainContainer>
        </SafeAreaView>
      )}
    </>
  );
};

export default index;
