import React, {useState} from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  Linking,
  Platform,
  FlatList,
} from 'react-native';
import imagesConstants from '../../../constants/imagesConstants';
import {BoldText, RegularText} from '../Common';
import styles from './style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../constants/colors';
import {Toast} from '..';
export default props => {
  const [facilities, setFacilities] = useState(false);

  let {
    Centre,
    Address,
    Latitude,
    Longitude,
    Contact,
    Address2,
    Distance,
    LabOpeningTime,
    LabClosingTime,
    LabFacilitiesModels,
  } = props?.data;

  let km = Number(Distance).toFixed(1);

  const dialCall = () => {
    // let firstPhoneNumber = Contact.split(',');
    let phoneNumber = Number(Contact);
    let CallNumber = '';
    if (Platform.OS === 'android') {
      CallNumber = `tel:${phoneNumber}`;
    } else {
      CallNumber = `telprompt:${phoneNumber}`;
    }

    Linking.openURL(CallNumber);
  };

  const openInMaps = () => {
    if (Latitude && Longitude) {
      const scheme = Platform.select({
        ios: 'maps:0,0?q=',
        android: 'geo:0,0?q=',
      });
      const latLng = `${Number(Latitude)},${Number(Longitude)}`;
      const label = `${Address} ${Address2}`;
      const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`,
      });

      Linking.openURL(url);
    } else {
      Toast('Location Not available', 0);
    }
  };

  return (
    <View style={styles.itemContainer}>
      <View style={styles.profilePicSection}>
        <BoldText style={styles.nameText} title={Centre} />
      </View>
      <View style={styles.dataSection}>
        <BoldText style={styles.addressText} title={`${Address} ${Address2}`} />

        <RegularText style={styles.kmText} title={`${km} Km away`} />
      </View>
      <View style={styles.openTimeSection}>
        <BoldText
          style={styles.timeText}
          title={`Open ${LabOpeningTime} - Closes ${LabClosingTime}`}
        />
      </View>
      <View style={[styles.facilitiesSection]}>
        <TouchableOpacity
          onPress={() => setFacilities(!facilities)}
          style={styles.facilitiesView}>
          {LabFacilitiesModels.length > 0 ? (
            <>
              <Image source={imagesConstants.facalities} />
              <BoldText
                style={styles.facilitiesText}
                title={
                  LabFacilitiesModels.length > 0
                    ? 'Facilities Available'
                    : 'No Facilities Available'
                }
              />
            </>
          ) : null}
        </TouchableOpacity>
        <View style={[styles.btnSection]}>
          <TouchableOpacity onPress={dialCall} style={styles.btnView}>
            <Image source={imagesConstants.call} />
            <RegularText style={styles.btnText} title={'Call'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={openInMaps} style={[styles.btnView]}>
            <Image source={imagesConstants.direction} />
            <RegularText style={styles.btnText} title={'Direction'} />
          </TouchableOpacity>
        </View>
      </View>
      {LabFacilitiesModels.length > 0 && facilities ? (
        <View style={{marginLeft: 10}}>
          <FlatList
            data={LabFacilitiesModels}
            showsVerticalScrollIndicator={false}
            extraData={LabFacilitiesModels}
            renderItem={({item}) => {
              return (
                <View style={{marginVertical: hp('1%')}}>
                  <RegularText
                    style={{
                      fontSize: hp('1.6%'),
                      color: colors.app_theme_light_green,
                    }}
                    title={`- ${item.Facility}`}
                  />
                </View>
              );
            }}
          />
        </View>
      ) : null}
    </View>
  );
};
