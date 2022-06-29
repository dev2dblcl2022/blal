import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';

import styles from './style';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {DefaultHeader, Loader} from '../../../components';
import {BoldText, RegularText} from '../../../components/Common';
import {CancelButton, SubmitButton} from '../../../components/Buttons';
import DropDownPicker from 'react-native-dropdown-picker';
import imagesConstants from '../../../../constants/imagesConstants';
import colors from '../../../../constants/colors';
import {method} from 'lodash';
import NetworkRequest from '../../../../services/NetworkRequest';
import NetworkRequestBlal, {
  blalMethod,
  blalServicesPoints,
} from '../../../../services/NetworkRequestBlal';
import {PERMISSIONS, request} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

const index = ({navigation, route}) => {
  const [loader, setLoader] = useState(false);

  const [stateOpen, setStateOpen] = useState(false);
  const [stateValues, setSatateValues] = useState('');

  const [cityOpens, setCityOpens] = useState(false);
  const [cityValues, setCityValues] = useState('');

  const [facilityOpen, setFacilityOpen] = useState(false);
  const [facilityValue, setFacilityValue] = useState('');

  const [getState, setGetState] = useState([]);
  const [getCity, setGetCity] = useState([]);
  const [getFacility, setGetFacility] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const onResetFilter = async () => {
    // setDateStart('Start Date');
    // setDateEnd('End Date');
    await AsyncStorage.removeItem('startDate');
    await AsyncStorage.removeItem('endDate');
    navigation.pop();
  };

  useEffect(() => {
    getFilterData();
  });

  const getFilterData = async () => {
    let startDate = await AsyncStorage.getItem('startDate');
    let endDate = await AsyncStorage.getItem('endDate');
  };

  // const onApplyFilter = async () => {
  //   // if (!fullDateEnd || !fullDateStart) {
  //   //   Toast('Please select any date', 0);
  //   // } else {
  //   //   let startDate = fullDateStart;
  //   //   let endDate = fullDateEnd;

  //   //   await AsyncStorage.setItem('startDate', startDate);
  //   //   await AsyncStorage.setItem('endDate', endDate);

  //   navigation.goBack();
  // };
  const success = pos => {
    const crd = pos.coords;

    setLatitude(crd.latitude);
    setLongitude(crd.longitude);
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
  const fetchState = async () => {
    const requestConfig = {
      method: blalMethod.post,
      url: blalServicesPoints.blalUserServices.getState,
    };

    const response = await NetworkRequestBlal(requestConfig);
    if (response) {
      const {status_Code} = response;
      if (status_Code === 200) {
        setGetState(response.data);
      }
    }
  };

  const onApplyFilter = async () => {
    navigation.navigate('FindNearLabs', {
      id: cityValues,
      StateId: stateValues,
      FacilityId: facilityValue,
    });
  };
  const fetchCity = async () => {
    const requestConfig = {
      method: blalMethod.post,
      url: `${blalServicesPoints.blalUserServices.getCity}?StateId=${stateValues}`,
    };

    const response = await NetworkRequestBlal(requestConfig);
    if (response) {
      const {status_Code} = response;
      if (status_Code === 200) {
        setGetCity(response.data);
      }
    }
  };
  const fetchFacility = async () => {
    const requestConfig = {
      method: blalMethod.post,
      url: blalServicesPoints.blalUserServices.getFacility,
    };

    const response = await NetworkRequestBlal(requestConfig);
    if (response) {
      const {status_Code} = response;
      if (status_Code === 200) {
        setGetFacility(response.data);
      }
    }
  };

  useEffect(() => {
    fetchState();
  }, []);
  // useEffect(() => {
  //   fetchCity();
  // }, []);
  useEffect(() => {
    fetchFacility();
  }, []);
  useEffect(() => {
    getCurrentLocation();
  }, []);
  useEffect(() => {
    if (stateValues) {
      fetchCity();
    }
  }, [stateValues]);
  return (
    <SafeAreaView style={styles.safeArea}>
      <DefaultHeader onBack={() => navigation.goBack()} title={'Filter'} />

      <View style={styles.mainContainer}>
        <View style={styles.dropDownSections}>
          <View style={[styles.dropDownView]}>
            <DropDownPicker
              schema={{
                label: 'State',
                value: 'Id',
              }}
              open={stateOpen}
              placeholder="Select State"
              value={stateValues}
              placeholderStyle={{color: colors.purplishGrey}}
              style={{borderColor: colors.purplishGrey, borderWidth: 1}}
              dropDownContainerStyle={styles.dropDownContainer}
              items={getState}
              setOpen={setStateOpen}
              setValue={setSatateValues}
              zIndex={3000}
            />
          </View>

          <View style={styles.dropDownView}>
            <DropDownPicker
              schema={{
                label: 'CityName',
                value: 'CentreID',
              }}
              open={cityOpens}
              placeholder="Select City"
              value={cityValues}
              placeholderStyle={{color: colors.purplishGrey}}
              style={{borderColor: colors.purplishGrey, borderWidth: 1}}
              dropDownContainerStyle={styles.dropDownContainer}
              items={getCity}
              setOpen={setCityOpens}
              setValue={setCityValues}
              zIndex={2000}
            />
          </View>

          <View style={styles.dropDownView}>
            <DropDownPicker
              schema={{
                label: 'Facility',
                value: 'Id',
              }}
              open={facilityOpen}
              placeholder="Select Facility"
              placeholderStyle={{color: colors.purplishGrey}}
              value={facilityValue}
              style={{borderColor: colors.purplishGrey, borderWidth: 1}}
              items={getFacility}
              dropDownContainerStyle={styles.dropDownContainer}
              setOpen={setFacilityOpen}
              setValue={setFacilityValue}
              zIndex={1000}
            />
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <CancelButton
            onPress={onResetFilter}
            style={styles.btn}
            title={'Reset Filter'}
          />
          <SubmitButton
            disabled={
              !stateValues || !cityValues || !facilityValue ? true : false
            }
            onPress={onApplyFilter}
            style={styles.btn}
            title={'Apply Filter'}
          />
        </View>
      </View>
      <Loader display={loader} />
    </SafeAreaView>
  );
};

export default index;
