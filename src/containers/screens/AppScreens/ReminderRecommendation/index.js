import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, FlatList} from 'react-native';

import styles from './style';
import DefaultHeader from '../../../components/DefaultHeader';
import {BoldText, RegularText} from '../../../components/Common';
import {
  Header,
  Loader,
  MainContainer,
  MyCartTestCard,
  RemainderCard,
  SpecialInstructionView,
  Toast,
} from '../../../components';
import {textConstants} from '../../../../constants/textConstants';
import NetworkRequest, {
  method,
  servicesPoints,
} from '../../../../services/NetworkRequest';
import {AuthContext} from '../../../../../context/context';
import {heightPercentageToDP} from 'react-native-responsive-screen';

const index = ({navigation}) => {
  const {signIn, signOut} = React.useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [loader, setLoader] = useState(true);

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
        url: servicesPoints.userServices.recommendation,
      };

      const response = await NetworkRequest(requestConfig);
      if (response) {
        const {success} = response;
        if (success) {
          setNotifications(response.data);
          setLoader(false);
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
      console.log('error is here in try catch', error);
    }
  };

  const renderRemianderCard = item => {
    return <RemainderCard data={item} />;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        onBack={() => navigation.goBack()}
        title={'Reminders & Recommendation'}
      />
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
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingHorizontal: heightPercentageToDP('3%'),
                      paddingVertical: heightPercentageToDP('10%'),
                    }}>
                    <RegularText
                      style={{textAlign: 'center'}}
                      title={
                        'No recommendation at this time, please come back later'
                      }
                    />
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
