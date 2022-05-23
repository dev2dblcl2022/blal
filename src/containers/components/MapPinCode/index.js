import React, {useEffect, useState} from 'react';
import {View, Modal, ActivityIndicator, Image, TextInput} from 'react-native';

import styles from './styles';
import {BackButton, SubmitButton} from '../../components/Buttons';
import imagesConstants from '../../../constants/imagesConstants';
import {BoldText, RegularText} from '../Common';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CModal from '../CModal';
export default props => {
  const [pincodevisible, setVisible] = useState(props.pinCodeVisible);

  // useEffect(() => {
  //   setVisible(props.pincodevisible);
  // }, [props]);
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
        {props.pinCodeVisible ? (
          <View style={styles.modalContainer}>
            <View style={[styles.circleContainer]}>
              <View style={{paddingLeft: 30, paddingTop: 15}}>
                <BoldText style={styles.waitText} title={'Enter Pincode'} />
              </View>
              <View style={styles.whiteSection}>
                <View style={styles.textInputSection}>
                  <View style={styles.textInputView}>
                    <TextInput
                      placeholderTextColor={styles.placeholderColor}
                      style={styles.textInput}
                      placeholder={'Enter pincode'}
                      keyboardType={'numeric'}
                    />
                  </View>
                </View>
                <View style={styles.btnSection}>
                  <BackButton
                    style={styles.backBtnPinCode}
                    title={'Back'}
                    onPress={props.onPinBack}
                  />
                  <SubmitButton
                    style={styles.submitBtn}
                    title={'Apply Pincode'}
                    onPress={props.onApplyPin}
                  />
                </View>
              </View>
            </View>
          </View>
        ) : null}
      </CModal>
    </>
  );
};
