import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import styles from './style';
import DefaultHeader from '../../../components/DefaultHeader';
import {Loader, Toast} from '../../../components';
// import {
//   LineChart,
//   BarChart,
//   PieChart,
//   ProgressChart,
//   ContributionGraph,
//   StackedBarChart,
// } from 'react-native-chart-kit';
import LineGraph from '../../../components/ChartReport/LineGraph';
import colors from '../../../../constants/colors';
import {BoldText, RegularText} from '../../../components/Common';
import style from './style';
import DropDownPicker from 'react-native-dropdown-picker';
import NetworkRequest, {
  method,
  servicesPoints,
} from '../../../../services/NetworkRequest';
import NetworkRequestBlal, {
  blalMethod,
  blalServicesPoints,
} from '../../../../services/NetworkRequestBlal';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Date_Format} from '../../../../config/Setting';
import imagesConstants from '../../../../constants/imagesConstants';
const index = ({navigation, route}) => {
  var OBJ = {};
  let [loader, setLoader] = useState(false);

  const [memberId, setMemberId] = useState('');
  const [patients, setPatients] = useState([]);
  const [patientTestOpens, setPatientTestOpens] = useState(false);
  const [patientTestValues, setPatientTestValues] = useState(null);
  const [timeOpens, setTimeOpens] = useState(false);
  const [timeValues, setTimeValues] = useState(null);

  const [graphTitle, setGraphTitle] = useState('');

  const [fullTestArray, setFullTestArray] = useState([]);
  const [apiStartDate, setApiStartDate] = useState('');
  const [apiEndDate, setApiEndDate] = useState('');
  const [endDatePicker, setEndDatePicker] = useState(false);
  const [selectedEndDate, setSelectedEnddDate] = useState(new Date());

  const [startDatePicker, setStartDatePicker] = useState(false);
  const [selectedStartDate, setSelectedDate] = useState(new Date());

  const [currentDate, setCurrentDate] = useState(moment().format(Date_Format));
  const [patientSubTestOpens, setPatientSubTestOpens] = useState(false);
  const [patientSubTestValues, setPatientSubTestValues] = useState(null);
  const [selectedPatientTest, setSelectedPatientTest] = useState([]);
  let FOODMENU_BGCOLOR = [
    '#E4EFDF',
    '#E4EFDF',
    '#EFEFFF',
    '#F6E0D5',
    '#DCEAF3',
    '#F6F4F4',
  ];
  const [startDateLabel, setStartDateLabel] = useState('Start Date');
  const [endDateLabel, setEndDateLabel] = useState('End Date');
  const [membersTest, setMemberTest] = useState([]);
  const [membersSubTest, setMemberSubTest] = useState([]);

  const [times, setTimes] = useState([
    {label: 'Day', value: '1'},
    {label: 'Weekly', value: '2'},
    {label: 'Monthly', value: '3'},
    {label: 'Yearly', value: '4'},
    {label: 'Custom', value: '5'},
  ]);

  const [isUpdateGraphData, setUpdateGraphData] = useState(false);
  const [graphData, setGraphData] = useState([]);
  // let [graphData, setGraphData] = useState({
  // netWorth: 12000,
  // data: [
  //   {
  //     value: 1000,
  //     label: 'Jan',
  //   },
  //   {
  //     value: 2000,
  //     label: 'Feb',
  //   },
  //   {
  //     value: 500,
  //     label: 'Mar',
  //   },
  //   {
  //     value: 500,
  //     label: 'Apr',
  //   },
  //   {
  //     value: 500,
  //     label: 'May',
  //   },
  //   {
  //     value: 500,
  //     label: 'Jun',
  //   },
  //   {
  //     value: 2000,
  //     label: 'Jul',
  //   },
  //   {
  //     value: 500,
  //     label: 'Aug',
  //   },
  //   {
  //     value: 500,
  //     label: 'Sep',
  //   },
  //   {
  //     value: 1000,
  //     label: 'Oct',
  //   },
  //   {
  //     value: 500,
  //     label: 'Nov',
  //   },
  //   {
  //     value: 500,
  //     label: 'Dec',
  //   },
  // ],
  // });
  const [handleConnectionState, setHandleConnectionState] = useState(false);
  useEffect(() => {
    if (handleConnectionState) {
      navigation.navigate('ConnectionHandle');
    }
  }, [handleConnectionState]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getMyFamilyMembers();
      // onGetSmartReport();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    calculateDateDifference();
  }, [timeValues]);

  // useEffect(() => {
  //   onGetSmartReport(2);
  // }, [apiStartDate, apiEndDate]);

  useEffect(() => {
    if (timeValues && patientTestValues) {
      onGetSmartReport();
    } else {
      null;
    }
  }, [timeValues, patientTestValues]);

  useEffect(() => {
    if (patientTestValues) {
      onCheck(patientTestValues);
    }
  }, [patientTestValues]);
  const getMyFamilyMembers = async () => {
    const requestConfig = {
      method: method.get,
      url: servicesPoints.userServices.my_family_mambers,
    };

    const response = await NetworkRequest(requestConfig);

    if (response) {
      const {success} = response;
      if (success) {
        setPatients(response.data);

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

  const onSelect = item => {
    setMemberId(item.uhid);
    let data = patients;

    data = data.map((itn, index) => {
      if (itn.id === item.id) {
        itn.selected = true;
        return itn;
      } else {
        itn.selected = false;
        return itn;
      }
    });

    setPatients(data);
    onGetFamilyMemberTest(item);
  };

  const onCheck = value => {
    if (fullTestArray.length > 0) {
      let data = fullTestArray;
      let newArray = [];
      data = data.map((itn, index) => {
        if (itn.Investigation_Id === value) {
          newArray.push(itn);
          return itn;
        } else {
          return itn;
        }
      });

      let values = newArray[0].SmartObservationListModel;

      onGetSubTest(values);
    } else {
      null;
    }
  };

  const onGetSubTest = data => {
    let newData = [];
    data.map((item, index) => {
      newData.push({
        label: item.ObservationName,
        value: item.ObservationId,
      });
    });

    setMemberSubTest(newData);
  };

  const onGetFamilyMemberTest = async val => {
    setLoader(true);
    try {
      let data = {
        PatientId: val.uhid,
      };

      const requestConfig = {
        method: blalMethod.post,
        data: data,
        url: `${blalServicesPoints.blalUserServices.getInvestigationsList}?PatientId=${data.PatientId}`,
      };

      const response = await NetworkRequestBlal(requestConfig);

      if (response) {
        const {status_Code} = response;
        if (status_Code === 200) {
          let newData = [];
          let test = response.data;
          test.map((item, index) => {
            newData.push({
              label: item.InvestigationName,
              value: `${item.Investigation_Id}`,
            });
          });

          setMemberTest(newData);
          setFullTestArray(response.data);
          setLoader(false);
        } else {
          if (response === 'Network Error') {
            Toast('Network Error', 0);
            setHandleConnectionState(true);
          }
          setLoader(false);
        }
      } else {
        setLoader(false);
      }
    } catch (err) {
      setLoader(false);
    }
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

  const onGetSmartReport = async val => {
    setLoader(true);
    // let splitString = patientTestValues.split(',');

    try {
      const MONTH_START = moment().subtract(1, 'month').format(Date_Format);

      let data = {
        Patient_ID: memberId,
        Investigation_ID: patientTestValues,
        ObservationId: patientSubTestValues,
        FromDate: MONTH_START,
        ToDate: currentDate,
      };

      const requestConfig = {
        method: blalMethod.post,
        data: data,
        url: `${servicesPoints.bookingServices.my_smart_reports}?Patient_ID=${data.Patient_ID}&Investigation_ID=${data.Investigation_ID}&Observation_ID=${data.ObservationId}&FromDate=${data.FromDate}&ToDate=${data.ToDate} 23:59:59`,
      };

      const response = await NetworkRequestBlal(requestConfig);

      if (response) {
        const {status_Code} = response;

        if (status_Code === 200) {
          let netWorth = response.data.map(item => {
            return item.Value;
          });
          var Obj = {
            netWorth: netWorth.toString(),
            data: response.data.data,
          };

          // if (response.data.data.length > 0) {
          setGraphData(Obj);
          //   setUpdateGraphData(true);
          //   setGraphTitle(response.data.title);
          // } else {
          //   null;
          // }

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
      }
    } catch (err) {
      console.log('err', err);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <DefaultHeader
        onBack={() => navigation.goBack()}
        title={'Smart Report'}
      />

      <View style={styles.mainContainer}>
        <View style={styles.flatListSection}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={patients}
            extraData={patients}
            horizontal={true}
            renderItem={({item}) => {
              let name = item.fullname.charAt(0).toUpperCase();
              return (
                <View style={styles.listItemContainer}>
                  <TouchableOpacity
                    onPress={() => onSelect(item)}
                    style={[
                      styles.itemCircle,
                      {
                        backgroundColor:
                          FOODMENU_BGCOLOR[
                            Math.floor(Math.random() * FOODMENU_BGCOLOR.length)
                          ],
                      },
                    ]}>
                    <BoldText style={style.nameText} title={name} />
                  </TouchableOpacity>
                  <View>
                    <RegularText
                      style={styles.membersName}
                      title={item.fullname}
                    />
                  </View>
                  {item.selected ? <View style={styles.line} /> : null}
                </View>
              );
            }}
          />
        </View>
        <View style={styles.headingSection}>
          <BoldText
            style={styles.heading}
            title={'Select the Patient for whom you want to see the report'}
          />
        </View>
        <View style={{zIndex: 2000}}>
          <View style={[styles.dropDownSections]}>
            <View style={styles.patientSection}>
              <View
                style={
                  ([styles.dropDownView],
                  {marginBottom: patientTestOpens ? hp('10%') : 0})
                }>
                <DropDownPicker
                  open={patientTestOpens}
                  placeholder="Test"
                  value={patientTestValues}
                  style={{borderColor: colors.purplishGrey, borderWidth: 1}}
                  dropDownContainerStyle={styles.dropDownContainer}
                  items={membersTest}
                  setOpen={setPatientTestOpens}
                  setValue={setPatientTestValues}
                />
              </View>
            </View>
          </View>
          <View style={[styles.dropDownSections]}>
            <View style={styles.patientSection}>
              <View
                style={
                  ([styles.dropDownView],
                  {marginBottom: patientSubTestOpens ? hp('25%') : 0})
                }>
                <DropDownPicker
                  open={patientSubTestOpens}
                  placeholder="Observation"
                  value={patientSubTestValues}
                  style={{
                    borderColor: colors.purplishGrey,
                    borderWidth: 1,
                  }}
                  dropDownContainerStyle={styles.dropDownContainer}
                  items={membersSubTest}
                  setOpen={setPatientSubTestOpens}
                  setValue={setPatientSubTestValues}
                />
              </View>
            </View>
          </View>
          <View style={[styles.dropDownSections]}>
            <View style={styles.timeSection}>
              <View style={styles.dropDownView}>
                <DropDownPicker
                  open={timeOpens}
                  placeholder="Time"
                  value={timeValues}
                  style={{
                    borderColor: colors.purplishGrey,
                    borderWidth: 1,
                    zIndex: 999,
                  }}
                  zIndex={999}
                  items={times}
                  dropDownContainerStyle={styles.dropDownContainer}
                  setOpen={setTimeOpens}
                  setValue={setTimeValues}
                />
              </View>
            </View>
            {timeValues === '5' ? (
              <View style={styles.timeSection}>
                <TouchableOpacity
                  onPress={() => setStartDatePicker(true)}
                  style={styles.dateBirthContainer}>
                  <View style={styles.dateView}>
                    <RegularText
                      style={styles.dateText}
                      title={startDateLabel}
                    />
                  </View>
                  <View style={styles.calendarView}></View>
                </TouchableOpacity>
              </View>
            ) : null}
            {timeValues === '5' ? (
              <View style={styles.timeSection}>
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
          </View>
        </View>
        <View style={styles.chartNameSection}>
          <RegularText style={styles.testText} title={graphTitle} />
          {/* <BoldText style={styles.testDate} title={'15 April - 21 April'} /> */}
        </View>

        {graphData?.data ? (
          <View style={styles.chartSection}>
            <LineGraph
              statistics={graphData}
              nav={navigation}
              isFrom="MyProfile"
            />
          </View>
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: hp('6%'),
            }}>
            <Image
              style={{height: 50, width: 50}}
              source={imagesConstants.noReports}
            />
            {/* <RegularText style={{marginTop: 20}} title={'No Record Found'} /> */}
          </View>
        )}
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
