import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert,
  InteractionManager,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {CancelButton, SubmitButton} from '../../../components/Buttons';
import styles from './style';
import DefaultHeader from '../../../components/DefaultHeader';
import {BoldText, RegularText} from '../../../components/Common';
import colors from '../../../../constants/colors';
import imagesConstants from '../../../../constants/imagesConstants';
import {
  AlsoAddCard,
  Loader,
  MainContainer,
  MyCartTestCard,
  SelectPatientPopup,
  SelectPrimaryCard,
  Toast,
} from '../../../components';

import {textConstants} from '../../../../constants/textConstants';
import NetworkRequest, {
  method,
  servicesPoints,
} from '../../../../services/NetworkRequest';
import {AuthContext} from '../../../../../context/context';
import NetworkRequestBlal, {
  blalMethod,
  blalServicesPoints,
} from '../../../../services/NetworkRequestBlal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {interpolateNode} from 'react-native-reanimated';

const index = ({navigation}) => {
  const {signOut} = React.useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const [profilesData, setProfilesData] = useState([1]);
  const [cartData, setCartData] = useState({});
  const [newItemData, setNewItemData] = useState({});
  const [cartDataBookings, setCartDataBookings] = useState([]);
  const [bookingMembersTests, setBookingMembersTests] = useState([]);
  const [familyMembersData, setFamilyMembersData] = useState([]);
  const [topTest, setTopTest] = useState([]);
  const [topPackages, setTopPackages] = useState([]);
  const [loader, setLoader] = useState(true);
  const [alsoAdd, setAlsoAdd] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [cityId, setCityId] = useState('');
  const [panelId, setPanelId] = useState('');
  const [testType, setTestType] = useState('');
  const [cartTestPackageIds, setCartTestPackageIds] = useState([]);
  const [refresh, setRefresh] = useState('');
  const [handleConnectionState, setHandleConnectionState] = useState(false);
  useEffect(() => {
    if (handleConnectionState) {
      navigation.navigate('ConnectionHandle');
    }
  }, [handleConnectionState]);
  let city = '';
  let panel = '';
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getCityPanelId();
    });
    return unsubscribe;
  }, [refresh]);

  // useEffect(() => {
  //   if (Object.keys(cartData).length > 0) {
  //     getLastSearched();
  //   }
  // }, [cartData]);

  const getCityPanelId = async () => {
    let cityID = await AsyncStorage.getItem('cityId');
    let panelID = await AsyncStorage.getItem('panelId');
    // setCityId(city);
    city = cityID;
    panel = panelID;
    // setPanelId(panel);
    getMyCartData(cityID, panelID);
    getLastSearched(cityID, panelID);
    if (Platform.OS === 'ios') {
      setLoader(false);
    }
  };

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

  const getLastSearched = async (cit, pan) => {
    let data = {
      PanelId: Number(pan),
      CityId: Number(cit),
      Limit: 5,
    };
    let requestConfig = {
      data: data,
      method: blalMethod.post,
      url: `${blalServicesPoints.blalUserServices.GettopTest}?cityId=${data.CityId}&panelId=${data.PanelId}&Limit=${data.Limit}`,
    };

    const response = await NetworkRequestBlal(requestConfig);

    if (response) {
      const {status_Code} = response;
      if (status_Code === 200) {
        let data = [];
        data = response.data.TestModel;
        let newData = data.concat(response.data.PackageModel);

        // Code  for removing item which are already in cart
        let newArray = [];
        let val = newData;
        val.forEach(item => {
          cartTestPackageIds.filter(itn => {
            if (item.Id === itn.test_id) {
            } else {
              newArray.push(item);
              // return item;
            }
          });
        });
        //

        setTopTest(val);
        setLoader(false);
        // setTopPackages(response.data.PackageModel);
      } else {
        setLoader(false);
      }
    }
  };

  const onAddMember = () => {
    setVisible(false);
    setTimeout(() => {
      navigation.navigate('AddFamilyMember');
    }, 200);
  };

  const moveAddToCart = async (patientsId, packageData) => {
    setVisible(false);

    try {
      setLoader(true);
      let apiData = {
        is_booking: false,
        test_type: packageData?.TestType,
        test_id: packageData?.Id,
        panel_id: panelId,
        test_price: packageData?.Rate,
        test_name: packageData?.NAME,
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
          // navigation.navigate('MyCart');
          // navigation.pop(2);
          setVisible(false);
          getMyCartData(city, panel);
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

  const onConfirmationDelete = item => {
    Alert.alert(
      `You are sure want to delete ${item.test_name} from cart`,
      ``,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => onDeleteTest(item),
        },
      ],
      {cancelable: false},
    );
  };

  const onDeleteTest = async item => {
    try {
      setLoader(true);
      let data = {
        itemId: item.id.toString(),
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
          getMyCartData(city, panel);
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

  const moveToBookingDetail = async item => {
    await AsyncStorage.removeItem('cartBookingDate');
    await AsyncStorage.removeItem('cartBookingAddress');
    await AsyncStorage.removeItem('cartBookingTime');
    await AsyncStorage.removeItem('Code');
    let collectionType = cartDataBookings.map((item, key) => {
      return item.collection_type;
    });
    navigation.navigate('BookingDetails', {collectionType: collectionType});
  };
  const renderSelfTextCard = (item, index) => {
    let length = cartData.bookings.length - 1;

    return (
      <MyCartTestCard
        cancel={true}
        length={length}
        index={index}
        onDeleteTest={data => onConfirmationDelete(data)}
        data={item}
        onPressItem={data => {
          navigation.navigate('FullBodyCheckup', {
            comeFromMyCart: true,
            testPackageData: {id: data.test_id, type: data.test_type},
          });
        }}
      />
    );
  };

  const onPressAddNewItem = data => {
    setVisible(true);
    setNewItemData(data);
  };

  const renderAlsoAddCard = item => {
    let testPackageData = {
      id: item.Id,
      type: item.TestType,
    };

    return (
      <AlsoAddCard
        data={item}
        onPressAdd={data => onPressAddNewItem(data)}
        onPress={() => {
          navigation.navigate('FullBodyCheckup', {
            testPackageData: testPackageData,
            type: item.TestType,
            name: item.testName,
            comeFromMyCart: false,
          });
        }}
      />
    );
  };

  const onClearCartConfirmation = async () => {
    Alert.alert(
      `Are you sure you want to clear your cart ?`,
      ``,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear',
          onPress: () => onClearCart(),
        },
      ],
      {cancelable: false},
    );
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
          getMyCartData(city, panel);
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

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* <DefaultHeader
        onBack={() => navigation.goBack()}
        title={textConstants.myCart.myCart}
      /> */}
      <View style={[styles.container]}>
        <TouchableOpacity
          hitSlop={{left: 15, right: 15, top: 15, bottom: 15}}
          onPress={() => navigation.goBack()}
          style={styles.backContainer}>
          <Image
            // style={{height: 10, width: 10}}
            source={imagesConstants.backWhite}
          />
        </TouchableOpacity>
        <View style={styles.headerContainer}>
          <BoldText style={styles.headerTitle} title={'My Cart'} />
        </View>
        <TouchableOpacity
          style={[styles.backContainer, {alignItems: 'flex-end'}]}>
          {cartDataBookings.length ? (
            <TouchableOpacity onPress={onClearCartConfirmation}>
              <BoldText style={styles.headerTitle} title={'Clear'} />
            </TouchableOpacity>
          ) : null}
        </TouchableOpacity>
      </View>

      {cartDataBookings.length ? (
        <View style={{flex: 1}}>
          <View style={{flex: 1}}>
            <ScrollView style={styles.content}>
              <MainContainer>
                <View style={styles.parentSection}>
                  <View style={styles.selfTestList}>
                    <FlatList
                      data={cartData.bookings}
                      showsVerticalScrollIndicator={false}
                      extraData={cartData.bookings}
                      renderItem={({item, index}) =>
                        renderSelfTextCard(item, index)
                      }
                    />
                  </View>
                </View>
                <View style={styles.sectionSeparator} />
                <View style={styles.youCanAddSection}>
                  <View style={styles.listHeading}>
                    <BoldText
                      title={'You can also add'}
                      style={styles.headingText}
                    />
                  </View>
                  <View style={styles.alsoAddListSection}>
                    <FlatList
                      data={topTest}
                      showsHorizontalScrollIndicator={false}
                      horizontal={true}
                      showsVerticalScrollIndicator={false}
                      extraData={topTest}
                      renderItem={({item}) => renderAlsoAddCard(item)}
                    />
                  </View>
                </View>
              </MainContainer>
            </ScrollView>
          </View>
          <View>
            <View style={styles.btnSection}>
              <CancelButton
                onPress={() =>
                  navigation.navigate('SearchLab', {
                    type: 'Test',
                    searchable: true,
                    bodyPartsCondition: true,
                  })
                }
                style={styles.submitBtn}
                title={'Add More Test'}
              />
              <SubmitButton
                onPress={moveToBookingDetail}
                style={styles.submitBtn}
                title={'Checkout'}
              />
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.emptyCart}>
          {!loader ? (
            <>
              <Image
                style={styles.emptyImage}
                source={imagesConstants.emptyCartImage}
              />
              <SubmitButton
                onPress={() =>
                  navigation.navigate('SearchLab', {
                    type: 'Test',
                    searchable: true,
                    bodyPartsCondition: true,
                  })
                }
                style={{width: '80%'}}
                title={'Browse Lab Test'}
              />
            </>
          ) : null}
        </View>
      )}
      <Loader display={loader} />
      <SelectPatientPopup
        navigation={navigation}
        newItemData={newItemData}
        onAddMember={onAddMember}
        onRequestClose={() => setVisible(false)}
        onPressCancel={() => setVisible(false)}
        onAddToCart={(data, packData) => moveAddToCart(data, packData)}
        visible={visible}
      />
    </SafeAreaView>
  );
};

export default index;

// Single Booking Code

// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   SafeAreaView,
//   TextInput,
//   Image,
//   TouchableOpacity,
//   FlatList,
//   ScrollView,
// } from 'react-native';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import {CancelButton, SubmitButton} from '../../../components/Buttons';
// import styles from './style';

// import DefaultHeader from '../../../components/DefaultHeader';
// import {BoldText, RegularText} from '../../../components/Common';
// import colors from '../../../../constants/colors';
// import imagesConstants from '../../../../constants/imagesConstants';
// import {
//   AlsoAddCard,
//   Loader,
//   MainContainer,
//   MyCartTestCard,
//   SelectPrimaryCard,
//   Toast,
// } from '../../../components';

// import {textConstants} from '../../../../constants/textConstants';
// import NetworkRequest, {
//   method,
//   servicesPoints,
// } from '../../../../services/NetworkRequest';
// import {AuthContext} from '../../../../../context/context';
// import NetworkRequestBlal, {
//   blalMethod,
//   blalServicesPoints,
// } from '../../../../services/NetworkRequestBlal';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const index = ({navigation}) => {
//   const {signOut} = React.useContext(AuthContext);
//   const [profilesData, setProfilesData] = useState([1]);
//   const [cartData, setCartData] = useState({});
//   const [bookingMembersTests, setBookingMembersTests] = useState([]);
//   const [familyMembersData, setFamilyMembersData] = useState([]);
//   const [topTest, setTopTest] = useState([]);
//   const [topPackages, setTopPackages] = useState([]);
//   const [loader, setLoader] = useState(true);
//   const [alsoAdd, setAlsoAdd] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
//   const [cityId, setCityId] = useState('');
//   const [panelId, setPanelId] = useState('');
//   const [testType, setTestType] = useState('');
//   const [refresh, setRefresh] = useState('');

//   useEffect(() => {
//     const unsubscribe = navigation.addListener('focus', () => {
//       getCityPanelId();
//       getMyCartData();
//     });
//     return unsubscribe;
//   }, [refresh]);

//   useEffect(() => {
//     if (cityId && panelId) {
//       getLastSearched();
//     }
//   }, [cityId]);

//   const getCityPanelId = async () => {
//     let city = await AsyncStorage.getItem('cityId');
//     let panel = await AsyncStorage.getItem('panelId');
//     setCityId(city);
//     setPanelId(panel);
//   };

//   const getMyCartData = async () => {
//     try {
//       const requestConfig = {
//         method: method.get,
//         url: servicesPoints.bookingServices.myCart,
//       };
//       const response = await NetworkRequest(requestConfig);

//       if (response) {
//         const {success} = response;
//         if (success) {
//           setCartData(response.data);
//           // setBookingMembersTests(response.data.booking_member_tests);
//           setFamilyMembersData(response.data?.family_members);
//           setCityId(
//             response.data?.family_members[0]?.booking_member_tests[0]?.city_id,
//           );
//           setPanelId(
//             response.data?.family_members[0]?.booking_member_tests[0]?.panel_id,
//           );
//           setTestType(
//             response.data?.family_members[0]?.booking_member_tests[0]
//               ?.test_type,
//           );

//           setLoader(false);
//         } else {
//           if (response === 'Network Error') {
//             Toast('Network Error', 0);

//             setLoader(false);
//           } else if (response.status === 401) {
//             signOut();
//           } else {
//             null;
//           }
//           setLoader(false);
//         }
//       }
//     } catch (err) {
//       setLoader(false);
//     }
//   };

//   const getLastSearched = async val => {
//     let data = {
//       PanelId: Number(panelId),
//       CityId: Number(cityId),
//       Limit: 5,
//     };
//     let requestConfig = {
//       data: data,
//       method: blalMethod.post,
//       url: `${blalServicesPoints.blalUserServices.GettopTest}?cityId=${data.CityId}&panelId=${data.PanelId}&Limit=${data.Limit}`,
//     };

//     const response = await NetworkRequestBlal(requestConfig);
//     if (response) {
//       const {status_Code} = response;
//       if (status_Code === 200) {
//         let data = [];
//         data = response.data.TestModel;
//         let newData = data.concat(response.data.PackageModel);
//         setTopTest(newData);
//         // setTopPackages(response.data.PackageModel);
//       } else {
//         setLoader(false);
//       }
//     }
//   };

//   const onDeleteTest = async item => {
//     try {
//       setLoader(true);
//       let data = {
//         itemId: item.toString(),
//       };
//       const requestConfig = {
//         method: method.post,
//         data: data,
//         url: servicesPoints.bookingServices.remove_member_item_from_cart,
//       };
//       const response = await NetworkRequest(requestConfig);

//       if (response) {
//         const {success} = response;
//         if (success) {
//           getMyCartData();
//         } else {
//           if (response === 'Network Error') {
//             Toast('Network Error', 0);
//             setLoader(false);
//           } else if (response.status === 401) {
//             signOut();
//           } else {
//             null;
//           }
//           setLoader(false);
//         }
//       }
//     } catch (err) {
//       setLoader(false);
//     }
//   };

//   const moveToBookingDetail = async item => {
//     await AsyncStorage.removeItem('cartBookingDate');
//     await AsyncStorage.removeItem('cartBookingAddress');
//     await AsyncStorage.removeItem('cartBookingTime');
//     await AsyncStorage.removeItem('Code');
//     navigation.navigate('BookingDetails');
//   };

//   const renderSelfTextCard = item => {
//     // let testList = getPackageDetail(item);
//     return (
//       // <MyCartTestCard  data={item} />
//       <MyCartTestCard
//         cancel={true}
//         onDeleteTest={data => onDeleteTest(data)}
//         data={item}
//       />
//     );
//   };

//   const renderAlsoAddCard = item => {
//     return (
//       <AlsoAddCard
//         data={item}
//         onPress={() =>
//           navigation.navigate('FullBodyCheckup', {
//             packageData: item,
//           })
//         }
//       />
//     );
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <DefaultHeader
//         onBack={() => navigation.goBack()}
//         title={textConstants.myCart.myCart}
//       />

//       {Object.keys(cartData).length !== 0 ? (
//         <View style={{flex: 1}}>
//           <View style={{flex: 1}}>
//             <ScrollView style={styles.content}>
//               <MainContainer>
//                 <View style={styles.parentSection}>
//                   <View style={styles.selfTestList}>
//                     <FlatList
//                       data={familyMembersData}
//                       showsVerticalScrollIndicator={false}
//                       extraData={familyMembersData}
//                       renderItem={({item}) => renderSelfTextCard(item)}
//                     />
//                   </View>
//                 </View>
//                 <View style={styles.sectionSeparator} />
//                 <View style={styles.youCanAddSection}>
//                   <View style={styles.listHeading}>
//                     <BoldText
//                       title={'You can also add'}
//                       style={styles.headingText}
//                     />
//                   </View>
//                   <View style={styles.alsoAddListSection}>
//                     <FlatList
//                       data={topTest}
//                       showsHorizontalScrollIndicator={false}
//                       horizontal={true}
//                       showsVerticalScrollIndicator={false}
//                       extraData={topTest}
//                       renderItem={({item}) => renderAlsoAddCard(item)}
//                     />
//                   </View>
//                 </View>
//               </MainContainer>
//             </ScrollView>
//           </View>
//           <View>
//             <View style={styles.btnSection}>
//               <CancelButton
//                 onPress={() => navigation.navigate('SearchLab', {type: 'Test'})}
//                 style={styles.submitBtn}
//                 title={'Add More Test'}
//               />
//               <SubmitButton
//                 onPress={moveToBookingDetail}
//                 style={styles.submitBtn}
//                 title={'Checkout'}
//               />
//             </View>
//           </View>
//         </View>
//       ) : (
//         <View style={styles.emptyCart}>
//           {!loader ? (
//             <Image
//               style={styles.emptyImage}
//               source={imagesConstants.emptyCartImage}
//             />
//           ) : null}
//         </View>
//       )}
//       <Loader display={loader} />
//     </SafeAreaView>
//   );
// };

// export default index;
