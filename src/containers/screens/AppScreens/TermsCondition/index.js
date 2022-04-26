import React, {useEffect, useState} from 'react';
import {View, SafeAreaView} from 'react-native';
import styles from './style';
import DefaultHeader from '../../../components/DefaultHeader';
import {TermsAndConditionUrl} from '../../../../config/Setting';
import {Loader, WebView} from '../../../components';
const index = ({navigation, route}) => {
  let [loader, setLoader] = useState(false);
  let url = TermsAndConditionUrl;
  return (
    <SafeAreaView style={styles.safeArea}>
      <DefaultHeader
        onBack={() => navigation.goBack()}
        title={'Terms & Conditions'}
      />
      <View style={{flexGrow: 1, backgroundColor: 'red'}}>
        <WebView url={url} />
      </View>

      <Loader display={loader} />
    </SafeAreaView>
  );
};

export default index;
