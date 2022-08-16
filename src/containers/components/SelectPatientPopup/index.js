import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {LinkUhidCard, Toast} from '..';
import {textConstants} from '../../../constants/textConstants';
import NetworkRequest, {
  method,
  servicesPoints,
} from '../../../services/NetworkRequest';
import {CancelButton, SubmitButton} from '../Buttons';
import CModal from '../CModal';
import {BoldText, RegularText} from '../Common';
import MyFamilyMemberCard from '../MyFamilyMemberCard';
import SelectPrimaryCard from '../SelectPrimaryCard';
import styles from './style';
export default props => {
  const [allMembersData, setAllMembersData] = useState([]);
  const [selectedPatients, setSelectedPatients] = useState([]);
  const [handleConnectionState, setHandleConnectionState] = useState(false);
  useEffect(() => {
    if (handleConnectionState) {
      props.navigation.navigate('ConnectionHandle');
    }
  }, [handleConnectionState]);
  let newSelectedData = props.newItemData;

  // useEffect(() => {
  //   getMyFamilyMembers();
  // }, []);

  // useEffect(() => {
  //   getMyFamilyMembers();
  // }, [allMembersData]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getMyFamilyMembers();
    });
    return unsubscribe;
  }, [props.navigation]);

  const getMyFamilyMembers = async () => {
    try {
      const requestConfig = {
        method: method.get,
        url: servicesPoints.userServices.my_family_mambers,
      };
      const response = await NetworkRequest(requestConfig);
      if (response) {
        const {success} = response;
        if (success) {
          setAllMembersData(response.data);
          // props.onRefresh();
        } else {
          if (response === 'Network Error') {
            Toast('Network Error', 0);
            setHandleConnectionState(true);
          }
        }
      }
    } catch (err) {
      console.log('err is ', err);
    }
  };
  function onselectMembers(item) {
    let selectedPatient = [];
    let data = allMembersData;
    data = data.map((itn, index) => {
      if (itn.id == item.id) {
        itn.selected = !itn.selected;
      }
      return itn;
    });
    setAllMembersData(data);
    let members = allMembersData;
    members = members.map((itn, index) => {
      if (itn.selected) {
        selectedPatient.push(item);
      } else {
        null;
      }
    });
    setSelectedPatients(selectedPatient);
  }

  const addToCart = () => {
    let patientsArray = [];
    let data = allMembersData;
    data = data.filter((itn, index) => {
      if (itn.selected) {
        patientsArray.push(itn.id);
        return itn;
      }
    });
    if (patientsArray.length > 0) {
      props.onAddToCart(patientsArray, newSelectedData);

      let data = allMembersData;
      data = data.map((itn, index) => {
        itn.selected = false;

        return itn;
      });
      setAllMembersData(data);
    } else {
      Toast('Please select Patients', 0);
    }
  };

  const renderCard = item => {
    return (
      <MyFamilyMemberCard
        onSelectPrimary={() => onselectMembers(item)}
        selection={true}
        deActiveView={false}
        selectView={true}
        data={item}
        emailIdShown={false}
        editMember={false}
      />
    );
  };
  return (
    <CModal
      isVisible={props.visible}
      animationType="slide"
      closeModal={props.onRequestClose}>
      <View style={[styles.modalMainConatiner]}>
        <View style={styles.whiteContainer}>
          <View style={{flex: 0.8}}>
            <View style={styles.headingSection}>
              <BoldText style={styles.heading} title={'Select Patient'} />
            </View>
            <View style={[styles.patientListSection]}>
              <FlatList
                data={allMembersData}
                extraData={allMembersData}
                ListEmptyComponent={() => {
                  return (
                    <View style={styles.emptyView}>
                      <RegularText
                        style={styles.emptyText}
                        title={`No family members found ${'\n'} Add family members`}
                      />
                    </View>
                  );
                }}
                renderItem={({item}) => renderCard(item)}
              />
            </View>
          </View>
          <View
            style={{
              flex: 0.2,

              justifyContent: 'flex-end',
            }}>
            <View>
              <View style={styles.addMemberSection}>
                <TouchableOpacity
                  hitSlop={{left: 50, right: 50, top: 10, bottom: 50}}
                  onPress={props.onAddMember}>
                  <BoldText
                    style={styles.addMemberText}
                    title={'+ Add New Members'}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.buttonSection]}>
              <CancelButton
                style={styles.submitBtn}
                onPress={props.onPressCancel}
                title={textConstants.btnText.cancel}
              />
              <SubmitButton
                style={styles.submitBtn}
                onPress={() => {
                  addToCart();
                  // props.navigation.navigate('MyCart');
                }}
                title={textConstants.btnText.addToCart}
              />
            </View>
          </View>
        </View>
      </View>
    </CModal>
  );
};
