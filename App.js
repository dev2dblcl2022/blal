import React, {useEffect, useMemo, useReducer} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Modal,
  BackHandler,
  SafeAreaView,
  StatusBar,
  Image,
  StyleSheet,
  DeviceEventEmitter,
  Platform,
  Button,
} from 'react-native';
// import SpInAppUpdates, {
//   UPDATE_TYPE,
//   NeedsUpdateResponseAndroid,
//   SemverVersion,
//   NeedsUpdateResponse,
//   IncomingStatusUpdateEvent,
//   IAUUpdateKind,
// } from 'sp-react-native-in-app-updates';
import analytics from '@react-native-firebase/analytics';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import NetInfo from '@react-native-community/netinfo';
// import {firebase} from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import {AuthContext} from './context/context';
import {UserContext} from './context/context';
import AppIntroStack from './src/navigations/AppIntroStack';
import AuthStack from './src/navigations/AuthStack';
import AppStack from './src/navigations/AppStack';
// import {NativeBaseProvider, Box, Root} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import colors from './src/constants/colors';
import {Toast} from './src/containers/components';
import imagesConstants from './src/constants/imagesConstants';
import {SubmitButton} from './src/containers/components/Buttons';
import {NavigationContainer} from '@react-navigation/native';
import PushNotificationService from './src/services/PushNotificationService';
import FlashMessage from 'react-native-flash-message';
import 'react-native-gesture-handler';
import DeviceInfo from 'react-native-device-info';
import InAppUpdate from './InAppUpdate';
const HIGH_PRIORITY_UPDATE = 5;
let PNService = null;
let version = DeviceInfo.getVersion();

export default function App() {
  const [netConnected, setNetConnected] = React.useState(true);

  const [needsUpdate, setNeedsUpdate] = React.useState(false);
  const [otherData, setOtherData] = React.useState(null);
  const navigationRef = React.useRef();
  const routeNameRef = React.useRef();
  // let inAppUpdates = new SpInAppUpdates();

  useEffect(() => {
    getFcmToken();
    PNService = new PushNotificationService(
      handlePNRegister,
      handlePushNotification,
    );
    // const unsubscribe = dynamicLinks().onLink(handleDynamicLink);

    return () => {
      PNService = null;
      // unsubscribe();
    };
  }, []);
  // const checkForUpdates = () => {
  //   inAppUpdates
  //     .checkNeedsUpdate({
  //       curVersion: version,
  //       toSemverConverter: ver => {
  //         // i.e if 400401 is the Android version, and we want to convert it to 4.4.1
  //         const androidVersionNo = parseInt(ver, 10);

  //         const majorVer = Math.trunc(androidVersionNo / 10000);
  //         const minorVerStarter = androidVersionNo - majorVer * 10000;
  //         const minorVer = Math.trunc(minorVerStarter / 100);
  //         const patchVersion = Math.trunc(minorVerStarter - minorVer * 100);
  //         return `${majorVer}.${minorVer}.${patchVersion}`;
  //       },
  //     })
  //     .then(result => {
  //       setNeedsUpdate(result.shouldUpdate);
  //       setOtherData(result);
  //     });
  // };
  // useEffect(() => {
  //   checkForUpdates();
  // }, []);

  useEffect(() => {
    InAppUpdate.checkUpdate(); // this is how you check for update
  }, []);
  // const startUpdating = () => {
  //   if (needsUpdate) {
  //     let updateType;
  //     if (Platform.OS === 'android' && otherData) {
  //       const otherDatas = otherData;
  //       updateType =
  //         otherDatas.updatePriority >= HIGH_PRIORITY_UPDATE
  //           ? UPDATE_TYPE.IMMEDIATE
  //           : UPDATE_TYPE.FLEXIBLE;
  //     }
  //     inAppUpdates.addStatusUpdateListener(onStatusUpdate);
  //     inAppUpdates.startUpdate({
  //       updateType, // android only, on iOS the user will be promped to go to your app store page
  //     });
  //   } else {
  //     alert('doesnt look like we need an update');
  //   }
  // };
  // const onStatusUpdate = status => {
  //   const {
  //     // status,
  //     bytesDownloaded,
  //     totalBytesToDownload,
  //   } = status;
  //   // do something
  //   console.log('rrrr', `@@ ${JSON.stringify(status)}`);
  // };
  const handlePNRegister = async config => {
    // try {
    //   await AsyncStorage.setItem('fcmToken', config.token);
    // } catch (error) {
    //   console.log(error.message);
    // }
  };

  const getFcmToken = async () => {
    AsyncStorage.getItem('fcmToken', async (err1, fcmToken) => {
      if (!fcmToken) {
        // fcmToken = await firebase.messaging().getToken();
        // await AsyncStorage.setItem('fcmToken', fcmToken);
        // global.fcmToken = fcmToken;
      } else {
        await AsyncStorage.setItem('fcmToken', fcmToken);
        global.fcmToken = fcmToken;
      }
    });
  };

  const handlePushNotification = notification => {
    const {foreground, userInteraction, id, data} = notification;
    DeviceEventEmitter.emit('notificationCome', true);
    // for firing local notification
    if (foreground) {
      PNService.localNotification(notification);
    }

    // for handling notification opened app
    if (userInteraction) {
      // if (foreground) {
      //   if (data.type === '2' || data.type === '6') {
      //     RootNavigation.navigate('MyAccount', {screen: 'Subscription'});
      //   } else if (data.type === '3') {
      //     RootNavigation.navigate('MyPropertyTab');
      //   } else if (
      //     data.type === '4' ||
      //     data.type === '9' ||
      //     data.type === '5'
      //   ) {
      //     RootNavigation.navigate('MyAccount', {screen: 'CallManageProperty'});
      //   } else if (data.type === '8') {
      //   }
      //   // PNService.removeDeliveredNotifications([`${id}`]);
      //   PNService.removeAllDeliveredNotifications();
      // } else {
      //   if (data.type === '2' || data.type === '6') {
      //     RootNavigation.navigate('MyAccount', {screen: 'Subscription'});
      //   } else if (data.type === '3') {
      //     RootNavigation.navigate('MyPropertyTab');
      //   } else if (
      //     data.type === '4' ||
      //     data.type === '9' ||
      //     data.type === '5'
      //   ) {
      //     RootNavigation.navigate('MyAccount');
      //   } else if (data.type === '8') {
      //   }
      // }
    }
  };

  // const PNService = new PushNotificationService(
  //   handlePNRegister,
  //   handlePushNotification,
  // );

  // const handlePNRegister = async token => {
  //   try {
  //     await AsyncStorage.setItem('fcmToken', token.token);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };
  // const handlePushNotification = notification => {
  //   const {foreground, userInteraction} = notification;
  //   // for firing local notification
  //   if (foreground) {
  //     PNService.localNotification(notification);
  //   }
  //   // for handling notification opened app
  //   if (userInteraction) {
  //     if (foreground) {
  //       // for foreground state
  //     } else {
  //       // for background and quit state
  //     }
  //   }
  // };

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
        case 'HomeAddressLabel':
          return {
            ...prevState,
            label: action.label ? action.label : '',
          };
        case 'CurrentLocation':
          return {
            ...prevState,
            location: '',
          };
        case 'CHECK_INTRO':
          return {
            ...prevState,
            intro: action.token,
            isLoading: false,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      location: '0',
      intro: false,
    },
  );
  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;
      let intro;
      let location;
      try {
        userToken = await AsyncStorage.getItem('userToken');
        let userData = await AsyncStorage.getItem('userData');
        location = await AsyncStorage.getItem('location');
        intro = await AsyncStorage.getItem('Intro');
      } catch (e) {
        // Restoring token failed
      }

      // const unsubscribe = NetInfo.addEventListener(state => {
      //   if (state.isConnected) {
      //     global.isConnected = true;
      //     DeviceEventEmitter.emit('netConnected', true);
      //     setNetConnected(state.isConnected);
      //   } else {
      //     global.isConnected = false;
      //     setNetConnected(state.isConnected);
      //   }
      // });

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      // await dispatch({ type: 'RESTORE_TOKEN', token: userToken });
      await dispatch({type: 'CHECK_INTRO', token: intro});
      await dispatch({type: 'RESTORE_TOKEN', token: userToken});
      await dispatch({type: 'CurrentLocation', location: location});

      SplashScreen.hide();
    };

    bootstrapAsync();
  }, []);

  // const isConnected = async () => {
  //   await fetch('https://www.google.com/')
  //     .then(response => {
  //       if (response.ok) {
  //         global.isConnected = true;
  //         setNetConnected(true);
  //       } else {
  //         Toast('Unable to connect to the internet.');
  //       }
  //     })
  //     .catch(error => {
  //       Toast('Unable to connect to the internet.');
  //       return false;
  //     });
  // };

  // const _renderModelView = () => {
  //   return (
  //     <Modal
  //       animationType="slide"
  //       transparent={true}
  //       visible={!netConnected}
  //       onRequestClose={() => {
  //         BackHandler.exitApp();
  //       }}>
  //       <SafeAreaView style={styles.container}>
  //         <View style={styles.subView}>
  //           <StatusBar barStyle="dark-content" />
  //           {/* <Image
  //             style={{height: hp('15%'), width: hp('18%')}}
  //             source={imagesConstants.blalLogo}
  //           /> */}
  //           <Text style={[styles.failed, {alignSelf: 'center'}]}>
  //             {'Connection Failed!'}
  //           </Text>
  // <Text style={[styles.tried, {alignSelf: 'center'}]}>
  //   I tried my best but it looks like there is no connectivity. Please
  //   check your internet connection.
  // </Text>
  //           <SubmitButton
  //             onPress={() => isConnected()}
  //             style={{width: hp('20%')}}
  //             title="RETRY"
  //           />
  //         </View>
  //       </SafeAreaView>
  //     </Modal>
  //   );
  // };

  const authContext = useMemo(
    () => ({
      signIn: async (data, temp) => {
        //  data.image_path=temp,
        await AsyncStorage.setItem('userToken', temp);
        await AsyncStorage.setItem('userData', JSON.stringify(data));
        dispatch({type: 'SIGN_IN', token: temp});
      },

      signOut: async data => {
        await AsyncStorage.removeItem('userToken');
        // await AsyncStorage.removeItem('userData'),
        dispatch({type: 'SIGN_OUT'});
      },
      signUp: async data => {
        // await AsyncStorage.setItem('userToken',temp)
        dispatch({type: 'CHECK_INTRO', token: true});
      },
      addressLabel: async data => {
        await AsyncStorage.setItem('addressLabel', data);
        dispatch({type: 'HomeAddressLabel', label: data});
      },
      location: async data => {
        await AsyncStorage.setItem('location', data);
        dispatch({type: 'CurrentLocation', location: data});
      },
    }),
    [],
  );

  if (state.isLoading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator color={colors.app_theme_dark_green} size="large" />
      </View>
    );
  }

  const onChoose = () => {
    if (!state.userToken && !state.intro) {
      return <AppIntroStack />;
    } else if (!state.userToken && state.intro) {
      return <AuthStack />;
    } else {
      return (
        <UserContext.Provider value={state}>
          <AppStack />
        </UserContext.Provider>
      );
    }
  };
  const setCurrentScreenAnalytics = async screenName => {
    await analytics()
      .logScreenView({screen_name: screenName})
      .then(() => console.log('setCurrentScreenAnalyticsSuccess', screenName))
      .catch(e => console.log('Analytic Error', e));
  };

  return (
    <>
      {/* <NativeBaseProvider> */}
      <AuthContext.Provider value={authContext}>
        {/* {onChoose()} */}
        <NavigationContainer
          onReady={() =>
            (routeNameRef.current =
              navigationRef.current.getCurrentRoute().name)
          }
          ref={navigationRef}
          onStateChange={async () => {
            const previousRouteName = routeNameRef.current;
            const currentRouteName =
              navigationRef.current.getCurrentRoute().name;
            routeNameRef.current = currentRouteName;
            setCurrentScreenAnalytics(currentRouteName);
          }}>
          {/* {_renderModelView()} */}
          {onChoose()}
        </NavigationContainer>
      </AuthContext.Provider>
      {/* </NativeBaseProvider> */}
      <FlashMessage position="top" animated hideOnPress autoHide />

      {/* {needsUpdate ? (
        <View style={styles.aButton}>
          <Button
            // disabled={!needsUpdate}
            title="Start Updating"
            color="black"
            onPress={startUpdating}
          />
        </View>
      ) : null} */}
      {/* <View style={styles.aButton}>
        <Button
          title="Check for updates"
          color="black"
          onPress={checkForUpdates}
        />
      </View> */}
    </>
  );
}

const styles = StyleSheet.create({
  tried: {
    alignSelf: 'flex-start',
    marginTop: 15,
    marginBottom: 25,
    fontFamily: 'Lato-Regulr',
    fontSize: hp('2%'),
    textAlign: 'center',
    color: colors.app_theme_dark_green,
  },
  failed: {
    alignSelf: 'flex-start',
    fontFamily: 'Lato-Bold',
    fontSize: hp('2.8%'),
    marginTop: 15,
    color: colors.app_theme_dark_green,
  },
  container: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.80)',
    alignItems: 'center',
  },
  subView: {
    justifyContent: 'center',
    paddingVertical: hp('3%'),
    paddingHorizontal: hp('2%'),
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 20,
    margin: 10,
  },
});
