import React, {
  useEffect,
  useRef,
  useState,
  useReducer,
  useContext,
} from 'react';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import {
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Platform,
  Alert,
  TouchableOpacity,
  Modal,
  Text,
  DeviceEventEmitter,
} from 'react-native';
import {AuthContext} from '../../../../../context/context';
import {UserContext} from '../../../../../context/context';
import Carousel, {ParallaxImage, Pagination} from 'react-native-snap-carousel';
import {
  BlogsVideoGalleryCard,
  FindNearLabBtn,
  HealthPackageCard,
  HomeEnterPinCodeModal,
  HomeHeader,
  HomeHorizontalList,
  HomeSectionOne,
  HomeSelectAddressModal,
  Loader,
  NewsEventCard,
  TestByBodyPartsCard,
  TestByConditionCard,
  Toast,
  WebView,
  WhyDrBlalCard,
} from '../../../components';
import styles from './style';
import {DEV_HEIGHT, DEV_WIDTH} from '../../../components/Device/DeviceDetails';
import {DrawerActions} from '@react-navigation/routers';
import NetworkRequest, {
  method,
  servicesPoints,
} from '../../../../services/NetworkRequest';

import NetworkRequestBlal, {
  blalMethod,
  blalServicesPoints,
} from '../../../../services/NetworkRequestBlal';
import {
  Blal_City_Id,
  Blal_Panel_Id,
  DefaultLongitude,
  DefaultLatitude,
} from '../../../../config/Setting';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PERMISSIONS, request} from 'react-native-permissions';
import axios from 'axios';
import imagesConstants from '../../../../constants/imagesConstants';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {isAsyncFunction} from 'util/types';
const condition = DEV_HEIGHT >= 926;

const index = ({navigation}) => {
  DeviceEventEmitter.addListener('netConnected', async e => {
    callAllHomeApi(); // do something
  });
  DeviceEventEmitter.addListener('notificationCome', async e => {
    getNotificationCount(); // do something
  });

  const {addressLabel, signOut, location} = useContext(AuthContext);
  const userDetails = useContext(UserContext);
  const [latitude, setLatitude] = useState(0);
  const [cityName, setCityName] = useState('');
  const [longitude, setLongitude] = useState(0);
  const [currentLocation, setCurrentLocation] = useState(false);
  const [locationName, setLocationName] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);
  const [whyDrBlal, setWhyDrBlal] = useState([]);

  const [homePinCodeModal, setHomePinCodeModal] = useState(false);
  const [pinCode, setPincode] = useState('');
  const [panelId, setPanelId] = useState(Blal_Panel_Id);
  const [cityId, setCityId] = useState(Blal_City_Id);
  const [headerAddressLabel, setAddressLabel] = useState('');
  const [userToken, setUserToken] = useState('GuestUser');
  const [homeSelectAddress, setHomeSelectAddress] = useState(false);
  const [loader, SetLoader] = useState(false);
  const [mapSelectionVisible, setMapSelectionVisible] = useState(false);
  const [mapPinCodeVisible, setMapPinCodeVisible] = useState(false);
  const carouselRef = useRef(null);
  const [banners, setBanners] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [entries, setEntries] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [testByList, setTestByList] = useState([
    {name: 'Full checkup of Body'},
    {name: 'Heart Disease'},
    {name: 'Anemia'},
    {name: 'Blood Disease'},
    {name: 'Pregnacny'},
    {name: 'Thyroid'},
  ]);
  const [testByCondition, setTestByCondition] = useState([]);
  const [testByBodyParts, setTestByBodyPart] = useState([]);
  const [healthPackages, setHealthPackages] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [trackingUrl, setTrackingUrl] = useState('');
  const [state, dispatch] = useReducer();
  const [newsEvent, setNewsEvent] = useState([]);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    let label = await AsyncStorage.getItem('LocationStatus');
    let user = await AsyncStorage.getItem('userToken');
    if (user === 'GuestUser') {
      let coords = {
        latitude: DefaultLatitude,
        longitude: DefaultLongitude,
      };
      getLocationNameDefaultMalviyaBlal(coords);
    } else {
      console.log('location is ', label);
      if (label === '0' || label === null) {
        getCurrentLocation();
      }
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      callAllHomeApi();
    });
    return unsubscribe;
  }, [navigation]);

  const callAllHomeApi = async () => {
    getLiveTracking();
    getAddresLabel();
    SetLoader(true);
    getHome_banners();
    getCartCount();
    getNotificationCount();
    getHealthPackages();
    getBlalAwards();
    getBlogs();
    getNewsEvent();
    getTestByBodyParts();
    getTestByCondition();
    if (Platform.OS === 'ios') {
      SetLoader(false);
    }
  };

  const getLiveTracking = async () => {
    try {
      const requestConfig = {
        method: method.get,
        url: servicesPoints.bookingServices.live_track,
      };
      const response = await NetworkRequest(requestConfig);

      if (response) {
        // const {data} = response;
        if (response?.data) {
          setTrackingUrl(response.data);
        } else {
          if (response === 'Network Error') {
            Toast('Network Error', 0);
            SetLoader(false);
          } else if (response.status === 401) {
            signOut();
          } else {
            null;
          }
          SetLoader(false);
        }
      }
    } catch (err) {
      SetLoader(false);
    }
  };

  const getCurrentLocation = () => {
    console.log('I am call');
    request(
      Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      }),
    )
      .then(response => {
        if (response === 'granted') {
          Geolocation.getCurrentPosition(
            position => {
              console.log('loc res', position);
              setCurrentLocation(true);

              setLatitude(position?.coords?.latitude.toString());
              setLongitude(position?.coords?.longitude.toString());
              // setLatitude('26.6966');
              // setLongitude('77.8908');

              // if (user === 'GuestUser') {
              //   SetLoader(true);
              //   let coords = {
              //     latitude: DefaultLatitude,
              //     longitude: DefaultLongitude,
              //   };
              //   getLocationNameDefaultMalviyaBlal(coords);
              // } else {
              //   checkStartingPincode(add_zipCode, cityName);
              // }

              getLocationName(position, 0);
            },
            error => {
              // See error code charts below.
              console.log(error.code, error.message);
            },
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 0},
          );
        } else {
          let coords = {
            latitude: DefaultLatitude,
            longitude: DefaultLongitude,
          };
          getLocationNameDefaultMalviyaBlal(coords, 0);
          // setStaticPanelId();
        }
      })
      .catch(err => console.log('Home Location catch err', err));
  };

  function getLocationNameDefaultMalviyaBlal(data) {
    Geocoder.init('AIzaSyBvrwNiJMMmne5aMGkQUMCpb-rafOYdT4g');
    Geocoder.from(data.latitude, data.longitude)

      .then(json => {
        let dummyCity = '';
        var addressComponent = json.results[0].formatted_address;
        let data = json.results[0] || [];
        for (let i = 0; i < data.address_components.length; i++) {
          for (let j = 0; j < data.address_components[i].types.length; j++) {
            if (
              data.address_components[i].types[j] ===
              'administrative_area_level_2'
            ) {
              dummyCity = data.address_components[i].long_name;
              // console.log('dummy city', dummyCity);
              // setCityName(dummyCity);
            }
          }
        }
        addressLabel(addressComponent);
        // setAddressLabel(addressComponent);

        setLocationName(addressComponent);
        getZipCode(json, dummyCity);
      })
      .catch(error => console.warn(error));
  }

  // const getCurrentLocation = async val => {
  // console.log('i am cal');
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

  //   if (Platform.OS === 'ios') {
  //     const openSetting = () => {
  //       Linking.openSettings().catch(() => {
  //         Alert.alert('Unable to open settings');
  //       });
  //     };
  //     const status = await Geolocation.requestAuthorization('whenInUse');
  //     if (status === 'granted') {
  //       setUserLocation();
  //     }

  //     if (status === 'denied') {
  //       Alert.alert(
  //         'Allow Blal to use your location to use your current location.',
  //         '',
  //         [
  //           {text: 'Go to Settings', onPress: openSetting},
  //           {text: "Don't Use Location", onPress: () => {}},
  //         ],
  //       );
  //     }

  //     if (status === 'disabled') {
  //       Alert.alert(
  //         'Turn on Location Services to allow to determine your location.',
  //         '',
  //         [
  //           {text: 'Go to Settings', onPress: openSetting},
  //           {text: "Don't Use Location", onPress: () => {}},
  //         ],
  //       );
  //     }
  //   } else {
  //     const hasPermission = await PermissionsAndroid.check(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //     );
  //     if (hasPermission) {
  //       setUserLocation();
  //     }
  //     const status = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //     );
  //     if (status === PermissionsAndroid.RESULTS.GRANTED) {
  //       setUserLocation();
  //     }
  //     if (status === PermissionsAndroid.RESULTS.DENIED) {
  //       Toast('Location permission denied by user.', 0);
  //       SetLoader(false);
  //     } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
  //       Toast('Location permission revoked by user.', 0);
  //       SetLoader(false);
  //     }
  //   }
  // };

  // const setUserLocation = async () => {
  //   Geolocation.getCurrentPosition(
  //     async position => {
  //       let _LAT = position.coords.latitude;
  //       let _LONG = position.coords.longitude;
  //       setLatitude(_LAT);
  //       setLongitude(_LONG);

  //       setCurrentLocation(true);

  //       //         setLatitude(position.coords.latitude.toString());
  //       //         setLongitude(position.coords.longitude.toString());
  //     },
  //     error => {
  //       console.log(error.message.toString());
  //     },
  //     {
  //       showLocationDialog: true,
  //       enableHighAccuracy: true,
  //       timeout: 20000,
  //       maximumAge: 0,
  //     },
  //   );
  // };

  const setStaticPanelId = async () => {
    await AsyncStorage.setItem('cityId', Blal_City_Id);
    await AsyncStorage.setItem('panelId', Blal_Panel_Id);
  };

  function getLocationName(data) {
    Geocoder.init('AIzaSyBvrwNiJMMmne5aMGkQUMCpb-rafOYdT4g');
    Geocoder.from(data.coords.latitude, data.coords.longitude)
      // Geocoder.from(26.6966, 77.8908)

      .then(json => {
        let dummyCity = '';
        var addressComponent = json.results[0].formatted_address;
        let data = json.results[0] || [];
        for (let i = 0; i < data.address_components.length; i++) {
          for (let j = 0; j < data.address_components[i].types.length; j++) {
            if (
              data.address_components[i].types[j] ===
              'administrative_area_level_2'
            ) {
              dummyCity = data.address_components[i].long_name;
              // console.log('dummy city', dummyCity);
              // setCityName(dummyCity);
            }
          }
        }
        addressLabel(addressComponent);
        setAddressLabel(addressComponent);

        setLocationName(addressComponent);
        getZipCode(json, dummyCity);
      })
      .catch(error => console.warn(error));
  }

  const getZipCode = async (details, cityName) => {
    // console.log('getZipCode  called');
    let data = details.results[0] || [];
    for (let i = 0; i < data.address_components.length; i++) {
      for (let j = 0; j < data.address_components[i].types.length; j++) {
        if (data.address_components[i].types[j] === 'postal_code') {
          var add_zipCode = data.address_components[i].long_name;

          await setPincode(add_zipCode);
          checkStartingPincode(add_zipCode, cityName);
        }
      }
    }
  };
  const checkStartingPincode = async (add_zipCode, cityName) => {
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
      console.log('Latest rewwww is', requestConfig);
      const response = await NetworkRequest(requestConfig);
      console.log('Latest Respons is', response);
      if (response) {
        const {success} = response;
        if (success) {
          setCityId(
            response.data.CityId
              ? response?.data?.CityId.toString()
              : Blal_City_Id,
          );
          setPanelId(
            response.data?.Panel_ID
              ? response?.data?.Panel_ID.toString()
              : Blal_Panel_Id,
          );
          // location('1');

          await AsyncStorage.setItem(
            'cityId',
            response?.data?.CityId.toString(),
          );
          await AsyncStorage.setItem(
            'panelId',
            response?.data?.Panel_ID.toString(),
          );
          await AsyncStorage.setItem('LocationStatus', '1');
        } else {
          console.log('Latest Respons is here', response);
          await AsyncStorage.setItem('LocationStatus', '0');
          let user = await AsyncStorage.getItem('userToken');

          if (user === 'GuestUser') {
            null;
          } else {
            // location('0');

            if (
              response.status === 400 ||
              response.message === 'Service not available for selected city.'
            ) {
              Alert.alert(
                `Service not available for current location`,
                `Please choose other current location or Add new Address`,
                [
                  {
                    text: 'Add New Address',
                    onPress: () =>
                      navigation.navigate('MyAddresses', {location: false}),
                  },
                  {
                    text: 'Current Location',
                    onPress: () =>
                      navigation.navigate('MyAddresses', {location: false}),
                  },
                ],
                {cancelable: false},
              );
            }
          }
          if (response === 'Network Error') {
            Toast('Network Error', 0);
            SetLoader(false);
          } else if (response.status === 401) {
            signOut();
          } else {
            null;
          }
          SetLoader(false);
        }
      }
    } catch (err) {
      SetLoader(false);
    }
  };

  const getAddresLabel = async () => {
    console.log('getAddresLabel');
    let label = await AsyncStorage.getItem('addressLabel');
    let storage_city_id = await AsyncStorage.getItem('cityId');
    let storage_panel_id = await AsyncStorage.getItem('panelId');
    let user = await AsyncStorage.getItem('userToken');
    setUserToken(user);
    setAddressLabel(label?.toString());
    setCityOrPanelIds(storage_city_id, storage_panel_id);
  };

  const setCityOrPanelIds = (val, data) => {
    setCityId(val?.toString());
    setPanelId(data?.toString());
  };

  const getHome_banners = async () => {
    console.log('getHome_banners');
    try {
      const requestConfig = {
        method: method.get,
        url: servicesPoints.userServices.home_banners,
      };
      const response = await NetworkRequest(requestConfig);

      if (response) {
        const {success} = response;
        if (success) {
          setBanners(response.data);
        } else {
          if (response === 'Network Error') {
            Toast('Network Error', 0);
            SetLoader(false);
          } else if (response.status === 401) {
            signOut();
          } else {
            null;
          }
          SetLoader(false);
        }
      }
    } catch (err) {
      SetLoader(false);
    }
  };
  const getCartCount = async () => {
    console.log('getCartCount');
    try {
      const requestConfig = {
        method: method.get,
        url: servicesPoints.bookingServices.cartCount,
      };

      const response = await NetworkRequest(requestConfig);

      if (response) {
        const {success} = response;
        if (success) {
          setCartCount(response.data?.count);
        } else {
          if (response === 'Network Error') {
            Toast('Network Error', 0);
            SetLoader(false);
          } else if (response.status === 401) {
            signOut();
          } else {
            null;
          }
          SetLoader(false);
        }
      }
    } catch (err) {
      SetLoader(false);
    }
  };
  const getNotificationCount = async () => {
    console.log('getNotificationCount');
    try {
      const requestConfig = {
        method: method.get,
        url: servicesPoints.userServices.notification_count,
      };

      const response = await NetworkRequest(requestConfig);

      if (response) {
        const {success} = response;
        if (success) {
          setNotificationCount(response?.data);
        } else {
          if (response === 'Network Error') {
            Toast('Network Error', 0);
            SetLoader(false);
          } else if (response.status === 401) {
            signOut();
          } else {
            null;
          }
          SetLoader(false);
        }
      }
    } catch (err) {
      SetLoader(false);
    }
  };
  const getHealthPackages = async () => {
    console.log('getHealthPackages');
    try {
      let data = {
        PanelId: panelId,
        CityId: cityId,
        Type: 'Package',
      };
      const requestConfig = {
        method: blalMethod.post,
        data: data,
        url: `${blalServicesPoints.blalUserServices.packages}?PanelId=${data.PanelId}&CityId=${data.CityId}&Type=${data.Type}`,
      };
      const response = await NetworkRequestBlal(requestConfig);

      if (response) {
        const {status_Code} = response;
        if (status_Code === 200) {
          setHealthPackages(response.data);
        } else {
        }
      }
    } catch (err) {
      SetLoader(false);
    }
  };
  const getBlalAwards = async () => {
    console.log('getBlalAwards');
    try {
      const requestConfig = {
        method: method.get,

        url: `${servicesPoints.commonServices.why_choose_blal_lab}`,
      };
      // console.log('rq', requestConfig);
      const response = await NetworkRequest(requestConfig);
      // console.log('rs', response);
      if (response) {
        const {success} = response;
        if (success) {
          setWhyDrBlal(response.data?.values);
        } else {
          if (response === 'Network Error') {
            Toast('Network Error', 0);
            SetLoader(false);
          } else if (response.status === 401) {
            signOut();
          } else {
            null;
          }
          SetLoader(false);
        }
      }
    } catch (err) {
      SetLoader(false);
    }
  };
  const getBlogs = async () => {
    console.log('getBlogs');
    try {
      const requestConfig = {
        method: method.get,

        url: `${servicesPoints.blogs.home_blogs}`,
      };
      // console.log('rq', requestConfig);
      const response = await NetworkRequest(requestConfig);
      // console.log('rs of blogs', response);
      if (response) {
        const {success} = response;
        if (success) {
          setBlogs(response.data);
        } else {
          if (response === 'Network Error') {
            Toast('Network Error', 0);
            SetLoader(false);
          } else if (response.status === 401) {
            signOut();
          } else {
            null;
          }
          SetLoader(false);
        }
      }
    } catch (err) {
      SetLoader(false);
    }
  };
  const getNewsEvent = async () => {
    console.log('getNewsEvent');
    try {
      const requestConfig = {
        method: method.get,

        url: `${servicesPoints.commonServices.news_events_list}`,
      };
      // console.log('rq', requestConfig);
      const response = await NetworkRequest(requestConfig);
      // console.log('rs of newsEvent', response);
      if (response) {
        const {success} = response;
        if (success) {
          setNewsEvent(response.data?.docs);
        } else {
          if (response === 'Network Error') {
            Toast('Network Error', 0);
            SetLoader(false);
          } else if (response.status === 401) {
            signOut();
          } else {
            null;
          }
          SetLoader(false);
        }
      }
    } catch (err) {
      SetLoader(false);
    }
  };
  const getTestByBodyParts = async () => {
    console.log('getTestByBodyParts');
    try {
      let data = {
        limit: 10,
      };
      const requestConfig = {
        method: blalMethod.post,

        url: `${blalServicesPoints.blalUserServices.GetBodyParts}`,
      };
      const response = await NetworkRequestBlal(requestConfig);

      if (response) {
        const {status_Code} = response;
        if (status_Code === 200) {
          setTestByBodyPart(response.data);
        } else {
        }
      }
    } catch (err) {
      SetLoader(false);
    }
  };

  const getTestByCondition = async () => {
    console.log('getTestByCondition');
    try {
      let data = {
        limit: 6,
      };
      const requestConfig = {
        method: blalMethod.post,

        url: `${blalServicesPoints.blalUserServices.GetTestCondition}?Limit=${data.limit}`,
      };
      const response = await NetworkRequestBlal(requestConfig);

      if (response) {
        const {status_Code} = response;
        if (status_Code === 200) {
          // console.log('city ID , pansel id', cityId, panelId);
          setTestByCondition(response.data);
          SetLoader(false);
        } else {
          SetLoader(false);
        }
      }
    } catch (error) {
      SetLoader(false);
    }
  };

  const onGetCityName = async () => {
    // SetLoader(true);
    setHomePinCodeModal(false);
    // var axios = require('axios');

    // var config = {
    //   method: 'get',
    //   url: `http://www.postalpincode.in/api/pincode/${pinCode}`,
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // };

    // axios(config)
    //   .then(function (response) {
    //     console.log('asd', JSON.stringify(response.data));
    //     // console.log('city', JSON.stringify(response?.PostOffice[0].Circle));
    //     console.log('data city', response.data.PostOffice[0].Circle);
    //     let val = '';
    //     if (response.data.PostOffice[0].District === 'Bhilwara') {
    //       val = response.data.PostOffice[0].District;
    //     } else {
    //       val = response.data.PostOffice[0].Circle;
    //     }
    //     checkPincode(val);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    Geocoder.init('AIzaSyBvrwNiJMMmne5aMGkQUMCpb-rafOYdT4g');
    Geocoder.from(pinCode)
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

        console.log('selectedCity is', selectedCity);
        checkPincode(selectedCity);
      })
      .catch(error => {
        if (error?.origin?.results?.length === 0) {
          Toast('Please enter valid pincode', 0);
        }
      });
  };

  const checkPincode = async cityName => {
    try {
      let data = {
        pincode: pinCode,
        CityName: cityName,
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
          console.log('resss', response);
          console.log('cityyyyy', response?.data?.CityId);
          console.log('panellllll', response?.data?.Panel_ID);
          Toast(response.message, 1);
          setPincode('');
          addressLabel(pinCode);
          setAddressLabel(pinCode);
          setCityId(response.data?.CityId);
          setPanelId(response.data?.Panel_ID);
          await AsyncStorage.setItem(
            'cityId',
            response?.data?.CityId.toString(),
          );
          await AsyncStorage.setItem(
            'panelId',
            response?.data?.Panel_ID.toString(),
          );
          SetLoader(false);

          callAllHomeApi();
        } else {
          Toast(response.message, 0);
          if (response === 'Network Error') {
            Toast('Network Error', 0);
            SetLoader(false);
          } else if (response.status === 401) {
            signOut();
          } else {
            null;
          }
          SetLoader(false);
        }
      }
    } catch (err) {
      SetLoader(false);
    }
  };

  useEffect(() => {
    callAllHomeApi();
  }, [cityId]);

  const pagination = () => {
    return (
      <Pagination
        dotsLength={banners.length}
        activeDotIndex={activeIndex}
        containerStyle={{paddingVertical: 1}}
        dotStyle={styles.activeDot}
        inactiveDotStyle={styles.inactiveDot}
      />
    );
  };

  const onCarouselPress = (type, typeValue) => {
    if (type === 'Other') {
      navigation.navigate('CarouselPage', {
        url: typeValue,
      });
    } else if (type === 'Package' || type === 'Test') {
      let testPackageData = {
        id: typeValue,
        type: type,
      };
      navigation.navigate('FullBodyCheckup', {
        testPackageData: testPackageData,
        type: type,
        imageType: type,
        comeFromMyCart: false,
      });
    } else if (type === 'Blog') {
      navigation.navigate('BlogDetailScreen', {data: {id: typeValue}});
    }
  };

  const _renderItem = (item, parallaxProps) => {
    let type = item.link_type;

    let value = item.link_value;
    return (
      <View style={styles.item}>
        <TouchableOpacity
          onPress={() => onCarouselPress(type, value)}
          style={{height: '100%', width: '100%'}}>
          <Image style={styles.image} source={{uri: item.image}} />
        </TouchableOpacity>
      </View>
      // <View style={[styles.item, {backgroundColor: 'red'}]}>
      //   <ParallaxImage
      //     source={imagesConstants.newsImage}
      //     containerStyle={[styles.imageContainer, {backgroundColor: 'green'}]}
      //     style={[styles.image, {width: 50, height: 100}]}
      //     // parallaxFactor={0.4}
      //     {...parallaxProps}
      //   />
      // </View>
    );
  };

  const onNavigateAddAddress = () => {
    setHomeSelectAddress(false);
    navigation.navigate('AddNewAddress');
  };

  const onNavigateSetLocation = val => {
    setHomeSelectAddress(false);
    if (val === 0) {
      navigation.navigate('MapSetLocation', {type: '1'});
    } else {
      navigation.navigate('MapSetLocation', {type: '0'});
    }
  };
  const onOpenPinCodeModal = () => {
    setHomeSelectAddress(false);
    setTimeout(() => {
      setHomePinCodeModal(true);
    }, 200);
  };

  const onOpenAddressModal = () => {
    // setHomePinCodeModal(false);
    // setTimeout(() => {
    //   setHomeSelectAddress(true);
    // }, 1000);
  };
  const onClosePinModal = () => {
    setHomePinCodeModal(false);
    setTimeout(() => {
      setHomeSelectAddress(true);
    }, 200);
  };
  const onCloseHomeSelectModal = (cityId, panelId) => {
    console.log('I am call', cityId, panelId);
    setHomeSelectAddress(false);
    if (cityId) {
      setCityOrPanelIds(cityId, panelId);
    } else {
      null;
    }
  };

  const onNext = async val => {
    let user = await AsyncStorage.getItem('userToken');
    if (user === 'GuestUser') {
      Alert.alert(
        `You are browsing as Guest, Please login to your account`,
        ``,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Login',
            onPress: () => signOut(),
          },
        ],
        {cancelable: false},
      );
    } else {
      navigation.navigate('FindNearLabs');
    }
  };

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <HomeHeader
          onPressNotification={() => navigation.navigate('Notification')}
          label={headerAddressLabel}
          onPressCart={() => navigation.navigate('MyCart')}
          onPressMenu={() => {
            navigation.dispatch(DrawerActions.openDrawer());
          }}
          notificationCount={notificationCount}
          cartCount={cartCount}
          onPressLocation={() => setHomeSelectAddress(true)}
          onPressSearchBar={() =>
            navigation.navigate('SearchLab', {
              searchable: true,
              bodyPartsCondition: false,
            })
          }
        />
        {/* <MainContainer> */}

        <ScrollView contentContainerStyle={styles.content}>
          <View>
            <Carousel
              layout="default"
              loop={true}
              autoplay={true}
              autoplayInterval={3000}
              autoplayDelay={3000}
              ref={carouselRef}
              sliderWidth={DEV_WIDTH}
              sliderHeight={200}
              itemWidth={DEV_WIDTH}
              data={banners}
              renderItem={({item}) => _renderItem(item)}
              hasParallaxImages={true}
              onSnapToItem={index => setActiveIndex(index)}
            />
            <View style={styles.paginationSection}>{pagination()}</View>
          </View>
          <View style={styles.fullContainer}>
            <View>
              <HomeSectionOne
                onUploadPrescription={() =>
                  navigation.navigate(`UploadPrescription`)
                }
                browseLabTest={() =>
                  navigation.navigate('SearchLab', {
                    type: 'Test',
                    searchable: true,
                    bodyPartsCondition: true,
                  })
                }
                onMyReports={() => navigation.navigate('MyReports')}
                onPharmacy={() => navigation.navigate('AddInquiry')}
              />
            </View>
            {/* Find Near by Labs Button */}
            <View style={styles.findNearByLabsBtn}>
              <FindNearLabBtn onPress={onNext} />
            </View>
            {/* Find Near by Labs Button */}
            {/* Health Package Section */}
            <View style={styles.testByCondition}>
              <HomeHorizontalList
                data={healthPackages}
                horizontal={true}
                listTitle={'Health Packages'}
                seeAll={true}
                onPressSeeAll={() =>
                  navigation.navigate('SearchLab', {
                    type: 'Package',

                    bodyPartsCondition: false,
                    // imageType: 'Package',
                  })
                }
                extraData={healthPackages}
                renderItem={({item}) => {
                  let testPackageData = {
                    id: item.Id,
                    type: item.TestType,
                  };
                  return (
                    <HealthPackageCard
                      onPress={() =>
                        navigation.navigate('FullBodyCheckup', {
                          testPackageData: testPackageData,
                          type: 'Package',
                          imageType: 'Package',
                          comeFromMyCart: false,
                        })
                      }
                      data={item}
                    />
                  );
                }}
              />
            </View>

            {/* Health Package Section */}
            {/* Test by Body Parts Section */}
            <View style={styles.testByCondition}>
              <HomeHorizontalList
                data={testByBodyParts}
                horizontal={true}
                onPressSeeAll={({item}) =>
                  navigation.navigate('SearchLab', {
                    bodyPartsCondition: true,
                    testIdBodyParts: Number(item.Id),
                  })
                }
                seeAll={false}
                listTitle={'Test by Body Parts'}
                extraData={testByBodyParts}
                renderItem={({item}) => {
                  return (
                    <TestByBodyPartsCard
                      onPress={() =>
                        navigation.navigate('SearchLab', {
                          bodyPartsCondition: true,

                          testIdBodyParts: Number(item.Id),
                        })
                      }
                      blogs={false}
                      data={item}
                    />
                  );
                }}
              />
            </View>
            {/* Test by Body Parts Section */}
            {/* Test by Condition Section */}
            <View style={styles.testByCondition}>
              <HomeHorizontalList
                data={testByCondition}
                numColumns={2}
                ItemSeparatorComponent={() => {
                  return <View style={styles.listSepVertical} />;
                }}
                onPressSeeAll={({item}) =>
                  navigation.navigate('SearchLab', {
                    bodyPartsCondition: true,
                    testIdCondition: Number(item.Id),
                  })
                }
                seeAll={false}
                listTitle={'Test by Condition'}
                extraData={testByCondition}
                renderItem={({item}) => {
                  return (
                    <TestByConditionCard
                      onPress={() =>
                        navigation.navigate('SearchLab', {
                          // type: 'Test',
                          // imageType: 'Test',
                          bodyPartsCondition: true,
                          testIdCondition: Number(item.Id),
                        })
                      }
                      data={item}
                    />
                  );
                }}
              />
            </View>
            {/* Test by Condition Section */}
            {/* Blogs Section */}
            <View style={styles.testByCondition}>
              <HomeHorizontalList
                data={blogs}
                horizontal={true}
                ItemSeparatorComponent={() => {
                  return <View style={styles.listSepVertical} />;
                }}
                onPressSeeAll={() => navigation.navigate('Blogs')}
                seeAll={true}
                // listTitle={'Blogs & Video Gallery'}
                listTitle={'Blogs'}
                extraData={blogs}
                renderItem={({item}) => {
                  return (
                    <BlogsVideoGalleryCard
                      home={true}
                      onPress={() =>
                        navigation.navigate('BlogDetailScreen', {data: item})
                      }
                      data={item}
                    />
                  );
                }}
              />
            </View>
            {/* Blogs Section */}
            {/* Why DR Section */}
            <View style={styles.testByCondition}>
              <HomeHorizontalList
                data={whyDrBlal}
                horizontal={true}
                listTitle={'Why Choose Dr. B Lal Laboratory'}
                extraData={whyDrBlal}
                renderItem={({item}) => {
                  return <WhyDrBlalCard data={item} />;
                }}
              />
            </View>
            {/* Why DR Section */}
            {/* News Section */}
            <View
              style={[
                styles.testByCondition,
                {
                  marginBottom:
                    trackingUrl && userToken !== 'GuestUser' ? hp('10%') : 0,
                },
              ]}>
              <HomeHorizontalList
                data={newsEvent}
                horizontal={true}
                ItemSeparatorComponent={() => {
                  return <View style={styles.listSepVertical} />;
                }}
                onPressSeeAll={() =>
                  navigation.navigate('SeeAllList', {title: 'News & Events'})
                }
                listTitle={'News and Events'}
                extraData={newsEvent}
                seeAll={true}
                renderItem={({item}) => {
                  return (
                    <NewsEventCard
                      onPress={() =>
                        navigation.navigate('NewsEventDetail', {data: item})
                      }
                      data={item}
                    />
                  );
                }}
              />
            </View>

            {/* News Section */}
          </View>
        </ScrollView>

        {/* </MainContainer> */}
      </SafeAreaView>
      {trackingUrl && userToken !== 'GuestUser' ? (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('TrackProScreen', {
              url: trackingUrl.full_tracking_link,
            })
          }
          style={styles.trackingView}>
          <View style={{flexDirection: 'row'}}>
            <Image
              resizeMode={'contain'}
              style={styles.trackingImageStyle}
              source={imagesConstants.tracking}
            />
            <View style={styles.textContainer}>
              <Text style={styles.bookingIdStyle}>
                {`Order Id : ${trackingUrl.order_id}`}
              </Text>
              <Text style={styles.bookingDateStyle}>
                {trackingUrl.job_time}
              </Text>
            </View>
          </View>

          <Text style={styles.trackBookingText}>Track Booking</Text>
        </TouchableOpacity>
      ) : null}

      <Loader display={loader} />
      <View>
        {/* <MapLocationAddress
          mapSelectionVisible={mapSelectionVisible}
          navigation={navigation}
          enterPinCode={() => onOpenCurrentMap(0)}
          mapCurrentLocation={() => navigation.navigate('MapSetLocation')}
          onDone={() => setMapSelectionVisible(false)}
        /> */}
        {/* <MapPinCode
          onPinBack={() => onOpenCurrentMap(1)}
          pinCodeVisible={mapPinCodeVisible}
        /> */}
        <HomeEnterPinCodeModal
          pinCodeVisible={homePinCodeModal}
          backBtnPinCode={onOpenAddressModal}
          value={pinCode}
          onApplyPinCode={() =>
            pinCode ? onGetCityName() : alert('Please Enter your Pincode')
          }
          onChangeText={val => setPincode(val)}
          onPinBack={() => onClosePinModal()}
          onRequestClose={() => onClosePinModal()}
        />
        <HomeSelectAddressModal
          enterPinCode={onOpenPinCodeModal}
          onPressAddAddress={() => onNavigateSetLocation(1)}
          onPressUseCurrentLocation={() => onNavigateSetLocation(0)}
          onPressDone={(cityId, panelId) =>
            onCloseHomeSelectModal(cityId, panelId)
          }
          visible={homeSelectAddress}
        />
      </View>
    </>
  );
};

export default index;
