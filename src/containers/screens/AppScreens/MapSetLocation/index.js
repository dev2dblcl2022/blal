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
import {GoogleMapApiKey} from '../../../../config/Setting';
<Image style={styles.profilePic} source={imagesConstants.flask} />;
const index = ({navigation, route}) => {
  const type = route.params.type;
  const {addressLabel, location, signOut} = React.useContext(AuthContext);

  const mapRef = useRef(null);
  const [locationError, setLocationError] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [currentLocation, setCurrentLocation] = useState(false);
  const [locationLabel, setLocation] = useState('');
  const [city, setCity] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [loader, setLoader] = useState('');
  const [longitude, setLongitude] = useState(null);
  const [currentLocVisible, setCurrentLocVisible] = useState(true);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const onConfirmLocation = () => {
    check_PinCode();
  };

  const check_PinCode = async () => {
    location('1');
    try {
      setLoader(true);
      let data = {
        pincode: pinCode,
        CityName: city,
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
          await AsyncStorage.setItem('LocationStatus', '1');
          if (type === '1') {
            addressLabel(locationLabel);

            await AsyncStorage.setItem(
              'cityId',
              response.data.CityId.toString(),
            );
            await AsyncStorage.setItem(
              'panelId',
              response.data.Panel_ID.toString(),
            );
            if (response?.data?.isHomeCollection) {
              Toast(response.message, 1);
            } else {
              Toast(response.message, 1);
            }

            navigation.pop();
          } else {
            navigation.navigate('AddNewAddress', {
              lat: latitude,
              long: longitude,
            });
          }
        } else {
          Toast(response.message, 0);
          // location('0');
          await AsyncStorage.setItem('LocationStatus', '0');

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

  const getZipCode = async details => {
    let data = details.results[0] || [];
    for (let i = 0; i < data.address_components.length; i++) {
      for (let j = 0; j < data.address_components[i].types.length; j++) {
        if (data.address_components[i].types[j] === 'postal_code') {
          var add_zipCode = data.address_components[i].long_name;

          await setPinCode(add_zipCode);
        }
      }
    }
  };
  const success = pos => {
    const crd = pos.coords;
    setLatitude(crd.latitude);
    setLongitude(crd.longitude);
    setCurrentLocation(true);
    getLocationName(pos, 0);
  };
  const error = err => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };
  async function getCurrentLocation() {
    request(
      Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      }),
    ).then(response => {
      if (response === 'granted') {
        Geolocation.getCurrentPosition(success, error, {
          showLocationDialog: true,
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 0,
        });
      }
    });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <DefaultHeader
        onBack={() => navigation.goBack()}
        title={'Set Location'}
      />
      <View style={styles.mainContainer}>
        <View style={{flex: 0.8}}>
          {latitude ? (
            <MapView
              ref={mapRef}
              key={GoogleMapApiKey}
              style={styles.mapStyle}
              initialRegion={{
                latitude: latitude ? latitude : 26.855451,
                longitude: longitude ? longitude : 75.820374,
                latitudeDelta: 0,
                longitudeDelta: 0,
              }}
              onRegionChangeComplete={region => {
                setLatitude(region.latitude);
                setLongitude(region.longitude);
                getLocationName(region, 1);
              }}
            />
          ) : (
            <></>
          )}
          <View
            style={{
              position: 'absolute',
              alignSelf: 'center',
              top: hp('32%'),
            }}>
            <Image source={imagesConstants.location} />
          </View>
        </View>
        <View style={{flex: 0.2}}>
          <TouchableOpacity
            onPress={getCurrentLocationAgain}
            style={styles.myLocation}>
            <Image
              style={styles.myLocationImg}
              source={imagesConstants.mylocation}
            />
          </TouchableOpacity>
          <SelectLocation
            onConfirmLocation={() => onConfirmLocation()}
            location={locationLabel}
            currentLocVisible={currentLocVisible}
            navigation={navigation}
          />
        </View>
      </View>
      <Loader display={loader} />
    </SafeAreaView>
  );

  async function getCurrentLocationAgain() {
    request(
      Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      }),
    ).then(response => {
      if (response === 'granted') {
        Geolocation.getCurrentPosition(
          position => {
            setCurrentLocation(true);

            mapRef.current.animateCamera({
              center: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              },
            });

            getLocationName(position, 0);
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
