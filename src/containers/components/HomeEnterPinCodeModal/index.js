import React, {useEffect, useState} from 'react';
import {View, Modal, ActivityIndicator, Image, TextInput} from 'react-native';

import styles from './style';
import {BackButton, SubmitButton} from '../../components/Buttons';
import imagesConstants from '../../../constants/imagesConstants';
import {BoldText, RegularText} from '../Common';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CModal from '../CModal';
import NetworkRequest, {
  method,
  servicesPoints,
} from '../../../services/NetworkRequest';
import {Toast} from '..';
export default props => {
  const [pincodevisible, setVisible] = useState(props.pinCodeVisible);
  const [pinCode, setPinCode] = useState(props.pinCodeVisible);

  // useEffect(() => {
  //   setVisible(props.pincodevisible);
  // }, [props]);
  // console.log('ccc', props);

  // function btnCancelPinCode() {
  //   setVisible(false);
  // }
  // function btnApplyPinCode() {
  //   props.navigation.navigate('MapSetLocation');
  // }

  return (
    <>
      <CModal
        isVisible={props.pinCodeVisible}
        animationType="slide"
        closeModal={props.onRequestClose}>
        <View style={styles.modalContainer}>
          <View style={[styles.circleContainer]}>
            <View>
              <BoldText style={styles.waitText} title={'Enter Pincode'} />
            </View>
            <View style={[styles.whiteSection]}>
              <View style={[styles.textInputSection]}>
                <View style={[styles.textInputView]}>
                  <TextInput
                    placeholderTextColor={styles.placeholderColor}
                    style={[styles.textInput, {flex: 1}]}
                    value={props.value}
                    maxLength={6}
                    onChangeText={props.onChangeText}
                    placeholder={'Enter pincode'}
                    keyboardType={'numeric'}
                  />
                </View>
              </View>
              <View style={[styles.btnSection]}>
                <BackButton
                  style={styles.backBtnPinCode}
                  title={'Back'}
                  onPress={props.onPinBack}
                />
                <SubmitButton
                  style={styles.submitBtn}
                  title={'Apply Pincode'}
                  onPress={props.onApplyPinCode}
                />
              </View>
            </View>
          </View>
        </View>
      </CModal>
    </>
  );
};
