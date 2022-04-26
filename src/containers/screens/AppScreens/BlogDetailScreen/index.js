import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  Share,
  FlatList,
  TextInput,
  Modal,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../../constants/colors';
import {Loader, MainContainer, PackageCard, Toast} from '../../../components';
import {BoldText, RegularText} from '../../../components/Common';
import HTMLView from 'react-native-htmlview';
import imagesConstants from '../../../../constants/imagesConstants';
import styles from './style';
import CModal from '../../../components/CModal';
import NetworkRequest, {
  method,
  servicesPoints,
} from '../../../../services/NetworkRequest';
import {AuthContext} from '../../../../../context/context';
import {color} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function index({route, navigation}) {
  const {signOut} = React.useContext(AuthContext);
  const {data} = route.params;
  const [commentModal, setCommentModal] = useState(false);
  const [commented, setCommented] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [loader, setLoader] = useState(true);
  const [userData, setUserData] = useState({});
  const [blogDetail, setBlogDetail] = useState({});
  const [commentValidation, setCommentValidation] = useState(false);

  const containerViewRef = useRef(null);
  // console.log('BlogDetail scren', data);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUserData();
    });
    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    if (userData) {
      getBlogsDetail();
    }
  }, [userData]);
  useEffect(() => {
    if (commented) {
      getBlogsDetail();
    }
  }, [commented]);

  const getUserData = async () => {
    let data = await AsyncStorage.getItem('userData');
    let parseData = JSON.parse(data);
    console.log('parse data', parseData);
    setUserData(parseData);
  };

  const getBlogsDetail = async val => {
    console.log('i am calling again');
    try {
      let formData = {
        blog_id: data.id,
      };

      let requestConfig = {
        method: method.get,

        url: `${servicesPoints.blogs.blogdetails}?blog_id=${formData.blog_id}&user_id=${userData?.user?.id}`,
      };

      console.log('req of blogs search', requestConfig);
      const response = await NetworkRequest(requestConfig);
      console.log('response of blogs search', response);
      if (response) {
        const {success} = response;
        if (success) {
          setBlogDetail(response.data);
          setCommented(false);
          setLoader(false);

          console.log('res success of blogs detail', response);
        } else {
          console.log('res failure', response);
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
    } catch (err) {
      console.log('err', err);
    }
  };

  const commentBlog = async val => {
    if (commentText.length < 1) {
      setCommentValidation(true);
    } else {
      setCommentValidation(false);
      setLoader(true);
      try {
        let formData = {
          blog_id: blogDetail.id.toString(),
          comment: commentText,
        };

        let requestConfig = {
          method: method.post,
          data: formData,
          url: `${servicesPoints.blogs.commentblog}`,
        };

        console.log('req of blogs comment', requestConfig);
        const response = await NetworkRequest(requestConfig);
        console.log('rs of blogs comment', response);
        if (response) {
          const {success} = response;
          if (success) {
            setLoader(false);
            setCommented(true);
            setCommentText('');
            Toast(response.message, 1);
            // getBlogsDetail();
          } else {
            console.log('res failure', response);
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
      } catch (err) {
        console.log('err', err);
      }
    }
  };

  const likeBlog = async val => {
    setLoader(true);
    try {
      let formData = {
        blog_id: blogDetail.id.toString(),
      };

      let requestConfig = {
        method: method.post,
        data: formData,
        url: `${servicesPoints.blogs.likeblog}`,
      };

      console.log('req of blogs comment', requestConfig);
      const response = await NetworkRequest(requestConfig);

      if (response) {
        const {success} = response;
        if (success) {
          setLoader(false);
          setCommented(true);

          Toast(response.message, 1);
        } else {
          console.log('res failure', response);
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
    } catch (err) {
      console.log('err', err);
    }
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `${data.title} blog`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleStartShouldSetResponder = event => {
    setCommentModal(false);
  };
  const closeModal = event => {
    setCommentModal(false);
    setCommentText('');
    setCommented(false);
  };

  return (
    <SafeAreaView style={{flexGrow: 1}}>
      <MainContainer>
        <View style={{flexGrow: 1}}>
          <View style={{flex: 0.4}}>
            <TouchableOpacity style={[styles.itemContainer]}>
              {blogDetail?.image ? (
                <View style={styles.profilePicView}>
                  <Image
                    resizeMode="contain"
                    style={styles.profilePic}
                    source={{uri: blogDetail.image}}
                  />
                </View>
              ) : null}
              <TouchableOpacity
                hitSlop={{left: 20, right: 20, top: 20, bottom: 20}}
                onPress={() => navigation.goBack()}
                style={{position: 'absolute', top: 15, left: 15}}>
                <Image
                  style={{tintColor: 'black'}}
                  source={imagesConstants.backGreen}
                />
              </TouchableOpacity>

              <View style={styles.dataSection}>
                <View
                  style={{
                    flex: 0.8,

                    justifyContent: 'center',
                  }}>
                  {blogDetail?.title ? (
                    <BoldText
                      numberOfLines={2}
                      style={[styles.buyNowText, {fontSize: hp('3%')}]}
                      title={blogDetail.title}
                    />
                  ) : null}

                  <BoldText
                    style={[styles.buyNowText, {marginTop: 10}]}
                    title={`${blogDetail?.created_at} ${blogDetail?.timeAgo}`}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 0.6,
              paddingBottom: hp('5%'),
            }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{flex: 1, padding: hp('2%')}}>
              <HTMLView
                textComponentProps={{style: {color: 'black'}}}
                value={blogDetail?.description}
                stylesheet={styles.descriptionText}
              />
            </ScrollView>
          </View>
        </View>
      </MainContainer>
      <Modal
        transparent
        animationType={'slide'}
        visible={commentModal}
        onRequestClose={() => setCommentModal(false)}>
        <View
          // onStartShouldSetResponder={handleStartShouldSetResponder}
          style={styles.mcontainer}>
          <View style={styles.modalContainer}>
            <View style={{justifyContent: 'center', alignItems: 'flex-end'}}>
              <TouchableOpacity onPress={closeModal}>
                <Image
                  style={{height: 30, width: 30}}
                  source={imagesConstants.cancelRed}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.listSection}>
              <FlatList
                data={blogDetail?.comments}
                initialScrollIndex={blogDetail?.comments?.length - 1}
                extraData={blogDetail?.comments}
                keyExtractor={item => item.id}
                ListEmptyComponent={() => {
                  return (
                    <View
                      style={{
                        padding: hp('5%'),
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <RegularText title={'No Comment found'} />
                    </View>
                  );
                }}
                renderItem={({item}) => {
                  return (
                    <View style={styles.commentBubble}>
                      <RegularText
                        style={styles.commentByText}
                        title={item?.user?.fullname}
                      />
                      <RegularText
                        style={styles.comment}
                        title={item?.comment}
                      />
                    </View>
                  );
                }}
              />
            </View>
            <View
              style={[
                styles.inputSection,
                {marginBottom: Platform.OS === 'ios' ? hp('5%') : 0},
              ]}>
              <View style={{flex: 0.7}}>
                <TextInput
                  style={{
                    paddingLeft: 20,
                    borderRadius: 10,
                    borderWidth: 1,
                    color: 'black',

                    borderColor: colors.app_theme_light_green,
                  }}
                  value={commentText}
                  onChangeText={val => setCommentText(val)}
                  placeholder={'Enter your comment'}
                />
              </View>
              <TouchableOpacity
                onPress={commentBlog}
                style={{
                  flex: 0.3,
                  marginLeft: hp('1%'),
                  backgroundColor: colors.app_theme_light_green,
                  borderRadius: 10,
                  paddingVertical: hp('1.5%'),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <RegularText style={{color: 'white'}} title={'Post'} />
              </TouchableOpacity>
            </View>
            {commentValidation ? (
              <RegularText
                style={{color: colors.red, fontSize: hp('1.7%')}}
                title={'Comment must be between 1 - 500 character'}
              />
            ) : null}
          </View>
        </View>
      </Modal>

      <View style={styles.footer}>
        {blogDetail ? (
          <>
            <TouchableOpacity
              onPress={() => setCommentModal(true)}
              style={styles.footerSection}>
              <Image
                style={{height: 20, width: 20, tintColor: 'white'}}
                source={imagesConstants.comment}
              />
              <RegularText
                style={{marginLeft: hp('2%'), color: 'white'}}
                title={blogDetail.comments?.length}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={onShare} style={styles.footerSection}>
              <Image
                style={{height: 20, width: 20, tintColor: 'white'}}
                source={imagesConstants.share}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={likeBlog} style={styles.footerSection}>
              <Image
                style={{
                  height: 20,
                  width: 20,
                  tintColor: blogDetail.myLike ? 'white' : colors.purplishGrey,
                }}
                source={imagesConstants.like}
              />
              <RegularText
                style={{marginLeft: hp('2%'), color: 'white'}}
                title={`${blogDetail.blogLikes} likes `}
              />
            </TouchableOpacity>
          </>
        ) : null}
      </View>
      <Loader display={loader} />
    </SafeAreaView>
  );
}
