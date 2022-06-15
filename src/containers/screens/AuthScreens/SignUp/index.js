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
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-crop-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './style';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DefaultHeader from '../../../components/DefaultHeader';

import {textConstants} from '../../../../constants/textConstants';
import {BoldText, RegularText} from '../../../components/Common';
import moment from 'moment';
import colors from '../../../../constants/colors';
import {SubmitButton} from '../../../components/Buttons';
import imagesConstants from '../../../../constants/imagesConstants';
import {InputField, Loader, MainContainer, Toast} from '../../../components';
import style from '../Login/style';
import validate from '../../../../helpers/Validator/validate_wrapper';
import NetworkRequest, {
  method,
  servicesPoints,
} from '../../../../services/NetworkRequest';
import {post} from '../../../../services/post';
import {AuthContext} from '../../../../../context/context';
import {
  check,
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';
import axios from 'axios';
import {Api_Live_Url, Date_Format} from '../../../../config/Setting';

// test
let age = 'Age';

let selectImage = 0;
const index = ({navigation, route}) => {
  const {signIn, signOut} = React.useContext(AuthContext);
  const phone_number = route.params.phoneNumber;
  // const phone_number = '6663262898';
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [profileImage, setProfileImage] = useState({});
  const [termsCondition, setTermsCondition] = useState(false);
  const [loader, setLoader] = useState(false);
  const [date, setDate] = useState('Date of Birth');
  const [datePicker, setDatePicker] = useState(false);
  const [male, setMale] = useState(true);
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [fullDate, setFullDate] = useState('');
  const [opens, setOpens] = useState(false);
  const [value, setValue] = useState(null);
  const [allRelation, setAllRelation] = useState([
    {label: 'Self', value: 'Self'},
  ]);

  const [validateForm, setValidateForm] = useState({
    name: '',
    nameError: '',
    email: '',
    emailError: '',
    phoneNumber: phone_number,
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
  const onChangeText = (key, val) => {
    setValidateForm({
      ...validateForm,
      ...{[key]: val, [`${key}Error`]: validate(key, val)},
    });
  };

  const onSubmit = async () => {
    let nameError = validate('name', validateForm.name);
    let phoneNumberError = validate('phoneNumber', validateForm.phoneNumber);
    // let ageError = validate('age', validateForm.age);
    let emailError = validate('email', validateForm.email);
    setValidateForm({
      phoneNumber: validateForm.phoneNumber,
      phoneNumberError: phoneNumberError,
      name: validateForm.name,
      nameError: nameError,
      // age: validateForm.age,
      // ageError: ageError,
      email: validateForm.email,
      emailError: emailError,
    });

    if (phoneNumberError || nameError || emailError) {
    } else {
      if (date === 'Select Date') {
        Toast('Please Choose Date', 0);
      } else if (!value) {
        Toast('Please Select Relations', 0);
      }
      // else if (!termsCondition) {
      //   Toast('Please Allow Terms & Condition', 0);
      // }
      //  else if (!profileImage[0]) {
      //   Toast('Please select your Profile', 0);
      // }
      else {
        await onApiSignup();
      }
    }
  };

  const onApiSignup = async () => {
    try {
      setLoader(true);
      let formData = new FormData();
      if (Object.keys(profileImage).length > 0) {
        formData.append('photo', {
          uri: profileImage[0].uri,
          name: profileImage[0].fileName,
          type: profileImage[0].type,
          mime: profileImage[0].type,
        });
      }

      formData.append('fullname', validateForm.name);
      formData.append('email', validateForm.email);
      formData.append('phone_number', validateForm.phoneNumber);
      formData.append('device_token', 'asd');
      // formData.append('dob', fullDate);
      formData.append('dob', fullDate);
      formData.append('gender', male ? 'Male' : 'Female');
      formData.append('age', age);
      formData.append('relation', value);

      const requestConfig = {
        method: method.post,
        url: servicesPoints.userServices.registration,
        data: formData,
        headers: {
          Accept: 'application/json',
          'content-type': 'multipart/form-data',
        },
      };
      const response = await NetworkRequest(requestConfig);
      if (response) {
        const {success} = response;
        if (success) {
          setLoader(false);
          // Toast(response.message, 1);
          signIn(response.data, response.data.token);
          age = 'Age';
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
      }
    } catch (error) {
      setLoader(false);
    }
  };

  const formatDate = date => {
    return moment(date).format('MMMM DD, YYYY');
  };
  const onChooseGender = () => {
    setMale(male ? false : true);
  };
  const onChooseTermsCondition = () => {
    setTermsCondition(termsCondition ? false : true);
  };

  const handleDatePickerConfirm = async date => {
    await calculateAge(date);
    let newDate = moment(date).format(Date_Format);
    const selectedDate =
      date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

    const dateSelected = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    const split_date = selectedDate.split('/');
    setDay(split_date[0]);
    setMonth(split_date[1]);
    setYear(split_date[2]);
    setDate(formatDate(date));
    // setDate(selectedDate);
    setFullDate(newDate);
    setDatePicker(false);
  };

  const enterAsGuest = () => {
    signIn('Guest', 'GuestUser');
  };

  const calculateAge = async birthday => {
    // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    let valueAge = Math.abs(ageDate.getUTCFullYear() - 1970);
    age = valueAge;
  };

  // useEffect(() => {}, [age]);

  const handleDatePickerCancel = () => {
    setDatePicker(false);
  };

  async function checkPermissionCamera() {
    try {
      const platformPermission = Platform.select({
        android: PERMISSIONS.ANDROID.CAMERA,
        ios: PERMISSIONS.IOS.CAMERA,
      });

      const result = await check(platformPermission);

      switch (result) {
        case RESULTS.UNAVAILABLE:
          Toast(0, 'This feature is not available on this device');
          break;
        case RESULTS.DENIED:
          const requestResult = await request(platformPermission);
          switch (requestResult) {
            case RESULTS.GRANTED:
              await onCamera();
          }
          break;
        case RESULTS.LIMITED:
          Toast(0, 'The permission is limited: some actions are possible');
          break;
        case RESULTS.GRANTED:
          await onCamera();
          break;
        case RESULTS.BLOCKED:
          Alert.alert(
            'Permission Blocked',
            'Press ok and provide Camera Access permission in opened app setting',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: handleOpenSettings,
              },
            ],
            {cancelable: false},
          );
      }
    } catch (error) {
      console.log('error is here ', error.message);
    }
  }
  async function checkPermissionStorage() {
    try {
      const platformPermission = Platform.select({
        android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,

        ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
      });

      const result = await check(platformPermission);
      switch (result) {
        case RESULTS.UNAVAILABLE:
          Toast(
            'This feature is not available (on this device / in this context)',
            0,
          );
          break;
        case RESULTS.DENIED:
          const requestResult = await request(platformPermission);
          switch (requestResult) {
            case RESULTS.GRANTED:
              onGallery();
          }
          break;
        case RESULTS.LIMITED:
          Toast(0, 'The permission is limited: some actions are possible');
          break;
        case RESULTS.GRANTED:
          onGallery();
          break;
        case RESULTS.BLOCKED:
          Alert.alert(
            'Permission Blocked',
            'Press ok and provide Photo Gallery(Storage) Access permission in opened app setting',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: handleOpenSettings,
              },
            ],
            {cancelable: false},
          );
      }
    } catch (error) {
      console.log('error is here ', error.message);
    }
  }
  async function handleOpenSettings() {
    try {
      await openSettings();
    } catch (error) {}
  }

  const onAlert = () => {
    Alert.alert(
      'Upload Image',
      'Choose from gallery or take from camera',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Gallery',
          onPress: checkPermissionStorage,
        },
        {
          text: 'Camera',
          onPress: checkPermissionCamera,
        },
      ],
      {cancelable: false},
    );
  };

  const onGallery = () => {
    const options = {
      allowsEditing: true,
      multiple: false,
      quality: 0.5,
    };
    launchImageLibrary(options, response => {
      if (response.assets) {
        setProfileImage(response.assets);
        selectImage = 1;
      } else if (response.didCancel) {
        setProfileImage({});
        selectImage = 0;
      } else {
        setProfileImage({});
        selectImage = 0;
      }
    });
  };

  const onCamera = () => {
    const options = {
      allowsEditing: true,
      multiple: false,
      quality: 0.5,
    };
    launchCamera(options, response => {
      if (response.assets) {
        setProfileImage(response.assets);
        selectImage = 1;
      } else if (response.didCancel) {
        setProfileImage({});
        selectImage = 0;
      } else {
        setProfileImage({});
        selectImage = 0;
      }
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <DefaultHeader
        onBack={() => navigation.pop(2)}
        title={textConstants.signUp.registration}
      />
      <ScrollView style={styles.scrollView}>
        <MainContainer>
          <View style={styles.profilePicContainer}>
            <View>
              <View style={styles.profileView}>
                {profileImage.length > 0 ? (
                  <Image
                    style={
                      profileImage[0]?.uri
                        ? styles.profileImage
                        : styles.placeHolderImage
                    }
                    source={
                      profileImage[0]?.uri
                        ? {uri: profileImage[0]?.uri}
                        : imagesConstants.placeholder
                    }
                  />
                ) : (
                  <Image source={imagesConstants.placeholder} />
                )}
              </View>

              <TouchableOpacity onPress={onAlert} style={styles.addProfile}>
                <Image source={imagesConstants.camera} />
              </TouchableOpacity>
            </View>
            <View style={styles.addProfileTextView}>
              <RegularText
                style={styles.addProfileText}
                title={'Add Profile Pic'}
              />
            </View>
          </View>
          <View style={styles.inputFieldsContainer}>
            <View style={styles.mobileNumberInput}>
              <InputField
                value={validateForm.name}
                error={validateForm.nameError}
                returnKeyType={'next'}
                blurOnSubmit={false}
                onChangeText={text => onChangeText('name', text, 'name')}
                style={styles.input}
                placeholder={'Full Name'}
              />
            </View>
            <View style={styles.mobileNumberInput}>
              <InputField
                value={validateForm.email}
                error={validateForm.emailError}
                returnKeyType={'next'}
                blurOnSubmit={false}
                onChangeText={text => onChangeText('email', text, 'email')}
                style={styles.input}
                placeholder={'Email'}
              />
            </View>

            <TouchableOpacity
              onPress={() => setDatePicker(true)}
              style={styles.dateBirthContainer}>
              <View style={styles.dateView}>
                <RegularText style={styles.dateText} title={date} />
              </View>
              <View style={styles.calendarView}>
                <Image
                  style={styles.calendarImage}
                  source={imagesConstants.calendar}
                />
              </View>
            </TouchableOpacity>
            <View style={styles.mobileNumberInput}>
              <InputField
                value={validateForm.phoneNumber}
                error={validateForm.phoneNumberError}
                returnKeyType={'next'}
                maxLength={10}
                editable={false}
                blurOnSubmit={false}
                onChangeText={text =>
                  onChangeText('phoneNumber', text, 'phoneNumber')
                }
                style={styles.input}
                placeholder={'Mobile number'}
              />
            </View>

            {/* <View style={styles.dateBirthContainer}>
              <View style={styles.dateView}>
                <RegularText style={styles.dateText} title={age} />
              </View>
              <View style={styles.calendarView}></View>
            </View> */}

            {/* <View style={styles.dropDownView}> */}
            <DropDownPicker
              open={opens}
              placeholder="Select Relation"
              value={value}
              style={{
                borderColor: colors.purplishGrey,
                borderWidth: 1,
                marginTop: hp('2%'),
              }}
              items={allRelation}
              setOpen={setOpens}
              setValue={setValue}
            />
            {/* </View> */}
            <View style={styles.radioButtonSection}>
              <RegularText style={styles.genderText} title={'Gender'} />
              <View style={styles.radioContent}>
                <TouchableOpacity
                  onPress={onChooseGender}
                  style={styles.radioGroup}>
                  <View style={styles.radioView}>
                    {male ? <View style={styles.radioInnerView} /> : null}
                  </View>

                  <RegularText style={styles.female} title={'Male'} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onChooseGender}
                  style={[styles.radioGroup, {marginLeft: hp('2%')}]}>
                  <View style={styles.radioView}>
                    {!male ? <View style={styles.radioInnerView} /> : null}
                  </View>

                  <RegularText style={styles.female} title={'Female'} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.termsCheckContainer}>
              {/* <TouchableOpacity
                onPress={onChooseTermsCondition}
                style={styles.checkContainer}>
                <View style={styles.checkBox}>
                  {termsCondition ? (
                    <Image
                      style={{height: 15, width: 15}}
                      source={imagesConstants.termsCheck}
                    />
                  ) : null}
                </View>
              </TouchableOpacity> */}
              <View style={styles.checkTextContainer}>
                <RegularText style={styles.bySigningText} title={'I Accept '} />
                <TouchableOpacity
                  onPress={() => navigation.navigate('TermsCondition')}>
                  <BoldText
                    style={styles.termsConditionText}
                    title={textConstants.login.termsCondition}
                  />
                </TouchableOpacity>

                <RegularText
                  style={styles.bySigningText}
                  title={textConstants.login.and}
                />
                <TouchableOpacity
                  onPress={() => navigation.navigate('PrivacyPolicy')}>
                  <BoldText
                    style={styles.termsConditionText}
                    title={textConstants.login.privacyPolicy}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.termsCheckContainer, {marginTop: hp('1%')}]}>
              {/* <View style={styles.checkTextContainer}>
                <View>
                  <BoldText
                    style={styles.termsConditionText}
                    title={`By signing up i agree to terms of use and privacy policy`}
                  />
                </View>
              </View> */}
            </View>
            <SubmitButton
              style={styles.submitBtn}
              onPress={onSubmit}
              // onPress={handleSubmit(onSubmit)}
              title={textConstants.btnText.register}
            />
            {/* <TouchableOpacity
              hitSlop={{right: 10, top: 10, bottom: 10, left: 10}}
              onPress={enterAsGuest}
              style={styles.enterAsGuest}>
              <RegularText
                style={styles.bySigningText}
                title={textConstants.login.enterGuest}
              />
              <BoldText
                style={styles.termsConditionText}
                title={textConstants.login.guest}
              />
            </TouchableOpacity> */}
          </View>
          {datePicker ? (
            <DateTimePickerModal
              date={selectedDate}
              isVisible={datePicker}
              mode="date"
              display={'spinner'}
              maximumDate={new Date()}
              onConfirm={handleDatePickerConfirm}
              onCancel={handleDatePickerCancel}
            />
          ) : null}
        </MainContainer>
      </ScrollView>
      <Loader display={loader} />
    </SafeAreaView>
  );
};

export default index;
