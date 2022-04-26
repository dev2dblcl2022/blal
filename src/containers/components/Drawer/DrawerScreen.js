import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import {Toast} from '..';
import {AuthContext} from '../../../../context/context';
import imagesConstants from '../../../constants/imagesConstants';
import NetworkRequest, {
  method,
  servicesPoints,
} from '../../../services/NetworkRequest';

import {RegularText} from '../Common';
import styles from './style';
import ZendeskChat from 'react-native-zendesk-chat';
import {useDrawerStatus} from '@react-navigation/drawer';
const DrawerScreen = ({navigation}) => {
  const {signOut, addressLabel} = React.useContext(AuthContext);

  const [userData, setUserData] = useState({});
  const isOpen = useDrawerStatus();

  useEffect(() => {
    if (isOpen) {
      getMyProfile();
    }
  }, [isOpen]);

  // useEffect(() => {
  //   getMyProfile();
  // }, []);

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
            signOut();
          } else {
            null;
          }
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const [data, setData] = useState([
    {id: 1, screenName: 'Bookings', screen: 'MyBookingStack'},
    {id: 2, screenName: 'My Family Members', screen: 'MyFamilyMembersStack'},
    {id: 3, screenName: 'Membership Cards', screen: 'MyMembershipStack'},
    {id: 4, screenName: 'My Account', screen: 'MyAccountStack'},
    {
      id: 5,
      screenName: 'My Prescriptions',
      screen: 'UploadedPrescriptionsStack',
    },
    {id: 6, screenName: 'My Reports', screen: 'MyReports'},
    {id: 7, screenName: 'Smart Reports', screen: 'SampleReport'},
    {id: 8, screenName: 'Addresses', screen: 'MyAddresses'},
    {id: 9, screenName: 'Blogs', screen: 'BlogStack'},
    {id: 10, screenName: 'Need Help ?', screen: 'NeedHelp'},
    {id: 11, screenName: 'About Dr. B Lal Lab', screen: 'AboutDrBlal'},
    {id: 12, screenName: 'Logout', screen: 'xyz'},
  ]);

  const onNext = async item => {
    let user = await AsyncStorage.getItem('userToken');
    if (user === 'GuestUser') {
      Alert.alert(
        'You are browsing as Guest, Please login to your account',
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
      if (item.id === 12) {
        await AsyncStorage.removeItem('LocationStatus');
        addressLabel('');
        signOut();

        // Logout();
      } else if (item.id === 10) {
        if (Platform.OS === 'ios') {
          navigation.navigate(item.screen);
        } else {
          startZendeskChat();
        }
      } else if (item.id === 8) {
        navigation.navigate(item.screen, {location: true});
      } else {
        navigation.navigate(item.screen);
      }
    }
  };

  const startZendeskChat = () => {
    // Optionally specify the appId provided by Zendesk
    // client secret key ==> U2Ak457QqbwyvMvfoVkCHbdMU7q4ps0Qi3QNf3DNAkj8rzL2WDmIVDuCZjCBp1OF
    ZendeskChat.init('GTgw066gP0PvWLeRulhoN5kAqSY07dU5');

    // console.log('this.state.userProfile ==> ', this.state.userProfile);
    ZendeskChat.startChat({
      name: userData.fullname,

      email: userData.email,
      phone: userData.phone_number,
      tags: ['support', 'help', 'zendesk'],

      // department: 'IT',
      // // The behaviorFlags are optional, and each default to 'true' if omitted
      // behaviorFlags: {
      //   showAgentAvailability: true,
      //   showChatTranscriptPrompt: true,
      //   showPreChatForm: true,
      //   showOfflineForm: true,
      // },
      // // The preChatFormOptions are optional & each defaults to "optional" if omitted
      // preChatFormOptions: {
      //   name: 'required',
      //   email: 'optional',
      //   phone: 'optional',
      //   department: 'required',
      // },
      // localizedDismissButtonTitle: 'Dismiss',
    });
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.fullSection}>
        <View style={styles.profileSection}>
          <View style={styles.profileView}>
            <Image
              style={styles.placeHolderImage}
              source={{uri: userData.photo}}
            />
          </View>
          <RegularText
            style={styles.profileNameText}
            title={userData?.fullname}
          />
        </View>
        <View style={styles.listSection}>
          <FlatList
            data={data}
            keyExtractor={data => data.id}
            extraData={data}
            ItemSeparatorComponent={() => {
              return <View style={styles.separator} />;
            }}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => onNext(item)}
                  style={styles.itemContainer}>
                  <View>
                    <RegularText
                      style={styles.itemText}
                      title={item.screenName}
                    />
                  </View>
                  <View>
                    <Image
                      style={styles.arrow}
                      source={imagesConstants.drawerArrow}
                    />
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DrawerScreen;
