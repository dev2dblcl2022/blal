import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../../constants/colors';
import {MainContainer, PackageCard} from '../../../components';
import {BoldText, RegularText} from '../../../components/Common';
import HTMLView from 'react-native-htmlview';
import imagesConstants from '../../../../constants/imagesConstants';
import moment from 'moment';
export default function index({route, navigation}) {
  const {data} = route.params;

  let date = moment(`${data.created_at}`).fromNow();

  return (
    <SafeAreaView style={{flexGrow: 1}}>
      <MainContainer>
        <View style={{flexGrow: 1}}>
          <View style={{flex: 0.35}}>
            <TouchableOpacity style={styles.itemContainer}>
              <View style={styles.profilePicView}>
                <Image
                  resizeMode="cover"
                  style={styles.profilePic}
                  source={{uri: data.file}}
                />
              </View>
              <TouchableOpacity
                hitSlop={{left: 20, right: 20, top: 20, bottom: 20}}
                onPress={() => navigation.goBack()}
                style={{position: 'absolute', top: 15, left: 15}}>
                <Image source={imagesConstants.backGreen} />
              </TouchableOpacity>

              <View style={styles.dataSection}>
                <View style={{flex: 0.7, paddingLeft: 10}}>
                  <BoldText style={styles.nameText} title={data?.title} />
                </View>
                <View
                  style={{
                    flex: 0.5,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {/* <TouchableOpacity style={styles.buyNowBtn}> */}
                  <BoldText style={styles.buyNowText} title={date} />
                  {/* </TouchableOpacity> */}
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{padding: hp('1%'), flex: 0.6}}>
            <HTMLView
              textComponentProps={{style: {color: 'black'}}}
              value={data.description}
              stylesheet={styles.descriptionText}
            />
          </View>
        </View>
      </MainContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: 'white',

    marginTop: hp('1%'),
  },
  descriptionText: {
    color: 'black',
    fontSize: hp('2%'),
    marginTop: hp('1%'),
    lineHeight: 18,
  },
  profilePicSection: {flex: 0.2, alignItems: 'center'},
  profilePicView: {
    height: hp('22%'),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePic: {width: '100%', height: '100%', marginBottom: 17},
  dataSection: {
    marginTop: hp('2.5%'),
    flexDirection: 'row',
  },
  nameText: {fontSize: hp('2.8%'), color: colors.purplishGrey},
  buyNowText: {fontSize: hp('1.8%'), color: colors.app_theme_dark_green},
  emailText: {
    fontSize: hp('1.8%'),
    marginTop: hp('0.5%'),
    color: colors.app_theme_dark_green,
  },
  buyNowBtn: {
    backgroundColor: colors.app_theme_light_green,
    borderRadius: 20,
    paddingVertical: hp('1%'),
    paddingHorizontal: hp('2%'),
  },
  ageText: {
    fontSize: hp('1.5%'),
    marginTop: hp('0.5%'),
    color: colors.purplishGrey,
  },
  relationSection: {
    flex: 0.2,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  relationText: {
    fontSize: hp('1.5%'),
    marginTop: hp('0.5%'),
    color: colors.app_theme_light_green,
  },
});
