import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import styles from './style';
import Geocoder from 'react-native-geocoding';
import DefaultHeader from '../../../components/DefaultHeader';
import {BoldText, RegularText} from '../../../components/Common';

import {
  HomeEnterPinCodeModal,
  HomeSelectAddressModal,
  Loader,
  MyAddressCard,
  Toast,
} from '../../../components';
import NetworkRequest, {
  method,
  servicesPoints,
} from '../../../../services/NetworkRequest';
import colors from '../../../../constants/colors';
import {AuthContext} from '../../../../../context/context';
import {Blal_City_Id, Blal_Panel_Id} from '../../../../config/Setting';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {isNull} from 'lodash-es';

const index = ({navigation, props, route}) => {
  let locationAvailable = route.params?.location;
  const {addressLabel, signOut} = React.useContext(AuthContext);
  const [panelId, setPanelId] = useState(Blal_Panel_Id);
  const [cityId, setCityId] = useState(Blal_City_Id);
  const [pinCode, setPincode] = useState('');
  const [headerAddressLabel, setAddressLabel] = useState(
    'Malviya Nager Jaipur Rajasthan 302017',
  );
  const [homePinCodeModal, setHomePinCodeModal] = useState(false);
  const [homeSelectAddress, setHomeSelectAddress] = useState(false);
  const [membersData, setMembersData] = useState([0, 1, 2, 3]);
  const [loader, setLoader] = useState(true);
  const [mapSelectionVisible, setMapSelectionVisible] = useState(false);
  const [mapPinCodeVisible, setMapPinCodeVisible] = useState(false);
  const [addresses, setAddresses] = useState([]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAddresses();
    });
    return unsubscribe;
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
        setLoader(false);
      } else {
        if (response === 'Network Error') {
          Toast('Network Error', 0);
        }
        setLoader(false);
      }
    }
  };

  const onSelectPrimaryAddress = item => {
    let data = addresses;
    data = data.map((itn, index) => {
      if (itn.id == item.id) {
        itn.primary_address = !itn.primary_address;
      } else {
        itn.primary_address = false;
      }
      return itn;
    });

    onSelectPrimaryAlert(item, data);
  };

  const onSelectPrimaryAlert = (item, data) => {
    Alert.alert(
      `Are you sure to set this address as primary address`,
      ``,
      [
        {text: 'Yes', onPress: () => onApiAddressPrimary(item, data)},
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };

  const onApiAddressPrimary = async (item, filterData) => {
    try {
      setLoader(true);
      let data = {
        address_id: item.id,
      };
      const requestConfig = {
        method: method.post,
        data: data,
        url: servicesPoints.userServices.set_primary_address,
      };

      const response = await NetworkRequest(requestConfig);

      if (response) {
        const {success} = response;
        if (success) {
          setAddresses(filterData);
          setLoader(false);
          Toast(response.message, 1);
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

  const onDeleAddress = async item => {
    if (item.primary_address) {
      Toast(
        `Please change your primary address first. You can't delete your primary address`,
        0,
      );
    } else {
      try {
        setLoader(true);
        let data = {
          address_id: item.id,
        };
        const requestConfig = {
          method: method.get,
          // data: data,
          url: `${servicesPoints.userServices.deleteAddress}/${data.address_id}`,
        };

        const response = await NetworkRequest(requestConfig);

        if (response) {
          const {success} = response;
          if (success) {
            setLoader(false);
            Toast(response.message, 1);
            getAddresses();
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
    }
  };
  const onEditAdd = item => {
    navigation.navigate('EditAddress', {data: item});
    // try {
    //   setLoader(true);
    //   let data = {
    //     address_id: item.id,
    //   };
    //   const requestConfig = {
    //     method: method.get,
    //     // data: data,
    //     url: `${servicesPoints.userServices.set_primary_address}/${data.address_id}`,
    //   };

    //   const response = await NetworkRequest(requestConfig);

    //   if (response) {
    //     const {success} = response;
    //     if (success) {
    //       setLoader(false);
    //       Toast(response.message, 1);
    //       getAddresses();
    //     } else {
    //       Toast(response.message, 0);
    //       if (response === 'Network Error') {
    //         Toast('Network Error', 0);
    //         setLoader(false);
    //       } else if (response.status === 401) {
    //         signOut();
    //       } else {
    //         null;
    //       }
    //       setLoader(false);
    //     }
    //   }
    // } catch (err) {
    //   setLoader(false);
    // }
  };

  const renderCard = item => {
    return (
      <MyAddressCard
        onDelete={() => onDeleAddress(item)}
        onEditAddress={() => onEditAdd(item)}
        onSelectPrimaryAddress={() => {
          if (item.primary_address) {
            null;
          } else {
            onSelectPrimaryAddress(item);
          }
        }}
        data={item}
      />
    );
  };

  const onOpenCurrentMap = val => {
    if (val === 0) {
      setMapSelectionVisible(false);
      setMapPinCodeVisible(true);
    } else {
      setMapSelectionVisible(true);
      setMapPinCodeVisible(false);
    }
  };

  const onNavigateAddAddress = () => {
    setHomeSelectAddress(false);
    navigation.navigate('AddNewAddress');
  };

  const onNavigateSetLocation = () => {
    setHomeSelectAddress(false);
    navigation.navigate('MapSetLocation', {type: '2'});
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
  const onCloseHomeSelectModal = (cityId, panelId) => {
    setHomeSelectAddress(false);
    if (cityId) {
      setCityOrPanelIds(cityId, panelId);
    } else {
      null;
    }
  };

  const onClosePinModal = () => {
    setHomePinCodeModal(false);
    setTimeout(() => {
      setHomeSelectAddress(true);
    }, 200);
  };

  const setCityOrPanelIds = (val, data) => {
    setCityId(val.toString());
    setPanelId(data.toString());
  };

  const onGetCityName = async () => {
    Geocoder.from(pinCode)
      .then(async response1 => {
        const {lat, lng} = response1.results[0].geometry.location;

        var selectedCity = '';

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

        checkPincode(selectedCity);
      })
      .catch(error => console.warn(error));
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
          Toast(response.message, 1);
          setPincode('');
          addressLabel(pinCode);
          setAddressLabel(pinCode);
          setCityId(response.data?.CityId);
          setPanelId(response.data?.Panel_ID);
          await AsyncStorage.setItem('cityId', response.data.CityId.toString());
          await AsyncStorage.setItem(
            'panelId',
            response.data.Panel_ID.toString(),
          );
          setHomePinCodeModal(false);
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <DefaultHeader
        onBack={() => navigation.goBack()}
        title={'My Addresses'}
      />
      <View style={styles.mainContainer}>
        {/* <View style={styles.headingSection}>
          <BoldText
            style={styles.heading}
            title={'Select a Primary UHID Profile'}
          />
        </View> */}
        <View style={styles.dataSection}>
          <View style={styles.listSection}>
            <FlatList
              data={addresses}
              showsVerticalScrollIndicator={false}
              extraData={addresses}
              ListEmptyComponent={() => {
                return (
                  <BoldText
                    style={{
                      color: colors.app_theme_dark_green,
                      alignSelf: 'center',
                    }}
                    title={'No Address Found!'}
                  />
                );
              }}
              renderItem={({item}) => renderCard(item)}
            />
          </View>
          <View style={styles.btnSection}>
            <View>
              <TouchableOpacity
                onPress={() => setHomeSelectAddress(true)}
                // onPress={() => navigation.navigate('AddNewAddress')}
                style={styles.addMemberSection}>
                <BoldText
                  style={styles.addMemberText}
                  title={'+ Add New Address'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View>
          <HomeEnterPinCodeModal
            pinCodeVisible={homePinCodeModal}
            backBtnPinCode={onOpenAddressModal}
            onChangeText={val => setPincode(val)}
            onApplyPinCode={() =>
              pinCode ? onGetCityName() : alert('Please Enter your Pincode')
            }
            onPinBack={() => onClosePinModal()}
            onRequestClose={() => onClosePinModal()}
          />
          <HomeSelectAddressModal
            enterPinCode={onOpenPinCodeModal}
            onPressAddAddress={onNavigateSetLocation}
            onPressUseCurrentLocation={onNavigateSetLocation}
            // onDone={() => setHomeSelectAddress(false)}
            onPressDone={(cityId, panelId) =>
              onCloseHomeSelectModal(cityId, panelId)
            }
            visible={homeSelectAddress}
          />
          {/* <MapLocationAddress
            mapSelectionVisible={mapSelectionVisible}
            onRequestClose={() => setMapSelectionVisible(false)}
            navigation={navigation}
            enterPinCode={() => onOpenCurrentMap(0)}
            mapCurrentLocation={() => navigation.navigate('MapSetLocation')}
            // mapCurrentLocation={() => onOpenCurrentMap}
            onDone={() => setMapSelectionVisible(false)}
          />
          <MapPinCode
            onPinBack={() => onOpenCurrentMap(1)}
            pinCodeVisible={mapPinCodeVisible}
          /> */}
        </View>
      </View>
      <Loader display={loader} />
    </SafeAreaView>
  );
};

export default index;
