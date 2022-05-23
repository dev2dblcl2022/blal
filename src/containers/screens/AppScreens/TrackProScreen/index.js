import React, {useEffect, useState} from 'react';
import {View, SafeAreaView} from 'react-native';
import styles from './style';
import DefaultHeader from '../../../components/DefaultHeader';
import {Loader, WebView} from '../../../components';
const index = ({navigation, route, props}) => {
  let url = route.params.url;
  // let url = props?.url;

  let [loader, setLoader] = useState(false);
  return (
    <SafeAreaView style={styles.safeArea}>
      <DefaultHeader onBack={() => navigation.goBack()} title={'Tracking'} />
      <View style={{flexGrow: 1, backgroundColor: 'red'}}>
        <WebView url={url} />
      </View>

      <Loader display={loader} />
    </SafeAreaView>
  );
};

export default index;
