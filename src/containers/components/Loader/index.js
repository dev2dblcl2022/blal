import React from 'react';
import {View, Modal, ActivityIndicator, Image} from 'react-native';
import LottieView from 'lottie-react-native';
import styles from './styles';

import imagesConstants from '../../../constants/imagesConstants';
import {BoldText, RegularText} from '../Common';
export default props => {
  return (
    <Modal
      visible={props.display}
      animationType="fade"
      transparent={true}
      onRequestClose={undefined}>
      <View style={styles.modalContainer}>
        <View style={[styles.circleContainer]}>
          <View style={styles.whiteSection}>
            <View style={styles.logoContainer}>
              <Image style={styles.logo} source={imagesConstants.blalLogo} />
            </View>
            <View style={styles.animatedLoaderSection}>
              <LottieView
                source={require('../../../LoaderAnimation/blalLoader.json')}
                style={styles.lottie}
                autoPlay={true}
                loop={true}
              />
            </View>
            <View style={styles.textSection}>
              <BoldText style={styles.waitText} title={'Please wait '} />
              <RegularText
                style={styles.fetchingDetailText}
                title={`while we are fetching details`}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
