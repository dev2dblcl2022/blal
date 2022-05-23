import React, {useEffect, useState} from 'react';

import {Alert, BackHandler, StyleSheet, Text, View} from 'react-native';
import {AuthContext} from '../../../../../context/context';
import NetworkRequest, {
  method,
  servicesPoints,
} from '../../../../services/NetworkRequest';
import {Loader, Toast} from '../../../components';
import ZendeskChat from 'react-native-zendesk-chat';
export default function index({navigation}) {
  const {signOut} = React.useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      navigation.goBack();
    });
    return unsubscribe;
  }, [navigation]);

  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', backAction);

  //   return () =>
  //     BackHandler.removeEventListener('hardwareBackPress', backAction);
  // }, []);

  // const backAction = () => {
  //   Alert.alert('Hold on!', 'Are you sure you want to go back?', [
  //     {
  //       text: 'Cancel',
  //       onPress: () => null,
  //       style: 'cancel',
  //     },
  //     {text: 'YES', onPress: () => BackHandler.exitApp()},
  //   ]);
  //   return true;
  // };

  // const getMyProfile = async () => {
  //   try {
  //     const requestConfig = {
  //       method: method.get,
  //       url: servicesPoints.userServices.my_profile,
  //     };

  //     const response = await NetworkRequest(requestConfig);
  //     if (response) {
  //       const {success} = response;
  //       if (success) {
  //         setUserData(response.data);
  //         setLoader(false);
  //         startZendeskChat();
  //       } else {
  //         if (response === 'Network Error') {
  //           Toast('Network Error', 0);
  //         } else if (response.status === 401) {
  //           signOut();
  //         } else {
  //           null;
  //         }
  //       }
  //     }
  //   } catch (error) {
  //   }
  // };

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
  return (
    <>
      <View style={{backgroundColor: 'white'}}>
        {/* <Text>NeedHelp</Text> */}
      </View>
      <Loader display={loader} />
    </>
  );
}

const styles = StyleSheet.create({});
