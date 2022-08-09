import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Alert,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './style';
import {BoldText, RegularText} from '../../../components/Common';
import {
  Loader,
  MainContainer,
  SearchHeader,
  SearchLabCard,
  SelectPatientPopup,
  Toast,
} from '../../../components';
import imagesConstants from '../../../../constants/imagesConstants';

import NetworkRequestBlal, {
  blalMethod,
  blalServicesPoints,
} from '../../../../services/NetworkRequestBlal';
import colors from '../../../../constants/colors';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Blal_Panel_Id, Blal_City_Id} from '../../../../config/Setting';
// import _debounce from 'lodash/debounce';

import _ from 'lodash';
import NetworkRequest, {
  method,
  servicesPoints,
} from '../../../../services/NetworkRequest';
import {AuthContext} from '../../../../../context/context';
import axios from 'axios';
const index = ({navigation, route}) => {
  let type = '';
  let filterConditionKeys = '';
  let filterBodyPartsKeys = '';
  let bodyPartsCondition = false;
  let imageType = null;
  let testIdBody = null;
  let testIdCondition = null;
  if (route.params === undefined) {
    type = '';
  } else {
    type = route.params.type ? route.params.type : '';
    bodyPartsCondition = route.params.bodyPartsCondition;

    imageType = route.params.imageType;
    testIdBody = route.params.testIdBodyParts
      ? route.params.testIdBodyParts
      : '';
    testIdCondition = route.params.testIdCondition
      ? route.params.testIdCondition
      : '';
  }
  const [visible, setVisible] = useState(false);
  const [packageData, setPackageData] = useState({});
  const [userToken, setUserToken] = useState('');
  const [userId, setUserId] = useState('');
  const {signOut} = React.useContext(AuthContext);
  const [topTest, setTopTest] = useState([]);
  const [topPackages, setTopPackages] = useState([]);
  const [alreadyCartItem, setAlreadyCartItem] = useState([]);
  const [loader, setLoader] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [noResultText, setNoResultText] = useState('');
  const [test, setTest] = useState([]);
  const [panelId, setPanelId] = useState(Blal_Panel_Id);
  const [cityId, setCityId] = useState(Blal_City_Id);
  const [view, setView] = useState(1);
  const [idCondition, setIdCondition] = useState('');
  const [idBodyParts, setIdBodyParts] = useState('');
  const [showTestList, setShowTestList] = useState(false);
  const [handleConnectionState, setHandleConnectionState] = useState(false);
  useEffect(() => {
    if (handleConnectionState) {
      navigation.navigate('ConnectionHandle');
    }
  }, [handleConnectionState]);
  // const debounceFn = useCallback(_debounce(handleDebounceFn, 1000), []);

  // function handleDebounceFn(inputValue) {
  //   getTest(inputValue);
  // }

  // function handleChange(val) {
  //   setSearchText(val);
  //   debounceFn(val);
  // }

  // const [count, setCount] = useState(0); // simple check debounce is working
  // const handleChangeWithDebounce = _.debounce(async e => {
  //   if (e && String(e).length > 4) {
  //     // TODO: make API call here
  //     setSearchText(e);
  //     setCount(count + 1);
  //     getTest();
  //   }
  // }, 1000);

  // const debounce = func => {
  //   let timer;
  //   return function (...args) {
  //     const context = this;
  //     if (timer) clearTimeout(timer);
  //     timer = setTimeout(() => {
  //       timer = null;
  //       func.apply(context, args);
  //     }, 500000);
  //   };
  // };
  // ///UseCallback provide us the memozed callback
  // const optimesedVersion = useCallback(debounce(handelChange), []);

  // const handelChange = async val => {
  //   await setSearchText(val);
  //   getTest(val);
  // };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getStorageData();

      getCartCount();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getUserId();
  }, []);

  const getUserId = async () => {
    let userData = await AsyncStorage.getItem('userData');
    let parseData = JSON.parse(userData);
    let userId = parseData?.user?.id;

    setUserId(userId);
  };

  const getCartCount = async () => {
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
            setHandleConnectionState(true);
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

  const getStorageData = async () => {
    let cityId = await AsyncStorage.getItem('cityId');
    let panelId = await AsyncStorage.getItem('panelId');
    let userToken = await AsyncStorage.getItem('userToken');
    setCityId(cityId);
    setPanelId(panelId);
    setUserToken(userToken);

    await getTest('', 10);
  };

  const getTest = async (val, value) => {
    let testIdBodyParts = await AsyncStorage.getItem('filterDataBodyParts');
    let testIdConditions = await AsyncStorage.getItem('filterDataConditions');
    if (
      testIdBodyParts ||
      testIdConditions ||
      searchText ||
      bodyPartsCondition
    ) {
      filterBodyPartsKeys = testIdBodyParts ? testIdBodyParts.toString() : '';
      filterConditionKeys = testIdConditions ? testIdConditions.toString() : '';
      if (testIdBodyParts || testIdConditions) {
        setLoader(true);
      }

      let data = {
        PanelId: Number(panelId),
        CityId: Number(cityId),
        Type: type,
        SearchKeyword: val ? val : '',
        Limit: value,
        BodyParts: `${filterBodyPartsKeys}${
          filterBodyPartsKeys && testIdBody ? ',' : ''
        }${testIdBody ? testIdBody : ''}`,

        Disease: `${filterConditionKeys}${
          filterConditionKeys && testIdCondition ? ',' : ''
        }${testIdCondition ? testIdCondition : ''}`,
      };

      let url = `/GetFilterTestPackage?CityId=${data.CityId}&PanelId=${data.PanelId}`;

      if (data.Type) {
        url = `${url}&Type=${data.Type}`;
      }

      if (data.SearchKeyword) {
        url = `${url}&SearchKeyword=${data.SearchKeyword}`;
      }

      if (data.BodyParts) {
        url = `${url}&BodyParts=${data.BodyParts}`;
      }

      if (data.Disease) {
        url = `${url}&Disease=${data.Disease}`;
      }
      if (data.Limit) {
        url = `${url}&Limit=${data.Limit}`;
      }

      let requestConfig = {
        method: blalMethod.post,
        data: data,

        url: url,
      };

      const response = await NetworkRequestBlal(requestConfig);

      if (response) {
        const {status_Code} = response;
        if (status_Code === 200) {
          setTest(response.data.itemmodel);

          filterBodyPartsKeys = null;
          filterConditionKeys = null;
          setLoader(false);
          if (response.data.length === 0) {
            setNoResultText('No Result Found');
          } else {
            setNoResultText('');
          }
        } else {
          setLoader(false);
        }
      }
    }
  };

  const setSearchValue = async val => {
    await setSearchText(val);

    if (val.length >= 3) {
      getTest(val);
    } else {
      null;
    }

    // getTest(val);
  };

  const onClickPlusAdd = async item => {
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
      onOpenPatientModal(item);
    }
  };

  const renderSearchCard = item => {
    let testPackageData = {
      id: item.Id,
      type: item.TestType,
    };

    return (
      <SearchLabCard
        onPress={() =>
          navigation.navigate('FullBodyCheckup', {
            testPackageData: testPackageData,
            comeFromMyCart: false,
          })
        }
        navigation={navigation}
        data={item}
        imageType={imageType}
        onAddMember={onAddMember}
        onOpenPatientModal={onOpenPatientModal}
        onClickPlusAdd={onClickPlusAdd}
        getCartCount={getCartCount}
      />
    );
  };

  const onOpenPatientModal = item => {
    console.log('itemm', item);
    setPackageData(item);
    setTimeout(() => {
      setVisible(true);
    }, 200);
  };

  const onAddMember = () => {
    setVisible(false);
    setTimeout(() => {
      p;
    }, 200);
  };
  console.log('packageData', packageData);
  const moveAddToCart = async patientsId => {
    setVisible(false);

    // alert('hii');

    try {
      setLoader(true);
      let apiData = {
        is_booking: false,
        test_type: packageData.TestType,
        test_id: packageData.Id,
        panel_id: panelId,
        test_name: packageData.NAME,
        city_id: cityId,
        booking_members: patientsId,
      };

      const requestConfig = {
        data: apiData,
        method: method.post,
        url: servicesPoints.bookingServices.add,
      };

      const response = await NetworkRequest(requestConfig);

      if (response) {
        const {success} = response;
        if (success) {
          setLoader(false);
          Toast(response.message, 1);
          getCartCount();
        } else {
          Toast(response.message, 0);

          if (response === 'Network Error') {
            Toast('Network Error', 0);
            setHandleConnectionState(true);
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

  const onFilter = async () => {
    // AsyncStorage.removeItem('filterDataBodyParts');
    // AsyncStorage.removeItem('filterDataConditions');
    navigation.navigate('Filter');
  };

  const onBack = async () => {
    AsyncStorage.removeItem('filterDataBodyParts');
    AsyncStorage.removeItem('filterDataConditions');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <SearchHeader
        onChangeText={val => setSearchValue(val)}
        // onChangeText={val => handelChange(val)}
        // onChangeText={val => handleChange(val)}
        placeholderText={'Search test or package name'}
        onPressFilter={onFilter}
        onBack={onBack}
        onClearText={() => setSearchText('')}
        cartVisible={true}
        cartCount={cartCount}
        onPressCart={() => navigation.navigate('MyCart')}
        value={searchText}
        // filterVisible={searchText ? true : false}
        filterVisible={true}
        title={'Search Lab Tests'}
      />
      <MainContainer>
        <View style={styles.mainContainerSearched}>
          {searchText ? (
            <View style={styles.headingSection}>
              <BoldText
                style={styles.headingMain}
                title={`Showing results for ${searchText}`}
              />
            </View>
          ) : null}
          {noResultText ? (
            <View style={styles.headingSection}>
              <BoldText
                style={[
                  styles.headingMain,
                  {fontWeight: 'bold', color: colors.app_theme_dark_green},
                ]}
                title={noResultText}
              />
            </View>
          ) : null}
          <View style={styles.dataSection}>
            <View style={styles.searchingListSection}>
              <FlatList
                data={test}
                showsVerticalScrollIndicator={false}
                extraData={test}
                ListEmptyComponent={() => {
                  return (
                    <View
                      style={{
                        paddingTop: hp('20%'),
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <RegularText
                        style={{
                          color: colors.app_theme_dark_green,
                          fontSize: hp('2.5%'),
                        }}
                        title={`No Test/Package found`}
                      />
                    </View>
                  );
                }}
                renderItem={({item}) => renderSearchCard(item)}
              />
            </View>
          </View>
        </View>
      </MainContainer>

      {userToken === 'GuestUser' ? null : (
        <SelectPatientPopup
          navigation={navigation}
          onAddMember={onAddMember}
          onRequestClose={() => setVisible(false)}
          onPressCancel={() => setVisible(false)}
          onAddToCart={data => moveAddToCart(data)}
          visible={visible}
        />
      )}

      <Loader display={loader} />
    </SafeAreaView>
  );
};

export default index;
