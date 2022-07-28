import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  FlatList,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
var axios = require('axios');
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import Autocomplete from '@material-ui/lab/Autocomplete';
// import TextField from '@material-ui/core/TextField';
// import {MultiSelectDropdown} from 'react-native-multiselect-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DefaultHeader from '../../../components/DefaultHeader';
import {textConstants} from '../../../../constants/textConstants';
import {BoldText, RegularText} from '../../../components/Common';
import moment from 'moment';
import {SubmitButton} from '../../../components/Buttons';
import imagesConstants from '../../../../constants/imagesConstants';
import {
  InputField,
  Loader,
  MainContainer,
  SamplePreInstruction,
  Toast,
} from '../../../components';
import styles from './style';
import validate from '../../../../helpers/Validator/validate_wrapper';
import NetworkRequest, {
  method,
  servicesPoints,
} from '../../../../services/NetworkRequest';
import {AuthContext} from '../../../../../context/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetworkRequestBlal, {
  blalMethod,
  blalServicesPoints,
} from '../../../../services/NetworkRequestBlal';
import AllInOneSDKManager from 'paytm_allinone_react-native';
import {
  Hash_Id_Membership_Card_Purchase,
  Pay_tmMerchantId,
} from '../../../../config/Setting';

import colors from '../../../../constants/colors';
// test
// import MultiSelect from 'react-multiple-select-dropdown-lite';
import MultiSelect from 'react-native-multiple-select';
import {getRelease} from '../../../../env';
const orderId = 'ORDERID_98766';
const merchantId = Pay_tmMerchantId;
const txnToken = '19d8f9353a83437a9c2c8abb360deaf31638774945508';
const releaseEnvironment = getRelease();
const index = ({navigation, route}) => {
  let membershipCardData = route.params.data;

  const [profilesData, setProfilesData] = useState([1, 2, 3, 4, 5, 6]);
  const {signIn, signOut} = React.useContext(AuthContext);
  const [faqList, setFaqList] = useState([
    {question: 'Free 4 Package', answer: 'operation'},
    {question: 'Free 4 Hour visit', answer: 'blood'},
    {question: 'Free 4 Test', answer: 'mental report'},
    {question: '10 % discount on all bookings', answer: 'hospital'},
  ]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedImage, setSelectedImage] = useState([]);
  const [termsCondition, setTermsCondition] = useState(false);
  const [loader, setLoader] = useState(true);
  const [date, setDate] = useState('Select Date');
  const [datePicker, setDatePicker] = useState(false);
  const [male, setMale] = useState(true);
  const [cityId, setCityId] = useState('');
  const [panelId, setPanelId] = useState('');
  const [allPatients, setAllPatients] = useState([]);
  const [userData, setUserData] = useState({});
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [fullDate, setFullDate] = useState('');
  const [patientsOpens, setPatientsOpens] = useState(false);
  const [patientsValues, setPatientsValues] = useState(null);
  const [dependentPatientsOpen, setDependentPatientsOpen] = useState(false);
  const [dependentPatientsValues, setDependentPatientsValues] = useState([]);
  const [transactionToken, setTransactionToken] = useState('');
  const [allRelation, setAllRelation] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
  ]);
  const [patientDependent, setPatientDependent] = useState([]);
  const [validateForm, setValidateForm] = useState({
    name: '',
    nameError: '',
    email: '',
    emailError: '',
    phoneNumber: '',
    phoneNumberError: '',
    age: '',
    ageError: '',
  });
  const [handleConnectionState, setHandleConnectionState] = useState(false);
  useEffect(() => {
    if (handleConnectionState) {
      navigation.navigate('ConnectionHandle');
    }
  }, [handleConnectionState]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getCityPanelId();
      getAllPatients();
    });
    return unsubscribe;
  }, [navigation]);

  const getCityPanelId = async () => {
    let city = await AsyncStorage.getItem('cityId');
    let panel = await AsyncStorage.getItem('panelId');
    let userData = await AsyncStorage.getItem('userData');
    let parseData = JSON.parse(userData);

    setValidateForm({
      name: parseData.user.fullname,
      nameError: '',
      email: parseData.user.email,
      emailError: '',
      phoneNumber: parseData.user.phone_number.toString(),
      phoneNumberError: '',
      age: '',
      ageError: '',
    });
    // setUserData(parseData);
    setCityId(city);
    setPanelId(panel);
  };

  const getAllPatients = async () => {
    try {
      let data = {
        senior: membershipCardData.No_of_dependant === '2' ? true : false,
      };

      const requestConfig = {
        method: method.get,
        url: servicesPoints.userServices.my_family_mambers,
        data: data,
      };
      const response = await NetworkRequest(requestConfig);

      if (response) {
        const {success} = response;
        if (success) {
          let test = response.data;
          let newData = [];
          test.map(item => {
            newData.push({
              label: item.fullname,
              value: item.uhid,
              age: item.age,
            });
            // return {label: item.fullname, value: item.id};
          });
          setAllPatients(newData);
          setLoader(false);
          // Toast(response.message, 1);
        } else {
          setLoader(false);
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
        }
      }
    } catch (error) {
      console.log(error.message);
      setLoader(false);
    }
  };

  const onChangeText = (key, val) => {
    setValidateForm({
      ...validateForm,
      ...{[key]: val, [`${key}Error`]: validate(key, val)},
    });
  };

  const onSubmit = async () => {
    if (membershipCardData.No_of_dependant === '1') {
      if (!patientsValues) {
        Toast('Please select Patients', 0);
      } else {
        onInitiateTransaction();
      }
    } else {
      if (!patientsValues) {
        Toast('Please select Patients', 0);
      } else if (
        !dependentPatientsValues &&
        membershipCardData.No_of_dependant > 0
      ) {
        Toast('Please select Dependent Patients', 0);
      } else {
        onInitiateTransaction();
      }
    }
  };
  const onInitiateTransaction = async () => {
    setLoader(true);
    let orderId = `${membershipCardData.Id}_${Date.now()}`;
    let data = {
      order_id: orderId,
      final_amount: membershipCardData.Amount,
      transaction_type: 'Membership',
    };
    try {
      const requestConfig = {
        method: method.post,
        data: data,
        url: servicesPoints.paymentServices.initiate_transaction,
      };

      const response = await NetworkRequest(requestConfig);

      if (response.status === 200) {
        const {success} = response;
        if (success) {
          let txnToken = response.data.body.txnToken;

          onPaymentGateway(txnToken, orderId);
          setLoader(false);
          setTransactionToken(txnToken);
        } else {
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
        Toast('Try again, Payment Failure!', 0);
      }
    } catch (err) {
      setLoader(false);
    }
  };

  const onPaymentGateway = (token, orderID) => {
    let orderId = orderID;

    if (Platform.OS === 'ios') {
      AllInOneSDKManager.startTransaction(
        `${orderId}`, // Booking Id
        merchantId, // Merchant Id
        token, // Txn token provided by backend
        membershipCardData.Amount.toString(), //Total Amount
        // 'https://www.npmjs.com/package/paytm_allinone_react-native',

        `${releaseEnvironment.Api_Live_Url}${servicesPoints.paymentServices.transaction_callback}?orderid=${orderId}`,
        false,
        false,
        `${'paytm'}${merchantId}`,
      )
        .then(res => {
          paymentSuccess(res);
        })
        .catch(err => {
          console.log('error caught ', err);
          Toast('Payment Failed! Try again');
        });
    } else {
      AllInOneSDKManager.startTransaction(
        `${orderId}`,
        merchantId,
        token,
        membershipCardData.Amount.toString(), //Total Amount
        // '1', //Total Amount
        // 'https://www.npmjs.com/package/paytm_allinone_react-native',
        `${releaseEnvironment.Api_Live_Url}${servicesPoints.paymentServices.transaction_callback}?orderid=${orderId}`,
        false,
        false,
        `${'paytm'}${merchantId}`,
      )
        .then(res => {
          // alert('Done');
          // const parseData = JSON.parse(res.response);
          paymentSuccess(res);
        })
        .catch(err => {
          console.log('error caught ', err);
          Toast('Payment Failed! Try again');
        });
    }
  };

  const paymentSuccess = res => {
    // let response = JSON.parse(res.response);

    if (res.RESPCODE === '01' && res.TXNID) {
      apiAddCard(res.TXNID);
    } else {
      Toast('Try again, Payment Failure!', 0);
    }
  };

  const apiAddCard = async transaction_id => {
    setLoader(true);

    try {
      var data = {};
      if (
        membershipCardData.No_of_dependant === '1' ||
        membershipCardData.No_of_dependant === '0'
      ) {
        data = {
          Hash: Hash_Id_Membership_Card_Purchase,
          Mobile: validateForm.phoneNumber,
          PatientID: patientsValues.toString(),
          MembershipCardId: membershipCardData.Id.toString(),
          TransactionId: transaction_id,
          Amount: membershipCardData.Amount,
          CityId: cityId,
        };
      } else {
        data = {
          Hash: Hash_Id_Membership_Card_Purchase,
          Mobile: validateForm.phoneNumber,
          PatientID: patientsValues.toString(),
          MembershipCardId: membershipCardData.Id.toString(),
          TransactionId: transaction_id,
          Amount: membershipCardData.Amount,
          CityId: cityId,
          DependentId: dependentPatientsValues.join(','),
        };
      }

      // let url = ``;

      // if (membershipCardData.No_of_dependant === '1') {
      //   url = `${blalServicesPoints.blalUserServices.CreateNewMembershipCard}?Hash=${data.Hash}&Mobile=${data.Mobile}&PatientID=${data.PatientID}&MembershipCardId=${data.MembershipCardId}&TransactionId=${data.TransactionId}&Amount=${data.Amount}&CityId=${data.CityId}`;
      // } else {
      //   url = `${blalServicesPoints.blalUserServices.CreateNewMembershipCard}?Hash=${data.Hash}&Mobile=${data.Mobile}&PatientID=${data.PatientID}&MembershipCardId=${data.MembershipCardId}&TransactionId=${data.TransactionId}&Amount=${data.Amount}&CityId=${data.CityId}&DependentId=${data.DependentId}`;
      // }
      let url =
        membershipCardData.No_of_dependant === '1'
          ? `CreateNewMembershipCard?Hash=${data.Hash}&Mobile=${data.Mobile}&PatientID=${data.PatientID}&MembershipCardId=${data.MembershipCardId}&TransactionId=${data.TransactionId}&Amount=${data.Amount}&CityId=${data.CityId}`
          : `CreateNewMembershipCard?Hash=${data.Hash}&Mobile=${data.Mobile}&PatientID=${data.PatientID}&MembershipCardId=${data.MembershipCardId}&TransactionId=${data.TransactionId}&Amount=${data.Amount}&CityId=${data.CityId}`;
      if (data.DependentId) {
        url =
          membershipCardData.No_of_dependant === '1'
            ? `CreateNewMembershipCard?Hash=${data.Hash}&Mobile=${data.Mobile}&PatientID=${data.PatientID}&MembershipCardId=${data.MembershipCardId}&TransactionId=${data.TransactionId}&Amount=${data.Amount}&CityId=${data.CityId}`
            : `CreateNewMembershipCard?Hash=${data.Hash}&Mobile=${data.Mobile}&PatientID=${data.PatientID}&MembershipCardId=${data.MembershipCardId}&TransactionId=${data.TransactionId}&Amount=${data.Amount}&CityId=${data.CityId}&DependentId=${data.DependentId}`;
      }
      let requestConfig = {
        method: blalMethod.post,
        data: {},
        url: url,
      };
    

      // var config = {
      //   method: 'post',
      //   url:
      //     membershipCardData.No_of_dependant === '1'
      //       ? `https://silverapi.blallab.com/CreateNewMembershipCard?Hash=${data.Hash}&Mobile=${data.Mobile}&PatientID=${data.PatientID}&MembershipCardId=${data.MembershipCardId}&TransactionId=${data.TransactionId}&Amount=${data.Amount}&CityId=${data.CityId}`
      //       : `https://silverapi.blallab.com/CreateNewMembershipCard?Hash=${data.Hash}&Mobile=${data.Mobile}&PatientID=${data.PatientID}&MembershipCardId=${data.MembershipCardId}&TransactionId=${data.TransactionId}&Amount=${data.Amount}&CityId=${data.CityId}&DependentId=${data.DependentId}`,
      //   headers: {},
      // };

      // axios(config)
      //   .then(function (response) {
      //     console.log('responseresponse', response);
      //     if (response) {
      //       const {status} = response;
      //       if (status === 200) {
      //         setLoader(false);
      //         navigation.pop(2);
      //       } else {
      //         setLoader(false);
      //       }
      //     }
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });

      const response = await NetworkRequestBlal(requestConfig);

      if (response) {
        const {status_Code} = response;
        if (status_Code === 200) {
          Toast(
            `Your card number for ${membershipCardData.NAME} is ${response.data}`,
            1,
          );
          let patientName = '';
          allPatients.forEach(patient => {
            if (patient.value === patientsValues) {
              patientName = patient.label;
            }
          });

          let sampleData = {
            name: patientName,
            cardType: membershipCardData.NAME,
            cardAmount: data.Amount,
            mobileNumber: data.Mobile,
          };

          const requestConfigLead = {
            method: method.post,
            data: sampleData,
            url: servicesPoints.userServices.membership_card,
          };

          await NetworkRequest(requestConfigLead);

          setLoader(false);
          navigation.pop(2);
        } else {
          setLoader(false);
        }
      }
    } catch (error) {
      setLoader(false);
    }
  };

  const _renderHeader = (item, expanded, index) => {
    return (
      <View style={styles.headContainer}>
        <RegularText style={styles.accordionTitleText} title={item.question} />
        {expanded ? (
          <Image source={imagesConstants.uparrow} />
        ) : (
          <Image source={imagesConstants.downarrow} />
        )}
      </View>
    );
  };

  const _renderContent = (item, expanded) => {
    return (
      <View style={styles.contentContainer}>
        <RegularText style={styles.accordionContentText} title={item.answer} />
      </View>
    );
  };

  const renderCard = (item, index) => {
    return (
      <SamplePreInstruction
        addMembershipCard={false}
        data={item}
        index={index}
      />
    );
  };

  const renderCardTerms = (item, index) => {
    return (
      <SamplePreInstruction
        addMembershipCard={true}
        data={item}
        index={index}
      />
    );
  };

  const onSelectedItemsChange = selectedItems => {
    if (selectedItems.length < 4) {
      setDependentPatientsValues(selectedItems);
    } else {
      Toast('You can not select dependent patient more than 3', 0);
    }
  };

  useEffect(() => {
    const allDependentPatients = allPatients.filter(item => {
      if (item.value !== patientsValues) {
        return item;
      }
    });
    setPatientDependent(allDependentPatients);
  }, [patientsValues]);
  const seniorPatient = allPatients.filter(item => {
    if (parseInt(item.age.split(' ')[0]) >= 60) {
      return item;
    }
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <DefaultHeader
        onBack={() => navigation.goBack()}
        title={membershipCardData.NAME}
      />
      <ScrollView scrollEnabled={!patientsOpens} style={styles.scrollView}>
        <MainContainer>
          <View style={styles.headingSection}>
            <BoldText
              style={styles.heading}
              title={'Enter Personal details for the member'}
            />
          </View>
          <View style={styles.inputFieldsContainer}>
            {/* <View style={[styles.mobileNumberInput, {marginTop: 0}]}>
              <InputField
                value={validateForm.name}
                error={validateForm.nameError}
                returnKeyType={'next'}
                editable={false}
                blurOnSubmit={false}
                onChangeText={text => onChangeText('name', text, 'name')}
                style={styles.input}
                placeholder={'Full Name'}
              />
            </View> */}

            <View style={styles.dropDownView}>
              {membershipCardData.NAME === 'SENIOR CITIZEN CARE CARD' ? (
                <DropDownPicker
                  open={patientsOpens}
                  placeholder="Select Patients"
                  value={patientsValues}
                  listChildContainerStyle={{position: 'absolute'}}
                  style={{borderColor: colors.purplishGrey, borderWidth: 1}}
                  items={seniorPatient}
                  zIndex={3000}
                  setOpen={setPatientsOpens}
                  setValue={setPatientsValues}
                />
              ) : (
                <DropDownPicker
                  open={patientsOpens}
                  placeholder="Select Patients"
                  value={patientsValues}
                  listChildContainerStyle={{position: 'absolute'}}
                  style={{borderColor: colors.purplishGrey, borderWidth: 1}}
                  items={allPatients}
                  zIndex={3000}
                  setOpen={setPatientsOpens}
                  setValue={setPatientsValues}
                />
              )}
            </View>
            {membershipCardData.No_of_dependant >= '2' ? (
              <View
                style={[
                  styles.dropDownView,
                  {marginTop: patientsOpens ? hp('30%') : 20},
                ]}>
                {/* <DropDownPicker
                  open={dependentPatientsOpen}
                  placeholder="Select Dependent Patients"
                  value={dependentPatientsValues}
                  listChildContainerStyle={{position: 'absolute'}}
                  style={{borderColor: colors.purplishGrey, borderWidth: 1}}
                  items={allPatients}
                  zIndex={3000}
                  setOpen={setDependentPatientsOpen}
                  setValue={setDependentPatientsValues}
                /> */}

                <MultiSelect
                  hideTags={false}
                  items={patientDependent}
                  uniqueKey="value"
                  onSelectedItemsChange={onSelectedItemsChange}
                  selectedItems={dependentPatientsValues}
                  tagContainerStyle={{
                    borderColor: colors.purplishGrey,
                    borderWidth: 1,
                  }}
                  styleItemsContainer={{
                    borderColor: colors.purplishGrey,
                    borderWidth: 1,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                  }}
                  styleInputGroup={{
                    borderWidth: 1,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                  selectText="Select Dependent Patients"
                  searchInputPlaceholderText="Select Dependent Patients"
                  zIndex={3000}
                  altFontFamily="ProximaNova-Light"
                  tagBorderColor="#CCC"
                  tagTextColor="#000"
                  itemTextColor="#000"
                  onChangeInput={text => console.log(text)}
                  displayKey="label"
                  checkBoxCheckedColor="black"
                  hideSubmitButton={true}
                  hideDropdown={true}
                />
              </View>
            ) : null}
            {/* 
            <TouchableOpacity
              onPress={() => navigation.navigate('AddFamilyMember')}
              style={styles.addMemberSection}>
              <RegularText
                style={styles.addMemberText}
                title={'+ Add more Members'}
              />
            </TouchableOpacity> */}
            {/* <View style={styles.mobileNumberInput}>
              <InputField
                value={validateForm.email}
                error={validateForm.emailError}
                returnKeyType={'next'}
                blurOnSubmit={false}
                editable={false}
                onChangeText={text => onChangeText('email', text, 'email')}
                style={styles.input}
                placeholder={'Email'}
              />
            </View>

            <View style={styles.mobileNumberInput}>
              <InputField
                value={validateForm.phoneNumber}
                error={validateForm.phoneNumberError}
                returnKeyType={'next'}
                editable={false}
                blurOnSubmit={false}
                onChangeText={text =>
                  onChangeText('phoneNumber', text, 'phoneNumber')
                }
                style={styles.input}
                placeholder={'Mobile number'}
              />
            </View> */}
            {/* <View style={styles.dropDownView}>
              <DropDownPicker
                open={opens}
                placeholder="Select Package"
                value={value}
                style={styles.dropDownContainer}
                items={allRelation}
                setOpen={setOpens}
                setValue={setValue}
              />
            </View> */}
            <View
              style={[
                styles.validitySection,
                {
                  marginTop:
                    membershipCardData.No_of_dependant >= '2' &&
                    dependentPatientsOpen
                      ? hp('30%')
                      : membershipCardData.No_of_dependant >= '2' &&
                        patientsOpens
                      ? 20
                      : patientsOpens
                      ? hp('30%')
                      : 20,
                },
              ]}>
              <BoldText style={styles.validityText} title={'Validity'} />

              <RegularText
                style={styles.validityValText}
                title={`${membershipCardData?.CardValidity} Year(s) Valid`}
              />
            </View>
            <View style={[styles.validitySection]}>
              <BoldText style={styles.validityText} title={'Amount'} />

              <RegularText
                style={styles.validityValText}
                title={`${'\u20B9'} ${membershipCardData.Amount}`}
              />
            </View>
            <View style={styles.fullBodyCheckupSection}>
              <View style={styles.sectionOne}>
                <View style={styles.headingCollection}>
                  <BoldText style={styles.sampleText} title={'Benefits'} />
                  {/* <RegularText
                  style={styles.sampleText}
                  title={' (4 Text Included)'}
                /> */}
                </View>
                <View style={styles.accordionSection}>
                  {/* <Accordion
                    dataArray={faqList}
                    animation={true}
                    style={styles.accordionSectionMain}
                    expanded={[0]}
                    renderHeader={_renderHeader}
                    renderContent={_renderContent}
                  /> */}
                  <FlatList
                    data={membershipCardData.membershipCardInvestigationModel}
                    showsVerticalScrollIndicator={false}
                    extraData={
                      membershipCardData.membershipCardInvestigationModel
                    }
                    renderItem={({item, index}) => renderCard(item, index)}
                  />
                  <RegularText
                    style={[styles.emailText, {marginTop: hp('1%')}]}
                    title={`${membershipCardData.DiscountInPercentage} % discount on all bookings`}
                  />
                </View>
              </View>
            </View>
            <View style={styles.fullBodyCheckupSection}>
              <View style={styles.sectionOne}>
                <View style={styles.headingTestSection}>
                  <BoldText
                    style={styles.sampleText}
                    title={'Terms and Conditions'}
                  />
                </View>
                <View style={styles.instructionList}>
                  {/* <RegularText
                    style={styles.emailText}
                    title={
                      'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple '
                    }
                  /> */}
                  <FlatList
                    data={membershipCardData.Termsandconditions}
                    showsVerticalScrollIndicator={false}
                    extraData={membershipCardData.Termsandconditions}
                    renderItem={({item}) => renderCardTerms(item)}
                  />
                </View>
              </View>
            </View>
            <SubmitButton
              style={styles.submitBtn}
              onPress={onSubmit}
              // onPress={handleSubmit(onSubmit)}
              title={textConstants.btnText.bookNow}
            />
          </View>
        </MainContainer>
      </ScrollView>
      <Loader display={loader} />
    </SafeAreaView>
  );
};

export default index;
