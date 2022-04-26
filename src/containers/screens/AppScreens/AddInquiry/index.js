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
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './style';
import {useForm, Controller} from 'react-hook-form';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {validationRules} from '../../../../helpers/validationRules';
import DefaultHeader from '../../../components/DefaultHeader';

import {textConstants} from '../../../../constants/textConstants';
import {BoldText, ErrorText, RegularText} from '../../../components/Common';
import moment from 'moment';
import colors from '../../../../constants/colors';
import {CancelButton, SubmitButton} from '../../../components/Buttons';
import {
  InputField,
  Loader,
  MainContainer,
  TextArea,
  Toast,
} from '../../../components';

import validate from '../../../../helpers/Validator/validate_wrapper';
import imagesConstants from '../../../../constants/imagesConstants';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import style from './style';
import NetworkRequest, {
  method,
  servicesPoints,
} from '../../../../services/NetworkRequest';
import {AuthContext} from '../../../../../context/context';

import {
  check,
  openSettings,
  request,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
import {Date_Format} from '../../../../config/Setting';

const index = ({navigation}) => {
  const {addressLabel, signOut} = React.useContext(AuthContext);
  const [selectedImage, setSelectedImage] = useState([]);
  const [fullDate, setFullDate] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loader, setLoader] = useState(false);
  const [date, setDate] = useState('Date of Birth');
  const [datePicker, setDatePicker] = useState(false);
  const [male, setMale] = useState(true);
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [opens, setOpens] = useState(false);
  const [value, setValue] = useState(null);
  const [allRelation, setAllRelation] = useState([]);
  const [validateForm, setValidateForm] = useState({
    name: '',
    nameError: '',
    email: '',
    emailError: '',
    phoneNumber: '',
    phoneNumberError: '',
    address: '',
    addressError: '',
    inquiry: '',
    inquiryError: '',
  });

  const onChangeText = (key, val) => {
    setValidateForm({
      ...validateForm,
      ...{[key]: val, [`${key}Error`]: validate(key, val)},
    });
  };

  const onSubmit = async () => {
    let nameError = validate('name', validateForm.name);
    let phoneNumberError = validate('phoneNumber', validateForm.phoneNumber);

    let addressError = validate('address', validateForm.address);
    let emailError = validate('email', validateForm.email);
    let inquiryError = validate('inquiry', validateForm.inquiry);
    setValidateForm({
      phoneNumber: validateForm.phoneNumber,
      phoneNumberError: phoneNumberError,
      name: validateForm.name,
      nameError: nameError,
      address: validateForm.address,
      addressError: addressError,
      email: validateForm.email,
      emailError: emailError,
      inquiry: validateForm.inquiry,
      inquiryError: inquiryError,
    });

    if (
      phoneNumberError ||
      nameError ||
      emailError ||
      addressError ||
      inquiryError
    ) {
    } else {
      await onApiLogin();
    }
  };

  const onApiLogin = async () => {
    try {
      let formData = new FormData();

      if (Object.keys(selectedImage).length > 0) {
        formData.append('attachment', {
          uri: selectedImage[0].uri,
          name: selectedImage[0].fileName,
          type: selectedImage[0].type,
          mime: selectedImage[0].type,
        });
      }

      formData.append('fullname', validateForm.name);
      formData.append('email', validateForm.email);
      formData.append('phone_number', validateForm.phoneNumber);
      formData.append('address', validateForm.address);
      formData.append('comment', validateForm.inquiry);
      formData.append('city', 'jaipur');

      setLoader(true);
      const requestConfig = {
        method: method.post,
        url: servicesPoints.userServices.post_enquiry,
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
          navigation.goBack();
        } else {
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
          Toast(response.message, 0);
        }
      }
    } catch (error) {
      console.log(error.message);
      setLoader(false);
    }
  };

  const formatDate = date => {
    return moment(date).format('MMMM DD, YYYY');
  };
  const onChooseGender = () => {
    setMale(male ? false : true);
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
      // console.log('storage', result);
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
          onPress: () => checkPermissionStorage(),
        },
        {
          text: 'Camera',
          onPress: () => checkPermissionCamera(),
        },
      ],
      {cancelable: false},
    );
  };

  const onGallery = () => {
    try {
      const options = {
        allowsEditing: true,

        quality: 0.5,
      };
      launchImageLibrary(options, response => {
        if (response.assets) {
          setSelectedImage(response.assets);
        } else if (response.didCancel) {
          setSelectedImage([]);
        } else {
          setSelectedImage([]);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onCamera = () => {
    const options = {
      noData: true,
      allowsEditing: true,
      mediaTypes: 'mixed',
      quality: 0.5,
    };
    launchCamera(options, response => {
      if (response) {
        setSelectedImage(response.assets);
      } else if (response.didCancel) {
        setSelectedImage([]);
      } else {
        setSelectedImage([]);
      }
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <DefaultHeader
        onBack={() => navigation.goBack()}
        title={textConstants.inquiry.inQuiry}
      />
      <ScrollView style={styles.scrollView}>
        <MainContainer>
          <View style={styles.headingSection}>
            <BoldText style={styles.headingInquiry} title={'Inquiry'} />
            <RegularText
              style={styles.heading}
              title={'Add New Address that you wish to have'}
            />
          </View>
          <View style={styles.inputFieldsContainer}>
            <View style={[styles.mobileNumberInput, {marginTop: 0}]}>
              <InputField
                value={validateForm.name}
                error={validateForm.nameError}
                returnKeyType={'next'}
                blurOnSubmit={false}
                onChangeText={text => onChangeText('name', text, 'name')}
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
            {/* 
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
            </TouchableOpacity> */}
            <View style={styles.mobileNumberInput}>
              <InputField
                value={validateForm.phoneNumber}
                error={validateForm.phoneNumberError}
                returnKeyType={'next'}
                maxLength={10}
                keyboardType={'number-pad'}
                blurOnSubmit={false}
                onChangeText={text =>
                  onChangeText('phoneNumber', text, 'phoneNumber')
                }
                style={styles.input}
                placeholder={'Mobile number'}
              />
            </View>
            <View style={styles.mobileNumberInput}>
              <InputField
                value={validateForm.address}
                error={validateForm.addressError}
                returnKeyType={'next'}
                blurOnSubmit={false}
                onChangeText={text => onChangeText('address', text, 'address')}
                style={styles.input}
                placeholder={'Address'}
              />
            </View>
            <View style={styles.mobileNumberInput}>
              <TextArea
                value={validateForm.inquiry}
                error={validateForm.inquiryError}
                returnKeyType={'next'}
                multiline={true}
                blurOnSubmit={false}
                onChangeText={text => onChangeText('inquiry', text, 'inquiry')}
                style={{color: 'black'}}
                placeholder={'Write your Inquiry here'}
              />
            </View>

            <View style={styles.mobileNumberInput}>
              <TouchableOpacity onPress={onAlert}>
                <BoldText style={styles.addText} title={'Add Attachment'} />
              </TouchableOpacity>

              <View>
                <TouchableOpacity
                  onPress={onAlert}
                  style={styles.selectAttachment}>
                  <RegularText
                    style={styles.selectText}
                    title={'Select Attachment'}
                  />
                  <Image
                    style={styles.docImg}
                    source={imagesConstants.downarrow}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {selectedImage.length > 0 ? (
              <View style={[style.mobileNumberInput]}>
                <View style={styles.selectedImageView}>
                  {selectedImage.length > 0 ? (
                    <Image
                      style={styles.selectedImg}
                      source={{uri: selectedImage[0]?.uri}}
                    />
                  ) : null}

                  <TouchableOpacity
                    onPress={() => setSelectedImage([])}
                    style={styles.crossSection}>
                    <Image source={imagesConstants.cancelRed} />
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}

            <View style={styles.buttonSection}>
              <SubmitButton
                style={styles.submitBtn}
                onPress={onSubmit}
                title={textConstants.btnText.submit}
              />
            </View>
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
