import React, {useEffect, useState} from 'react';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
  Platform,
} from 'react-native';
import imagesConstants from '../../../../constants/imagesConstants';
import RNFS from 'react-native-fs';
import {
  DefaultHeader,
  InputField,
  Loader,
  MainContainer,
  MyCartTestCard,
  TextArea,
  Toast,
} from '../../../components';
import FileViewer from 'react-native-file-viewer';
import {BoldText, LightText, RegularText} from '../../../components/Common';
import styles from './styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import NetworkRequest, {
  method,
  servicesPoints,
} from '../../../../services/NetworkRequest';
import RNFetchBlob from 'rn-fetch-blob';
import colors from '../../../../constants/colors';
import {CancelButton, SubmitButton} from '../../../components/Buttons';
import {AuthContext} from '../../../../../context/context';
import validate from '../../../../helpers/Validator/validate_wrapper';
const index = ({navigation, route}) => {
  const {signOut, signIn} = React.useContext(AuthContext);
  const myBookingData = route.params.myBookingData;

  const [ratingCount, setRatingCount] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [ratingNumbers, setRatingNumbers] = useState([]);
  const [loader, setLoader] = useState(true);
  const [bookingDetailData, setBookingDetailData] = useState({});
  const [subHeading, setSubHeading] = useState('');
  const [validateForm, setValidateForm] = useState({
    review: '',
    reviewError: '',
  });
  useEffect(() => {
    getMyBookingDetail();
  }, []);

  const getMyBookingDetail = async () => {
    try {
      const requestConfig = {
        method: method.get,

        url: `${servicesPoints.bookingServices.booking_details}/${myBookingData.id}`,
      };

      const response = await NetworkRequest(requestConfig);

      if (response) {
        const {success} = response;
        if (success) {
          setBookingDetailData(response.data);

          setLoader(false);
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
      } else {
        setLoader(false);
      }
    } catch (err) {
      console.log('err', err);
    }
  };

  const ratingCompleted = rating => {
    setRatingCount(rating);
    getQuestion(rating);
  };

  const getQuestion = async val => {
    try {
      const requestConfig = {
        method: method.get,

        url: `${servicesPoints.rating.get_rating_data}/${val}`,
      };

      const response = await NetworkRequest(requestConfig);

      if (response) {
        const {success} = response;
        if (success) {
          // setBookingDetailData(response.data);

          setQuestions(response.data.questionairs);
          setRatingNumbers(response.data?.rating?.rating_number_items);
          setSubHeading(response.data?.rating?.subtitle);
          setLoader(false);
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
      } else {
        setLoader(false);
      }
    } catch (err) {
      console.log('err', err);
    }
  };

  const onChangeText = (key, val) => {
    setValidateForm({
      ...validateForm,
      ...{[key]: val, [`${key}Error`]: validate(key, val)},
    });
  };

  const submitRating = async val => {
    if (ratingCount === 0) {
      Toast('Please select Rating first!');
    } else {
      setLoader(true);
      let ques = [];
      let arr = [];
      let arr1 = [];
      ques = questions.map(item => {
        if (item.yesSelected || item.noSelected) {
          arr.push({ques_id: item.id.toString(), ans: item.ans});
        }
        return item;
      });
      let ratingNo = ratingNumbers;

      ques = ratingNo.map((itn, index) => {
        if (itn.selected) {
          arr1.push(itn.id.toString());
        }

        return itn;
      });
      try {
        let data = {
          booking_id: myBookingData.id,
          rating_number_id: ratingCount.toString(),
          rating_number_items: arr1,
          rating_number_questionairs: arr,
          comment: validateForm.instruction,
        };

        const requestConfig = {
          method: method.post,
          data: data,
          url: `${servicesPoints.rating.give_rating}`,
        };

        const response = await NetworkRequest(requestConfig);

        if (response) {
          const {success} = response;
          if (success) {
            setLoader(false);
            Toast(response.message, 1);
            navigation.pop();
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
        } else {
          setLoader(false);
        }
      } catch (err) {
        console.log('err', err);
      }
    }
  };

  const onSelectYes = item => {
    let data = questions;
    data = data.map((itn, index) => {
      if (itn.id === item.id) {
        itn.ans = !itn.ans;
        itn.yesSelected = !itn.yesSelected;

        itn.ans_value = 'Yes';
      }
      return itn;
    });
    setQuestions(data);
  };

  const onSelectNo = item => {
    let data = questions;
    data = data.map((itn, index) => {
      if (itn.id === item.id) {
        itn.ans = false;
        itn.noSelected = !itn.noSelected;
        itn.ans_value = 'No';
      }
      return itn;
    });
    setQuestions(data);
  };

  const onSelectCircle = item => {
    let data = ratingNumbers;
    data = data.map((itn, index) => {
      if (itn.id === item.id) {
        itn.selected = !item.selected;
      }
      return itn;
    });
    setRatingNumbers(data);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <DefaultHeader
        onBack={() => navigation.goBack()}
        title={`My Booking #${myBookingData.LisBookId}`}
      />
      <MainContainer>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
          <View style={styles.fullContainer}>
            {ratingCount ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingVertical: hp('2%'),
                  paddingHorizontal: hp('2%'),
                }}>
                <BoldText
                  style={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: colors.app_theme_dark_green,
                    fontSize: hp('3%'),
                  }}
                  title={
                    ratingCount === 1
                      ? 'Terrible'
                      : ratingCount === 2
                      ? 'Bad'
                      : ratingCount === 3
                      ? 'Ok'
                      : ratingCount === 4
                      ? 'Good'
                      : 'Excellent'
                  }
                />
                <Image
                  style={{height: 48, width: 48, marginLeft: 10}}
                  source={{
                    uri: ratingNumbers[0]?.gif_icon,
                  }}
                />
              </View>
            ) : null}

            <View style={styles.ratingView}>
              <AirbnbRating
                count={5}
                // reviews={['Terrible', 'Bad', 'Ok', 'Good !', 'Excellent']}
                reviewColor={colors.app_theme_dark_green}
                selectedColor={colors.app_theme_dark_green}
                style={{paddingVertical: 20}}
                reviewSize={0}
                ratingContainerStyle={{
                  paddingVertical: hp('3%'),
                }}
                jumpValue={0.5}
                defaultRating={0}
                onFinishRating={ratingCompleted}
                starContainerStyle={{
                  marginTop: hp('2%'),
                  justifyContent: 'space-between',

                  width: '80%',
                }}
                size={40}
              />
            </View>
            {ratingCount ? (
              <View style={{height: 10, backgroundColor: colors.gray}}></View>
            ) : null}
            {ratingCount ? (
              <>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingVertical: hp('2%'),
                    paddingHorizontal: hp('2%'),
                  }}>
                  <RegularText
                    style={{textAlign: 'center'}}
                    title={subHeading}
                  />
                </View>
                <View style={{padding: hp('2%'), flexDirection: 'row'}}>
                  <TouchableOpacity
                    onPress={() => onSelectCircle(ratingNumbers[0])}
                    style={styles.wrongSection}>
                    <View
                      style={[
                        styles.circleView,
                        // {
                        //   backgroundColor: ratingNumbers[0]?.selected
                        //     ? colors.app_theme_light_green
                        //     : colors.purplishGrey,
                        // },
                      ]}>
                      <Image
                        style={{height: 48, width: 48}}
                        source={{
                          uri: ratingNumbers[0]?.selected
                            ? ratingNumbers[0]?.gif_icon
                            : ratingNumbers[0]?.icon,
                        }}
                      />
                    </View>
                    <View style={styles.textSection}>
                      <RegularText
                        style={styles.testLabel}
                        title={ratingNumbers[0]?.text}
                      />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => onSelectCircle(ratingNumbers[1])}
                    style={styles.wrongSection}>
                    <View
                      style={[
                        styles.circleView,
                        // {
                        //   backgroundColor: ratingNumbers[1]?.selected
                        //     ? colors.app_theme_light_green
                        //     : colors.purplishGrey,
                        // },
                      ]}>
                      <Image
                        style={{height: 48, width: 48}}
                        source={{
                          uri: ratingNumbers[1]?.selected
                            ? ratingNumbers[1]?.gif_icon
                            : ratingNumbers[1]?.icon,
                        }}
                      />
                    </View>
                    <View style={styles.textSection}>
                      <RegularText
                        style={styles.testLabel}
                        title={ratingNumbers[1]?.text}
                      />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => onSelectCircle(ratingNumbers[2])}
                    style={styles.wrongSection}>
                    <View
                      style={[
                        styles.circleView,
                        // {
                        //   backgroundColor: ratingNumbers[2]?.selected
                        //     ? colors.app_theme_light_green
                        //     : colors.purplishGrey,
                        // },
                      ]}>
                      <Image
                        style={{height: 48, width: 48}}
                        source={{
                          uri: ratingNumbers[2]?.selected
                            ? ratingNumbers[2]?.gif_icon
                            : ratingNumbers[2]?.icon,
                        }}
                      />
                    </View>
                    <View style={styles.textSection}>
                      <RegularText
                        style={styles.testLabel}
                        title={ratingNumbers[2]?.text}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </>
            ) : null}

            {ratingCount ? (
              <View style={{height: 10, backgroundColor: colors.gray}}></View>
            ) : null}

            {ratingCount ? (
              <View style={{padding: hp('2%')}}>
                <FlatList
                  data={questions}
                  extraData={questions}
                  renderItem={({item}) => {
                    return (
                      <View style={{flexDirection: 'row'}}>
                        <View
                          style={{
                            flex: 0.7,
                            paddingVertical: hp('3%'),
                            justifyContent: 'center',
                          }}>
                          <RegularText
                            style={{color: colors.app_theme_dark_green}}
                            title={item.question}
                          />
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 0.3,
                            alignItems: 'center',
                            justifyContent: 'space-evenly',
                          }}>
                          <TouchableOpacity onPress={() => onSelectYes(item)}>
                            <RegularText
                              style={{
                                color:
                                  item.ans_value === 'Yes'
                                    ? colors.app_theme_dark_green
                                    : colors.black,
                              }}
                              title={'Yes'}
                            />
                          </TouchableOpacity>

                          <TouchableOpacity onPress={() => onSelectNo(item)}>
                            <RegularText
                              style={{
                                color:
                                  item.ans_value === 'No'
                                    ? colors.app_theme_dark_green
                                    : colors.black,
                              }}
                              title={'No'}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    );
                  }}
                />
              </View>
            ) : null}

            <View style={{padding: hp('2%')}}>
              <RegularText title={'Other'} />

              <InputField
                value={validateForm.review}
                error={validateForm.reviewError}
                returnKeyType={'next'}
                multiline={true}
                blurOnSubmit={false}
                onChangeText={text => onChangeText('review', text, 'review')}
                style={{marginTop: 10}}
                placeholder="Write your review here."
              />
            </View>
          </View>
        </ScrollView>

        <Loader display={loader} />
      </MainContainer>
      {myBookingData.status !== 'Cancelled' ? (
        <View style={styles.cancelBookingBtn}>
          <SubmitButton onPress={submitRating} title={'Submit Rating'} />
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default index;
