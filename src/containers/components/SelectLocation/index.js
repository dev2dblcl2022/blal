import React, {useEffect, useState} from 'react';
import {View, Modal, ActivityIndicator, Image, TextInput} from 'react-native';

import styles from './styles';
import {BackButton, SubmitButton} from '../../components/Buttons';
import imagesConstants from '../../../constants/imagesConstants';
import {BoldText, RegularText} from '../Common';
import {TouchableOpacity} from 'react-native-gesture-handler';
import colors from '../../../constants/colors';
export default props => {
  const [currentLocVisible, setVisible] = useState(props.currentLocVisible);
  // const [location, setLoacation] = useState(props.location);

  let {location} = props;

  // useEffect(() => {
  //   setVisible(props.currentLocVisible);
  // }, [props]);
  // console.log('ccc', props);

  // function btnConfirmLocation() {
  //   props.navigation.replace('AddNewAddress');
  // }

  return (
    <>
      {currentLocVisible ? (
        <View style={styles.modalContainer}>
          <View style={[styles.circleContainer]}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                backgroundColor: '#fff',
                paddingLeft: 20,
              }}>
              <Image
                style={styles.locationnImg}
                source={imagesConstants.location}
              />
              <BoldText
                style={styles.locationTitle}
                title={'Select your Location'}
              />
            </View>

            <View style={styles.textSection}>
              <View
                style={{
                  flex: 0.8,

                  justifyContent: 'center',
                }}>
                <RegularText
                  numberOfLines={2}
                  style={styles.addressLoc}
                  title={location}
                />
              </View>
              <View
                style={{
                  flex: 0.2,

                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('ChangeLocation')}
                  style={{flex: 1}}
                  hitSlop={{left: 50, right: 50, top: 50, bottom: 50}}>
                  <RegularText
                    style={[
                      styles.addressLoc,
                      {color: colors.app_theme_dark_green, fontWeight: 'bold'},
                    ]}
                    title={'Change'}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={[styles.whiteSection]}>
              <View style={styles.btnSection}>
                <SubmitButton
                  style={styles.submitBtn}
                  title={'Confirm Location'}
                  onPress={props.onConfirmLocation}
                />
              </View>
            </View>
          </View>
        </View>
      ) : null}
    </>
  );
};
