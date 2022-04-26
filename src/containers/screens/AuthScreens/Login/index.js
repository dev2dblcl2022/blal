import React, {useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Image,
  ScrollView,
} from 'react-native';
import {AuthContext} from '../../../../../context/context';
import {useForm, Controller} from 'react-hook-form';
import {textConstants} from '../../../../constants/textConstants';
import {SubmitButton} from '../../../components/Buttons';
import styles from './style';
import {BoldText, RegularText} from '../../../components/Common';
import validate from '../../../../helpers/Validator/validate_wrapper';
import imagesConstants from '../../../../constants/imagesConstants';
import {InputField, Loader, MainContainer, Toast} from '../../../components';
import {getUniqueId, getManufacturer} from 'react-native-device-info';
import NetworkRequest, {
  servicesPoints,
  method,
} from '../../../../services/NetworkRequest';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const index = ({navigation}) => {
  const myref = useRef();
  const {signOut, signIn} = React.useContext(AuthContext);
  const [loader, setLoader] = useState(false);
  const [validateForm, setValidateForm] = useState({
    phoneNumber: '',
    phoneNumberError: '',
  });
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({mode: 'onChange'});

  const onChangeText = (key, val) => {
    setValidateForm({
      ...validateForm,
      ...{[key]: val, [`${key}Error`]: validate(key, val)},
    });
  };

  const onSubmit = async () => {
    let phoneNumberError = validate('phoneNumber', validateForm.phoneNumber);
    setValidateForm({
      phoneNumber: validateForm.phoneNumber,
      phoneNumberError: phoneNumberError,
    });

    if (phoneNumberError) {
    } else {
      // signIn('dfd', 'dd');
      await onApiLogin();
    }
  };

  const onApiLogin = async () => {
    let data = {
      phone_number: validateForm.phoneNumber,
    };
    try {
      setLoader(true);
      const requestConfig = {
        method: method.post,
        url: servicesPoints.userServices.sendOtp,
        data: data,
      };

      const response = await NetworkRequest(requestConfig);

      if (response) {
        const {success} = response;
        if (success) {
          console.log('res s', response);
          setLoader(false);
          navigation.navigate('Otp', {
            phoneNumber: validateForm.phoneNumber,
            otp: response.data.otp,
          });
          // Toast(response.message + ' ' + response.data.otp, 1);
          Toast(response.message, 1);
        } else {
          // console.log('res failure', response);

          Toast(response.message, 0);
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
      console.log(error.message);
      setLoader(false);
    }
  };

  const enterAsGuest = () => {
    signIn('Guest', 'GuestUser');
  };
  return (
    <MainContainer>
      <ImageBackground
        resizeMode="cover"
        style={styles.logoSection}
        source={imagesConstants.whiteBackground}>
        <Image style={styles.logoImg} source={imagesConstants.blalLogo} />
      </ImageBackground>

      <View style={styles.inputSection}>
        <View style={styles.headings}>
          <BoldText
            style={styles.headingOne}
            title={textConstants.login.enter}
          />
          <RegularText
            style={styles.headingTwo}
            title={textConstants.login.weWillSend}
          />
        </View>

        <View style={styles.mobileNumberInput}>
          <InputField
            value={validateForm.phoneNumber}
            error={validateForm.phoneNumberError}
            returnKeyType={'next'}
            maxLength={10}
            keyboardType={'phone-pad'}
            blurOnSubmit={false}
            onChangeText={text =>
              onChangeText('phoneNumber', text, 'phoneNumber')
            }
            style={styles.input}
            placeholder={'Mobile number'}
          />
          {/* <Controller
            defaultValue=""
            control={control}
            render={({field: {onChange, value, onBlur}}) => (
              <TextInput
                error={errors.mobile}
                placeholder="Mobile Number"
                errorText={errors.mobile?.message}
                style={styles.textInput}
                onChangeText={onChange}
                value={value}
              />
            )}
            rules={validationRules.mobile}
            name="mobile"
          />
          {errors.mobile?.message ? (
            <ErrorText title={errors.mobile?.message} />
          ) : null} */}
        </View>

        <SubmitButton
          style={styles.submitBtn}
          // onPress={handleSubmit(onSubmit)}
          onPress={() => onSubmit()}
          title={textConstants.btnText.signIn}
        />
        <View style={[styles.enterGuestSection]}>
          <TouchableOpacity
            hitSlop={{right: 10, top: 10, bottom: 10, left: 10}}
            onPress={enterAsGuest}
            style={[styles.enterGuestInnerSection]}>
            <RegularText
              style={styles.enterAsText}
              title={textConstants.login.enterGuest}
            />
            <BoldText
              style={styles.guestText}
              title={textConstants.login.guest}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          {/* <RegularText
            style={styles.bySigningText}
            title={'By signing up, i agree to Terms of use and Privacy Policy'}
          /> */}
          <View style={styles.footerTermsSection}>
            <RegularText
              style={styles.bySigningText}
              title={'By signing up, I agree to '}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('TermsCondition')}
              hitSlop={{right: 10, top: 10, bottom: 10, left: 10}}>
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
              onPress={() => navigation.navigate('PrivacyPolicy')}
              hitSlop={{right: 10, top: 10, bottom: 10, left: 10}}>
              <BoldText
                style={styles.termsConditionText}
                title={textConstants.login.privacyPolicy}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <SafeAreaView />
      <Loader display={loader} />
    </MainContainer>
  );
};

export default index;
