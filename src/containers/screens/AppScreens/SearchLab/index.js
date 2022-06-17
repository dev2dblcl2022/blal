import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
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
import {getSilverapiURL} from '../../../../apis/env';
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
  const [page, setPage] = useState(10);
  const [pageData, setPageData] = useState({});
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
      getAlreadyCartItem();
      getCartCount();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (test.length > 0) {
      setShowTestList(true);
    } else {
      setShowTestList(false);
    }
  }, [test, showTestList]);

  useEffect(() => {
    if (cityId && panelId && bodyPartsCondition === false) {
      getLastSearched();
    }
  }, [cityId, panelId]);

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

  const getAlreadyCartItem = async () => {
    try {
      const requestConfig = {
        method: method.get,
        url: servicesPoints.bookingServices.check_top_test_in_cart,
      };
      const response = await NetworkRequest(requestConfig);

      if (response) {
        const {success} = response;
        if (success) {
          setAlreadyCartItem(response?.data);
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
  useEffect(() => {
    getTest('', page);
  }, [page]);

  const getLastSearched = async val => {
    if (Platform.OS === 'ios') {
      try {
        let userData = await AsyncStorage.getItem('userData');
        let parseData = JSON.parse(userData);
        let userId = parseData?.user?.id;

        let data = {
          PanelId: Number(panelId),
          CityId: Number(cityId),
          Limit: 20,
        };
        let url = ``;
        if (userToken === 'GuestUser') {
          url = `${servicesPoints.commonServices.top_tests_packages}?cityId=${data.CityId}&panelId=${data.PanelId}`;
        } else {
          url = `${servicesPoints.commonServices.top_tests_packages}?cityId=${data.CityId}&panelId=${data.PanelId}&user_id=${userId}`;
        }

        let requestConfig = {
          method: method.get,

          url: url,
        };

        const response = await NetworkRequest(requestConfig);

        if (response) {
          const {success} = response;
          if (success) {
            let data1 = alreadyCartItem;

            let values = response.data.TestModel;
            data1 = data1.map(item => {
              values = values.map(itn => {
                if (itn.Id === item.test_id) {
                  itn.selected = true;
                } else {
                  itn.selected = false;
                }
                return itn;
              });
            });

            setTopTest(values);
            setTopPackages(response.data.PackageModel);
            setLoader(false);
          } else {
            setLoader(false);
          }
        }
      } catch (err) {
        console.log('last catch error', err);
      }
    } else {
      try {
        let userData = await AsyncStorage.getItem('userData');
        let parseData = JSON.parse(userData);
        let userId = parseData?.user?.id;

        let data = {
          PanelId: Number(panelId),
          CityId: Number(cityId),
          Limit: 20,
        };
        let url = ``;
        if (userToken === 'GuestUser') {
          url = `${servicesPoints.commonServices.top_tests_packages}?cityId=${data.CityId}&panelId=${data.PanelId}`;
        } else {
          url = `${servicesPoints.commonServices.top_tests_packages}?cityId=${data.CityId}&panelId=${data.PanelId}&user_id=${userId}`;
        }

        let requestConfig = {
          data: data,
          method: method.get,
          // url: `${servicesPoints.commonServices.top_tests_packages}?cityId=${data.CityId}&panelId=${data.PanelId}&Limit=${data.Limit}`,
          url: url,
        };

        const response = await NetworkRequest(requestConfig);

        if (response) {
          const {success} = response;
          if (success) {
            let data1 = alreadyCartItem;

            let values = response.data.TestModel;
            data1 = data1.map(item => {
              values = values.map(itn => {
                if (itn.Id === item.test_id) {
                  itn.selected = true;
                } else {
                  itn.selected = false;
                }
                return itn;
              });
            });

            setTopTest(values);
            setTopPackages(response.data.PackageModel);
            setLoader(false);
          } else {
            setLoader(false);
          }
        }
      } catch (err) {
        console.log('last catch error', err);
      }
    }
  };

  const onDeleteTest = async item => {
    try {
      setLoader(true);
      let data = {
        itemId: item.IsBestSeller.id.toString(),
      };
      const requestConfig = {
        method: method.post,
        data: data,
        url: servicesPoints.bookingServices.remove_member_item_from_cart,
      };

      const response = await NetworkRequest(requestConfig);

      if (response) {
        const {success} = response;
        if (success) {
          getCartCount();
          getLastSearched();
          setLoader(false);
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

      let url = 
        `/GetFilterTestPackage?CityId=${data.CityId}&PanelId=${data.PanelId}`;

      // if (data.Type) {
      //   url = `${url}&Type=${data.Type}`;
      // }

      if (data.SearchKeyword) {
        url = `${url}&SearchKeyword=${data.SearchKeyword}`;
      }
      testIdConditions;

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
          setPageData(response.data.pager);
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

  const renderCard = (item, type) => {
    let testPackageData = {
      id: item.Id,
      type: item.TestType,
    };
    return (
      <View style={styles.searchedItemSection}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('FullBodyCheckup', {
              testPackageData: testPackageData,

              comeFromMyCart: false,
            })
          }
          style={styles.searchedItemOne}>
          <RegularText style={styles.searchedTestText} title={item.NAME} />
        </TouchableOpacity>
        <TouchableOpacity
          hitSlop={{left: 40, right: 40, top: 40, bottom: 40}}
          onPress={() =>
            item.IsBestSeller ? onDeleteTest(item) : onClickPlusAdd(item)
          }
          style={styles.searchedItemTwo}>
          <BoldText
            style={{
              color: colors.app_theme_dark_green,
              fontSize: hp('3.5%'),
              fontWeight: 'bold',
            }}
            title={item.IsBestSeller ? '-' : '+'}
          />
        </TouchableOpacity>
      </View>
    );
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
        data={item}
        imageType={imageType}
      />
    );
  };

  const onOpenPatientModal = item => {
    setPackageData(item);
    setTimeout(() => {
      setVisible(true);
    }, 200);
  };

  const onAddMember = () => {
    setVisible(false);
    setTimeout(() => {
      navigation.navigate('AddFamilyMember');
    }, 200);
  };

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
          getLastSearched();
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
  const fetchMoreData = () => {
    if (pageData.TotalItems >= page) {
      const cal = pageData.TotalItems - page;
      setPage(page + (cal >= 10 ? 10 : cal));
    }
  };

  const renderFooter = () => (
    <View style={styles.loaderArea}>
      {test.length >= 10 && test.length < pageData.TotalItems ? (
        <Text>Loading...</Text>
      ) : null}
    </View>
  );
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
        title={
          bodyPartsCondition
            ? 'Search Lab Tests'
            : 'Search Lab Tests / Packages'
        }
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
            {showTestList ? (
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
                  ListFooterComponent={renderFooter}
                  onEndReachedThreshold={0.2}
                  onEndReached={fetchMoreData}
                  renderItem={({item}) => renderSearchCard(item)}
                />
              </View>
            ) : (
              <View style={styles.searchedView}>
                {!bodyPartsCondition ? (
                  <View style={styles.topTest}>
                    <View style={styles.headingSection}>
                      <BoldText style={styles.heading} title={'Top Tests'} />
                    </View>
                    <View style={styles.listSection}>
                      <FlatList
                        data={topTest}
                        showsVerticalScrollIndicator={true}
                        extraData={topTest}
                        persistentScrollbar={true}
                        ListEmptyComponent={() => {
                          return (
                            <View style={styles.emptyView}>
                              {!loader ? (
                                <RegularText
                                  style={styles.emptyText}
                                  title={`No top test found`}
                                />
                              ) : null}
                            </View>
                          );
                        }}
                        renderItem={({item}) => renderCard(item, 'Test')}
                      />
                    </View>
                  </View>
                ) : null}
                {!bodyPartsCondition ? (
                  <View style={styles.topTest}>
                    <View style={styles.headingSection}>
                      <BoldText style={styles.heading} title={'Top Packages'} />
                    </View>
                    <View style={styles.listSection}>
                      <FlatList
                        data={topPackages}
                        showsVerticalScrollIndicator={true}
                        persistentScrollbar={true}
                        ListEmptyComponent={() => {
                          return (
                            <View style={styles.emptyView}>
                              {!loader ? (
                                <RegularText
                                  style={styles.emptyText}
                                  title={`No top packages found`}
                                />
                              ) : null}
                            </View>
                          );
                        }}
                        extraData={topPackages}
                        renderItem={({item}) => renderCard(item, 'Package')}
                      />
                    </View>
                  </View>
                ) : null}
              </View>
            )}
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
