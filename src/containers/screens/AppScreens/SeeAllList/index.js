import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, FlatList} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SubmitButton} from '../../../components/Buttons';
import styles from './style';

import DefaultHeader from '../../../components/DefaultHeader';
import {BoldText} from '../../../components/Common';

import {
  Loader,
  NewsEventListCard,
  PackageCard,
  Toast,
} from '../../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetworkRequestBlal, {
  blalMethod,
  blalServicesPoints,
} from '../../../../services/NetworkRequestBlal';
import NetworkRequest, {
  method,
  servicesPoints,
} from '../../../../services/NetworkRequest';
import {AuthContext} from '../../../../../context/context';

const index = ({navigation, route}) => {
  const {title} = route.params;
  const {signOut, signIn} = React.useContext(AuthContext);
  const [newsEvent, setNewsEvent] = useState([]);
  const [loader, setLoader] = useState(true);
  const [cityId, setCityId] = useState('');
  const [panelId, setPanelId] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getNewsEvent();
    });
    return unsubscribe;
  }, [navigation]);

  const getNewsEvent = async () => {
    try {
      const requestConfig = {
        method: method.get,

        url: `${servicesPoints.commonServices.news_events_list}`,
      };
      const response = await NetworkRequest(requestConfig);
      if (response) {
        const {success} = response;
        if (success) {
          setNewsEvent(response.data.docs);
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
    } catch (err) {
      setLoader(false);
    }
  };

  const renderCard = item => {
    return (
      <NewsEventListCard
        onPress={() => navigation.navigate('NewsEventDetail', {data: item})}
        data={item}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <DefaultHeader onBack={() => navigation.goBack()} title={title} />
      <View style={styles.mainContainer}>
        {/* <View style={styles.headingSection}>
          <BoldText
            style={styles.heading}
            title={'Select the package that you want'}
          />
        </View> */}
        <View style={styles.dataSection}>
          <View style={styles.listSection}>
            <FlatList
              data={newsEvent}
              showsVerticalScrollIndicator={false}
              extraData={newsEvent}
              renderItem={({item}) => renderCard(item)}
            />
          </View>
        </View>
      </View>
      <Loader display={loader} />
    </SafeAreaView>
  );
};

export default index;
