import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {Image, View, TouchableOpacity, Alert} from 'react-native';
import {AuthContext} from '../../../../context/context';
import imagesConstants from '../../../constants/imagesConstants';
import {BoldText, RegularText} from '../Common';
import styles from './style';

export default props => {
  const {signOut} = React.useContext(AuthContext);

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
      if (val === 0) {
        props.onMyReports();
      } else if (val === 1) {
        props.onUploadPrescription();
      } else if (val === 2) {
        props.onPharmacy();
      }
    }
  };
  return (
    <View style={styles.fourBtnSection}>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={props.browseLabTest}
          style={styles.browseLabCard}>
          <Image source={imagesConstants.browseLabTest} />
          <RegularText style={styles.browseLabText} title={'Browse Lab Test'} />
        </TouchableOpacity>
        <View style={{flex: 0.25}} />
        <TouchableOpacity
          onPress={() => onNext(0)}
          style={styles.browseLabCard}>
          <Image source={imagesConstants.reports} />
          <RegularText style={styles.browseLabText} title={'My Reports'} />
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => onNext(1)}
          style={styles.browseLabCard}>
          <Image source={imagesConstants.uploadprescription} />
          <RegularText
            style={styles.browseLabText}
            title={'Upload Prescription'}
          />
        </TouchableOpacity>
        <View style={{flex: 0.25}} />
        <TouchableOpacity
          onPress={() => onNext(2)}
          style={styles.browseLabCard}>
          <Image source={imagesConstants.pharmacy} />
          <RegularText style={styles.browseLabText} title={'Pharmacy'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
