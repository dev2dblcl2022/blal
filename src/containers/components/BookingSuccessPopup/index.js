import React, {useEffect, useState} from 'react';
import {View, Modal, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import imagesConstants from '../../../constants/imagesConstants';
import {BoldText, RegularText} from '../Common';
export default props => {
  let {booking_id, datetime} = props?.data;
  const [successVisible, setSuccessVisible] = useState(props.successVisible);

  useEffect(() => {
    setSuccessVisible(props.successVisible);
  }, [props]);

  function reuestClickOutside() {
    props.onClose();
  }

  return (
    <Modal
      animationOut="slideOutDown"
      visible={successVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={reuestClickOutside}>
      <TouchableOpacity
        onPress={() => reuestClickOutside()}
        style={styles.mainView}>
        <View style={styles.mainView}>
          <View style={styles.modalContainer}>
            <View style={[styles.circleContainer]}>
              <View style={styles.whiteSection}>
                <View style={styles.logoContainer}>
                  <Image
                    style={styles.logo}
                    source={imagesConstants.booking_success}
                  />
                </View>
                <View style={styles.animatedLoaderSection}></View>
                <View style={styles.textSection}>
                  <BoldText
                    style={styles.successText}
                    title={'Booking Successful'}
                  />

                  <RegularText
                    style={styles.dateTimeText}
                    title={
                      props.uploadPrescription
                        ? 'Thank you for Submitting the Prescriptions.Our team will get back to you soon.'
                        : 'Thank you for Booking'
                    }
                  />

                  <BoldText
                    style={styles.successText}
                    title={`BookingID #${booking_id}`}
                  />
                  {/* <BoldText
                    style={styles.successText}
                    title={`BookingID ${'booking_id'}`}
                  /> */}
                  {props.uploadPrescription ? (
                    <RegularText
                      style={styles.dateTimeText}
                      title={`Upload Date and Time ${datetime}`}
                    />
                  ) : null}
                  {/* <RegularText
                    style={styles.dateTimeText}
                    title={`Upload Date and Time ${'datetime'}`}
                  /> */}
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};
