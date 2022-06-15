import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
  Linking,
  Platform,
  AppState,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../constants/colors';
import imagesConstants from '../../../constants/imagesConstants';
import {RegularText} from '../Common';
import NetworkRequest, {
  method,
  servicesPoints,
} from '../../../services/NetworkRequest';
import {Toast} from '..';
export default function BottomTabBar({state, descriptors, navigation}) {
  const appState = useRef(AppState.currentState);
  const [routeValue, setRouteValue] = useState('');
  const [userData, setUserData] = useState({});
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getMyProfile();
    });
    return unsubscribe;
  }, [navigation]);

  const getMyProfile = async () => {
    try {
      const requestConfig = {
        method: method.get,
        url: servicesPoints.userServices.my_profile,
      };

      const response = await NetworkRequest(requestConfig);
      if (response) {
        const {success} = response;
        if (success) {
          setUserData(response.data);
        } else {
          if (response === 'Network Error') {
            Toast('Network Error', 0);
          } else if (response.status === 401) {
            null;
          } else {
            null;
          }
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    if (routeValue === 'CallUs') {
      const subscription = AppState.addEventListener('change', nextAppState => {
        appState.current = nextAppState;
        setAppStateVisible(appState.current);
        navigation.goBack();
      });

      return () => {
        subscription.remove();
      };
    }
  }, [routeValue]);

  // const startZendeskChat = () => {
  //   // Optionally specify the appId provided by Zendesk
  //   // client secret key ==> U2Ak457QqbwyvMvfoVkCHbdMU7q4ps0Qi3QNf3DNAkj8rzL2WDmIVDuCZjCBp1OF
  //   ZendeskChat.init('GTgw066gP0PvWLeRulhoN5kAqSY07dU5');

  //   ZendeskChat.startChat({
  //     name: userData.fullname,

  //     email: userData.email,
  //     phone: userData.phone_number,
  //     tags: ['support', 'help', 'zendesk'],

  //     // department: 'IT',
  //     // // The behaviorFlags are optional, and each default to 'true' if omitted
  //     // behaviorFlags: {
  //     //   showAgentAvailability: true,
  //     //   showChatTranscriptPrompt: true,
  //     //   showPreChatForm: true,
  //     //   showOfflineForm: true,
  //     // },
  //     // // The preChatFormOptions are optional & each defaults to "optional" if omitted
  //     // preChatFormOptions: {
  //     //   name: 'required',
  //     //   email: 'optional',
  //     //   phone: 'optional',
  //     //   department: 'required',
  //     // },
  //     // localizedDismissButtonTitle: 'Dismiss',
  //   });
  // };

  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  const onCallBlal = () => {
    // Alert.alert(
    //   'Are you sure want to call with',
    //   'BLal +91 9166125555',
    //   [
    //     {
    //       text: 'Cancel',
    //       onPress: () => navigation.goBack(),
    //     },
    //     {
    //       text: 'Call',
    //       onPress: dialCall,
    //     },
    //   ],
    //   {cancelable: false},
    // );
    dialCall();
  };
  const onCallSearch = () => {
    navigation.navigate('SearchLab', {
      // type: 'Package',
      bodyPartsCondition: false,
      searchable: true,
      // imageType: 'Package',
    });
  };

  const dialCall = () => {
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = `tel:${9166125555}`;
    } else {
      phoneNumber = `telprompt:${9166125555}`;
    }

    Linking.openURL(phoneNumber);
    navigation.goBack();
  };

  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: 'row',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,

          borderTopWidth: 2,
          borderColor: colors.gray,
          backgroundColor: 'white',
        }}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];

          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : route.name !== undefined
              ? options.title
              : route.name;
          const image =
            route.name === 'Home'
              ? imagesConstants.inactiveHome
              : // : route.name === 'Search'
              // ? imagesConstants.inactiveSearch
              route.name === 'Need Help'
              ? imagesConstants.inactiveNeedHelp
              : route.name === 'Call Us'
              ? imagesConstants.inactiveCall
              : route.name === 'My Account'
              ? imagesConstants.inactiveMyAccount
              : null;
          const activeImage =
            route.name === 'Home'
              ? imagesConstants.activeHome
              : // : route.name === 'Search'
              // ? imagesConstants.activeSearch
              route.name === 'Need Help'
              ? imagesConstants.activeNeedHelp
              : route.name === 'Call Us'
              ? imagesConstants.activeCall
              : route.name === 'My Account'
              ? imagesConstants.activeMyAccount
              : null;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,

              canPreventDefault: true,
            });

            if (route.name === 'Call Us') {
              setRouteValue(route.name);
              onCallBlal();
            }
            if (route.name === 'Need Help') {
              setRouteValue(route.name);

              if (Platform.OS === 'ios') {
                alert('In next version you will use Need Help');
              } else {
                const supported = Linking.canOpenURL(`whatsapp://send?phone=${"+91-9166125555"}`);
                if (supported) {
                  Linking.openURL(`whatsapp://send?phone=${"+91-9166125555"}`);
                }

              }
            }
            if (route.name === 'Home') {
              setRouteValue(route.name);
            }
            if (route.name === 'My Account') {
              setRouteValue(route.name);
            }
            if (route.name === 'Search') {
              setRouteValue(route.name);
              onCallSearch();
            }

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flex: 1,
                backgroundColor: 'white',
                height: hp('8%'),
                elevation: 3,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flex: 1,

                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  style={{height: 20, width: 20}}
                  source={isFocused ? activeImage : image}
                />
                <RegularText
                  title={route.name}
                  style={{
                    fontSize: 10,
                    marginTop: 5,
                    color: isFocused
                      ? colors.app_theme_dark_green
                      : colors.black,
                    alignItems: 'center',
                  }}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}
