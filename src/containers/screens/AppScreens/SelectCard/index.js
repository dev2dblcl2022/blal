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

import {Loader, PackageCard, Toast} from '../../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetworkRequestBlal, {
  blalMethod,
  blalServicesPoints,
} from '../../../../services/NetworkRequestBlal';
import {servicesPoints} from '../../../../services/NetworkRequest';
import {AuthContext} from '../../../../../context/context';

const index = ({navigation}) => {
  const {signOut, signIn} = React.useContext(AuthContext);
  const [cards, setCards] = useState([]);
  const [loader, setLoader] = useState(false);
  const [cityId, setCityId] = useState('');
  const [panelId, setPanelId] = useState('');

  useEffect(() => {
    getCityPanelId();
  }, [cityId]);

  useEffect(() => {
    if (cityId) {
      getCards();
    }
  }, [cityId]);

  const getCityPanelId = async () => {
    let city = await AsyncStorage.getItem('cityId');
    let panel = await AsyncStorage.getItem('panelId');

    await setCityId(city);
    await setPanelId(panel);
  };

  const getCards = async () => {
    try {
      setLoader(true);
      let data = {
        PanelId: Number(panelId),
      };
      const requestConfig = {
        method: blalMethod.post,
        data: data,
        url: `${blalServicesPoints.blalUserServices.getMembershipCard}?CityId=${data.PanelId}`,
      };

      const response = await NetworkRequestBlal(requestConfig);
      if (response) {
        const {status_Code} = response;
        if (status_Code === 200) {
          setCards(response.data);
          setLoader(false);
        } else {
          setLoader(false);
        }
      }
      setLoader(false);
    } catch (err) {
      console.log('err', err);
    }
  };

  const renderCard = item => {
    return (
      <PackageCard
        data={item}
        onCardBuy={() => navigation.navigate('AddCard', {data: item})}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <DefaultHeader onBack={() => navigation.goBack()} title={'Select Card'} />
      <View style={styles.mainContainer}>
        <View style={styles.headingSection}>
          <BoldText
            style={styles.heading}
            title={'Select the package that you want'}
          />
        </View>
        <View style={styles.dataSection}>
          <View style={styles.listSection}>
            <FlatList
              data={cards}
              showsVerticalScrollIndicator={false}
              extraData={cards}
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
