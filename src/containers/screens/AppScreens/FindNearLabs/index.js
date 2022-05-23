import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  Platform,
  Image,
  Linking,
  AppState,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import styles from './style';
import {
  FindNearLabCard,
  Loader,
  MainContainer,
  SearchHeader,
  Toast,
} from '../../../components';
import {useEffect} from 'react';
import NetworkRequestBlal, {
  blalMethod,
  blalServicesPoints,
} from '../../../../services/NetworkRequestBlal';
import imagesConstants from '../../../../constants/imagesConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {openSettings, PERMISSIONS, request} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import {BoldText, RegularText} from '../../../components/Common';
import {SubmitButton} from '../../../components/Buttons';
import colors from '../../../../constants/colors';

const index = ({navigation}) => {
  const [aState, setAppState] = useState(AppState.currentState);
  const [nearsLabs, setNearLabs] = useState([]);
  const [loader, setLoader] = useState(true);
  const [cityId, setCityId] = useState('');
  const [panelId, setPanelId] = useState('');
  const [searchText, setSearchText] = useState(true);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [currentLocation, setCurrentLocation] = useState(false);

  const renderCard = item => {
    return <FindNearLabCard data={item} />;
  };

  // useEffect(() => {
  //   const appStateListener = AppState.addEventListener(
  //     'change',
  //     nextAppState => {
  //       getCurrentLocation(0);
  //     },
  //   );
  //   return () => {
  //     appStateListener?.remove();
  //   };
  // }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getCurrentLocation(0);
    });
    return unsubscribe;
  }, [navigation]);

  async function getCurrentLocation(val) {
    // request(
    //   Platform.select({
    //     android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    //     ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    //   }),
    // )
    //   if (response == 'granted') {
    //     Geolocation.getCurrentPosition(
    //       position => {
    //         setCurrentLocation(true);

    //         setLatitude(position.coords.latitude.toString());
    //         setLongitude(position.coords.longitude.toString());
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

    // setLoader(true);

    if (Platform.OS === 'ios') {
      const openSetting = () => {
        Linking.openSettings().catch(() => {
          Alert.alert('Unable to open settings');
        });
      };
      const status = await Geolocation.requestAuthorization('whenInUse');
      if (status === 'granted') {
        setUserLocation();
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

        Alert.alert(
          'Allow Blal to use your location to use your current location.',
          '',
          [
            {text: 'Go to Settings', onPress: openSettings},
            {text: "Don't Use Location", onPress: () => {}},
          ],
        );
      } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        Toast('Location permission revoked by user.', 0);
        setLoader(false);
        Alert.alert(
          'Allow Blal to use your location to use your current location.',
          '',
          [
            {text: 'Go to Settings', onPress: openSettings},
            {text: "Don't Use Location", onPress: () => {}},
          ],
        );
      }
    }
  }

  const success = pos => {
    const crd = pos.coords;
    setLatitude(crd.latitude);
    setLongitude(crd.longitude);
    setCurrentLocation(true);
  };

  const error = err => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  const setUserLocation = async () => {
    Geolocation.getCurrentPosition(success, error, {
      showLocationDialog: true,
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 0,
    });
  };

  useEffect(() => {
    if (latitude) {
      getCityPanelId();
    }
  }, [latitude]);

  useEffect(() => {
    if (cityId) {
      getNearLabs();
    }
  }, [cityId]);
  const getCityPanelId = async () => {
    let city = await AsyncStorage.getItem('cityId');
    let panel = await AsyncStorage.getItem('panelId');

    await setCityId(city);
    await setPanelId(panel);
  };

  const getNearLabs = async val => {
    var data = {
      id: cityId,
      lat: latitude,
      lon: longitude,
      SearchKeyword: val,
    };

    let requestConfig = {};
    if (!val) {
      requestConfig = {
        method: blalMethod.post,
        data: data,
        url: `${blalServicesPoints.blalUserServices.findNearLabs}?id=${data.id}&lat=${data.lat}&lon=${data.lon}`,
      };
    } else {
      requestConfig = {
        method: blalMethod.post,
        data: data,
        url: `${blalServicesPoints.blalUserServices.findNearLabs}?id=${data.id}&lat=${data.lat}&lon=${data.lon}&SearchKeyword=${data.SearchKeyword}`,
      };
    }

    const response = await NetworkRequestBlal(requestConfig);
    if (response) {
      const {status_Code} = response;
      if (status_Code === 200) {
        setNearLabs(response.data);
        setLoader(false);
      } else {
        setLoader(false);
      }
    }
  };

  const setSearchValue = async val => {
    await setSearchText(val);

    getNearLabs(val);
  };

  const onAgainCurrenLocation = () => {
    getCurrentLocation();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <SearchHeader
        onBack={() => navigation.goBack()}
        cartVisible={false}
        placeholderText={'Search for the nearby labs'}
        value={searchText}
        onPressFilter={() => navigation.navigate('NearByLabFilter')}
        filterVisible={true}
        onChangeText={val => setSearchValue(val)}
        title={'Find Nearby Labs'}
      />
      <MainContainer>
        {currentLocation ? (
          <View style={[styles.mainContainerSearched]}>
            <View style={styles.listSection}>
              <FlatList
                data={nearsLabs}
                showsVerticalScrollIndicator={false}
                extraData={nearsLabs}
                ListEmptyComponent={() => {
                  return (
                    <View
                      style={{
                        height: '100%',

                        paddingTop: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <BoldText
                        title={"No Lab's Found"}
                        style={{
                          color: colors.app_theme_dark_green,
                          alignSelf: 'center',
                        }}
                      />
                    </View>
                  );
                }}
                renderItem={({item}) => renderCard(item)}
              />
            </View>
          </View>
        ) : (
          <View style={[styles.mainContainerSearched]}>
            {!loader ? (
              <View style={styles.locationOff}>
                <Image source={imagesConstants.locationOff} />

                <View style={styles.innerPart}>
                  <RegularText
                    style={styles.locationText}
                    title={
                      'Your Current Location is Off. Please Add Your Location'
                    }
                  />
                  <SubmitButton
                    style={{marginTop: 20}}
                    onPress={() => getCurrentLocation(1)}
                    title={'Allow Location'}
                  />
                </View>
              </View>
            ) : null}
          </View>
        )}
      </MainContainer>
      <Loader display={loader} />
    </SafeAreaView>
  );
};

export default index;
