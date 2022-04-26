import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import {
  check,
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';
import styles from './style';

import DefaultHeader from '../../../components/DefaultHeader';

import imagesConstants from '../../../../constants/imagesConstants';
import MapView, {Marker} from 'react-native-maps';

import SelectLocation from '../../../components/SelectLocation';
import {AuthContext} from '../../../../../context/context';
import {Loader, Toast} from '../../../components';
import NetworkRequest, {
  method,
  servicesPoints,
} from '../../../../services/NetworkRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BoldText, RegularText} from '../../../components/Common';
import colors from '../../../../constants/colors';
import {SubmitButton} from '../../../components/Buttons';
import {GoogleMapApiKey} from '../../../../config/Setting';
<Image style={styles.profilePic} source={imagesConstants.flask} />;
const index = ({navigation}) => {
  const [loader, setLoader] = useState(false);
  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [locationTouched, setLocationTouched] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [city, setCity] = useState('');
  const [eventTypeOpen, setEventTypeOpen] = useState(false);
  const [eventTime, setEvevntTime] = useState('');
  let lat = 0;
  let long = 0;
  const containerViewRef = useRef(null);
  const getZipCode = details => {
    setCity(details.address_components[1].short_name);
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <DefaultHeader
        onBack={() => navigation.goBack()}
        title={'Select Location'}
      />
      <View style={styles.mainContainer}>
        <View>
          <BoldText
            style={{
              fontWeight: 'bold',
              fontSize: hp('2.5%'),
              color: colors.app_theme_dark_green,
            }}
            title={'Select your location'}
          />
          <RegularText
            style={{
              fontSize: hp('2%'),
              marginTop: hp('1%'),
              color: colors.purplishGrey,
            }}
            title={'Add new Address that you wish to  have'}
          />
          <View style={{marginTop: hp('2%')}}>
            <ScrollView keyboardShouldPersistTaps="always">
              <GooglePlacesAutocomplete
                fetchDetails={true}
                returnKeyType={'next'}
                blurOnSubmit={false}
                onSubmitEditing={v => this._focusInput('zipCode')}
                placeholder="Search Location"
                placeholderTextColor="rgba(0,0,0,0.47)"
                renderRow={rowData => {
                  const title = rowData.structured_formatting.main_text;
                  const address = rowData.structured_formatting.secondary_text;
                  return (
                    <View>
                      <RegularText
                        style={{fontSize: 14, color: 'black'}}
                        title={address}
                      />
                    </View>
                  );
                }}
                onPress={(data, details = null) => {
                  lat = details.geometry.location.lat;
                  long = details.geometry.location.lng;
                }}
                styles={{
                  container: {
                    borderColor: 'rgba(0,0,0,0.21)',
                    borderRadius: 5,

                    marginTop: hp('2%'),
                    marginVertical: hp('1%'),
                  },

                  textInputContainer: {
                    backgroundColor: colors.gray,
                    height: hp('5%'),

                    borderWidth: 1,

                    borderColor: 'rgba(0,0,0,0.74)',
                    borderRadius: 4,
                  },
                  textInput: {
                    margin: hp('0.5%'),
                    height: hp('4%'),
                    color: 'black',
                    alignSelf: 'center',
                    borderWidth: 0,

                    fontSize: hp('1.8%'),
                  },
                  listView: {
                    height: 160,

                    borderColor: 'rgba(0,0,0,0.27)',
                    borderWidth: 1,
                    borderTopWidth: 0,
                  },
                  predefinedPlacesDescription: {
                    borderWidth: 0,
                  },
                }}
                query={{
                  components: 'country:in',
                  // key: 'AIzaSyDqYK_ft6HuLRC1QdW5Eiw142gAVLQc-MU' /*Manoj ji key*/,
                  key: GoogleMapApiKey,
                  language: 'en',
                }}
              />
              {/* <GooglePlacesAutocomplete
                placeholder="Enter the location..."
                autoFocus
                returnKeyType={'search'}
                fetchDetails={true}
                renderDescription={row => row.description} // custom description render
                onPress={(data, details = null) => {
                  console.log('data is', data);
                  // for (let zip of details.address_components) {
                  //   if (zip.types[0] === 'postal_code') {
                  //     setZipCode(zip.long_name);
                  //   }
                  //   if (zip.types[0] === 'country') {
                  //     setCountryName(zip.long_name);
                  //     setCountryCode(zip.short_name);
                  //   }
                  //   if (zip.types[0] === 'administrative_area_level_1') {
                  //     setStateName(zip.long_name);
                  //     setStateCode(zip.short_name);
                  //   }
                  //   if (zip.types[0] === 'administrative_area_level_2') {
                  //     setCityName(zip.long_name);
                  //   }
                  //   if (zip.types[0] === 'locality') {
                  //     setLocality(zip.long_name);
                  //   }
                  //   if (zip.types[0] === 'sublocality_level_1') {
                  //     setAreaName(zip.long_name);
                  //   }
                  // }

                  // let coordinates = {};
                  // coordinates['latitude'] = details.geometry.location.lat;
                  // coordinates['longitude'] = details.geometry.location.lng;

                  // let tempData = {
                  //   latitude: details.geometry.location.lat,
                  //   longitude: details.geometry.location.lng,
                  //   address: data.description,
                  //   coordinates: coordinates,
                  //   zipCode: zipCode,
                  //   countryName: countryName,
                  //   stateName: stateName,
                  //   cityName: cityName,
                  //   locality: locality,
                  //   area: areaName,
                  //   countryCode: countryCode,
                  //   stateCode: stateCode,
                  // };
                  // onSelectAddress(tempData);
                }}
                query={{
                  key: 'AIzaSyBeaczttyEMOaYJ4M6EVyqpAcuDZazbyjg',
                  types: 'geocode', // default: 'geocode'
                }}
                textInputProps={{placeholderTextColor: colors.black}}
                styles={{
                  listView: styles.listView,
                  textInputContainer: styles.textInputContainer,
                  textInput: styles.textInput,
                }}
                nearbyPlacesAPI="GooglePlacesSearch"
              /> */}
            </ScrollView>
          </View>
          <View style={{marginTop: hp('3%')}}>
            <SubmitButton
              onPress={() => {
                if ((lat === 0) & (long === 0)) {
                  Toast('Please select location first!');
                } else {
                  navigation.navigate('AddNewAddress', {
                    lat: lat,
                    long: long,
                  });
                }
              }}
              title={'Submit'}
            />
          </View>
        </View>
      </View>
      <Loader display={loader} />
    </SafeAreaView>
  );

  async function getCurrentLocation() {
    request(
      Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      }),
    ).then(response => {
      if (response == 'granted') {
        Geolocation.getCurrentPosition(
          position => {
            // setCurrentLocation(true);

            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);

            getLocationName(position, 0);
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 10000, maximumAge: 10000},
        );
      }
    });
  }

  function getLocationName(data, val) {
    Geocoder.init('AIzaSyBvrwNiJMMmne5aMGkQUMCpb-rafOYdT4g');
    Geocoder.from(
      val === 0 ? data.coords.latitude : data.latitude,
      val === 0 ? data.coords.longitude : data.longitude,
    )
      // Geocoder.from(data.coords.latitude, data.coords.longitude)
      .then(json => {
        var addressComponent = json.results[0].formatted_address;

        let data = json.results[0] || [];
        for (let i = 0; i < data.address_components.length; i++) {
          for (let j = 0; j < data.address_components[i].types.length; j++) {
            let dummyCity = '';
            if (
              data.address_components[i].types[j] ===
              'administrative_area_level_2'
            ) {
              dummyCity = data.address_components[i].long_name;

              setCity(dummyCity);
            }
          }
        }

        setLocation(addressComponent);
        getZipCode(json);
      })
      .catch(error => console.warn(error));
  }
};

export default index;
