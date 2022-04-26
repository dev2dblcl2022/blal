import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, FlatList, ScrollView} from 'react-native';
import {SubmitButton} from '../../../components/Buttons';
import styles from './style';
import DefaultHeader from '../../../components/DefaultHeader';
import {BoldText} from '../../../components/Common';
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
import colors from '../../../../constants/colors';
import {AuthContext} from '../../../../../context/context';

const index = ({navigation, route}) => {
  const {screen, screenType} = route.params;
  const {signOut} = React.useContext(AuthContext);
  const [linkUHIDselection, setLinkUHIDselection] = useState(false);
  const [primaryUhidUserData, setPrimaryUhidUserData] = useState({});
  const [membersData, setMembersData] = useState([]);
  const [allMembersData, setAllMembersData] = useState([]);

  const [primaryUHID, setPrimaryUHID] = useState(false);
  const [linkedUhid, setLinkedUhid] = useState(false);
  const [loader, setLoader] = useState(true);
  const [selection, setSelection] = useState(false);
  const [selectionLinkMember, setSelectionLinkMember] = useState(false);
  const [showLinkedMembers, setShowLinkedMembers] = useState(false);

  function onselectForPrimary(item) {
    let data = allMembersData;
    data = data.map((itn, index) => {
      if (itn.id == item.id) {
        itn.selected = !itn.selected;
      }
      return itn;
    });
    setAllMembersData(data);
  }

  function onRemoveLinkedMember(item) {
    let data = allMembersData;
    data = data.map((itn, index) => {
      if (itn.id == item.id) {
        itn.selected = !itn.selected;
      }
      return itn;
    });
    setAllMembersData(data);
  }

  const renderCard = item => {
    return (
      <LinkUhidCard
        onSelectLinkedRemove={() => onRemoveLinkedMember(item)}
        selection={selectionLinkMember && linkUHIDselection}
        data={item}
      />
    );
  };

  const renderAllMembers = item => {
    if (item.uhid_link === 'primary') {
      return null;
    } else if (item.uhid_link === 'linked') {
      return null;
    } else {
      return (
        <MyFamilyMemberCard
          selectView={true}
          deActiveView={false}
          selection={!primaryUHID || selection}
          onSelectPrimary={() => onselectForPrimary(item)}
          data={item}
          emailIdShown={true}
        />
      );
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getMyFamilyMembers();
    });
    return unsubscribe;
  }, [navigation]);

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
        setPrimaryUHID(primaryUhid ? true : false);
        setPrimaryUhidUserData(primaryUhid ? primaryUhid : null);
        setLinkedUhid(linkedUhid ? true : false);
        setLoader(false);
      } else {
        console.log('res failure', response);
        if (response === 'Network Error') {
          Toast('Network Error', 0);
        }
        setLoader(false);
      }
    }
  };

  const apiPrimaryUhid = async () => {
    let data = allMembersData;
    data = data.filter(itn => {
      if (itn.selected) {
        return itn;
      }
    });

    if (data.length === 1) {
      let formData = {
        email: data[0].email,
      };
      const requestConfig = {
        data: formData,
        method: method.post,
        url: servicesPoints.userServices.add_uhid_primary,
      };

      const response = await NetworkRequest(requestConfig);

      if (response) {
        const {success} = response;
        if (success) {
          Toast(response.message, 1);
          setPrimaryUHID(true);
          navigation.pop(1);
        } else {
          Toast(response.message, 0);
          console.log('res failure', response);
          if (response === 'Network Error') {
            Toast('Network Error', 0);
            setLoader(false);
          } else if (response.status === 401) {
            signOut();
          } else {
            null;
          }
          setLoader(false);
        }
      }
    } else {
      Toast('Please select member first', 0);
    }
  };

  const apiLinkUHID = async () => {
    try {
      let emailArr = [];
      let data = allMembersData;
      data = data.filter((itn, index) => {
        if (itn.selected && itn.uhid_link !== 'primary') {
          emailArr.push(itn.email);
          return itn;
        }
      });

      if (emailArr.length > 0) {
        setLoader(true);
        let formData = {
          email: emailArr,
        };
        const requestConfig = {
          data: formData,
          method: method.post,
          url: servicesPoints.userServices.add_uhid_members,
        };
        const response = await NetworkRequest(requestConfig);
        if (response) {
          const {success} = response;
          if (success) {
            Toast(response.message, 1);
            setLoader(false);
            navigation.pop();
          } else {
            Toast(response.message, 0);
            if (response === 'Network Error') {
              Toast('Network Error', 0);
            }
            setLoader(false);
          }
        }
      } else {
        Toast('Please select member first', 0);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const apiRemoveLinkUHID = async () => {
    try {
      let emailArr = [];
      let data = allMembersData;
      data = data.filter((itn, index) => {
        if (itn.selected && itn.uhid_link === 'linked') {
          emailArr.push(itn.email);
          return itn;
        }
      });

      if (emailArr.length > 0) {
        setLoader(true);
        let formData = {
          email: emailArr,
        };
        const requestConfig = {
          data: formData,
          method: method.post,
          url: servicesPoints.userServices.remove_uhid_members,
        };
        const response = await NetworkRequest(requestConfig);
        if (response) {
          const {success} = response;
          if (success) {
            Toast(response.message, 1);
            setLoader(false);
            navigation.pop();
          } else {
            Toast(response.message, 0);
            if (response === 'Network Error') {
              Toast('Network Error', 0);
            }
            setLoader(false);
          }
        }
      } else {
        Toast('Please select member first', 0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onShowLinkedMembers = () => {
    // let data = allMembersData;
    // data = data.map((itn, index) => {
    //   if (itn.uhid_link === 'linked') {
    //     itn.selected = true;
    //     return itn;
    //   } else {
    //     return itn;
    //   }
    // });
    // console.log('dat as', data);
    // setAllMembersData(data);

    setLinkUHIDselection(true);
    setShowLinkedMembers(!showLinkedMembers);
  };

  const onselection = () => {
    if (screen === 'LinkUHID') {
      setSelection(!selection);
    } else {
      setSelectionLinkMember(!selectionLinkMember);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <DefaultHeader
        onBack={() => navigation.goBack()}
        title={screen === 'LinkUHID' ? 'Link UHID' : 'De-Link UHID'}
      />

      <View style={styles.mainContainer}>
        <View style={styles.headingSection}>
          <BoldText
            style={styles.heading}
            title={'Select Family Members associated with Primary Profile'}
          />
        </View>
        <View style={{flexGrow: 1}}>
          <View style={styles.dataSection}>
            {primaryUHID ? (
              <View style={styles.selfCard}>
                <SelectPrimaryCard
                  members={linkedUhid}
                  onShowMember={() => onShowLinkedMembers()}
                  data={primaryUhidUserData}
                />
              </View>
            ) : null}
            <FlatList
              contentContainerStyle={{paddingBottom: 10}}
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
        {primaryUHID ? (
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <SubmitButton
                onPress={onselection}
                style={{width: '90%', backgroundColor: colors.Jordy_Blue}}
                title={'Select'}
              />
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <SubmitButton
                onPress={() =>
                  screen === 'LinkUHID' ? apiLinkUHID() : apiRemoveLinkUHID()
                }
                style={{width: '90%'}}
                title={screen === 'LinkUHID' ? 'Link Profile' : 'De-Link UHID'}
              />
            </View>
          </View>
        ) : null}

        {!primaryUHID ? (
          <SubmitButton
            onPress={apiPrimaryUhid}
            title={'Select Primary UHID'}
          />
        ) : null}
      </View>
      <Loader display={loader} />
    </SafeAreaView>
  );
};

export default index;
