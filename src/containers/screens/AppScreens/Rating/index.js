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
  const [ratingQuestions, setRatingquestions] = useState([]);
  const [ratingNumbers, setRatingNumbers] = useState([]);
  const [ratingNumberss, setRatingNumberss] = useState([]);
  const [loader, setLoader] = useState(true);
  const [bookingDetailData, setBookingDetailData] = useState({});
  const [subHeading, setSubHeading] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [bookingRating, setBookingRating] = useState([]);
  const [ratingItemId, setRatingItemId] = useState([]);
  const [validateForm, setValidateForm] = useState({
    review: '',
    reviewError: '',
  });
  const [handleConnectionState, setHandleConnectionState] = useState(false);
  useEffect(() => {
    if (handleConnectionState) {
      navigation.navigate('ConnectionHandle');
    }
  }, [handleConnectionState]);
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
  const getQuestion1 = async val => {
    try {
      const requestConfig = {
        method: method.get,

        url: `${servicesPoints.rating.rating_by_booking_id}?bookingId=${myBookingData.id}`,
      };

      const response = await NetworkRequest(requestConfig);

      if (response) {
        const {success} = response;
        if (success) {
          if (response.data.length) {
            getQuestion(response.data[0].ratings_number.number);
          }

          setBookingRating(response.data);

          let newRatingArray = [];
          response?.data[0]?.user_rating_number_items?.map(item => {
            newRatingArray.push(item.item_id);
          });
          setRatingItemId(newRatingArray);
          setLoader(false);
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
      } else {
        setLoader(false);
      }
    } catch (err) {
      console.log('err', err);
    }
  };

  useEffect(() => {
    getQuestion1();
  }, []);

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
      {bookingRating.length ? (
        <MainContainer>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scroll}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                // paddingVertical: hp('2%'),
                paddingHorizontal: hp('2%'),
                position: 'relative',
                top: hp('3%'),
              }}>
              <BoldText
                style={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: colors.app_theme_dark_green,
                  fontSize: hp('3%'),
                }}
                title={bookingRating[0].ratings_number.title}
              />
              <Image
                style={{height: 48, width: 48, marginLeft: 10}}
                source={
                  bookingRating[0].ratings_number.title === 'VERY BAD'
                    ? imagesConstants.feedback1
                    : bookingRating[0].ratings_number.title === 'BAD'
                    ? imagesConstants.feedback2
                    : bookingRating[0].ratings_number.title === 'AVERAGE'
                    ? imagesConstants.feedback3
                    : bookingRating[0].ratings_number.title === 'GOOD'
                    ? imagesConstants.feedback4
                    : bookingRating[0].ratings_number.title === 'Excellent'
                    ? imagesConstants.feedback5
                    : ''
                }
              />
            </View>

            <View style={styles.ratingView}>
              <AirbnbRating
                count={5}
                isDisabled={true}
                // reviews={['Terrible', 'Bad', 'Ok', 'Good !', 'Excellent']}
                reviewColor={colors.app_theme_dark_green}
                selectedColor={colors.app_theme_dark_green}
                style={{paddingVertical: 20}}
                reviewSize={0}
                ratingContainerStyle={{
                  paddingVertical: hp('3%'),
                }}
                readonly={true}
                jumpValue={0.5}
                defaultRating={bookingRating[0].ratings_number.number}
                // onFinishRating={ratingCompleted}
                starContainerStyle={{
                  marginTop: hp('2%'),
                  justifyContent: 'space-between',

                  width: '80%',
                }}
                size={40}
              />
            </View>
            <View style={{height: 10, backgroundColor: colors.gray}}></View>
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
                title={bookingRating[0].ratings_number.subtitle}
              />
            </View>

            <View style={{padding: hp('2%'), flexDirection: 'row'}}>
              <TouchableOpacity style={styles.wrongSection}>
                <View style={[styles.circleView]}>
                  <Image
                    style={{height: 48, width: 48}}
                    source={
                      ratingItemId.includes(ratingNumbers[0]?.id) &&
                      (bookingRating[0].ratings_number.title === 'VERY BAD' ||
                        bookingRating[0].ratings_number.title === 'BAD')
                        ? imagesConstants.feedback6
                        : ratingItemId.includes(ratingNumbers[0]?.id) &&
                          bookingRating[0].ratings_number.title === 'AVERAGE'
                        ? imagesConstants.feedback7
                        : ratingItemId.includes(ratingNumbers[0]?.id) &&
                          (bookingRating[0].ratings_number.title === 'GOOD' ||
                            bookingRating[0].ratings_number.title ===
                              'Excellent')
                        ? imagesConstants.feedback8
                        : imagesConstants.feedback9
                    }
                  />
                </View>
                <View style={styles.textSection}>
                  <RegularText
                    style={styles.testLabel}
                    title={ratingNumbers[0]?.text}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.wrongSection}>
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
                    source={
                      ratingItemId.includes(ratingNumbers[1]?.id) &&
                      (bookingRating[0].ratings_number.title === 'VERY BAD' ||
                        bookingRating[0].ratings_number.title === 'BAD')
                        ? imagesConstants.feedback6
                        : ratingItemId.includes(ratingNumbers[1]?.id) &&
                          bookingRating[0].ratings_number.title === 'AVERAGE'
                        ? imagesConstants.feedback7
                        : ratingItemId.includes(ratingNumbers[1]?.id) &&
                          (bookingRating[0].ratings_number.title === 'GOOD' ||
                            bookingRating[0].ratings_number.title ===
                              'Excellent')
                        ? imagesConstants.feedback8
                        : imagesConstants.feedback9
                    }
                  />
                </View>
                <View style={styles.textSection}>
                  <RegularText
                    style={styles.testLabel}
                    title={ratingNumbers[1]?.text}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.wrongSection}>
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
                    source={
                      ratingItemId.includes(ratingNumbers[2]?.id) &&
                      (bookingRating[0].ratings_number.title === 'VERY BAD' ||
                        bookingRating[0].ratings_number.title === 'BAD')
                        ? imagesConstants.feedback6
                        : ratingItemId.includes(ratingNumbers[2]?.id) &&
                          bookingRating[0].ratings_number.title === 'AVERAGE'
                        ? imagesConstants.feedback7
                        : ratingItemId.includes(ratingNumbers[2]?.id) &&
                          (bookingRating[0].ratings_number.title === 'GOOD' ||
                            bookingRating[0].ratings_number.title ===
                              'Excellent')
                        ? imagesConstants.feedback8
                        : imagesConstants.feedback9
                    }
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
            <View style={{height: 10, backgroundColor: colors.gray}}></View>
            <View style={{padding: hp('2%')}}>
              <FlatList
                data={bookingRating[0].user_rating_number_questionairs}
                extraData={bookingRating[0].user_rating_number_questionairs}
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
                          title={item.ratings_questionnaire.question}
                        />
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 0.3,
                          alignItems: 'center',
                          justifyContent: 'space-evenly',
                        }}>
                        <RegularText
                          style={{
                            color:
                              item.ans === true
                                ? colors.app_theme_dark_green
                                : colors.black,
                          }}
                          title={'Yes'}
                        />

                        <RegularText
                          style={{
                            color:
                              item.ans_value === 'No'
                                ? colors.app_theme_dark_green
                                : colors.black,
                          }}
                          title={'No'}
                        />
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          </ScrollView>
        </MainContainer>
      ) : (
        <MainContainer>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scroll}>
            <View style={styles.fullContainer}>
              {ratingCount ? (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    // paddingVertical: hp('2%'),
                    paddingHorizontal: hp('2%'),
                    position: 'relative',
                    top: hp('3%'),
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
                    source={
                      ratingCount === 1
                        ? imagesConstants.feedback1
                        : ratingCount === 2
                        ? imagesConstants.feedback2
                        : ratingCount === 3
                        ? imagesConstants.feedback3
                        : ratingCount === 4
                        ? imagesConstants.feedback4
                        : ratingCount === 5
                        ? imagesConstants.feedback5
                        : ''
                    }
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
                    // marginTop: hp('33%'),
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
                      <View style={[styles.circleView]}>
                        <Image
                          style={{height: 48, width: 48}}
                          source={
                            ratingNumbers[0]?.selected &&
                            (ratingCount === 1 || ratingCount === 2)
                              ? imagesConstants.feedback6
                              : ratingNumbers[0]?.selected && ratingCount === 3
                              ? imagesConstants.feedback7
                              : ratingNumbers[0]?.selected &&
                                (ratingCount === 4 || ratingCount === 5)
                              ? imagesConstants.feedback8
                              : imagesConstants.feedback9
                          }
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
                          // {+
                          //   backgroundColor: ratingNumbers[1]?.selected
                          //     ? colors.app_theme_light_green
                          //     : colors.purplishGrey,
                          // },
                        ]}>
                        <Image
                          style={{height: 48, width: 48}}
                          source={
                            ratingNumbers[1]?.selected &&
                            (ratingCount === 1 || ratingCount === 2)
                              ? imagesConstants.feedback6
                              : ratingNumbers[1]?.selected && ratingCount === 3
                              ? imagesConstants.feedback7
                              : ratingNumbers[1]?.selected &&
                                (ratingCount === 4 || ratingCount === 5)
                              ? imagesConstants.feedback8
                              : imagesConstants.feedback9
                          }
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
                          source={
                            ratingNumbers[2]?.selected &&
                            (ratingCount === 1 || ratingCount === 2)
                              ? imagesConstants.feedback6
                              : ratingNumbers[2]?.selected && ratingCount === 3
                              ? imagesConstants.feedback7
                              : ratingNumbers[2]?.selected &&
                                (ratingCount === 4 || ratingCount === 5)
                              ? imagesConstants.feedback8
                              : imagesConstants.feedback9
                          }
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
                                  fontWeight:
                                    item.ans_value === 'Yes' ? 'bold' : '',
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
                                  fontWeight:
                                    item.ans_value === 'No' ? 'bold' : '',
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
          {!bookingRating.length ? (
            <View style={styles.cancelBookingBtn}>
              <SubmitButton onPress={submitRating} title={'Submit Rating'} />
            </View>
          ) : null}
        </MainContainer>
      )}
    </SafeAreaView>
  );
};

export default index;
