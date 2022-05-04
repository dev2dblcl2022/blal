import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import Geocoder from 'react-native-geocoding';
import {LinkUhidCard, Toast} from '..';
import {AuthContext} from '../../../../context/context';
import colors from '../../../constants/colors';
import imagesConstants from '../../../constants/imagesConstants';
import {textConstants} from '../../../constants/textConstants';
import NetworkRequest, {
  method,
  servicesPoints,
} from '../../../services/NetworkRequest';
import {CancelButton, SubmitButton} from '../Buttons';
import CModal from '../CModal';
import {BoldText, RegularText} from '../Common';
import LocationAddressCard from '../LocationAddressCard';
import SelectPrimaryCard from '../SelectPrimaryCard';
import styles from './style';
export default props => {
  const {addressLabel} = React.useContext(AuthContext);
  const [addresses, setAddresses] = useState([]);
  const [location, setLoacation] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [cartAddress, setCartAddress] = useState([]);
  const [loader, setLoader] = useState(true);
  const [cityId, setCityId] = useState('');
  const [panelId, setPanelId] = useState('');
  const [testType, setTestType] = useState('');
  const [cartTestPackageIds, setCartTestPackageIds] = useState([]);
  const [cartDataBookings, setCartDataBookings] = useState([]);
  const [familyMembersData, setFamilyMembersData] = useState([]);
  const [cartData, setCartData] = useState({});
  const fetchddress = async () => {
    let data = {
      collection_type: 'Home',
    };
    const requestConfig = {
      method: method.get,
      url: `${servicesPoints.userServices.get_User_Address}?collection_type=${data.collection_type}`,
    };
    const response = await NetworkRequest(requestConfig);
    if (response) {
      const {success} = response;
      if (success) {
        setCartAddress(response.data);
        let orderSummaryDate = await AsyncStorage.getItem('cartBookingDate');
        if (orderSummaryDate) {
          let orderSummaryAddressStorage = await AsyncStorage.getItem(
            'cartBookingAddress',
          );
          let orderSummaryAddress = JSON.parse(orderSummaryAddressStorage);
          let data = response.data;
          data = data.map((itn, index) => {
            if (itn.id === orderSummaryAddress.id) {
              itn.selected = !itn.selected;
            } else {
              itn.selected = false;
            }
            return itn;
          });
          setCartAddress(data);

          // setLoader(false);
        }
      }
    }
  };
  useEffect(() => {
    fetchddress();
  }, []);
  const cartCityAddress = cartAddress.map(add => {
    return add.city;
  });
  useEffect(() => {
    // const unsubscribe = navigation.addListener('focus', () => {
    getAddresses();
    // });
    // return unsubscribe;
  }, []);

  const getAddresses = async () => {
    const requestConfig = {
      method: method.get,
      url: servicesPoints.userServices.get_User_Address,
    };
    const response = await NetworkRequest(requestConfig);

    if (response) {
      const {success} = response;
      if (success) {
        setAddresses(response.data);
      } else {
      }
    }
  };

  function onSelectAddress(item) {
    let data = addresses;
    data = data.map((itn, index) => {
      if (itn.id === item.id) {
        itn.selected = !itn.selected;
      } else {
        itn.selected = false;
      }
      return itn;
    });
    setAddresses(data);
  }
  const getMyCartData = async (cit, pan) => {
    try {
      const requestConfig = {
        method: method.get,
        url: servicesPoints.bookingServices.myCart,
      };
      const response = await NetworkRequest(requestConfig);

      if (response) {
        const {success} = response;
        if (success) {
          let arr = [];
          arr = response?.data?.bookings;

          const _arr = [];

          arr.forEach(item => {
            _arr.push(...item.booking_member_tests);
          });
          // console.log('cit iss', cit, pan);
          // getLastSearched(cit, pan);
          setLoader(false);
          setCartTestPackageIds(_arr);
          setCartData(response.data);
          setCartDataBookings(response?.data?.bookings);
          // setBookingMembersTests(response.data.booking_member_tests);
          setFamilyMembersData(response.data?.family_members);
          setCityId(
            response.data?.family_members[0]?.booking_member_tests[0]?.city_id,
          );
          setPanelId(
            response.data?.family_members[0]?.booking_member_tests[0]?.panel_id,
          );
          setTestType(
            response.data?.family_members[0]?.booking_member_tests[0]
              ?.test_type,
          );

          setLoader(false);
        } else {
          if (response === 'Network Error') {
            Toast('Network Error', 0);

            setLoader(false);
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
  const onClearCart = async () => {
    try {
      setLoader(true);

      const requestConfig = {
        method: method.get,

        url: servicesPoints.bookingServices.clear_my_cart,
      };
      const response = await NetworkRequest(requestConfig);

      if (response) {
        const {success} = response;
        if (success) {
          getMyCartData();
          props.onDone();
          onDone();
        } else {
          if (response === 'Network Error') {
            Toast('Network Error', 0);
            setLoader(false);
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
  console.log('cartCityAddress', cartCityAddress.toString());
  function onDone1() {
    let data = addresses;
    data.map((city1, index) => {
      if (city1.selected) {
        if (city1.city) {
          if (cartCityAddress.toString() !== city1.city) {
            Alert.alert(
              'Cart will be discard if you change city before the checkout cart',
              ``,
              [
                {
                  text: 'Cancel',
                  onPress: () => props.onDone(),
                  style: 'cancel',
                },
                {
                  text: 'Ok',
                  onPress: () => onClearCart(),
                },
              ],
              {cancelable: false},
            );
          } else {
            onDone();
          }
        } else {
          onDone();
        }
      }
    });
  }
  function onDone() {
    // console.log('I am calles1');
    let addressData = [];
    let data = addresses;
    data.map((itn, index) => {
      if (itn.selected) {
        addressData.push(itn);
        return itn;
      }
    });

    if (addressData.length > 0) {
      // console.log('I am calles2', addressData);
      // props.onPressDone(address.length > 0 ? '1' : '0', address);
      getLocationName(
        addressData[0].latitude,
        addressData[0].longitude,
        addressData,
      );
      addressData = [];
    } else {
      props.onPressDone();
    }
  }

  const onGetCityName = async (pincode, address) => {
    Geocoder.init('AIzaSyBvrwNiJMMmne5aMGkQUMCpb-rafOYdT4g');
    Geocoder.from(pincode)
      .then(async response1 => {
        const {lat, lng} = response1.results[0].geometry.location;

        var selectedCity = '';

        console.log(
          'response1.results[0].address_components',
          response1.results[0].address_components,
        );
        for (
          let i = 0;
          i < response1.results[0].address_components.length;
          i++
        ) {
          for (
            let j = 0;
            j < response1.results[0].address_components[i].types.length;
            j++
          ) {
            switch (response1.results[0].address_components[i].types[j]) {
              case 'locality':
                selectedCity =
                  response1.results[0].address_components[i].long_name;

                break;
              case 'administrative_area_level_2':
                selectedCity =
                  response1.results[0].address_components[i].long_name;

                break;
            }
          }
        }

        checkPincode(selectedCity, pincode, address);
      })
      .catch(error => {
        if (error?.origin?.results?.length === 0) {
          Toast('Please enter valid pincode', 0);
        }
      });
  };

  function getLocationName(lat, long, address) {
    console.log('I am calles2', address);
    Geocoder.init('AIzaSyBvrwNiJMMmne5aMGkQUMCpb-rafOYdT4g');

    Geocoder.from(lat, long)
      // Geocoder.from(data.coords.latitude, data.coords.longitude)
      .then(json => {
        var addressComponent = json.results[0].formatted_address;

        setLoacation(
          address[0].area1 + ' ' + address[0].area2 + ' ' + address[0].pincode,
        );
        getZipCode(json, address);
      })
      .catch(error => console.warn(error));
  }

  const getZipCode = async (details, address) => {
    let data = details.results[0] || [];
    for (let i = 0; i < data.address_components.length; i++) {
      for (let j = 0; j < data.address_components[i].types.length; j++) {
        if (data.address_components[i].types[j] === 'postal_code') {
          var add_zipCode = data.address_components[i].long_name;

          await setPinCode(add_zipCode);
          onGetCityName(add_zipCode, address);
        }
      }
    }
  };

  const checkPincode = async (cityName, add_zipCode, address) => {
    try {
      let data = {
        pincode: add_zipCode,
        CityName: cityName,
      };
      const requestConfig = {
        method: method.post,
        data: data,
        url: servicesPoints.userServices.checkPinCode,
      };

      const response = await NetworkRequest(requestConfig);

      if (response) {
        console.log('res', response);
        const {success} = response;
        if (success) {
          let {data} = response;
          addressLabel(
            address[0].area1 +
              ' ' +
              address[0].area2 +
              ' ' +
              address[0].pincode,
          );

          await AsyncStorage.setItem('cityId', data.CityId.toString());
          await AsyncStorage.setItem('panelId', data.Panel_ID.toString());

          props.onPressDone(data.CityId.toString(), data.Panel_ID.toString());
        } else {
          props.onPressDone();
        }
      }
    } catch (err) {}
  };

  const renderAlsoAddCard = item => {
    return (
      <LocationAddressCard onSelect={() => onSelectAddress(item)} data={item} />
    );
  };
  return (
    <CModal
      isVisible={props.visible}
      animationType="slide"
      closeModal={props.onRequestClose}>
      <View style={styles.modalContainer}>
        <View style={[styles.circleContainer]}>
          <TouchableOpacity onPress={onDone1}>
            <BoldText style={styles.doneText} title={'Done'} />
          </TouchableOpacity>
          {/**current location pincode */}
          <View style={styles.currentLocationSection}>
            <TouchableOpacity onPress={props.onPressUseCurrentLocation}>
              <View style={{flexDirection: 'row'}}>
                <Image style={{}} source={imagesConstants.mylocation} />
                <RegularText
                  title={'Use Current Location'}
                  style={styles.gpsLocSection}
                />
              </View>
              <RegularText
                title={'Using GPS'}
                style={styles.gpsLocSubSection}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{marginTop: 15}}
              onPress={props.enterPinCode}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  style={{marginLeft: 5}}
                  source={imagesConstants.location}
                />
                <RegularText
                  title={'Enter Pincode here'}
                  style={styles.gpsLocSection}
                />
              </View>
              <RegularText
                title={'Area Pincode'}
                style={styles.gpsLocSubSection}
              />
            </TouchableOpacity>
          </View>
          {/**Load Local Address selection */}
          <View style={styles.youCanAddSection}>
            <View style={styles.listHeading}>
              <BoldText title={'Select Address'} style={styles.headingText} />
              {/* <BoldText
                // onPress={props.onPressAddAddress}
                title={'+ Add Address'}
                style={styles.addAddress}
              /> */}
            </View>
            <View style={[styles.alsoAddListSection]}>
              <FlatList
                data={addresses}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                showsVerticalScrollIndicator={false}
                extraData={addresses}
                ListEmptyComponent={() => {
                  return (
                    <View
                      style={{
                        height: '100%',
                        width: 360,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <BoldText
                        title={'No Address Found. Please add New Address'}
                        style={{color: colors.app_theme_dark_green}}
                      />
                    </View>
                  );
                }}
                renderItem={({item}) => renderAlsoAddCard(item)}
              />
            </View>
          </View>
          {/**+ Add New Address selection */}
          <View style={styles.btnSection}>
            <View>
              <TouchableOpacity
                onPress={props.onPressAddAddress}
                style={styles.addMemberSection}>
                <BoldText
                  style={styles.addMemberText}
                  title={'+ Add New Address'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </CModal>
  );
};
