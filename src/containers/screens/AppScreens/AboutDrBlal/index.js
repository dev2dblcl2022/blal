import React, {useEffect, useState} from 'react';
import {View, SafeAreaView} from 'react-native';
import styles from './style';
import DefaultHeader from '../../../components/DefaultHeader';
import {AboutDrBlalUrl} from '../../../../config/Setting';
import {Loader, WebView} from '../../../components';
const index = ({navigation, route}) => {
  let [loader, setLoader] = useState(false);
  let url = AboutDrBlalUrl;
  return (
    <SafeAreaView style={styles.safeArea}>
      <DefaultHeader onBack={() => navigation.goBack()} title={'About us'} />
      <View style={{flexGrow: 1, backgroundColor: 'red'}}>
        <WebView url={url} />
      </View>

      <Loader display={loader} />
    </SafeAreaView>
  );
};

export default index;
