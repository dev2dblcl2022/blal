// import React, {useEffect} from 'react';
// import {View, Text, BackHandler} from 'react-native';
// import useBackHandler from '../../../components/useBackHandler';

// export default function index({navigation}) {

//   return (
//     <View>
//       <Text></Text>
//     </View>
//   );
// }

import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  BackHandler,
  Alert,
  Image,
  Linking,
  Platform,
} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import imagesConstants from '../../../../constants/imagesConstants';
import {SubmitButton} from '../../../components/Buttons';

export default function index({navigation}) {
  // useEffect(() => {
  //   const backAction = () => {
  //     Alert.alert('Hold on!', 'Are you sure you want to go back?', [
  //       {
  //         text: 'Cancel',
  //         onPress: () => null,
  //         style: 'cancel',
  //       },
  //       {text: 'YES', onPress: () => BackHandler.exitApp()},
  //     ]);
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );

  //   return () => backHandler.remove();
  // }, []);

  const dialCall = () => {
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = `tel:${9166125555}`;
    } else {
      phoneNumber = `telprompt:${9166125555}`;
    }

    Linking.openURL(phoneNumber);
  };

  return (
    <View style={styles.container}>
      <>
        <Image
          style={{height: hp('30%'), width: hp('30%')}}
          source={imagesConstants.phoneCallUs}
        />
        <SubmitButton
          onPress={dialCall}
          style={{width: '80%', marginTop: hp('8%')}}
          title={'Call Us'}
        />
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: hp('2%'),
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
