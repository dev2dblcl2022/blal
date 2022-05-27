import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import styles from './style';
import {useForm, Controller} from 'react-hook-form';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DefaultHeader from '../../../components/DefaultHeader';
import {textConstants} from '../../../../constants/textConstants';
import {BoldText} from '../../../components/Common';
import moment from 'moment';
import colors from '../../../../constants/colors';
import {SubmitButton} from '../../../components/Buttons';
import {InputField, Loader, MainContainer, Toast} from '../../../components';
import {ScrollView} from 'react-native-gesture-handler';
import imagesConstants from '../../../../constants/imagesConstants';
import {PERMISSIONS, request} from 'react-native-permissions';
import NetworkRequest, {
  method,
  servicesPoints,
} from '../../../../services/NetworkRequest';
import validate from '../../../../helpers/Validator/validate_wrapper';
import {AuthContext} from '../../../../../context/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleMapApiKey} from '../../../../config/Setting';

let dummyCity = '';
let dummyState = '';
const index = ({navigation, route}) => {
  let lat = route?.params?.lat;
  let screen = route?.params?.screen;

  let long = route?.params?.long;

  const {addressLabel, signOut} = React.useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loader, setLoader] = useState(true);
  const [date, setDate] = useState('Date of Birth');
  const [datePicker, setDatePicker] = useState(false);
  const [male, setMale] = useState(true);
  const [day, setDay] = useState('');
  const [touchMap, setTouchMap] = useState(false);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [state, setState] = useState(false);

  const [stateValue, setStateValue] = useState(null);
  const [validateForm, setValidateForm] = useState({
    streetNameOne: '',
    streetNameOneError: '',
    streetNameTwo: '',
    streetNameTwoError: '',
    state: '',
    stateError: '',
    city: '',
    cityError: '',
    pinCode: '',
    pinCodeError: '',
    phoneNumber: '',
    phoneNumberError: '',
    plotNumber: '',
    plotNumberError: '',
  });
  const [cityValue, setCityValue] = useState(null);
  const [selectState, setSelectState] = useState([
    {label: 'Rajasthan', value: 'item1'},
  ]);
  const [selectCity, setSelectCity] = useState([
    {label: 'Jaipur', value: 'item1'},
    {label: 'Ajmer', value: 'item2'},
  ]);
  const [selectedAddressType, setSelectedAddressType] = useState(0);
  const [radioAddressType, setRadioAddressType] = useState([
    {id: 0, type: 'Home', source: imagesConstants.house},
    {id: 1, type: 'Office', source: imagesConstants.office},
    {id: 2, type: 'Others', source: imagesConstants.other},
  ]);

  const mapRef = useRef(null);
  const [locationError, setLocationError] = useState('');
  const [currentLocation, setCurrentLocation] = useState(false);
  const [address_Component, setAddressComponent] = useState([]);
  const [address_city, setAddressCity] = useState('');
  const [address_state, setAddressState] = useState('');

  const [latitiude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const formatDate = date => {
    return moment(date).format('MMMM DD, YYYY');
  };

  const onMapReady = () => {
    setLatitude(lat);
    setLongitude(long);

    let coords = {
      latitude: lat,
      longitude: long,
    };

    getLocationName(coords, 0);
  };

  const setLatLong = () => {};
  const radioItemSelected = item => {
    setSelectedAddressType(item.id);
  };

  const onSubmit = async () => {
    let streetNameOneError = validate(
      'streetNameOne',
      validateForm.streetNameOne,
    );
    let streetNameTwoError = validate(
      'streetNameTwo',
      validateForm.streetNameTwo,
    );
    let stateError = validate('state', validateForm.state);
    let cityError = validate('city', validateForm.city);
    let pinCodeError = validate('pinCode', validateForm.pinCode);
    let phoneNumberError = validate('phoneNumber', validateForm.phoneNumber);
    let plotNumberError = validate('plotNumber', validateForm.plotNumber);

    setValidateForm({
      streetNameOne: validateForm.streetNameOne,
      streetNameOneError: streetNameOneError,
      streetNameTwo: validateForm.streetNameTwo,
      streetNameTwoError: streetNameTwoError,
      state: validateForm.state,
      stateError: stateError,
      city: validateForm.city,
      cityError: cityError,
      pinCode: validateForm.pinCode,
      pinCodeError: pinCodeError,
      phoneNumber: validateForm.phoneNumber,
      phoneNumberError: phoneNumberError,
      plotNumber: validateForm.plotNumber,
      plotNumberError: plotNumberError,
    });

    if (
      streetNameOneError ||
      streetNameTwoError ||
      stateError ||
      cityError ||
      pinCodeError ||
      phoneNumberError ||
      plotNumberError
    ) {
      if (
        phoneNumberError === 'Your mobile number is required' &&
        !streetNameOneError &&
        !streetNameTwoError &&
        !stateError &&
        !cityError &&
        !pinCodeError &&
        !plotNumberError
      ) {
        await onAddAddress();
      } else {
        null;
      }
    } else {
      await onAddAddress();
    }
  };

  const onAddAddress = async () => {
    setLoader(true);
    try {
      let data = {
        type:
          selectedAddressType === 0
            ? 'Home'
            : selectedAddressType === 1
            ? 'Office'
            : 'Others',
        number: validateForm.plotNumber,
        area1: validateForm.streetNameOne,
        area2: validateForm.streetNameTwo,
        city: validateForm.city,
        state: validateForm.state,
        pincode: validateForm.pinCode,
        phone_number: validateForm.phoneNumber,
        latitude: latitiude,
        longitude: longitude,
      };

      setLoader(true);
      const requestConfig = {
        method: method.post,
        url: servicesPoints.userServices.add_address,
        data: data,
      };
      const response = await NetworkRequest(requestConfig);
      if (response) {
        const {success} = response;
        if (success) {
          addressLabel(
            validateForm.streetNameOne +
              ' ' +
              validateForm.streetNameTwo +
              ' ' +
              validateForm.pinCode,
          );
          await AsyncStorage.setItem(
            'cityId',
            response.data?.CityId.toString(),
          );
          await AsyncStorage.setItem(
            'panelId',
            response.data?.Panel_ID.toString(),
          );
          Toast(response.message, 1);
          if (response?.data?.isHomeCollection) {
            Toast(response.message, 1);
          }

          if (screen === 'BookingDetail') {
            navigation.goBack();
          } else {
            navigation.pop(3);
          }

          // check_PinCode(response.message);
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
          Toast(response.message, 0);
        }
      }
    } catch (error) {
      setLoader(false);
    }
  };

  const check_PinCode = async message => {
    try {
      setLoader(true);
      let data = {
        pincode: validateForm.pinCode,
        CityName: validateForm.city,
      };

      const requestConfig = {
        method: method.post,
        data: data,
        url: servicesPoints.userServices.checkPinCode,
      };

      const response = await NetworkRequest(requestConfig);

      if (response) {
        const {success} = response;
        if (success) {
          setLoader(false);
          addressLabel(
            validateForm.streetNameOne +
              ' ' +
              validateForm.streetNameTwo +
              ' ' +
              validateForm.pinCode,
          );
          await AsyncStorage.setItem('cityId', response.data.CityId.toString());
          await AsyncStorage.setItem(
            'panelId',
            response.data.city?.Panel_ID.toString(),
          );

          navigation.goBack();
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

  const handleDatePickerConfirm = date => {
    const selectedDate =
      date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    const split_date = selectedDate.split('/');
    setDay(split_date[0]);
    setMonth(split_date[1]);
    setYear(split_date[2]);
    setDate(formatDate(date));
    setDatePicker(false);
  };

  const handleDatePickerCancel = () => {
    setDatePicker(false);
  };

  const onChangeText = (key, val) => {
    setValidateForm({
      ...validateForm,
      ...{[key]: val, [`${key}Error`]: validate(key, val)},
    });
  };

  const getCurrentLocation = async () => {
    request(
      Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      }),
    ).then(response => {
      if (response == 'granted') {
        Geolocation.getCurrentPosition(
          position => {
            setCurrentLocation(true);

            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);

            getLocationName(position, 0);
          },
          {enableHighAccuracy: true, timeout: 10000, maximumAge: 10000},
        );
      } else {
        setLoader(false);
      }
    });
  };

  const getLocationName = async (data, val) => {
    Geocoder.init('AIzaSyBvrwNiJMMmne5aMGkQUMCpb-rafOYdT4g');
    Geocoder.from(
      val === 0 ? data.latitude : data.latitude,
      val === 0 ? data.longitude : data.longitude,
    ).then(json => {
      getZipCode(json);
      // alert(data.latitude);
      setLatitude(val === 0 ? data.latitude : data.latitude);
      setLongitude(val === 0 ? data.longitude : data.longitude);
      var addressComponent = json.results[0].formatted_address;

      setAddressComponent(addressComponent);
      setLoader(false);
    });
  };
  const getZipCode = async details => {
    let data = details.results[0] || [];
    let addressString = '';
    let addressObject = {
      streetNameOne: '',
      streetNameOneError: '',
      streetNameTwo: '',
      streetNameTwoError: '',
      state: '',
      stateError: '',
      city: '',
      cityError: '',
      pinCode: '',
      pinCodeError: '',
      phoneNumber: '',
      phoneNumberError: '',
      plotNumber: '',
      plotNumberError: '',
    };
    data.address_components.map(_data => {
      if (_data.types.includes('premise')) {
        addressString = addressString + `${_data.long_name}`;
        addressObject.plotNumber = _data.long_name;
      } else if (_data.types.includes('street_number')) {
        addressString = addressString + ` ${_data.long_name}`;
        addressObject.streetNameOne = _data.long_name;
      } else if (_data.types.includes('sublocality_level_2')) {
        addressString = addressString + ` ${_data.long_name}`;
        addressObject.streetNameOne =
          addressObject.streetNameOne + ` ${_data.long_name}`;
      } else if (_data.types.includes('route')) {
        addressString = addressString + ` ${_data.long_name}`;
        addressObject.streetNameTwo = _data.long_name;
      } else if (_data.types.includes('sublocality_level_1')) {
        addressString = addressString + ` ${_data.long_name}`;
        addressObject.streetNameTwo =
          addressObject.streetNameTwo + ` ${_data.long_name}`;
      } else if (_data.types.includes('locality')) {
        addressString = addressString + ` ${_data.long_name}`;
        addressObject.streetNameTwo =
          addressObject.streetNameTwo + ` ${_data.long_name}`;
      } else if (_data.types.includes('administrative_area_level_2')) {
        addressString = addressString + ` ${_data.long_name}`;
        addressObject.city = _data.long_name;
      } else if (_data.types.includes('administrative_area_level_1')) {
        addressString = addressString + ` ${_data.long_name}`;
        addressObject.state = _data.long_name;
      } else if (_data.types.includes('country')) {
        addressString = addressString + ` ${_data.long_name}`;
        addressObject.country = _data.long_name;
      } else if (_data.types.includes('postal_code')) {
        addressString = addressString + ` ${_data.long_name}`;
        addressObject.pinCode = _data.long_name;
      }
    });
    setValidateForm(addressObject);
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <DefaultHeader
        onBack={() => navigation.goBack()}
        title={textConstants.addNewAddress.addNewAddress}
        // title={`${lat}&${long}`}
      />
      <View style={styles.mainContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEnabled={!touchMap}>
          <MainContainer>
            <View style={[styles.headingSection]}>
              <BoldText
                style={styles.heading}
                title={'Add new Address that you wish to have'}
              />
              <MapView
                zoomEnabled={true}
                key={GoogleMapApiKey}
                onTouchStart={() => setTouchMap(true)}
                onTouchEnd={() => setTouchMap(false)}
                scrollEnabled={true}
                showsScale={true}
                ref={mapRef}
                onRegionChangeComplete={region => {
                  getLocationName(region, 1);
                }}
                onMapReady={() => onMapReady()}
                style={styles.mapStyle}
                initialRegion={{
                  latitude: lat,
                  longitude: long,
                  //   latitude: 26.9124,
                  // longitude: 75.7873,
                  // latitude: route?.params?.lat,
                  // ongitude: route?.params?.long,

                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  alignSelf: 'center',
                  top: hp('25%'),
                }}>
                <Image source={imagesConstants.location} />
              </View>
            </View>

            <View style={styles.inputFieldsContainer}>
              <View style={styles.mobileNumberInput}>
                <InputField
                  value={validateForm.plotNumber}
                  error={validateForm.plotNumberError}
                  returnKeyType={'next'}
                  blurOnSubmit={false}
                  onChangeText={text =>
                    onChangeText('plotNumber', text, 'plotNumber')
                  }
                  style={styles.input}
                  placeholder={'Plot Number'}
                />
              </View>
              <View style={styles.mobileNumberInput}>
                <InputField
                  value={validateForm.streetNameOne}
                  error={validateForm.streetNameOneError}
                  returnKeyType={'next'}
                  blurOnSubmit={false}
                  onChangeText={text =>
                    onChangeText('streetNameOne', text, 'streetNameOne')
                  }
                  style={styles.input}
                  placeholder={'Street Name/Area/ Apartment Name'}
                />
              </View>
              <View style={styles.mobileNumberInput}>
                <InputField
                  value={validateForm.streetNameTwo}
                  error={validateForm.streetNameTwoError}
                  returnKeyType={'next'}
                  blurOnSubmit={false}
                  onChangeText={text =>
                    onChangeText('streetNameTwo', text, 'streetNameTwo')
                  }
                  style={styles.input}
                  placeholder={'Street Name 2'}
                />
              </View>

              <View style={styles.mobileNumberInput}>
                <InputField
                  value={validateForm.city}
                  error={validateForm.cityError}
                  returnKeyType={'next'}
                  blurOnSubmit={false}
                  onChangeText={text => onChangeText('city', text, 'city')}
                  style={styles.input}
                  placeholder={'City'}
                />
              </View>
              <View style={styles.mobileNumberInput}>
                <InputField
                  value={validateForm.state}
                  error={validateForm.stateError}
                  returnKeyType={'next'}
                  blurOnSubmit={false}
                  onChangeText={text => onChangeText('state', text, 'state')}
                  style={styles.input}
                  placeholder={'State'}
                />
              </View>

              <View style={styles.mobileNumberInput}>
                <InputField
                  value={validateForm.pinCode}
                  error={validateForm.pinCodeError}
                  returnKeyType={'next'}
                  blurOnSubmit={false}
                  keyboardType={'number-pad'}
                  onChangeText={text =>
                    onChangeText('pinCode', text, 'pinCode')
                  }
                  style={styles.input}
                  placeholder={'Pincode'}
                />
              </View>
              <View style={styles.mobileNumberInput}>
                <InputField
                  value={validateForm.phoneNumber}
                  // error={validateForm.phoneNumberError}
                  returnKeyType={'next'}
                  maxLength={10}
                  keyboardType={'number-pad'}
                  blurOnSubmit={false}
                  onChangeText={text =>
                    onChangeText('phoneNumber', text, 'phoneNumber')
                  }
                  style={styles.input}
                  placeholder={'Alternate Mobile Number'}
                />
              </View>
              <View style={[styles.radioButtonSection]}>
                <BoldText
                  style={styles.addressTypeText}
                  title={'Address Type'}
                />

                <View style={styles.radioBoxSection}>
                  {radioAddressType.map((data, index) => {
                    return (
                      <View key={index} style={styles.radioBoxSection}>
                        <TouchableOpacity
                          key={index}
                          onPress={() => radioItemSelected(data)}>
                          <View style={styles.typeUnSelect}>
                            {selectedAddressType === data.id ? (
                              <View style={styles.typeSelect} />
                            ) : null}
                          </View>
                        </TouchableOpacity>
                        <View style={styles.imgboxView}>
                          <Image style={styles.imgIcon} source={data.source} />
                        </View>
                        <BoldText
                          style={[styles.typeTxt, {}]}
                          title={data.type}
                        />
                      </View>
                    );
                  })}
                </View>
              </View>

              <View style={[styles.buttonSection]}>
                <SubmitButton
                  style={styles.confirmBtn}
                  title={textConstants.btnText.confirmLocation}
                  onPress={onSubmit}
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
            <Loader display={loader} />
          </MainContainer>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default index;
