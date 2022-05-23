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

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './style';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

import DefaultHeader from '../../../components/DefaultHeader';

import {textConstants} from '../../../../constants/textConstants';
import {BoldText, RegularText} from '../../../components/Common';
import moment from 'moment';

import {SubmitButton} from '../../../components/Buttons';
import imagesConstants from '../../../../constants/imagesConstants';
import {InputField, Loader, MainContainer, Toast} from '../../../components';

import validate from '../../../../helpers/Validator/validate_wrapper';
import NetworkRequest, {
  method,
  servicesPoints,
} from '../../../../services/NetworkRequest';
import {AuthContext} from '../../../../../context/context';
import colors from '../../../../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  check,
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';
import {Date_Format} from '../../../../config/Setting';

// test
let imageSelection = 0;

const index = ({navigation, route}) => {
  const {signIn, signOut} = React.useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [profileImage, setProfileImage] = useState({});
  const [termsCondition, setTermsCondition] = useState(false);
  const [loader, setLoader] = useState(false);
  const [date, setDate] = useState('23-09-2021');
  const [datePicker, setDatePicker] = useState(false);
  const [male, setMale] = useState(true);
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [fullDate, setFullDate] = useState('');
  const [opens, setOpens] = useState(false);
  const [value, setValue] = useState(null);
  const [userProfileImage, setUserProfileImage] = useState();
  const [allRelation, setAllRelation] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
  ]);

  const [validateForm, setValidateForm] = useState({
    name: '',
    nameError: '',
    email: '',
    emailError: '',
    phoneNumber: '',
    phoneNumberError: '',
    age: '',
    ageError: '',
    gender: '',
    genderError: '',
  });

  // useEffect(() => {
  //   getMyProfile();
  // }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getMyProfile();
    });
    return unsubscribe;
  }, [navigation]);
  const getMyProfile = async () => {
    try {
      const requestConfig = {
        method: method.get,
        url: servicesPoints.userServices.my_profile,
      };

      const response = await NetworkRequest(requestConfig);
      if (response) {
        const {success} = response;
        if (success) {
          setUserData(response.data);
          setDate(response.data.dob);
          setValidateForm({
            name: response.data.fullname,
            nameError: '',
            email: response.data.email,
            emailError: '',
            phoneNumber: response.data.phone_number.toString(),
            phoneNumberError: '',
            age: response.data.age.toString(),
            ageError: '',
            gender: response.data.gender,
            genderError: '',
          });
          // setLoader(false);
        } else {
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
    } catch (error) {
      setLoader(false);
    }
  };

  // const getUserData = async () => {
  //   try {
  //     let user_Data = await AsyncStorage.getItem('userData');
  //     let parseUserData = JSON.parse(user_Data);
  //     imageSelection = 0;
  //     setValidateForm({
  //       name: parseUserData.user.fullname,
  //       nameError: '',
  //       email: parseUserData.user.email,
  //       emailError: '',
  //       phoneNumber: parseUserData.user.phone_number.toString(),
  //       phoneNumberError: '',
  //       age: parseUserData.user.age.toString(),
  //       ageError: '',
  //       gender: parseUserData.user.gender,
  //       genderError: '',
  //     });
  //     setDate(parseUserData.user.dob);
  //     setUserProfileImage(parseUserData.user.photo);
  //   } catch (error) {
  //   }

  //   // setUserData(parseUserData);
  // };

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
      age: validateForm.age,
      // ageError: ageError,
      email: validateForm.email,
      emailError: emailError,
    });

    if (phoneNumberError || nameError || emailError) {
    } else {
      // if (date === 'Select Date') {
      //   Toast('Please Choose Date', 0);
      // } else if (!value) {
      //   Toast('Please Select Relations', 0);
      // } else if (!termsCondition) {
      //   Toast('Please Allow Terms & Condition', 0);
      // } else {
      //   await onApiLogin();

      // }
      onApiLogin();
    }
  };

  const onApiLogin = async () => {
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

      formData.append('email', validateForm.email);
      formData.append('phone_number', validateForm.phoneNumber);
      formData.append('device_token', 'asd');
      formData.append('dob', date);
      formData.append('gender', male ? 'Male' : 'Female');
      formData.append('age', validateForm.age);
      formData.append('relation', 'Self');
      formData.append('fullname', validateForm.name);

      const requestConfig = {
        method: method.put,
        url: servicesPoints.userServices.update_profile,
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

          Toast(response.message, 1);
          navigation.pop(1);
        } else {
          setLoader(false);
          if (response === 'Network Error') {
            Toast('Network Error', 0);
            setLoader(false);
          } else if (response.status === 401) {
            signOut();
          } else {
            null;
          }
          Toast(response.message, 0);
        }
      }
    } catch (error) {
      setLoader(false);
    }
  };

  let uploadImage = async data => {};

  const formatDate = date => {
    return moment(date).format('MMMM DD, YYYY');
  };

  const handleDatePickerConfirm = date => {
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
    setFullDate(newDate);
    setDatePicker(false);
  };

  const handleDatePickerCancel = () => {
    setDatePicker(false);
  };

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

      quality: 0.5,
    };
    launchImageLibrary(options, response => {
      if (response.assets) {
        setProfileImage(response.assets);
        imageSelection = 1;
      } else if (response.didCancel) {
        setProfileImage({});
      } else {
        setProfileImage({});
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
      imageSelection = 1;
      if (response.assets) {
        setProfileImage(response.assets);
        imageSelection = 1;
      } else if (response.didCancel) {
        imageSelection = 0;
        setProfileImage({});
      } else if (response === 'Permissions weren granted') {
        imageSelection = 0;
        setProfileImage({});
      } else {
        imageSelection = 0;
        setProfileImage({});
      }
    });
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
          Toast('This feature is not available on this device', 0);
          break;
        case RESULTS.DENIED:
          const requestResult = await request(platformPermission);
          switch (requestResult) {
            case RESULTS.GRANTED:
              await onCamera();
          }
          break;
        case RESULTS.LIMITED:
          Toast('The permission is limited: some actions are possible', 0);
          break;
        case RESULTS.GRANTED:
          await onCamera();
          break;
        case RESULTS.BLOCKED:
          Alert.alert(
            'Permission Blocked',
            'Press OK and provide Camera Access permission in opened app setting',
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
          Toast('The permission is limited: some actions are possible', 0);
          Alert.alert(
            'Permission Blocked',
            'Press OK and provide Photo Gallery(Storage) Access permission in opened app setting',
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
          break;
        case RESULTS.GRANTED:
          onGallery();
          break;
        case RESULTS.BLOCKED:
          Alert.alert(
            'Permission Blocked',
            'Press OK and provide Photo Gallery(Storage) Access permission in opened app setting',
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
    } catch (error) {
      console.log('Unable to open App Settings:', error);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <DefaultHeader
        onBack={() => navigation.goBack()}
        title={textConstants.myProfile.myProfile}
      />
      <ScrollView style={styles.scrollView}>
        <MainContainer>
          <View style={styles.profilePicContainer}>
            <View>
              <View style={styles.profileView}>
                <Image
                  style={styles.profileImage}
                  source={
                    profileImage[0]?.uri
                      ? {uri: profileImage[0]?.uri}
                      : {uri: userData.photo}
                  }
                />
              </View>

              <TouchableOpacity onPress={onAlert} style={styles.addProfile}>
                <Image source={imagesConstants.camera} />
              </TouchableOpacity>
            </View>
            <View style={styles.addProfileTextView}>
              <RegularText
                style={styles.addProfileText}
                title={validateForm.name}
              />
            </View>
          </View>

          <View style={styles.noteSection}>
            {/* <BoldText style={styles.noteText} title={'Note: '} /> */}
            <RegularText
              style={styles.notesTextTwo}
              title={
                'You cannot edit these details once you have saved them. They will appear on all you medical documents. Do you wish to confirm'
              }
            />
          </View>
          <View style={styles.inputFieldsContainer}>
            <View style={styles.mobileNumberInput}>
              <InputField
                value={validateForm.name}
                error={validateForm.nameError}
                returnKeyType={'next'}
                editable={false}
                blurOnSubmit={false}
                onChangeText={text => onChangeText('name', text, 'name')}
                style={[styles.input, {backgroundColor: colors.gray}]}
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

            <View
              //   onPress={() => setDatePicker(true)}
              style={[
                styles.dateBirthContainer,
                {backgroundColor: colors.gray},
              ]}>
              <View style={styles.dateView}>
                <RegularText style={styles.dateText} title={date} />
              </View>
              <View style={styles.calendarView}>
                <Image
                  style={styles.calendarImage}
                  source={imagesConstants.calendar}
                />
              </View>
            </View>
            <View style={styles.mobileNumberInput}>
              <InputField
                value={validateForm.phoneNumber}
                error={validateForm.phoneNumberError}
                returnKeyType={'next'}
                maxLength={10}
                editable={false}
                style={[styles.input, {backgroundColor: colors.gray}]}
                blurOnSubmit={false}
                onChangeText={text =>
                  onChangeText('phoneNumber', text, 'phoneNumber')
                }
                placeholder={'Mobile number'}
              />
            </View>
            <View style={styles.mobileNumberInput}>
              <InputField
                value={validateForm.age}
                error={validateForm.ageError}
                returnKeyType={'next'}
                blurOnSubmit={false}
                editable={false}
                style={[styles.input, {backgroundColor: colors.gray}]}
                onChangeText={text => onChangeText('age', text, 'age')}
                placeholder={'Age'}
              />
            </View>

            <View style={styles.mobileNumberInput}>
              <InputField
                value={validateForm.gender}
                error={validateForm.genderError}
                returnKeyType={'next'}
                blurOnSubmit={false}
                style={[styles.input, {backgroundColor: colors.gray}]}
                editable={false}
                onChangeText={text => onChangeText('age', text, 'age')}
                placeholder={'Gender'}
              />
            </View>

            <SubmitButton
              style={styles.submitBtn}
              onPress={onSubmit}
              // onPress={handleSubmit(onSubmit)}
              title={textConstants.btnText.update}
            />
          </View>
          {datePicker ? (
            <DateTimePickerModal
              date={selectedDate}
              isVisible={datePicker}
              mode="date"
              display={'spinner'}
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
