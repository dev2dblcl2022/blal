import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
  Platform,
  FlatList,
  Alert,
} from 'react-native';

import {
  check,
  request,
  openSettings,
  PERMISSIONS,
  RESULTS,
  requestMultiple,
} from 'react-native-permissions';
import {launchCamera} from 'react-native-image-picker';
import {useForm, Controller} from 'react-hook-form';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './style';
import DefaultHeader from '../../../components/DefaultHeader';
import {textConstants} from '../../../../constants/textConstants';
import {BoldText, RegularText} from '../../../components/Common';
import colors from '../../../../constants/colors';
import Geolocation from 'react-native-geolocation-service';
import {
  BookingSuccessPopup,
  Loader,
  LocationAddressCard,
  MainContainer,
  TextArea,
  Toast,
} from '../../../components';
import {ScrollView} from 'react-native-gesture-handler';
import imagesConstants from '../../../../constants/imagesConstants';
import {SubmitButton} from '../../../components/Buttons';
import NetworkRequest, {
  method,
  servicesPoints,
} from '../../../../services/NetworkRequest';
import DocumentPicker from 'react-native-document-picker';
import validate from '../../../../helpers/Validator/validate_wrapper';
let selectImage = 0;
import DropDownPicker from 'react-native-dropdown-picker';
import CameraController from '../../../components/CameraController';

const index = ({navigation}) => {
  const [images, setImages] = useState([]);
  const [patientOpens, setPatientOpens] = useState(false);
  const [patientValues, setPatientValues] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [selectedAddresses, setSelectedAddresses] = useState({});
  const [loader, setLoader] = useState(false);
  const [selectedType, setSelectedType] = useState(0);
  const [radioBookingType, setRadioBookingType] = useState([
    {id: 0, type: 'Home', source: imagesConstants.house},
    {id: 1, type: 'Labs', source: imagesConstants.flask},
  ]);
  const [validateForm, setValidateForm] = useState({
    instruction: '',
    instructionError: '',
  });
  const [patients, setPatients] = useState([]);
  const [bookingSuccessPopup, setBookingSuccessPopup] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({mode: 'onChange'});
  const [handleConnectionState, setHandleConnectionState] = useState(false);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [currentLocation, setCurrentLocation] = useState(false);
  useEffect(() => {
    if (handleConnectionState) {
      navigation.navigate('ConnectionHandle');
    }
  }, [handleConnectionState]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getMyFamilyMembers();
      getAddresses();
    });
    return unsubscribe;
  }, []);

  const getMyFamilyMembers = async () => {
    const requestConfig = {
      method: method.get,
      url: servicesPoints.userServices.my_family_mambers,
    };
    const response = await NetworkRequest(requestConfig);

    if (response) {
      const {success} = response;
      if (success) {
        let newData = [];
        let test = response.data;
        test.map(item => {
          newData.push({label: item.fullname, value: item.id});
          // return {label: item.fullname, value: item.id};
        });
        setPatients(newData);
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
      setLoader(false);
    }
  };

  const getAddresses = async () => {
    const requestConfig = {
      method: method.get,
      url: servicesPoints.userServices.get_User_Address,
    };
    const response = await NetworkRequest(requestConfig);

    if (response) {
      const {success} = response;
      if (success) {
        setAddresses(response.data);
        setLoader(false);
      } else {
        if (response === 'Network Error') {
          Toast('Network Error', 0);
          setHandleConnectionState(true);
        }
        setLoader(false);
      }
    }
  };

  const uploadApi = async () => {
    if (!patientValues) {
      Toast('Please select Patients');
    } else if (Object.keys(selectedAddresses).length === 0) {
      Toast('Please select Address');
    } else {
      setLoader(true);
      let formData = new FormData();

      images.forEach(image => {
        const {uri, type, size} = image;

        formData.append('documents', {
          name: 'user_document' + Date.now(),
          uri: uri,
          type: type,
          mime: type,
          size,
        });
      });
      formData.append('instructions', validateForm.instruction);
      formData.append('member_id', patientValues);

      formData.append('address_id', selectedAddresses.id);
      formData.append('collection_type', selectedType === 0 ? 'Home' : 'Lab');
      formData.append(
        'address',
        `${selectedAddresses.area1} ${selectedAddresses.area2} ${selectedAddresses.city},${selectedAddresses.state} ${selectedAddresses.pincode}`,
      );

      const requestConfig = {
        method: method.post,
        data: formData,
        url: servicesPoints.userServices.upload_prescription,
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
          Toast(response.message, 0);

          if (response === 'Network Error') {
            Toast('Network Error', 0);
            setHandleConnectionState(true);

            setLoader(false);
          }
          setLoader(false);
        }
      }
    }
  };

  function onSelectAddress(item) {
    let data = addresses;
    data = data.map((itn, index) => {
      if (itn.id == item.id) {
        itn.selected = !itn.selected;
      } else {
        itn.selected = false;
      }
      return itn;
    });
    setAddresses(data);

    var selectedAddress = addresses.find(p => p.selected);

    setSelectedAddresses(selectedAddress);
  }

  const renderAlsoAddCard = item => {
    return (
      <LocationAddressCard onSelect={() => onSelectAddress(item)} data={item} />
    );
  };
  const radioItemSelected = item => {
    setSelectedType(item.id);
  };

  const btnUploadPrescription = () => {
    if (images.length > 0) {
      uploadApi();
    } else {
      Toast('Please select Document', 0);
    }

    // setBookingSuccessPopup(true);
  };

  const onChangeText = (key, val) => {
    setValidateForm({
      ...validateForm,
      ...{[key]: val, [`${key}Error`]: validate(key, val)},
    });
  };
  const success = pos => {
    const crd = pos.coords;
    setLatitude(crd.latitude);
    setLongitude(crd.longitude);
    setCurrentLocation(true);
    navigation.navigate('AddNewAddress', {
      lat: crd.latitude,
      long: crd.longitude,
    });
  };

  const error = err => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };
  const onAddAddress = () => {
    request(
      Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      }),
    ).then(response => {
      if (response === 'granted') {
        Geolocation.getCurrentPosition(success, error, {
          showLocationDialog: true,
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 0,
        });
      } else {
        setLoader(false);
        navigation.navigate('AddNewAddress', {
          lat: 28.5342,
          long: 77.2094,
        });
      }
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <DefaultHeader
        onBack={() => navigation.goBack()}
        title={textConstants.home.uploadPrescription}
      />
      <View style={styles.mainContainer}>
        <ScrollView
          scrollEnabled={!patientOpens}
          showsVerticalScrollIndicator={false}>
          <MainContainer>
            {/* <View> */}
            <View style={styles.headingSection}>
              <BoldText style={styles.heading} title={'Select Patient'} />
            </View>
            {/* <View style={styles.patientSection}>
                <View style={styles.dropDownView}> */}
            <DropDownPicker
              open={patientOpens}
              placeholder="Patients"
              value={patientValues}
              placeholderStyle={{color: colors.purplishGrey}}
              style={{borderColor: colors.purplishGrey, borderWidth: 1}}
              dropDownContainerStyle={{
                borderColor: colors.purplishGrey,
                borderWidth: 1,
              }}
              items={patients}
              zIndex={2000}
              setOpen={setPatientOpens}
              setValue={setPatientValues}
            />
            {/* </View>
              </View> */}
            {/* </View> */}
            <View
              style={[
                styles.headingSection,
                {marginTop: patientOpens ? hp('24%') : 0},
              ]}>
              <BoldText
                style={styles.heading}
                title={'Images (Upload Maximum 4 pictures)'}
              />
            </View>
            <View style={styles.boxImgSection}>
              {images?.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View style={styles.selectedImageContainer}>
                      {item.type === 'image/jpeg' ||
                      item.type === 'image/jpg' ? (
                        <Image
                          source={{
                            uri: item.uri,
                          }}
                          style={{height: hp('10%'), width: hp('10%')}}
                          resizeMode={'cover'}
                        />
                      ) : (
                        <Image
                          source={imagesConstants.pdf}
                          // style={{flex: 1, width: '100%'}}
                          style={{height: hp('10%'), width: hp('10%')}}
                          resizeMode={'cover'}
                        />
                      )}
                    </View>

                    <TouchableOpacity
                      onPress={() => onDeleteImage(index)}
                      style={styles.removeView}>
                      <Image source={imagesConstants.cancelRed} />
                    </TouchableOpacity>
                  </View>
                );
              })}
              {images.length < 4 ? (
                <TouchableOpacity
                  style={styles.touchAddImageBox}
                  onPress={() =>
                    images.length === 4
                      ? Toast(
                          0,
                          'You have reached your max upload prescription',
                        )
                      : onSelectPhoto()
                  }>
                  <Image source={imagesConstants.add_plus} />
                  <RegularText
                    style={[styles.addMoreText, {marginTop: 5}]}
                    title={'Add More'}
                  />
                </TouchableOpacity>
              ) : null}
            </View>

            <View style={styles.headingSection}>
              <BoldText
                style={styles.heading}
                title={'Enter Instructions (optional)'}
              />
              <View
                style={{
                  borderColor: '#eee',
                }}>
                <View style={styles.marginTopInput}>
                  <TextArea
                    value={validateForm.instruction}
                    error={validateForm.instructionError}
                    returnKeyType={'next'}
                    multiline={true}
                    blurOnSubmit={false}
                    onChangeText={text =>
                      onChangeText('instruction', text, 'instruction')
                    }
                    style={{color: 'black'}}
                    placeholder="Any Lab Request? Enter your request here. we will try our best to convey it."
                  />
                </View>
              </View>
            </View>

            {/** Select Address */}
            <View style={styles.youCanAddSection}>
              <View style={styles.listHeading}>
                <BoldText title={'Select Address'} style={styles.headingText} />
                <TouchableOpacity
                  onPress={onAddAddress}
                  hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}>
                  <BoldText title={'+ Add Address'} style={styles.addAddress} />
                </TouchableOpacity>
              </View>
              <View style={styles.alsoAddListSection}>
                <FlatList
                  data={addresses}
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  ListEmptyComponent={() => {
                    return (
                      <View
                        style={{
                          height: hp('20%'),

                          width: hp('45%'),

                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <RegularText
                          style={{color: colors.app_theme_dark_green}}
                          title={'No Address Found'}
                        />
                      </View>
                    );
                  }}
                  showsVerticalScrollIndicator={false}
                  extraData={addresses}
                  renderItem={({item}) => renderAlsoAddCard(item)}
                />
              </View>
            </View>
            <View style={styles.sampleTypeHeaderTitle}>
              <View style={styles.sectionOne}>
                {/* <View style={styles.headingCollection}>
                  <BoldText
                    style={styles.sampleText}
                    title={'Select Type (Required)'}
                  />
                </View> */}
                {/* <View style={styles.sampleSection}>
                  {radioBookingType.map((data, index) => {
                    return (
                      <View key={index} style={styles.sampleSection}>
                        <TouchableOpacity
                          key={index}
                          onPress={() => radioItemSelected(data)}>
                          <View style={styles.typeUnSelect}>
                            {selectedType == data.id ? (
                              <View style={styles.typeSelect} />
                            ) : null}
                          </View>
                        </TouchableOpacity>
                        <View style={styles.profilePicView}>
                          <Image
                            style={styles.profilePic}
                            source={data.source}
                          />
                        </View>
                        <BoldText
                          style={[styles.bookingHeading, {marginTop: 5}]}
                          title={data.type}
                        />
                      </View>
                    );
                  })}
                </View> */}
              </View>
            </View>
          </MainContainer>
          <View style={styles.submitBtnSection}>
            <SubmitButton
              title={'Upload Prescription'}
              onPress={btnUploadPrescription}
            />
          </View>
        </ScrollView>
      </View>
      <BookingSuccessPopup
        uploadPrescription={true}
        data={{booking_id: 'asd', datetime: 'asd'}}
        navigation={navigation}
        successVisible={bookingSuccessPopup}
      />
      <Loader display={loader} />
    </SafeAreaView>
  );

  function onSelectPhoto() {
    Alert.alert(
      'Upload Prescription',
      'Choose from gallery or take from camera',
      [
        {
          text: 'Capture Photo',
          onPress: checkPermissionCamera,
        },
        {
          text: 'Choose Photo',
          onPress: checkPermissionStorage,
        },
        {
          text: 'cancel',
        },
      ],
      {cancelable: false},
    );
  }

  async function onChooseGallery() {
    try {
      const results = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });

      let object = results[0];
      if (
        object.type === 'image/jpeg' ||
        object.type === 'image/png' ||
        object.type === 'application/pdf'
      ) {
        setImages([...images, ...results]);
      } else {
        Toast('You can upload only Images or Pdf file');
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  }

  function onCamera() {
    try {
      const options = {
        allowsEditing: true,
        multiple: false,
        quality: 0.5,
      };
      launchCamera(options, response => {
        selectImage = 1;
        if (response.assets) {
          setImages([...images, ...response.assets]);

          selectImage = 1;
        } else if (response.didCancel) {
          selectImage = 0;
          setImages([]);
        } else if (response === 'Permissions weren granted') {
          selectImage = 0;
          setImages([]);
        } else {
          selectImage = 0;
          setImages([]);
        }
      });
    } catch (err) {
      console.log('err', err);
    }
  }

  async function checkPermissionCamera() {
    // CameraController.open(data => {
    //   if (data) {
    //     // setProfileImage(data.path);
    //     // setUpdateProfileImage(true);
    //   }
    // });
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
              onChooseGallery();
          }
          break;
        case RESULTS.LIMITED:
          Toast('The permission is limited: some actions are possible', 0);
          break;
        case RESULTS.GRANTED:
          onChooseGallery();
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

  function onDeleteImage(imageIndexToDelete) {
    let newArray = images.filter((image, index) => {
      if (index !== imageIndexToDelete) {
        return image;
      }
    });

    setImages(newArray);
  }
};

export default index;
