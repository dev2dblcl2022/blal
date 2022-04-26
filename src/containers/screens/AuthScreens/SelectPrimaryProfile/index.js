import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SubmitButton} from '../../../components/Buttons';
import styles from './style';

import DefaultHeader from '../../../components/DefaultHeader';
import {BoldText, RegularText} from '../../../components/Common';
import colors from '../../../../constants/colors';
import imagesConstants from '../../../../constants/imagesConstants';
import {SelectPrimaryCard} from '../../../components';

const index = () => {
  const [profilesData, setProfilesData] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
  ]);

  const renderCard = () => {
    return <SelectPrimaryCard />;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <DefaultHeader title={'Select Primary Profile'} />
      <View style={styles.mainContainer}>
        <View style={styles.headingSection}>
          <BoldText
            style={styles.heading}
            title={'Select a Primary UHID Profile'}
          />
        </View>
        <View style={styles.dataSection}>
          <View style={styles.listSection}>
            <FlatList
              data={profilesData}
              showsVerticalScrollIndicator={false}
              extraData={profilesData}
              renderItem={renderCard}
            />
          </View>
          <View style={styles.btnSection}>
            <SubmitButton title={'Select Profile'} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default index;
