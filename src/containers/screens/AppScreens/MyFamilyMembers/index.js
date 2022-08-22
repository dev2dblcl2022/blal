import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
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
import {
  LinkUhidCard,
  Loader,
  MyFamilyMemberCard,
  SelectPrimaryCard,
  Toast,
} from '../../../components';
import NetworkRequest, {
  method,
  servicesPoints,
} from '../../../../services/NetworkRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';

const index = ({navigation}) => {
  const [primaryUhidUserData, setPrimaryUhidUserData] = useState({});
  const [loader, setLoader] = useState(true);
  const [membersData, setMembersData] = useState([]);
  const [userData, setUserData] = useState({});
  const [allMembersData, setAllMembersData] = useState([]);
  const [primaryUHID, setPrimaryUHID] = useState(false);
  const [linkedUhid, setLinkedUhid] = useState(false);

  const [selection, setSelection] = useState(false);
  const [linkUHIDselection, setLinkUHIDselection] = useState(false);
  const [selectionLinkMember, setSelectionLinkMember] = useState(false);
  const [showLinkedMembers, setShowLinkedMembers] = useState(false);
  const [handleConnectionState, setHandleConnectionState] = useState(false);
  const [address, setAddresses] = useState([]);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    if (handleConnectionState) {
      navigation.navigate('ConnectionHandle');
    }
  }, [handleConnectionState]);
  const renderCard = item => {
    return (
      <LinkUhidCard
        selection={selectionLinkMember && linkUHIDselection}
        data={item}
        onSelectLinkedRemove={() => onRemoveLinkedMember(item)}
      />
    );
  };

  const renderAllMembers = item => {
    if (item.uhid_link === 'primary') {
      item.selected = true;
    }
    if (item.uhid_link === 'linked') {
      return null;
    } else {
      return (
        <MyFamilyMemberCard
          selectView={true}
          selection={!primaryUHID || !selection}
          data={item}
          emailIdShown={true}
          deActiveView={true}
          uhid={userData.user.uhid}
          onPressDeactivate={() => setMemberDeactivate(item)}
          onSelectPrimary={() => onselectForPrimary(item)}
          onEditFamily={() => onEditFamily(item)}
          editMember={true}
        />
      );
    }
  };
  const onselectForPrimary = item => {
    let data = allMembersData;
    data = data.map((itn, index) => {
      if (itn.id == item.id) {
        itn.selected = true;
      } else {
        itn.selected = false;
      }
      return itn;
    });

    setAllMembersData(data);
    onSelectPrimaryAlert(item, data);
  };
  const onSelectPrimaryAlert = (item, data) => {
    Alert.alert(
      `Are you sure to set this uhid as primary uhid`,
      ``,
      [
        {text: 'Yes', onPress: () => onApiAddressPrimary(item, data)},
        {
          text: 'Cancel',
          onPress: () => {
            item.selected = false;
            setUpdate(!update);
          },
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };
  const onApiAddressPrimary = async (item, filterData) => {
    try {
      setLoader(true);
      let data = {
        PatientId: item.uhid,
      };
      const requestConfig = {
        method: method.post,
        data: data,
        url: servicesPoints.userServices.set_primary_member,
      };

      const response = await NetworkRequest(requestConfig);

      if (response) {
        const {success} = response;
        if (success) {
          setAddresses(filterData);
          getMyFamilyMembers();
          setLoader(false);
          Toast(response.message, 1);
        } else {
          Toast(response.message, 0);
          if (response === 'Network Error') {
            Toast('Network Error', 0);
            setHandleConnectionState(true);
            setLoader(false);
          } else if (response.status === 401) {
            // signOut();
          } else {
            null;
          }
          setLoader(false);
        }
      }
    } catch (err) {
      setLoader(false);
    }
  };
  const onRemoveLinkedMember = item => {
    let data = allMembersData;
    data = data.map((itn, index) => {
      if (itn.id == item.id) {
        itn.selected = !itn.selected;
      }
      return itn;
    });
    setAllMembersData(data);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUserData();
      getMyFamilyMembers();
    });
    return unsubscribe;
  }, [navigation]);
  const onEditFamily = async item => {
    navigation.navigate('AddFamilyMember', {data: item});
  };
  const getUserData = async () => {
    let userData = await AsyncStorage.getItem('userData');
    let parseData = JSON.parse(userData);
    setUserData(parseData);
  };

  const getMyFamilyMembers = async () => {
    const requestConfig = {
      method: method.get,
      url: servicesPoints.userServices.my_family_mambers,
    };

    const response = await NetworkRequest(requestConfig);
    if (response) {
      const {success} = response;
      if (success) {
        setAllMembersData(response.data);

        setMembersData(response.data);

        var primaryUhid = response.data.find(item => {
          return item.uhid_link === 'primary';
        });
        var linkedUhid = response.data.find(item => {
          return item.uhid_link === 'linked';
        });
        setLinkedUhid(linkedUhid ? true : false);

        setPrimaryUHID(primaryUhid ? true : false);
        setPrimaryUhidUserData(primaryUhid ? primaryUhid : null);

        setLoader(false);
      } else {
        if (response === 'Network Error') {
          Toast('Network Error', 0);
          setHandleConnectionState(true);
          setLoader(false);
        }
        setLoader(false);
      }
    } else {
      setLoader(true);
    }
  };

  const setMemberDeactivate = async item => {
    Alert.alert(
      `Are you sure to deactivate ${item.fullname}`,
      `This is irreversible action and you won't be able to access bookings/ reports for this.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Deactivate',
          onPress: () => onDeactivate(item),
        },
      ],
      {cancelable: false},
    );
  };

  const onDeactivate = async item => {
    try {
      setLoader(true);
      let data = {
        PatientId: item.uhid,
      };
      const requestConfig = {
        method: method.post,
        data: data,
        url: servicesPoints.userServices.deactive_patient,
      };
      const response = await NetworkRequest(requestConfig);

      if (response) {
        const {success} = response;
        if (success) {
          setLoader(false);
          getMyFamilyMembers();
        } else {
          if (response === 'Network Error') {
            Toast('Network Error', 0);
            setHandleConnectionState(true);
            setLoader(false);
          }
          setLoader(false);
        }
      } else {
        setLoader(false);
      }
    } catch (err) {
      console.log('err is', err);
    }
  };

  const onShowLinkedMembers = () => {
    setLinkUHIDselection(true);
    setShowLinkedMembers(!showLinkedMembers);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <DefaultHeader
        onBack={() => navigation.goBack()}
        title={'My family Members'}
      />
      <View style={styles.mainContainer}>
        {/* <View style={styles.headingSection}>
          <BoldText
            style={styles.heading}
            title={'Select a Primary UHID Profile'}
          />
        </View> */}
        <View style={{flexGrow: 1}}>
          <View style={styles.dataSection}>
            {/* {primaryUHID ? (
              <View style={styles.selfCard}>
                <SelectPrimaryCard
                  members={linkedUhid}
                  // onShowMember={() => onShowLinkedMembers()}
                  data={primaryUhidUserData}
                />
              </View>
            ) : null} */}
            <FlatList
              contentContainerStyle={{paddingBottom: 20}}
              data={[0]}
              showsVerticalScrollIndicator={false}
              extraData={[0]}
              renderItem={() => {
                return (
                  <>
                    {linkedUhid && showLinkedMembers ? (
                      <View style={styles.listSection}>
                        <FlatList
                          data={allMembersData}
                          showsVerticalScrollIndicator={false}
                          extraData={allMembersData}
                          renderItem={({item}) => renderCard(item)}
                        />
                      </View>
                    ) : null}
                    <View style={styles.listSectionTwo}>
                      <FlatList
                        data={allMembersData}
                        showsVerticalScrollIndicator={false}
                        extraData={allMembersData}
                        ListEmptyComponent={() => {
                          return (
                            <View
                              style={{
                                paddingTop: hp('20%'),
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              {!loader ? (
                                <RegularText
                                  style={{
                                    color: colors.app_theme_dark_green,
                                    fontSize: hp('2.5%'),
                                    textAlign: 'center',
                                  }}
                                  title={`No family members found ${'\n'} Add family members`}
                                />
                              ) : null}
                            </View>
                          );
                        }}
                        renderItem={({item}) => renderAllMembers(item)}
                      />
                    </View>
                  </>
                );
              }}
            />
          </View>
        </View>
      </View>
      <View style={styles.btnSection}>
        <View>
          <SubmitButton
            onPress={() => navigation.navigate('AddFamilyMember')}
            style={{
              width: '50%',
              alignSelf: 'center',
              backgroundColor: colors.app_theme_light_green,
            }}
            title={'+ Add New Members'}
          />
          {/* <TouchableOpacity
            onPress={() => navigation.navigate('AddFamilyMember')}
            style={styles.addMemberSection}>
            <BoldText
              style={styles.addMemberText}
              title={'+ Add New Members'}
            />
          </TouchableOpacity> */}
        </View>

        {/* <View style={{flexDirection: 'row', marginTop: hp('1%')}}>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <SubmitButton
              onPress={() =>
                navigation.navigate('LinkUHID', {screen: 'LinkUHID'})
              }
              style={{
                width: linkedUhid ? '90%' : '100%',
                backgroundColor: colors.app_theme_light_green,
              }}
              title={'Link UHID'}
            />
          </View>
          {linkedUhid ? (
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <SubmitButton
                onPress={() =>
                  navigation.navigate('LinkUHID', {screen: 'DelinkUHID'})
                }
                style={{width: '90%'}}
                title={'DE-Link UHID'}
              />
            </View>
          ) : null}
        </View> */}
      </View>
      <Loader display={loader} />
    </SafeAreaView>
  );
};

export default index;
