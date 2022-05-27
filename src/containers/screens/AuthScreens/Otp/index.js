import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Image,
  Keyboard,
} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {AuthContext} from '../../../../../context/context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {textConstants} from '../../../../constants/textConstants';
import {SubmitButton} from '../../../components/Buttons';
import styles from './style';
import {BoldText, ErrorText, RegularText} from '../../../components/Common';
import validate from '../../../../helpers/Validator/validate_wrapper';
import imagesConstants from '../../../../constants/imagesConstants';

import NetworkRequest, {
  method,
  servicesPoints,
} from '../../../../services/NetworkRequest';
import {Loader, Toast} from '../../../components';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment';
import colors from '../../../../constants/colors';
import RNOtpVerify from 'react-native-otp-verify';
import AsyncStorage from '@react-native-async-storage/async-storage';
const index = ({navigation, route, props}) => {
  const {signIn, signOut} = React.useContext(AuthContext);
  const phone_number = route.params.phoneNumber;
  const OTP = route.params.otp;
  const [otpText, setOtpText] = useState(route.params.otp);
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [otp, setOtp] = useState('');
  const [loader, setLoader] = useState(false);
  const [validateForm, setValidateForm] = useState({
    otp: '',
    otpError: '',
  });
  const [timer, setTimer] = useState(60);

  // const onSubmit = () => {
  //   signIn('dfd', 'dd');
  // };
  // const {
  //   control,
  //   handleSubmit,
  //   formState: {errors, isValid},
  // } = useForm({mode: 'onChange'});
  // const onSubmit = data => {
  // };
  // useEffect(() => {
  //   RNOtpVerify.getOtp().then(p => {
  //     console.log(p, 'ghhbj');
  //     RNOtpVerify.addListener(otpHandler);
  //   });
  //   return () => {
  //     RNOtpVerify.removeListener();
  //   };
  // }, []);
  // const otpHandler = message => {
  //   const regex = /\d+/g;
  //   console.log('message', message);
  //   const lOtp = message.match(regex); // creates array from matches
  //   // const lOtp = message[1];
  //   console.log(lOtp);
  //   setOtp(parseInt(lOtp[0]));
  //   RNOtpVerify.removeListener();
  //   Keyboard.dismiss();
  // };
  // console.log(otp, 'otpp');
  function useInterval(callback, delay) {
    const savedCallback = useRef();
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  useInterval(() => {
    if (timer > 0) {
      setTimer(prevState => prevState - 1);
      var d = moment.duration(timer * 1000);
      var s =
        Math.floor(d.asHours()) + moment.utc(timer * 1000).format('mm:ss');
      let time = s.substring(s.indexOf('0') + 1);

      setSeconds(time);
    }
  }, 1000);

  const onSubmit = () => {
    let otpError = validate('otp', validateForm.otp);
    setValidateForm({otp: validateForm.otp, otpError: otpError});
    if (otpError) {
    } else {
      onApiSignup();
    }
  };

  const onApiSignup = async () => {
    let data = {
      phone_number: phone_number,
      otp: validateForm.otp,
      hashCode: validateForm.hashCode,
      device_token: await AsyncStorage.getItem('fcmToken'),
    };

    try {
      setLoader(true);
      const requestConfig = {
        method: method.post,
        url: servicesPoints.userServices.verifyOtp,
        data: data,
      };
      const response = await NetworkRequest(requestConfig);

      if (response) {
        const {success} = response;
        if (success) {
          setLoader(false);

          if (response.data?.new_user) {
            Toast(response.message, 1);
            navigation.navigate('SignUp', {phoneNumber: phone_number});
          } else {
            // Toast(response.message, 1);
            signIn(response.data, response.data.token);
          }

          // navigation.navigate('Otp');
          // ShowToast(1, response.message);
          // setTimeout(() => {
          //   props.onPressClear();
          // }, 500);
          // props.onJoinevent(response.response.id);
          // props.onRequestClose;
        } else {
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
      setLoader(false);
    }
  };

  const onResendOtp = async () => {
    let data = {
      phone_number: phone_number,
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
          setLoader(false);
          setOtpText(response.data.otp);
          Toast(response.message, 1);
          // Toast(response.message + ' ' + response.data.otp, 1);
          setTimer(60);
        } else {
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
      setLoader(false);
    }
  };

  function onChangeText(key, val) {
    setValidateForm({
      ...validateForm,
      ...{[key]: val, [`${key}Error`]: validate(key, val)},
    });
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.mainContainer}>
      <ImageBackground
        resizeMode="cover"
        style={styles.logoSection}
        source={imagesConstants.whiteBackground}>
        <Image style={styles.logoImg} source={imagesConstants.blalLogo} />
      </ImageBackground>
      <View style={styles.inputSection}>
        <View style={styles.headings}>
          <BoldText style={styles.headingOne} title={textConstants.otp.enter} />
          <RegularText
            style={styles.headingTwo}
            title={`${textConstants.login.weWillSend}`}
          />
        </View>
        {/* <View style={styles.headings}>
          <RegularText
            style={{
              color: colors.app_theme_dark_green,
              fontSize: hp('1.5%'),
              marginTop: hp('1.5%'),
            }}
            title={`Otp is ${otpText}`}
          />
        </View> */}

        <View style={styles.otpInput}>
          <OTPInputView
            style={styles.otpInputView}
            pinCount={6}
            keyboardType={'number-pad'}
            // code={otp}
            // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
            onCodeChanged={text => onChangeText('otp', text, 'required')}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
          />
          {validateForm.otpError ? (
            <ErrorText style={styles.errorText} title={validateForm.otpError} />
          ) : null}
        </View>

        <View>
          {seconds === '00:01' ? null : (
            <View style={styles.timerView}>
              <RegularText
                // title={`Resend code in ${timer}`}
                title={`Resend OTP in ${seconds}`}
                // title={`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
                style={styles.timerCountText}
              />
            </View>
          )}

          {seconds === '00:01' ? (
            <TouchableOpacity style={styles.resendOtpContainer}>
              <TouchableOpacity onPress={onResendOtp} style={styles.resend}>
                <BoldText
                  style={styles.resendText}
                  title={textConstants.otp.resendOtp}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          ) : null}
        </View>

        <SubmitButton
          style={styles.submitBtn}
          // onPress={handleSubmit(onSubmit)}
          onPress={onSubmit}
          title={textConstants.btnText.signIn}
        />

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
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        hitSlop={{left: 20, right: 20, top: 20, bottom: 20}}
        style={styles.backBtnSection}>
        <Image source={imagesConstants.backGreen} />
      </TouchableOpacity>
      <Loader display={loader} />
      <SafeAreaView />
    </KeyboardAwareScrollView>
  );
};

export default index;
