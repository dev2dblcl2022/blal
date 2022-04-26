import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {AuthContext} from '../../../../../context/context';
import styles from './style';
import {BoldText, ErrorText, RegularText} from '../../../components/Common';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../../constants/colors';
import imagesConstants from '../../../../constants/imagesConstants';

const slides = [
  {
    key: 1,
    title: 'Book a test anytime, anywhere from your trusted laboratory',
    text: 'Test from NABL compliant lab only .Backed with Money back guarantee',
    image: imagesConstants.intro1,
    backgroundColor: '#59b2ab',
  },
  {
    key: 2,
    title:
      'Schedule a Home Collection or a visit to your nearby lab for testing, we make it easier for you',
    text: 'Store reports for life. Access them anytime, anywhere',
    image: imagesConstants.intro2,
    backgroundColor: '#febe29',
  },
  {
    key: 3,
    title:
      'Manage all your health records and chronic parameters with Smart Reports',
    text: 'A certified sample collector will collect your sample free of cost from your home',
    image: imagesConstants.intro3,
    backgroundColor: '#22bcb5',
  },
  {
    key: 4,
    title:
      'Track and get live updates on your Sample Journey until the report is ready',
    text: 'A certified sample collector will collect your sample free of cost from your home',
    image: imagesConstants.intro4,
    backgroundColor: '#22bcb5',
  },
];

const index = ({navigation}) => {
  const {intro, signUp} = React.useContext(AuthContext);

  const _renderDoneButton = () => {
    return (
      <View style={{marginTop: hp('2%')}}>
        <BoldText
          title={'Done'}
          style={{
            color: 'black',
            fontSize: hp('2%'),
          }}
        />
      </View>
    );
  };

  const _renderNextButton = () => {
    return (
      <View style={{marginTop: hp('2%')}}>
        <BoldText
          title={'Next'}
          style={{
            color: colors.app_theme_dark_green,
            fontSize: hp('2%'),
          }}
        />
      </View>
    );
  };

  const _renderSkipButton = () => {
    return (
      <View style={{marginTop: hp('2%'), backgroundColor: 'red'}}>
        <BoldText
          title={'Skip'}
          style={{
            color: colors.app_theme_dark_green,
            fontSize: hp('2%'),
          }}
        />
      </View>
    );
  };

  const _renderItem = ({item}) => {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 0.6}}>
          <Image
            style={{height: '100%', width: '100%'}}
            resizeMode={'cover'}
            source={item.image} //live
            // source={{uri:`${'https://pharmago.devtechnosys.tech/public/image/app_tutorial_screen/'}${item.image}`}} // local
          />
        </View>
        <View
          style={{
            flex: 0.4,
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,

              alignContent: 'center',
              marginBottom: hp('10%'),
              paddingHorizontal: hp('5%'),
            }}>
            <BoldText
              title={item.title}
              style={{
                fontSize: hp('2.4%'),
                lineHeight: hp('2.9'),
                marginBottom: hp('1%'),
                // fontFamily: 'Lato-Bold',
                color: 'rgb(0,0,0)',
                textAlign: 'center',
              }}
            />

            {/* <RegularText
              title={item.text}
              style={{
                textAlign: 'center',
                fontSize: hp('1.9%'),
                lineHeight: hp('3.4'),
                alignSelf: 'center',
                fontFamily: 'Lato-Regular',
                color: 'rgb(0,0,0)',
              }}
            /> */}
          </View>
        </View>
      </View>
    );
  };
  const _onDone = async () => {
    await AsyncStorage.setItem('Intro', 'done');
    signUp(null, null);
  };

  return (
    <View style={{flex: 1}}>
      <AppIntroSlider
        renderDoneButton={_renderDoneButton}
        renderSkipButton={_renderSkipButton}
        renderItem={_renderItem}
        data={slides}
        activeDotStyle={{backgroundColor: colors.app_theme_dark_green}}
        renderNextButton={_renderNextButton}
        onDone={_onDone}
      />
      <TouchableOpacity
        onPress={_onDone}
        style={{
          position: 'absolute',

          left: 20,
          bottom: 30,
        }}>
        <BoldText
          title={'Skip'}
          style={{
            color: colors.app_theme_dark_green,
            fontSize: hp('2%'),
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default index;
