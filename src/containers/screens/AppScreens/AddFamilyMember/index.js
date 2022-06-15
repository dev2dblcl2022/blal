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
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DefaultHeader from '../../../components/DefaultHeader';
import {textConstants} from '../../../../constants/textConstants';
import {BoldText, RegularText} from '../../../components/Common';
import moment from 'moment';
import {CancelButton, SubmitButton} from '../../../components/Buttons';
import {InputField, Loader, MainContainer, Toast} from '../../../components';
import validate from '../../../../helpers/Validator/validate_wrapper';
import imagesConstants from '../../../../constants/imagesConstants';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import NetworkRequest, {
  method,
  servicesPoints,
} from '../../../../services/NetworkRequest';
import {AuthContext} from '../../../../../context/context';
import {Date_Format} from '../../../../config/Setting';
import {
  check,
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';
import colors from '../../../../constants/colors';
let age = 'Age';

let selectImage = 0;
const index = ({navigation}) => {
  const {signOut} = React.useContext(AuthContext);
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
  const [allRelation, setAllRelation] = useState([
    {label: 'Brother', value: 'Brother'},
    {label: 'Child', value: 'Child'},
    {label: 'Father', value: 'Father'},
    {label: 'Friend', value: 'Friend'},
    {label: 'Grandparent', value: 'Grandparent'},
    {label: 'Husband', value: 'Husband'},
    {label: 'Mother', value: 'Mother'},
    {label: 'Relative', value: 'Relative'},
    {label: 'Sibling', value: 'Sibling'},
    {label: 'Sister', value: 'Sister'},
    {label: 'Wife', value: 'Wife'},
  ]);
  const [validateForm, setValidateForm] = useState({
    name: '',
    nameError: '',
    email: '',
    emailError: '',

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
    // let phoneNumberError = validate('phoneNumber', validateForm.phoneNumber);
    // let ageError = validate('age', validateForm.age);
    let emailError = validate('email', validateForm.email);
    setValidateForm({
      // phoneNumber: validateForm.phoneNumber,
      // phoneNumberError: phoneNumberError,
      name: validateForm.name,
      nameError: nameError,
      // age: validateForm.age,
      // ageError: ageError,
      email: validateForm.email,
      emailError: emailError,
    });

    if (nameError || emailError) {
    } else {
      if (date === 'Select Date') {
        Toast('Please Choose Date', 0);
      } else if (!value) {
        Toast('Please Select Relations', 0);
      }

      // else if (selectedImage.length === 0) {
      //   Toast('Please Select Profile Image', 0);
      // }
      else {
        await onApiLogin();
      }
    }
  };

  const onApiLogin = async () => {
    try {
      let formData = new FormData();
      if (selectedImage.length > 0) {
        formData.append('photo', {
          uri: selectedImage[0].uri,
          name: selectedImage[0].fileName,
          type: selectedImage[0].type,
          mime: selectedImage[0].type,
        });
      }

      formData.append('fullname', validateForm.name);
      formData.append('email', validateForm.email);

      // formData.append('dob', fullDate);
      formData.append('dob', fullDate);
      formData.append('gender', male ? 'Male' : 'Female');
      formData.append('age', age);
      formData.append('relation', value);
      setLoader(true);
      const requestConfig = {
        method: method.post,
        url: servicesPoints.userServices.add_family_mamber,
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
          age = 'Age';
          navigation.goBack();
        } else if (response === 'Network Error') {
          Toast('Network Error', 0);
          setHandleConnectionState(true);
          setLoader(false);
        } else if (response.status === 401) {
          signOut();
        } else {
          null;
        }
        setLoader(false);
        Toast(response.message, 1);
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
    setFullDate(newDate);
    setDatePicker(false);
  };

  const calculateAge = async birthday => {
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs);
    let valueAge = Math.abs(ageDate.getUTCFullYear() - 1970);
    age = valueAge;
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
        setSelectedImage(response.assets);
        selectImage = 1;
      } else if (response.didCancel) {
        setSelectedImage({});
        selectImage = 0;
      } else {
        setSelectedImage({});
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
        setSelectedImage(response.assets);
        selectImage = 1;
      } else if (response.didCancel) {
        setSelectedImage({});
        selectImage = 0;
      } else {
        setSelectedImage({});
        selectImage = 0;
      }
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <DefaultHeader
        onBack={() => navigation.goBack()}
        title={textConstants.addFamilyMember.addFamilyMember}
      />
      <ScrollView scrollEnabled={!opens} style={styles.scrollView}>
        <MainContainer>
          <View style={styles.profilePicContainer}>
            <View>
              <View style={styles.profileView}>
                {selectedImage.length > 0 ? (
                  <Image
                    style={styles.profileImage}
                    source={
                      selectedImage[0]?.uri
                        ? {
                            uri: selectedImage[0]?.uri,
                          }
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
          <View style={styles.noteSection}>
            {/* <BoldText style={styles.noteText} title={'Note: '} /> */}
            <RegularText
              style={styles.notesTextTwo}
              title={
                'You cannot edit these details once you have saved them. They will appear on all you medical documents. Do you wish to confirm'
              }
            />
          </View>
          <View style={styles.headingSection}>
            <BoldText
              style={styles.heading}
              title={'Enter Personal Details for the member'}
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

            {/* <View style={styles.dateBirthContainer}>
              <View style={styles.dateView}>
                <RegularText style={styles.dateText} title={age} />
              </View>
              <View style={styles.calendarView}></View>
            </View> */}
            {/* <View style={[styles.dropDownView]}> */}
            <DropDownPicker
              open={opens}
              placeholder="Select Relation"
              value={value}
              listMode={'SCROLLVIEW'}
              style={{borderColor: colors.purplishGrey}}
              items={allRelation}
              zIndex={1000}
              setOpen={setOpens}
              setValue={setValue}
              scrollViewProps={{nestedScrollEnabled: true}}
            />
            {/* </View> */}
            <View
              style={[styles.radioButtonSection, {marginTop: opens ? 50 : 0}]}>
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

            <View style={styles.buttonSection}>
              <CancelButton
                style={styles.submitBtn}
                onPress={() => navigation.pop()}
                title={textConstants.btnText.cancel}
              />
              <SubmitButton
                style={styles.submitBtn}
                onPress={onSubmit}
                title={textConstants.btnText.addMember}
              />
            </View>
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
