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
import {
  check,
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';
import styles from './style';

import DefaultHeader from '../../../components/DefaultHeader';
import {BoldText, RegularText} from '../../../components/Common';
import colors from '../../../../constants/colors';
import imagesConstants from '../../../../constants/imagesConstants';
import MapView, {Marker} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import MapPinCode from '../../../components/MapPinCode';
import MapLocationAddress from '../../../components/MapLocationAddress';

const index = ({navigation}) => {
  const mapRef = useRef(null);
  const [locationError, setLocationError] = useState('');
  const [currentLocation, setCurrentLocation] = useState(false);
  const [location, setLocation] = useState('');
  const [city, setCity] = useState('');
  const [latitiude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [pinCodeVisible, setPinCodeVisible] = useState(false);
  const [mapSelectionVisible, setMapSelectionVisible] = useState(true);

  const onMapReady = () => {
    getCurrentLocation();
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainContainer}>
        <DefaultHeader onBack={() => navigation.goBack()} bgHeader={false} />
        <MapView
          ref={mapRef}
          onMapReady={() => onMapReady()}
          style={styles.mapStyle}
          initialRegion={{
            latitude: 26.8552714,
            longitude: 75.8147654,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          // customMapStyle={mapStyle}
        >
          <MapView.Marker
            pinColor={'green'}
            draggable
            coordinate={{
              latitude: 26.8552714,
              longitude: 75.8147654,
            }}
            onDragEnd={e => alert(JSON.stringify(e.nativeEvent.coordinate))}
            title={'Current Location'}
            description={'This is your current location'}
          />
        </MapView>
      </View>

      <MapPinCode pincodevisible={pinCodeVisible} navigation={navigation} />
      <MapLocationAddress
        mapSelectionVisible={mapSelectionVisible}
        navigation={navigation}
      />
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
            setCurrentLocation(true);

            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);

            //getLocationName(position);
          },
          {enableHighAccuracy: true, timeout: 10000, maximumAge: 10000},
        );
      }
    });
  }

  function getLocationName(data) {
    Geocoder.init('AIzaSyCND8PJ9I8owZK2ExaucnB-A6blMs2FQwY');
    Geocoder.from(data.coords.latitude, data.coords.longitude)
      .then(json => {
        var addressComponent = json.results[0].formatted_address;

        setLocation(addressComponent);
      })
      .catch(error => console.warn(error));
  }
};

export default index;
