import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  useWindowDimensions,
  PermissionsAndroid,
  Alert,
  Linking,
  Platform,
  BackHandler,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import styles from './style';

import DefaultHeader from '../../../components/DefaultHeader';
import {BoldText, RegularText} from '../../../components/Common';
import colors from '../../../../constants/colors';
import imagesConstants from '../../../../constants/imagesConstants';

import BookingLabListing from '../../../components/BookingLabListing';
import {SubmitButton} from '../../../components/Buttons';
import {
  FindNearLabCard,
  Loader,
  LocationAddressCard,
  SpecialInstructionView,
  Toast,
} from '../../../components';
import Morning from '../Time/Morning';
import Afternoon from '../Time/Afternoon';
import Evening from '../Time/Evening';
import {
  Date_Format,
  DefaultLatitude,
  DefaultLongitude,
} from '../../../../config/Setting';
import NetworkRequest, {
  method,
  servicesPoints,
} from '../../../../services/NetworkRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getSerialNumberSync} from 'react-native-device-info';
import NetworkRequestBlal, {
  blalMethod,
  blalServicesPoints,
} from '../../../../services/NetworkRequestBlal';
import moment from 'moment';
import Geolocation from 'react-native-geolocation-service';
const FirstRoute = () => <Morning />;

const SecondRoute = () => <Afternoon />;
const ThirdRoute = () => <Evening />;
const index = ({navigation, props, route}) => {
  let collectionType = route?.params.collectionLabType;
  const [packageTestData, setPackageTestData] = useState({});
  let lat = 0;
  let long = 0;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [date, setDate] = useState(moment(new Date()).format(Date_Format));
  const [labelDate, setLabelDate] = useState(
    moment(new Date()).format('DD-MM-YYYY'),
  );
  const [fullDate, setFullDate] = useState(
    moment(new Date()).format(Date_Format),
  );
  const [loader, setLoader] = useState(true);
  const [datePicker, setDatePicker] = useState(false);
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [instruction, setInstuction] = useState([1, 2]);
  const [address, setAddress] = useState([]);
  const [bookingSlotsTime, setBookingSlotsTime] = useState([]);
  const [cityId, setCityId] = useState('');
  const [panelId, setPanelId] = useState('');
  const [bookingDetailsType, setBookingDetailsType] = useState('Lab');
  const [labs, setLabs] = useState([]);
  const [routes] = React.useState([
    {key: 'first', title: 'Morning'},
    {key: 'second', title: 'Afternoon'},
    {key: 'third', title: 'Evening'},
  ]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [bookForLab, setBookForLab] = useState(true);
  const [currentLocation, setCurrentLocation] = useState(false);
  const [selectedType, setSelectedType] = useState(
    collectionType === '0' ? 1 : 0,
  );
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [radioBookingType, setRadioBookingType] = useState([
    {id: 0, type: 'Home Collection', source: imagesConstants.house},
    {id: 1, type: 'Lab Visit', source: imagesConstants.flask},
  ]);
  const [finalBookingAddress, setFinalBookingAddress] = useState({});
  const [maximumDate, setMaximumDate] = useState('');
  const [labSearchValue, setLabSearchValue] = useState('');
  const [handleConnectionState, setHandleConnectionState] = useState(false);

  useEffect(() => {
    if (handleConnectionState) {
      navigation.navigate('ConnectionHandle');
    }
  }, [handleConnectionState]);
  // let maxDate = new Date();

  useEffect(() => {
    getCityPanelId();
    getMaximumDate();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      // getTestPackageDetail();
      getCurrentLocation(0);
      // await getCityPanelId();

      getAddresses();
      getLabHomeFlag();
      getTimeSlots();
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (date !== 'Select Date') {
      getTimeSlots();
    }
  }, [date]);

  useEffect(() => {
    if (latitude & longitude) {
      getLabs('0');
    }
  }, [latitude, longitude]);

  const getCityPanelId = async () => {
    let city = await AsyncStorage.getItem('cityId');
    let panel = await AsyncStorage.getItem('panelId');
    setCityId(city);
    setPanelId(panel);
  };

  const getMaximumDate = async () => {
    var someDate = new Date();
    var numberOfDaysToAdd = 7;
    var result = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
    let maximumDate = new Date(result);
    setMaximumDate(maximumDate);
  };

  const getCurrentLocation = async val => {
    // request(
    //   Platform.select({
    //     android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    //     ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    //   }),
    // ).then(response => {
    //   console.log('res', response);
    //   if (response == 'granted') {
    //     console.log('res', response);
    //     Geolocation.getCurrentPosition(
    //       position => {
    //         setCurrentLocation(true);

    //         setLatitude(position.coords.latitude.toString());
    //         setLongitude(position.coords.longitude.toString());
    //       },
    //       error => {
    //         // See error code charts below.
    //         console.log(error.code, error.message);
    //       },
    //       {enableHighAccuracy: true, timeout: 20000, maximumAge: 10000},
    //     );
    //   } else {
    //     setLoader(false);

    //     setCurrentLocation(false);
    //     if (val === 1) {
    //       Linking.openSettings();
    //     }
    //   }
    // });

    if (Platform.OS === 'ios') {
      const openSetting = () => {
        Linking.openSettings().catch(() => {
          Alert.alert('Unable to open settings');
        });
      };
      const status = await Geolocation.requestAuthorization('whenInUse');
      if (status === 'granted') {
        setUserLocation();
      } else {
        setLatitude(DefaultLatitude);
        setLongitude(DefaultLongitude);
        setCurrentLocation(true);
      }

      if (status === 'denied') {
        Alert.alert(
          'Allow Blal to use your location to use your current location.',
          '',
          [
            {text: 'Go to Settings', onPress: openSetting},
            {text: "Don't Use Location", onPress: () => {}},
          ],
        );
      }

      if (status === 'disabled') {
        Alert.alert(
          'Turn on Location Services to allow to determine your location.',
          '',
          [
            {text: 'Go to Settings', onPress: openSetting},
            {text: "Don't Use Location", onPress: () => {}},
          ],
        );
      }
    } else {
      const hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (hasPermission) {
        setUserLocation();
      }
      const status = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (status === PermissionsAndroid.RESULTS.GRANTED) {
        setUserLocation();
      }
      if (status === PermissionsAndroid.RESULTS.DENIED) {
        Toast('Location permission denied by user.', 0);

        setLoader(false);
        setLatitude(DefaultLatitude);
        setLongitude(DefaultLongitude);
        setCurrentLocation(true);
      } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        Toast('Please allow location permission.', 0);
        setLatitude(DefaultLatitude);
        setLongitude(DefaultLongitude);
        setCurrentLocation(true);
        setLoader(false);
      }
    }
  };

  const setUserLocation = async () => {
    Geolocation.getCurrentPosition(
      async position => {
        let _LAT = position.coords.latitude;
        let _LONG = position.coords.longitude;
        setLatitude(_LAT);
        setLongitude(_LONG);
        setCurrentLocation(true);

        setLoader(false);
      },
      error => {
        console.log(error.message.toString());
      },
      {
        showLocationDialog: true,
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      },
    );
  };

  const getTestPackageDetail = async () => {
    var data = {
      id: cityId,
      lat: '26.8634705',
      lon: '75.81852',
    };

    const requestConfig = {
      method: blalMethod.post,
      data: data,
      url: `${blalServicesPoints.blalUserServices.GetTestPackageDetails}?id=${data.id}&lat=${data.lat}&lon=${data.lon}`,
    };

    const response = await NetworkRequestBlal(requestConfig);

    if (response) {
      const {status_Code} = response;
      if (status_Code === 200) {
        setPackageTestData(response.data);
      } else {
      }
    }
  };

  const getLabs = async searchVal => {
    var data = {
      id: Number(cityId) ? Number(cityId) : 1,
      lat: latitude.toString(),
      lon: longitude.toString(),
      searchKeyword: searchVal,
    };

    let requestConfig = {};

    if (searchVal === '0') {
      requestConfig = {
        method: blalMethod.post,
        data: data,
        url: `${blalServicesPoints.blalUserServices.findNearLabs}?id=${data.id}&lat=${data.lat}&lon=${data.lon}`,
      };
    } else {
      requestConfig = {
        method: blalMethod.post,
        data: data,
        url: `${blalServicesPoints.blalUserServices.findNearLabs}?id=${data.id}&lat=${data.lat}&lon=${data.lon}&SearchKeyword=${data.searchKeyword}`,
      };
    }

    // const

    const response = await NetworkRequestBlal(requestConfig);

    if (response) {
      const {status_Code} = response;
      if (status_Code === 200) {
        setLabs(response.data);
        setLoader(false);
      } else {
        setLoader(false);
      }
    }
  };

  const getAddresses = async () => {
    let data = {
      collection_type: 'Home',
    };
    const requestConfig = {
      method: method.get,
      // data: data,
      url: `${servicesPoints.userServices.get_User_Address}?collection_type=${data.collection_type}`,
    };
    const response = await NetworkRequest(requestConfig);
    if (response) {
      const {success} = response;
      if (success) {
        setAddress(response.data);

        let orderSummaryDate = await AsyncStorage.getItem('cartBookingDate');
        if (orderSummaryDate) {
          let orderSummaryAddressStorage = await AsyncStorage.getItem(
            'cartBookingAddress',
          );
          let orderSummaryAddress = JSON.parse(orderSummaryAddressStorage);
          let data = response.data;
          data = data.map((itn, index) => {
            if (itn.id == orderSummaryAddress.id) {
              itn.selected = !itn.selected;
            } else {
              itn.selected = false;
            }
            return itn;
          });
          setAddress(data);
          let newDate = new Date(orderSummaryDate);
          setDate(orderSummaryDate);
          setSelectedDate(newDate);
          // setLoader(false);
        }
      } else {
        if (response === 'Network Error') {
          Toast('Network Error', 0);
          setHandleConnectionState(true);
          setLoader(false);
        }
        setLoader(false);
      }
    }
  };
  const getTimeSlots = async () => {
    let data = {
      booking_date: date,
    };
    const requestConfig = {
      method: method.get,

      url: `${servicesPoints.bookingServices.booking_time_slots}?booking_date=${date}`,
    };

    const response = await NetworkRequest(requestConfig);

    if (response) {
      const {success} = response;
      if (success) {
        let data = response.data;
        let orderBookingTime = await AsyncStorage.getItem('cartBookingTime');
        data = data.map(itn => {
          if (itn === orderBookingTime) {
            return {time: itn, selected: true};
          } else {
            return {time: itn, selected: false};
          }
        });

        setBookingSlotsTime(data);
      } else {
        if (response === 'Network Error') {
          Toast('Network Error', 0);
          setHandleConnectionState(true);
          setLoader(false);
        }
        setLoader(false);
      }
    }
  };

  const getLabHomeFlag = async () => {
    const requestConfig = {
      method: method.get,

      url: `${servicesPoints.bookingServices.check_cart_for_lab}`,
    };

    const response = await NetworkRequest(requestConfig);

    if (response) {
      const {success} = response;
      if (success) {
        setBookForLab(response?.data);
      } else {
        if (response === 'Network Error') {
          Toast('Network Error', 0);
          setHandleConnectionState(true);
          setLoader(false);
        }
        setLoader(false);
      }
    }
  };

  function onSelect(item) {
    checkTimeSlot(item);
  }

  const checkTimeSlot = async item => {
    try {
      setLoader(true);
      let data = {
        timeslot: `${date} ${item.time}`,
      };
      const requestConfig = {
        method: method.post,
        data: data,
        url: servicesPoints.bookingServices.check_time_slot_availability,
      };

      const response = await NetworkRequest(requestConfig);

      if (response) {
        const {success} = response;
        if (success) {
          setLoader(false);
          Toast(response.message, 1);
          let data = bookingSlotsTime;

          data = data.map((itn, index) => {
            if (itn.time === item.time) {
              itn.selected = !itn.selected;
            } else {
              itn.selected = false;
            }
            return itn;
          });
          setBookingSlotsTime(data);
        } else {
          Toast(response.message, 0);
          if (response === 'Network Error') {
            Toast('Network Error', 0);
            setHandleConnectionState(true);
            setLoader(false);
          }
          setLoader(false);
        }
      }
    } catch (err) {
      console.log('err', err);
    }
  };

  const formatDate = date => {
    return moment(date).format('YYYY-MM-DD');
  };

  const formatDateLabel = date => {
    return moment(date).format('DD-MM-YYYY');
  };

  const onSelectLab = item => {
    let data = labs;
    data = data.map((itn, index) => {
      if (itn.CentreId == item.CentreId) {
        itn.selected = !itn.selected;
      } else {
        itn.selected = false;
      }
      return itn;
    });
    setLabs(data);
  };

  const renderLabCard = item => {
    return (
      <BookingLabListing
        navigation={navigation}
        onSelectedLabsRow={() => onSelectLab(item)}
        data={item}
        // onClickPreviewBooking
        onClickCallItem={btnClickCallRow}
        onClickDirectionItem={btnClickDirectionRow}
        onClickPreviewBooking={(add, date, labLatitude, labLongitude) =>
          btnClickPreviewBooking(add, date, labLatitude, labLongitude, item)
        }
      />
    );
  };

  const radioItemSelected = item => {
    setSelectedType(item.id);
  };

  const btnClickCallRow = () => {};
  const btnClickDirectionRow = () => {
    navigation.navigate('MapLocationView');
  };
  const btnClickPreviewBooking = (
    add,
    date,
    labLatitude,
    labLongitude,
    item,
  ) => {
    if (!date) {
      Toast('Please select Booking Date', 0);
    } else {
      navigation.navigate('OrderSummary', {
        lab: 1,
        selectedLabCenterId: item.CentreId,
        selectedLabAddress: add,
        selectedLabDate: date,
        selectedLabLatitude: labLatitude,
        selectedLabLongitude: labLongitude,
        selectedLabItem: item,
      });
    }
  };
  const renderAlsoAddCard = item => {
    return (
      <LocationAddressCard onSelect={() => onSelectAddress(item)} data={item} />
    );
  };

  function onSelectAddress(item) {
    let data = address;
    data = data.map((itn, index) => {
      if (itn.id == item.id) {
        itn.selected = !itn.selected;
      } else {
        itn.selected = false;
      }
      return itn;
    });
    setAddress(data);

    var selectedAddress = address.find(p => p.selected);

    if (selectedAddress) {
      setFinalBookingAddress(selectedAddress);
    } else {
      setFinalBookingAddress({});
    }
  }

  const handleDatePickerConfirm = date => {
    let newDate = moment(date).format(Date_Format);
    // const selectedDate =
    //   date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

    // const split_date = selectedDate.split('/');
    // setDay(split_date[0]);
    // setMonth(split_date[1]);
    // setYear(split_date[2]);
    setDate(formatDate(date));
    setLabelDate(formatDateLabel(date));
    setFullDate(newDate);
    setDatePicker(false);
    // getTimeSlots();
  };

  const handleDatePickerCancel = () => {
    setDatePicker(false);
  };
  const renderSpecialInstruction = () => {
    return <SpecialInstructionView />;
  };

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  const onPreviewBooking = () => {
    // const even = element => element.selected;

    let selectedTimeSlot = bookingSlotsTime.some(element => element.selected);
    let arr = [];
    if (selectedTimeSlot) {
      bookingSlotsTime.map(item => {
        if (item.selected) {
          arr.push(item);
        }
      });
    }

    if (Object.keys(finalBookingAddress).length === 0) {
      Toast('Please select Address');
    } else if (!selectedTimeSlot) {
      Toast('Please select Time slot for booking');
    } else {
      navigation.navigate('OrderSummary', {
        lab: 0,
        selectedAddress: finalBookingAddress,
        bookingDate: fullDate,
        bookingDateLabel: labelDate,
        bookingTime: arr[0].time,
      });
    }
  };

  const onSearchLabs = val => {
    setLabSearchValue(val === '0' ? labSearchValue : val);
    getLabs(val === '0' ? labSearchValue : val);
  };

  const _renderTabBar = props => {
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          return (
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => setIndex(i)}>
              <RegularText
                style={{
                  color: i === index ? colors.app_theme_dark_green : '#B4BBC7',
                  fontSize: hp('2%'),
                  marginBottom: 7,
                }}
                title={route.title}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', () =>
  //     AsyncStorage.removeItem('Code'),
  //   );
  //   return () => {
  //     BackHandler.removeEventListener('hardwareBackPress', () =>
  //       AsyncStorage.removeItem('Code'),
  //     );
  //   };
  // }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <DefaultHeader
        onBack={() => navigation.goBack()}
        title={'Booking Details'}
      />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.mainContainer}>
          <View style={styles.selfSection}>
            {/* <View style={styles.rowHeader}>
              <View style={styles.headerNameSection}>
                <BoldText
                  style={styles.bookingHeading}
                  title={'Provide Details for booking'}
                />
                <RegularText style={styles.sampleType} title={'Blood Test'} />
              </View>

              <View style={styles.amountRightSection}>
                <BoldText style={styles.testNameText} title={'\u20B9 800'} />
                <View style={styles.offSection}>
                  <RegularText
                    style={[styles.amountTextTwo, {textAlign: 'right'}]}
                    title={`\u20B9 1000`}
                  />
                  <RegularText style={styles.percentText} title={`20%off`} />
                </View>
              </View>
            </View> */}
            {/* <View>
              <RegularText
                style={styles.sampleDescription}
                title={
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor mn incididunt ut labore et dsdf dsf sdf sdf sdf sdf dsfolore magna aliqua. Ut enim ad minim veniam, quis nostrud.'
                }
              />
            </View> */}
            <View style={styles.selectTypeHeading}>
              <BoldText
                style={styles.bookingHeading}
                title={'Mode of Sample Collection'}
              />
            </View>
            <View style={styles.sampleSection}>
              {radioBookingType.map((data, index) => {
                return (
                  <View key={index} style={styles.sampleSection}>
                    <TouchableOpacity
                      key={index}
                      disabled={
                        collectionType === '0' && data.id === 0 ? true : false
                      }
                      onPress={() =>
                        bookForLab
                          ? radioItemSelected(data)
                          : Toast('This test is available for lab only')
                      }>
                      <View style={styles.typeUnSelect}>
                        {selectedType == data.id ? (
                          <View style={styles.typeSelect} />
                        ) : null}
                      </View>
                    </TouchableOpacity>
                    <View style={styles.profilePicView}>
                      <Image style={styles.profilePic} source={data.source} />
                    </View>
                    <BoldText
                      style={[styles.bookingHeading, {marginTop: 5}]}
                      title={data.type}
                    />
                  </View>
                );
              })}
            </View>

            {selectedType ? (
              //Lab Listing section
              <View>
                <View style={styles.LabListingSection}>
                  <BoldText
                    style={styles.bookingHeading}
                    title={'Lab Listing'}
                  />
                  <RegularText
                    style={styles.labSelectNearBy}
                    title={'Select the nearby Lab which is near to you.'}
                  />
                </View>
                <View style={{flex: 1, marginTop: hp('2%')}}>
                  <View style={[styles.textInputView]}>
                    <TextInput
                      placeholderTextColor={colors.purplishGrey}
                      style={[styles.textInput, {flex: 0.9}]}
                      value={labSearchValue}
                      onChangeText={val => onSearchLabs(val)}
                      placeholder={'Search Labs'}
                    />
                    <TouchableOpacity
                      hitSlop={{left: 20, right: 20, top: 20, bottom: 20}}
                      onPress={() => onSearchLabs('0')}
                      style={{
                        flex: 0.1,

                        alignItems: 'center',
                      }}>
                      <Image
                        style={{height: 20, width: 20}}
                        source={imagesConstants.search}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.dataSection}>
                  <View style={styles.searchingListSection}>
                    <FlatList
                      data={labs}
                      showsVerticalScrollIndicator={false}
                      extraData={labs}
                      renderItem={({item}) => renderLabCard(item)}
                      ListEmptyComponent={() => {
                        return (
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              marginTop: hp('25%'),
                            }}>
                            <RegularText title={'No Record Found'} />
                          </View>
                        );
                      }}
                    />
                  </View>
                </View>
              </View>
            ) : (
              //Home Section
              <View style={styles.homeSection}>
                <View style={[styles.youCanAddSection]}>
                  <View style={styles.listHeading}>
                    <BoldText
                      title={'Sample Collection Address'}
                      style={styles.headingText}
                    />
                    <TouchableOpacity
                      // onPress={() =>
                      //   navigation.navigate('AddNewAddress', {
                      //     lat: latitude,
                      //     long: longitude,
                      //     screen: 'BookingDetail',
                      //   })
                      // }
                      onPress={() =>
                        navigation.navigate('ChangeLocation', {
                          screen: 'BookingDetail',
                        })
                      }
                      style={{
                        backgroundColor: colors.app_theme_dark_green,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderRadius: 10,
                        // width: '20%',
                      }}>
                      <BoldText
                        title={'+ Add Address'}
                        style={styles.addAddress}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.alsoAddListSection}>
                    <FlatList
                      data={address}
                      showsHorizontalScrollIndicator={false}
                      horizontal={true}
                      showsVerticalScrollIndicator={false}
                      extraData={address}
                      ListEmptyComponent={() => {
                        return (
                          <View
                            style={{
                              height: hp('20%'),

                              width: hp('50%'),
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <RegularText
                              style={{color: colors.app_theme_dark_green}}
                              title={'No Address Found'}
                            />
                          </View>
                        );
                      }}
                      renderItem={({item}) => renderAlsoAddCard(item)}
                    />
                  </View>
                </View>
                <View style={styles.selectDateSection}>
                  <View style={styles.listHeading}>
                    <BoldText
                      title={'Appointment Date'}
                      style={styles.headingText}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => setDatePicker(true)}
                    style={styles.calendarView}>
                    <RegularText style={styles.dateText} title={labelDate} />
                    <Image
                      style={styles.calendarIcon}
                      source={imagesConstants.calendar}
                    />
                  </TouchableOpacity>
                </View>
                {fullDate ? (
                  // <View style={[styles.tabsContainer, {height: hp('28%')}]}>
                  //   <TabView
                  //     navigationState={{index, routes}}
                  //     renderScene={renderScene}
                  //     onIndexChange={setIndex}
                  //     // renderTabBar={_renderTabBar}
                  //     initialLayout={{width: layout.width}}
                  //   />

                  // </View>
                  <View style={[styles.tabsContainer, {height: hp('27%')}]}>
                    {/* <TabView
                     navigationState={{index, routes}}
                     renderScene={renderScene}
                     onIndexChange={setIndex}
                     // renderTabBar={_renderTabBar}
                     initialLayout={{width: layout.width}}
                   /> */}
                    <View style={{marginTop: hp('2%')}}>
                      <View style={styles.listHeading}>
                        <BoldText
                          title={'Appointment Time'}
                          style={styles.headingText}
                        />
                      </View>
                      <FlatList
                        numColumns={3}
                        data={bookingSlotsTime}
                        extraData={bookingSlotsTime}
                        renderItem={({item}) => {
                          return (
                            <TouchableOpacity
                              disabled={item.selected ? true : false}
                              onPress={() => onSelect(item)}
                              style={{
                                backgroundColor: colors.app_theme_light_green,
                                margin: hp('1%'),
                                width: '28%',
                                shadowColor: '#000',
                                shadowOffset: {
                                  width: 0,
                                  height: 2,
                                },
                                borderRadius: 5,
                                shadowOpacity: 0.1,
                                shadowRadius: 2,

                                elevation: 5,
                              }}>
                              <View
                                style={{
                                  backgroundColor: item.selected
                                    ? colors.app_theme_light_green
                                    : colors.white,
                                  paddingHorizontal: 20,
                                  paddingVertical: 10,
                                  marginBottom: hp('0.2%'),
                                  borderRadius: 5,
                                }}>
                                <RegularText
                                  style={{
                                    fontSize: hp('1.5%'),
                                    color: item.selected
                                      ? colors.white
                                      : colors.app_theme_light_green,
                                  }}
                                  title={item.time}
                                />
                              </View>
                            </TouchableOpacity>
                          );
                        }}
                      />
                    </View>
                  </View>
                ) : null}
                {/* 
                <View style={[styles.specialInstructionSection]}>
                  <View>
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
              </View>
            )}
          </View>
          {!selectedType ? (
            <View style={{padding: hp('2%')}}>
              <SubmitButton
                onPress={onPreviewBooking}
                title={'Preview Booking'}
              />
            </View>
          ) : null}
          {datePicker ? (
            <DateTimePickerModal
              date={selectedDate}
              isVisible={datePicker}
              mode="date"
              display={'spinner'}
              minimumDate={new Date()}
              maximumDate={maximumDate}
              onConfirm={handleDatePickerConfirm}
              onCancel={handleDatePickerCancel}
            />
          ) : null}
          <Loader display={loader} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;
