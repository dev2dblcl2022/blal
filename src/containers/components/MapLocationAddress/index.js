import React, {useEffect, useState} from 'react';
import {
  View,
  Modal,
  ActivityIndicator,
  Image,
  TextInput,
  FlatList,
} from 'react-native';

import styles from './styles';
import {BackButton, SubmitButton} from '../../components/Buttons';
import imagesConstants from '../../../constants/imagesConstants';
import {BoldText, RegularText} from '../Common';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LocationAddressCard from '../LocationAddressCard';
import CModal from '../CModal';
import NetworkRequest, {
  method,
  servicesPoints,
} from '../../../services/NetworkRequest';
export default props => {
  const [addresses, setAddresses] = useState([]);
  useEffect(() => {
    // const unsubscribe = navigation.addListener('focus', () => {
    getAddresses();
    // });
    // return unsubscribe;
  }, []);

  const getAddresses = async () => {
    const requestConfig = {
      method: method.get,
      url: servicesPoints.userServices.get_User_Address,
    };
    const response = await NetworkRequest(requestConfig);

    if (response) {
      // console.log('res', response);
      const {success} = response;
      if (success) {
        setAddresses(response.data);
      } else {
        console.log('res failure', response);
      }
    }
  };

  const renderAlsoAddCard = item => {
    return <LocationAddressCard data={item} />;
  };

  return (
    <>
      {/* <CModal
        isVisible={props.mapSelectionVisible}
        animationType="slide"
        closeModal={props.onRequestClose}> */}
      {props.mapSelectionVisible ? (
        <View style={styles.modalContainer}>
          <View style={[styles.circleContainer]}>
            <TouchableOpacity onPress={props.onDone}>
              <BoldText style={styles.doneText} title={'Done'} />
            </TouchableOpacity>
            {/**current location pincode */}
            <View style={styles.currentLocationSection}>
              <TouchableOpacity onPress={props.mapCurrentLocation}>
                <View style={{flexDirection: 'row'}}>
                  <Image style={{}} source={imagesConstants.mylocation} />
                  <RegularText
                    title={'Use Current Location'}
                    style={styles.gpsLocSection}
                  />
                </View>
                <RegularText
                  title={'Using GPS'}
                  style={styles.gpsLocSubSection}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{marginTop: 15}}
                onPress={props.enterPinCode}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    style={{marginLeft: 5}}
                    source={imagesConstants.location}
                  />
                  <RegularText
                    title={'Enter Pincode here'}
                    style={styles.gpsLocSection}
                  />
                </View>
                <RegularText
                  title={'Area Pincode'}
                  style={styles.gpsLocSubSection}
                />
              </TouchableOpacity>
            </View>
            {/**Load Local Address selection */}
            <View style={styles.youCanAddSection}>
              <View style={styles.listHeading}>
                <BoldText title={'Select Address'} style={styles.headingText} />
                <BoldText
                  onPress={() => props.navigation.navigate('AddNewAddress')}
                  title={'+ Add Address'}
                  style={styles.addAddress}
                />
              </View>
              <View style={styles.alsoAddListSection}>
                <FlatList
                  data={addresses}
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  showsVerticalScrollIndicator={false}
                  extraData={addresses}
                  renderItem={({item}) => renderAlsoAddCard(item)}
                />
              </View>
            </View>
            {/**+ Add New Address selection */}
            <View style={styles.btnSection}>
              <View>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('AddNewAddress')}
                  style={styles.addMemberSection}>
                  <BoldText
                    style={styles.addMemberText}
                    title={'+ Add New Address'}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      ) : null}
      {/* </CModal> */}
    </>
  );
};
