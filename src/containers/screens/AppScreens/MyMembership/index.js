import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SubmitButton} from '../../../components/Buttons';
import styles from './style';

import DefaultHeader from '../../../components/DefaultHeader';
import {BoldText, RegularText} from '../../../components/Common';

import {Loader, PackageCard, Toast} from '../../../components';
import imagesConstants from '../../../../constants/imagesConstants';
import colors from '../../../../constants/colors';
import style from './style';
import {textConstants} from '../../../../constants/textConstants';
import {AuthContext} from '../../../../../context/context';
import NetworkRequestBlal, {
  blalMethod,
  blalServicesPoints,
} from '../../../../services/NetworkRequestBlal';
import {LongPressGestureHandler} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
const index = ({navigation}) => {
  const {signOut, signIn} = React.useContext(AuthContext);
  const [profilesData, setProfilesData] = useState([1, 2, 3, 4]);
  const [loader, setLoader] = useState(true);
  const [membershipCards, setMembershipCards] = useState('');
  const [cityId, setCityId] = useState('');
  const [panelId, setPanelId] = useState('');
  const [userData, setUserData] = useState({});
  const [membershipData, setMembershipData] = useState([]);
  const [faqList, setFaqList] = useState([
    {question: 'Free 4 Package', answer: 'operation'},
    {question: 'Free 4 Hour visit', answer: 'blood'},
    {question: 'Free 4 Test', answer: 'mental report'},
    {question: '10 % discount on all bookings', answer: 'hospital'},
  ]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getCityPanelId();
    });
    return unsubscribe;
  }, [navigation]);

  // useEffect(async () => {
  //   if (cityId) {
  //     getMyMembership();
  //     // getMyMembershipCard();
  //   }
  // }, [cityId]);

  const getCityPanelId = async () => {
    // let city = await AsyncStorage.getItem('cityId');
    // let panel = await AsyncStorage.getItem('panelId');
    let userData = await AsyncStorage.getItem('userData');
    let parseData = JSON.parse(userData);
    getMyMembership(parseData?.user?.phone_number);
    setUserData(parseData);
    // setCityId(city);
    // setPanelId(panel);
  };

  const getMyMembership = async no => {
    try {
      let data = {
        // MobileNo: userData?.user?.phone_number,
        MobileNo: no,
      };
      const requestConfig = {
        method: blalMethod.post,
        // data: data,
        url: `${blalServicesPoints.blalUserServices.getMembership}?MobileNo=${data.MobileNo}`,
      };

      const response = await NetworkRequestBlal(requestConfig);

      if (response) {
        const {status_Code} = response;
        if (status_Code === 200) {
          setMembershipData(response?.data);
          setLoader(false);
        } else {
          setLoader(false);
        }
      }
    } catch (err) {
      console.log('err', err);
    }
  };

  const getMyMembershipCard = async () => {
    try {
      let data = {
        CityId: Number(cityId),
      };
      const requestConfig = {
        method: blalMethod.post,
        data: data,
        url: `${blalServicesPoints.blalUserServices.getMembershipCard}?CityId=${data.CityId}`,
      };

      const response = await NetworkRequestBlal(requestConfig);

      if (response) {
        const {status_Code} = response;
        if (status_Code === 200) {
          setMembershipCards(response?.data);
          setLoader(false);
        } else {
          setLoader(false);
          console.log('res failure', response);
        }
      }
    } catch (err) {
      setLoader(false);
      console.log('err', err);
    }
  };

  const renderCard = item => {
    return (
      <PackageCard
        data={item}
        onCardBuy={() => navigation.navigate('AddCard', {data: item})}
      />
    );
  };

  const onOpen = item => {
    let data = membershipData;
    data = data.map((itn, index) => {
      if (itn.MembershipCardID === item.MembershipCardID) {
        itn.selected = !itn.selected;
      }
      return itn;
    });
    setMembershipCards(data);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <DefaultHeader
        onBack={() => navigation.goBack()}
        title={'My Membership'}
      />
      <ScrollView style={styles.scroll}>
        <View style={styles.mainContainer}>
          <FlatList
            data={membershipData}
            extraData={membershipData}
            ListEmptyComponent={() => {
              return (
                <View
                  style={{
                    paddingVertical: hp('10%'),
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: hp('3%'),
                  }}>
                  <RegularText title={'No Membership Found'} />
                </View>
              );
            }}
            renderItem={({item}) => {
              let validTill = item.ValidTo.split(' ');
              return (
                <View style={styles.dataSectionOne}>
                  <View style={styles.listSection}>
                    <View style={styles.itemContainer}>
                      <View style={styles.profilePicView}>
                        <Image
                          style={styles.profilePic}
                          source={{uri: item.Image}}
                        />
                      </View>

                      <View style={styles.dataSection}>
                        <View style={{flex: 0.6}}>
                          <BoldText
                            style={styles.nameText}
                            title={item.MembershipCardName}
                          />
                          <RegularText
                            style={styles.emailText}
                            title={`${'\u20B9'} ${item.Amount}`}
                          />
                        </View>
                        <View style={styles.requestUpgradeSection}>
                          <View style={styles.buyNowBtn}>
                            <RegularText
                              style={styles.requestUpgradeText}
                              title={'Request Upgrade'}
                            />
                            <RegularText
                              style={styles.tillText}
                              title={`Valid Till : ${validTill[0]}`}
                            />
                          </View>
                        </View>
                      </View>
                    </View>

                    {item.CardInvestigationModel.length > 0 ? (
                      <View style={{marginTop: 20}}>
                        <FlatList
                          data={item.CardInvestigationModel}
                          horizontal={true}
                          extraData={item.CardInvestigationModel}
                          renderItem={({item}) => {
                            return (
                              <View
                                style={{
                                  marginTop: hp('2%'),
                                  width: hp('15%'),
                                  margin: hp('1%'),
                                }}>
                                <View style={style.serviceCardSection}>
                                  <View style={styles.timeSection}>
                                    <RegularText
                                      style={styles.timeCount}
                                      title={item.Remaining}
                                    />
                                    <RegularText
                                      style={styles.timeText}
                                      title={'Times'}
                                    />
                                  </View>
                                  <Image source={imagesConstants.house} />
                                  <RegularText
                                    style={styles.cardTitle}
                                    title={item.InvestigationShortName}
                                  />
                                </View>
                              </View>
                            );
                          }}
                        />
                      </View>
                    ) : null}

                    <View
                      style={{alignItems: 'flex-end', marginTop: hp('1.5%')}}>
                      <TouchableOpacity onPress={() => onOpen(item)}>
                        <BoldText
                          style={{
                            fontSize: hp('2%'),
                            fontWeight: '700',
                            color: colors.app_theme_dark_green,
                          }}
                          title={
                            item.selected ? 'Show Less...' : 'Show More...'
                          }
                        />
                      </TouchableOpacity>
                    </View>

                    {/* <View style={styles.servicesSection}>
                        <View style={{flex: 1, margin: 5}}>
                          <View style={style.serviceCardSection}>
                            <View style={styles.timeSection}>
                              <RegularText
                                style={styles.timeCount}
                                title={'4'}
                              />
                              <RegularText
                                style={styles.timeText}
                                title={'Times'}
                              />
                            </View>
                            <Image source={imagesConstants.house} />
                            <RegularText
                              style={styles.cardTitle}
                              title={'Free Home Visit'}
                            />
                          </View>
                        </View>
                        <View style={{flex: 1, margin: 5}}>
                          <View style={style.serviceCardSection}>
                            <View style={styles.timeSection}>
                              <RegularText
                                style={styles.timeCount}
                                title={'4'}
                              />
                              <RegularText
                                style={styles.timeText}
                                title={'Times'}
                              />
                            </View>
                            <Image source={imagesConstants.house} />
                            <RegularText
                              style={styles.cardTitle}
                              title={'Free Home Visit'}
                            />
                          </View>

                          <View />
                        </View>
                        <View style={{flex: 1, margin: 5}}>
                          <View style={style.serviceCardSection}>
                            <View style={styles.timeSection}>
                              <RegularText
                                style={styles.timeCount}
                                title={'4'}
                              />
                              <RegularText
                                style={styles.timeText}
                                title={'Times'}
                              />
                            </View>
                            <Image source={imagesConstants.house} />
                            <RegularText
                              style={styles.cardTitle}
                              title={'Free Home Visit'}
                            />
                          </View>

                          <View />
                        </View>
                      </View> */}

                    {item.selected ? (
                      <>
                        <View style={styles.fullBodyCheckupSection}>
                          <View style={styles.sectionOne}>
                            <View style={styles.headingTestSection}>
                              <BoldText
                                style={styles.sampleText}
                                title={'Patient Name'}
                              />
                            </View>
                            <View style={styles.instructionList}>
                              <FlatList
                                data={item.MemberDetailsListModel}
                                showsVerticalScrollIndicator={false}
                                extraData={item.MemberDetailsListModel}
                                ItemSeparatorComponent={() => {
                                  return (
                                    <View style={styles.listSepVertical} />
                                  );
                                }}
                                renderItem={item2 => {
                                  let patientData = item2.item;

                                  return (
                                    <View style={styles.patientSection}>
                                      <RegularText
                                        style={styles.patientText}
                                        title={`-${patientData.PatientName}`}
                                      />
                                    </View>
                                  );
                                }}
                              />
                            </View>
                          </View>
                        </View>
                        <View style={styles.validitySection}>
                          <BoldText
                            style={styles.sampleText}
                            title={'Associated Mobile'}
                          />

                          <RegularText
                            style={styles.validityValText}
                            title={userData.user.phone_number}
                          />
                        </View>
                      </>
                    ) : null}
                  </View>
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
      <View
        style={{
          flex: 0.1,
          padding: hp('2%'),
          justifyContent: 'center',
          backgroundColor: 'white',
        }}>
        <SubmitButton
          style={styles.submitBtn}
          onPress={() => navigation.navigate('SelectCard')}
          title={textConstants.btnText.requestNewCard}
        />
      </View>

      <Loader display={loader} />
    </SafeAreaView>
  );
};

export default index;
