import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import styles from './style';
import {Loader, Toast} from '../../../components';
import imagesConstants from '../../../../constants/imagesConstants';
import {BoldText, RegularText} from '../../../components/Common';
import DropDownPicker from 'react-native-dropdown-picker';
import NetworkRequest, {
  method,
  servicesPoints,
} from '../../../../services/NetworkRequest';
import {AuthContext} from '../../../../../context/context';
import colors from '../../../../constants/colors';

import NetworkRequestBlal, {
  blalMethod,
  blalServicesPoints,
} from '../../../../services/NetworkRequestBlal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {Date_Format} from '../../../../config/Setting';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getProductionReportURL, getSilverapiURL} from '../../../../apis/env';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
const index = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const {signOut, signIn} = React.useContext(AuthContext);
  const [termsCondition, setTermsCondition] = useState(false);
  const [loader, setLoader] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [reportButtonDisabled, setReportButtonDisabled] = useState(false);
  const [patientOpens, setPatientOpens] = useState(false);
  const [patientValues, setPatientValues] = useState(null);
  const [timeOpens, setTimeOpens] = useState(false);
  const [timeValues, setTimeValues] = useState(null);
  const [patients, setPatients] = useState([]);
  const [reports, setReports] = useState([]);
  const [startDateLabel, setStartDateLabel] = useState('Start Date');
  const [endDateLabel, setEndDateLabel] = useState('End Date');
  const [endDatePicker, setEndDatePicker] = useState(false);
  const [selectedEndDate, setSelectedEnddDate] = useState(new Date());
  const [startDatePicker, setStartDatePicker] = useState(false);
  const [selectedStartDate, setSelectedDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(moment().format(Date_Format));
  const [apiStartDate, setApiStartDate] = useState('');
  const [apiEndDate, setApiEndDate] = useState('');
  const [primaryUhid, setPrimaryUhid] = useState('');
  const [downloadReportActive, setDownloadReportActive] = useState(false);
  let primaryUhidUser = '';
  const [times, setTimes] = useState([
    {label: 'Today', value: '1'},
    {label: 'Last 7 days', value: '2'},
    {label: 'Last 30 days', value: '3'},
    {label: 'Last 365 days', value: '4'},
    {label: 'Custom', value: '5'},
  ]);

  const [reportsTest, setReportsTest] = useState([
    {label: '1', value: '1'},
    {label: '2', value: '2'},
  ]);
  const [userData, setUserData] = useState({});
  const [handleConnectionState, setHandleConnectionState] = useState(false);
  useEffect(() => {
    if (handleConnectionState) {
      navigation.navigate('ConnectionHandle');
    }
  }, [handleConnectionState]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUserData();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getMyReportsAtStarting();
  }, [primaryUhid]);

  const getUserData = async () => {
    let userData = await AsyncStorage.getItem('userData');
    let parseData = JSON.parse(userData);
    setUserData(parseData);
    await getMyFamilyMembers(parseData);
  };

  useEffect(() => {
    getMyReports(2);
  }, [patientValues]);

  useEffect(() => {
    calculateDateDifference();
  }, [timeValues]);

  useEffect(() => {
    getMyReports(2);
  }, [apiStartDate, apiEndDate]);

  const getMyFamilyMembers = async val => {
    const requestConfig = {
      method: method.get,
      url: servicesPoints.userServices.my_family_mambers,
    };
    const response = await NetworkRequest(requestConfig);
    if (response) {
      const {success} = response;
      if (success) {
        let newData = [];

        // newData = response.data;
        response.data.map(item => {
          newData.push({label: item.fullname, value: item.uhid});
        });
        response.data.map(item => {
          if (val?.user?.uhid === item.uhid) {
            setTimeValues('3');
            // primaryUhidUser = item.uhid;
            setPatientValues(item.uhid);
            setPrimaryUhid(item.uhid);
          }
        });

        setPatients(newData);
      } else {
        if (Platform.OS === 'ios') {
          setLoader(false);
        }
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
  };

  const getMyReportsAtStarting = async () => {
    const MONTH_START = moment().subtract(1, 'month').format(Date_Format);
    let startData = MONTH_START;
    let endDate = currentDate;
    try {
      const requestConfig = {
        method: blalMethod.post,
        url: `https://lims.blallab.com/WebApiLive/GetMyReports?PatientId=${primaryUhid}&FromDate=${startData}&ToDate=${endDate}`,
        // url: `https://lims.blallab.com/MobileAppCode/Design/Lab/LabReportNew.aspx?PHead=${1}&TestID=${primaryUhid}`,
        // url: `https://lims.blallab.com/blal/Design/Lab/LabReportNew.aspx?PHead=${1}&TestID=${primaryUhid}`,
      };
      const response = await NetworkRequest(requestConfig);
      if (response) {
        const {status_Code} = response;
        if (status_Code === 200) {
          setLoader(false);
          setReports(response?.data);

          setRefreshing(false);
        } else {
          setLoader(false);
        }
      } else {
        setLoader(false);
      }
    } catch (err) {
      setLoader(false);
    }
  };
  // const getMyReports = async () => {
  //   const requestConfig = {
  //     method: method.get,
  //     url: `${servicesPoints.bookingServices.myreports}?member_id=${
  //       patientValues ? patientValues : ''
  //     }&time_period=${timeValues ? timeValues : ''}`,
  //   };

  //   const response = await NetworkRequest(requestConfig);

  //   if (response) {
  //     const {success} = response;
  //     if (success) {
  //       setReports(response.data?.docs);
  //       setLoader(false);
  //       setRefreshing(false);
  //     } else {
  //       Toast(response.message, 0);
  //       if (response === 'Network Error') {
  //         Toast('Network Error', 0);
  //         setLoader(false);
  //       } else if (response.status === 401) {
  //         signOut();
  //       } else {
  //         null;
  //       }
  //       setLoader(false);
  //     }
  //   } else {
  //     setLoader(false);
  //   }
  // };
  const getMyReports = async () => {
    try {
      setLoader(true);

      const requestConfig = {
        method: blalMethod.post,
        url: `/GetMyReports?PatientId=${patientValues}&FromDate=${apiStartDate}&ToDate=${apiEndDate}`,
      };
      console.log(requestConfig.url, 'request urll');
      const response = await NetworkRequestBlal(requestConfig);
      console.log(response, 'fgjgfj');
      if (response) {
        const {status_Code} = response;
        if (status_Code === 200) {
          setReports(response.data);
          setLoader(false);
          setRefreshing(false);
          setLoader(false);
        } else {
          setLoader(false);
        }
      } else {
        setLoader(false);
      }
    } catch (err) {
      setLoader(false);
    }
  };

  // const onChooseTermsCondition = () => {
  //   setTermsCondition(termsCondition ? false : true);
  // };

  const onRefresh = () => {
    setRefreshing(true);
    getMyReports(1);
  };

  const checkPermissionFileOpen = async url => {
    // Function to check the platform
    // If Platform is Android then check for permissions.

    if (Platform.OS === 'ios') {
      // setLoader(true);
      onOpenPdfFile(url);
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
          await onOpenPdfFile(url);
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

  const onOpenPdfFile = reportsIds => {
    const fileUrl = getProductionReportURL(
      `/Design/Lab/LabReportNew.aspx?PHead=1&TestID=${reportsIds}`,
    );
    navigation.navigate('PrescriptionViewer', {
      url: fileUrl,
      screenName: 'Report',
    });
  };

  const reset = () => {
    setPatientValues(null);
    setTimeValues(null);
  };

  const onSelectAllReport = async (item, index) => {
    let data = reports;
    data = data.map((itn, inde) => {
      if (inde === index) {
        itn.selected = !itn.selected;
        setReportButtonDisabled(!reportButtonDisabled);
      } else {
        itn.selected = false;
      }
      return itn;
    });

    await setReports(data);
    setSelectAll(!selectAll);
  };

  const onSelectReport = async (item, mainReportItem) => {
    let data = mainReportItem.TestDataListModel;

    data = data.map((itn, index) => {
      if (itn.Test_ID === item.Test_ID) {
        itn.selected = !itn.selected;
      }
      return itn;
    });

    let report = reports;
    report = report.map((itn, index) => {
      if (itn.id === mainReportItem.id) {
        itn.tests = data;
        // itn.selected = !itn.selected;
        // item.testSelected = !item.testSelected;
        // setReportButtonDisabled(!reportButtonDisabled);
      } else {
        null;
      }
      return itn;
    });

    await setReports(report);

    let report1 = reports;
    report1 = report1.map((itn, index) => {
      if (itn.LedgerTransactionNo === mainReportItem.LedgerTransactionNo) {
        // itn.selected = !itn.selected;
        itn.testSelected = !itn.testSelected;
        // setReportButtonDisabled(!reportButtonDisabled);
      }
      return itn;
    });

    await setReports(report1);

    // for (var i in reports) {
    //   if (reports[i].value === mainReportItem.id) {
    //     reports[i].tests = data;
    //     break; //Stop this loop, we found it!
    //   }
    // }
  };

  const downloadInvoice = async mainReportItem => {
    // const fileUrl = getStagingReportURL(
    //   `/Design/Finanace/SarojBothReceiptReport.aspx?LedgerTransactionNo=${mainReportItem.LedgerTransactionNo}&TYPE=LAB`,
    // );
    const fileUrl = getProductionReportURL(
      `/Design/Finanace/ReceiptBill.aspx?LedgerTransactionNo=${mainReportItem.LedgerTransactionNo}&Status=0&TYPE=LAB`,
    );
    console.log('fileUrl', fileUrl);
    checkPermission(fileUrl, 'Invoice', '');
  };
  const downloadReport = item => {
    if (selectAll) {
      onDownloadAllReports(item);
    } else {
      onDownloadSelectedReports(item);
    }
  };

  const onDownloadAllReports = item => {
    let data = [];
    let newData = item.TestDataListModel;
    newData = newData?.map((itn, inde) => {
      if (itn.Status === 'Approved') {
        data.push({id: itn.Test_ID, name: itn.TestName});
      }
      return itn;
    });
    let ids = [];

    data.map(item => {
      ids.push(item.id);
    });
    let reportsIds = ids.join(',');
    const fileUrl = getProductionReportURL(
      `/Design/Lab/LabReportNew.aspx?PHead=1&TestID=${reportsIds}`,
    );

    checkPermission(fileUrl, 'Report');
  };

  const onDownloadSelectedReports = item => {
    setLoader(true);
    let data = [];
    let newData = item.TestDataListModel;
    newData = newData?.map((itn, inde) => {
      if (itn.Status === 'Approved' && itn.selected) {
        1;
        data.push({id: itn.Test_ID, name: itn.TestName});
      }
      return itn;
    });

    let ids = [];

    data.map(item => {
      ids.push(item.id);
    });
    let reportsIds = ids.join(',');
    const fileUrl = getProductionReportURL(
      `/Design/Lab/LabReportNew.aspx?PHead=1&TestID=${reportsIds}`,
    );

    checkPermission(fileUrl, 'Report');
    // data.map(item => {
    //   const fileUrl = `https://lims.blallab.com/blal/Design/Lab/LabReportNew.aspx?PHead=1&TestID=${item.id}`;
    //   checkPermission(fileUrl, 'Report');
    // });
  };

  const checkPermission = async (url, type, report) => {
    // Function to check the platform
    // If Platform is Android then check for permissions.

    if (Platform.OS === 'ios') {
      setLoader(true);
      downloadFile(url, type, report);
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
          // setLoader(true);
          downloadFile(url, type, report);
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

  const getFileExtention = fileUrl => {
    // To get the file extension
    return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
  };

  const downloadFile = (url, type, report) => {
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
    let RootDir = fs.dirs.DownloadDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        path:
          RootDir +
          `/file_${type}` +
          ' ' +
          '(' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ').pdf',
        //  +
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

        if (type === 'Invoice') {
          Toast(`${type} Downloaded Successfully!`, 1);
        } else {
          Toast(`${type} Download Successfully!`, 1);
        }
      })
      .catch(err => {
        console.log('err', err);
      });
    setLoader(false);
  };

  const renderReport = (item, mainReportItem, selectedAll) => {
    let testName = item?.item?.TestName;
    let status = item?.item?.Status;
    let test_id = item?.item.Test_ID;

    return (
      <View style={styles.itemTestContainer}>
        <View style={styles.reportCheckSection}>
          {status === 'Approved' ? (
            <TouchableOpacity
              hitSlop={{top: 10, right: 10, bottom: 10, left: 10}}
              onPress={() => onSelectReport(item.item, mainReportItem)}
              style={styles.checkContainer}>
              <View style={styles.checkBox}>
                {item?.item?.selected || selectedAll ? (
                  // <View style={styles.termsBox} />
                  <Image
                    style={{height: 15, width: 15}}
                    source={imagesConstants.termsCheck}
                  />
                ) : null}
              </View>
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={styles.reportDetail}>
          <BoldText
            style={styles.reportTitleText}
            numberOfLines={1}
            ellipsizeMode={'tail'}
            title={testName}
          />
          {/* <BoldText style={styles.reportIdText} title={'047000185689'} />
          <RegularText style={styles.reportLabel} title={'Lab Number'} /> */}
        </View>
        <View style={styles.reportBtnSection}>
          <TouchableOpacity
            disabled={status === 'Approved' ? false : true}
            onPress={() => checkPermissionFileOpen(test_id)}
            style={styles.reportButton}>
            <RegularText
              style={styles.reportBtnText}
              title={
                status === 'Approved'
                  ? 'Report Ready'
                  : status === 'Batch Received'
                  ? 'Sample at Lab'
                  : status
              }
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderCard = (item, index) => {
    let test = item.booking_members;
    let selectAllDownloadReportButton = item.selected;

    let selectAllVisibility = false;

    let reports = item?.TestDataListModel;
    let element = {Status: 'Approved'};

    let findObj = reports.find(o => o.Status === 'Approved');

    if (findObj !== undefined) {
      selectAllVisibility = true;
    } else {
      selectAllVisibility = false;
    }

    let array = item.TestDataListModel;

    const even = element => element.selected;

    let reportButtonVisible = array.some(even);

    return (
      <View style={styles.itemContainer}>
        <View style={styles.bookingIdSection}>
          <View>
            <RegularText
              style={styles.idText}
              title={`#${item.LedgerTransactionNo}`}
            />
            <RegularText style={styles.labelText} title={'Lab Number'} />
          </View>
          <View>
            <RegularText style={styles.idText} title={`${item.DATE}`} />
            <RegularText
              style={styles.labelText}
              title={'Registration Date & Time'}
            />
          </View>
        </View>
        <View style={styles.selectAllCheckContainer}>
          {selectAllVisibility ? (
            <TouchableOpacity
              hitSlop={{top: 10, right: 10, bottom: 10, left: 10}}
              onPress={() => onSelectAllReport(item, index)}
              style={styles.checkContainer}>
              <View style={styles.checkBox}>
                {item.selected ? (
                  <Image
                    style={{height: 15, width: 15}}
                    source={imagesConstants.termsCheck}
                  />
                ) : null}
              </View>
            </TouchableOpacity>
          ) : null}
          <View style={styles.checkTextContainer}>
            <BoldText style={styles.termsConditionText} title={'Select All'} />
          </View>
        </View>

        <View style={styles.reportListSection}>
          <FlatList
            data={item.TestDataListModel}
            showsVerticalScrollIndicator={false}
            extraData={item.TestDataListModel}
            renderItem={data => renderReport(data, item, item.selected)}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.downloadReportBtnSection}>
            <TouchableOpacity
              onPress={() => downloadInvoice(item)}
              style={styles.downloadBtn}>
              <BoldText
                style={[
                  styles.downloadInvoiceText,
                  {marginRight: 5, fontSize: hp('1.5%')},
                ]}
                title={'Download Invoice'}
              />
              <Image source={imagesConstants.download} />
            </TouchableOpacity>
          </View>
          <View style={styles.downloadReportBtnSection}>
            {selectAllDownloadReportButton ? (
              <TouchableOpacity
                onPress={() => downloadReport(item)}
                disabled={!item.selected}
                style={[
                  styles.downloadBtn,
                  {
                    backgroundColor: item.selected
                      ? colors.app_theme_dark_green
                      : colors.purplishGrey,
                  },
                ]}>
                <BoldText
                  style={[
                    styles.downloadInvoiceText,
                    {marginRight: 5, fontSize: hp('1.5%')},
                  ]}
                  title={'Download Reports'}
                />
                <Image source={imagesConstants.download} />
              </TouchableOpacity>
            ) : null}

            {reportButtonVisible && !selectAllDownloadReportButton ? (
              <TouchableOpacity
                onPress={() => downloadReport(item)}
                disabled={!reportButtonVisible}
                style={[
                  styles.downloadBtn,
                  {
                    backgroundColor: reportButtonVisible
                      ? colors.app_theme_dark_green
                      : colors.purplishGrey,
                  },
                ]}>
                <BoldText
                  style={[
                    styles.downloadInvoiceText,
                    {marginRight: 5, fontSize: hp('1.5%')},
                  ]}
                  title={'Download Reports'}
                />
                <Image source={imagesConstants.download} />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </View>
    );
  };

  const formatDate = date => {
    return moment(date).format('MMMM DD, YYYY');
  };

  const calculateDateDifference = date => {
    if (timeValues === '1') {
      const TODAY_START_Date = moment(currentDate).format('YYYY-MM-DD');
      const TODAY_End_Date = moment(TODAY_START_Date)
        .add(1, 'days')
        .format('YYYY-MM-DD');
      setApiStartDate(TODAY_START_Date);
      setApiEndDate(TODAY_End_Date);
      // getMyReports(3);
    } else if (timeValues === '2') {
      const WEEK_START = moment().subtract(1, 'week').format(Date_Format);
      setApiStartDate(WEEK_START);
      setApiEndDate(currentDate);
      // getMyReports(3);
    } else if (timeValues === '3') {
      const MONTH_START = moment().subtract(1, 'month').format(Date_Format);
      setApiStartDate(MONTH_START);
      setApiEndDate(currentDate);
      // getMyReports(3);
    } else if (timeValues === '4') {
      const YEAR_START = moment().subtract(1, 'year').format(Date_Format);
      setApiStartDate(YEAR_START);
      setApiEndDate(currentDate);
      // getMyReports(3);
    } else if (timeValues === '5') {
      // setApiStartDate(startDateLabel);
      // setApiEndDate(endDateLabel);
    } else {
      null;
    }
  };

  const startHandleDatePickerConfirm = async date => {
    let newDate = moment(date).format(Date_Format);
    setStartDateLabel(newDate);
    setApiStartDate(newDate);
    setStartDatePicker(false);
  };

  const startHandleDatePickerCancel = () => {
    setStartDatePicker(false);
  };

  const endHandleDatePickerConfirm = async date => {
    let newDate = moment(date).format(Date_Format);
    setEndDateLabel(newDate);

    setApiEndDate(newDate);
    setEndDatePicker(false);
  };

  // useEffect(() => {}, [age]);

  const endHandleDatePickerCancel = () => {
    setEndDatePicker(false);
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={[styles.container]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{left: 15, right: 15, top: 15, bottom: 15}}
          style={styles.backContainer}>
          <Image source={imagesConstants.backWhite} />
        </TouchableOpacity>
        <View style={styles.headerContainer}>
          <BoldText style={styles.headerTitle} title={'My Reports'} />
        </View>
        <View
          // onPress={() => navigation.navigate('SampleReport')}
          style={styles.backContainer}>
          {/* <RegularText
             style={styles.trendAnalysisText}
             title={'View Trend Analysis'}
           /> */}
          {/* <Image source={imagesConstants.graph} /> */}
        </View>
      </View>

      <View style={styles.infoSection}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            // onPress={() => navigation.navigate('SampleReport')}
            style={styles.backContainerFirst}>
            <RegularText
              style={styles.trendAnalysisText}
              // title={'View Trend Analysis'}
            />
            {/* <Image
              style={{
                tintColor: colors.app_theme_dark_green,
                marginLeft: hp('1%'),
              }}
              source={imagesConstants.graph}
            /> */}
          </TouchableOpacity>

          {patientValues || timeValues ? (
            <TouchableOpacity
              style={{
                flex: 0.3,
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
        </View>
        <View
          style={[
            styles.dropDownSections,
            // {zIndex: Platform.OS === 'ios' ? 2000 : 0},
          ]}>
          <View style={styles.patientSection}>
            <View style={styles.dropDownView}>
              <DropDownPicker
                open={patientOpens}
                placeholder="Patients"
                value={patientValues}
                style={{borderColor: colors.purplishGrey, borderWidth: 1}}
                dropDownContainerStyle={styles.dropDownContainer}
                items={patients}
                setOpen={setPatientOpens}
                setValue={setPatientValues}
              />
            </View>
          </View>
          <View style={styles.timeSection}>
            <View style={styles.dropDownView}>
              <DropDownPicker
                open={timeOpens}
                placeholder="Duration"
                value={timeValues}
                style={{borderColor: colors.purplishGrey, borderWidth: 1}}
                items={times}
                dropDownContainerStyle={styles.dropDownContainer}
                setOpen={setTimeOpens}
                setValue={setTimeValues}
              />
            </View>
          </View>
          {/* <View style={styles.manualReportSection}>
             <RegularText
              style={styles.manualText}
              title={'Manual Download Report'}
            /> 
          </View> */}
        </View>
        {timeValues === '5' ? (
          <View
            style={{
              flexDirection: 'row',
              marginTop: timeOpens || patientOpens ? hp('23%') : 0,
            }}>
            <TouchableOpacity
              onPress={() => setStartDatePicker(true)}
              style={styles.dateBirthContainer}>
              <View style={styles.dateView}>
                <RegularText style={styles.dateText} title={startDateLabel} />
              </View>
              <View style={styles.calendarView}></View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setEndDatePicker(true)}
              style={styles.dateBirthContainer}>
              <View style={styles.dateView}>
                <RegularText style={styles.dateText} title={endDateLabel} />
              </View>
              <View style={styles.calendarView}></View>
            </TouchableOpacity>
          </View>
        ) : null}
        <View
          style={
            // timeOpens || patientOpens
            //   ? styles.headingSection1
            styles.headingSection
          }>
          <BoldText
            style={styles.heading}
            title={'Select the Paitent for whom you want to see the report'}
          />
        </View>

        <View style={styles.listSection}>
          <FlatList
            data={reports}
            refreshing={refreshing}
            onRefresh={onRefresh}
            showsVerticalScrollIndicator={false}
            extraData={reports}
            ListEmptyComponent={() => {
              return (
                <View
                  style={{
                    height: '100%',
                    paddingTop: 100,
                    width: 360,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <BoldText
                    title={'No Reports Found.'}
                    style={{color: colors.app_theme_dark_green}}
                  />
                </View>
              );
            }}
            renderItem={({item, index}) => renderCard(item, index)}
          />
        </View>
      </View>
      {startDatePicker ? (
        <DateTimePickerModal
          date={selectedStartDate}
          isVisible={startDatePicker}
          mode="date"
          display={'spinner'}
          maximumDate={new Date()}
          onConfirm={startHandleDatePickerConfirm}
          onCancel={startHandleDatePickerCancel}
        />
      ) : null}
      {endDatePicker ? (
        <DateTimePickerModal
          date={selectedEndDate}
          isVisible={endDatePicker}
          mode="date"
          display={'spinner'}
          maximumDate={new Date()}
          onConfirm={endHandleDatePickerConfirm}
          onCancel={endHandleDatePickerCancel}
        />
      ) : null}
      <Loader display={loader} />
    </SafeAreaView>
  );
};

export default index;
