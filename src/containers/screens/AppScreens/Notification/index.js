import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import styles from './style';
import {
  Header,
  Loader,
  MainContainer,
  RemainderCard,
  Toast,
} from '../../../components';
import NetworkRequest, {
  method,
  servicesPoints,
} from '../../../../services/NetworkRequest';
import {AuthContext} from '../../../../../context/context';
import imagesConstants from '../../../../constants/imagesConstants';
import {BoldText, RegularText} from '../../../components/Common';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const index = ({navigation}) => {
  const {signIn, signOut} = React.useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [loader, setLoader] = useState(true);
  const [handleConnectionState, setHandleConnectionState] = useState(false);
  useEffect(() => {
    if (handleConnectionState) {
      navigation.navigate('ConnectionHandle');
    }
  }, [handleConnectionState]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getNotification();
    });
    return unsubscribe;
  }, [navigation]);
  const getNotification = async () => {
    try {
      const requestConfig = {
        method: method.get,
        url: servicesPoints.bookingServices.myNotifications,
      };

      const response = await NetworkRequest(requestConfig);
      console.log('hdgf', response.data);
      if (response) {
        const {success} = response;
        if (success) {
          setNotifications(response.data);
          setLoader(false);
        } else {
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

  const onReadNotification = async item => {
    if (item.is_readed) {
    } else {
      try {
        // setLoader(true);
        let data = {
          notification_id: item.id,
        };
        const requestConfig = {
          method: method.post,
          data: data,
          url: servicesPoints.userServices.read_notification,
        };

        const response = await NetworkRequest(requestConfig);
        if (response) {
          const {success} = response;
          if (success) {
            getNotification();
            setLoader(false);
            // Toast(response.message, 1);
          } else {
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
    }
  };

  const onClearAll = async () => {
    try {
      setLoader(true);

      const requestConfig = {
        method: method.post,

        url: servicesPoints.userServices.clearAllNotification,
      };

      const response = await NetworkRequest(requestConfig);
      if (response) {
        const {success} = response;
        if (success) {
          getNotification();
          setLoader(false);
          Toast(response.message, 1);
        } else {
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

  const renderRemianderCard = item => {
    return (
      <RemainderCard onPress={() => onReadNotification(item)} data={item} />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* <Header onBack={() => navigation.goBack()} title={'Notifications'} /> */}
      <View style={[styles.container]}>
        <TouchableOpacity
          hitSlop={{left: 15, right: 15, top: 15, bottom: 15}}
          onPress={() => navigation.goBack()}
          style={styles.backContainer}>
          <Image
            // style={{height: 10, width: 10}}
            source={imagesConstants.backWhite}
          />
        </TouchableOpacity>
        <View style={styles.headerContainer}>
          <BoldText style={styles.headerTitle} title={'Notifications'} />
        </View>
        <View style={[styles.backContainer, {alignItems: 'flex-end'}]}>
          {notifications.length > 0 ? (
            <TouchableOpacity onPress={onClearAll}>
              <BoldText style={styles.headerTitle} title={'Clear All'} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      <View style={styles.mainContainer}>
        <MainContainer>
          <View style={styles.selfSection}>
            <FlatList
              data={notifications}
              ItemSeparatorComponent={() => {
                return <View style={styles.listSeparator} />;
              }}
              ListEmptyComponent={() => {
                return (
                  <View
                    style={{
                      paddingVertical: hp('10%'),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <RegularText title={'No Notification found'} />
                  </View>
                );
              }}
              showsVerticalScrollIndicator={false}
              extraData={notifications}
              renderItem={({item}) => renderRemianderCard(item)}
            />
          </View>
        </MainContainer>
        <Loader display={loader} />
      </View>
    </SafeAreaView>
  );
};

export default index;
