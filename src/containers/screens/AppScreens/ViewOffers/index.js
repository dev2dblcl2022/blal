import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

import styles from './style';
import DefaultHeader from '../../../components/DefaultHeader';
import {BoldText, RegularText} from '../../../components/Common';
import {
  Header,
  Loader,
  MainContainer,
  MyCartTestCard,
  RemainderCard,
  SpecialInstructionView,
  Toast,
} from '../../../components';
import {textConstants} from '../../../../constants/textConstants';
import imagesConstants from '../../../../constants/imagesConstants';
import NetworkRequest, {
  method,
  servicesPoints,
} from '../../../../services/NetworkRequest';
import {AuthContext} from '../../../../../context/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../../../constants/colors';
import {heightPercentageToDP} from 'react-native-responsive-screen';

const index = ({navigation, props}) => {
  const {signOut, signIn} = React.useContext(AuthContext);
  const [data, setData] = useState([]);
  const [membershipOffers, setMembershipOffer] = useState([]);
  const [loader, setLoader] = useState(true);
  // const [loader, setLoader] = useState(false);
  const [handleConnectionState, setHandleConnectionState] = useState(false);
  useEffect(() => {
    if (handleConnectionState) {
      navigation.navigate('ConnectionHandle');
    }
  }, [handleConnectionState]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getOffers();
    });
    return unsubscribe;
  }, [navigation]);

  const getOffers = async () => {
    try {
      const requestConfig = {
        method: method.get,

        url: `${servicesPoints.couponServices.couponApiOffers}`,
      };

      const response = await NetworkRequest(requestConfig);
      if (response) {
        const {success} = response;
        if (success) {
          setData(response.data?.coupons);
          setMembershipOffer(response.data?.membership);
          setLoader(false);
        } else {
          Toast(response.message, 0);
          if (response === 'Network Error') {
            Toast('Network Error', 0);
            setHandleConnectionState(true);
            setLoader(false);
          } else if (response.status === 401) {
            signOut();
          } else {
            null;
          }
          setLoader(false);
        }
      } else {
        setLoader(false);
      }
    } catch (err) {
      console.log('err', err);
    }
  };

  const onBackWithCode = async (val, data, membership_id) => {
    await AsyncStorage.setItem('Code', val);
    await AsyncStorage.setItem('MembershipCode', data.toString());
    if (membership_id) {
      await AsyncStorage.setItem('MembershipCardId', membership_id);
    }

    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <DefaultHeader onBack={() => navigation.goBack()} title={'View Offers'} />
      <View style={styles.mainContainer}>
        <MainContainer>
          <View style={styles.selfSection}>
            <View style={{padding: 20}}>
              <BoldText
                style={{color: colors.app_theme_dark_green}}
                title={'Coupon Offers'}
              />
            </View>
            <FlatList
              data={data}
              // ItemSeparatorComponent={() => {
              //   return <View style={styles.listSeparator} />;
              // }}
              showsVerticalScrollIndicator={false}
              extraData={data}
              ListEmptyComponent={() => {
                return (
                  <View
                    style={{
                      height: '100%',

                      paddingTop: 100,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <BoldText
                      title={'No Offers Found'}
                      style={{
                        color: colors.app_theme_dark_green,
                        alignSelf: 'center',
                      }}
                    />
                  </View>
                );
              }}
              renderItem={({item}) => {
                return (
                  <View style={styles.itemContainer}>
                    <View style={styles.textSection}>
                      <RegularText style={styles.headText} title={item.name} />
                      <RegularText
                        style={styles.messageText}
                        title={item.description}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={() => onBackWithCode(item.code, 0, '')}
                      style={styles.logoSection}>
                      <View style={styles.imageView}>
                        <BoldText style={styles.codeText} title={item.code} />
                        {/* <BoldText style={styles.codeText} title={'asdads'} /> */}
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
          <View style={styles.selfSection}>
            <View style={{padding: 20}}>
              <BoldText
                style={{color: colors.app_theme_dark_green}}
                title={'Membership Offers'}
              />
            </View>
            <FlatList
              data={membershipOffers}
              // ItemSeparatorComponent={() => {
              //   return <View style={styles.listSeparator} />;
              // }}
              showsVerticalScrollIndicator={false}
              extraData={membershipOffers}
              ListEmptyComponent={() => {
                return (
                  <View
                    style={{
                      height: '100%',

                      paddingTop: 100,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <BoldText
                      title={'No Offers Found'}
                      style={{
                        color: colors.app_theme_dark_green,
                        alignSelf: 'center',
                      }}
                    />
                  </View>
                );
              }}
              renderItem={({item}) => {
                return (
                  <View style={styles.itemContainer}>
                    <View style={styles.textSection}>
                      <RegularText
                        style={styles.headText}
                        title={item.MembershipCardName}
                      />
                      <RegularText
                        style={styles.messageText}
                        title={item.description}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        onBackWithCode(item.CardNo, 1, item.MembershipCardID)
                      }
                      // onPress={() => alert('Under Development')}
                      style={styles.logoSection}>
                      <View style={styles.imageView}>
                        <BoldText style={styles.codeText} title={item.CardNo} />
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
        </MainContainer>
      </View>
      <Loader display={loader} />
    </SafeAreaView>
  );
};

export default index;
