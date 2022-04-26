import React from 'react';
import {Platform, SafeAreaView, Text, View} from 'react-native';
import styles from './style';
import PDFView from 'react-native-view-pdf';
import {DefaultHeader} from '..';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
export default ({props, route, navigation}) => {
  let url = route.params?.url;
  let screenName = route.params?.screenName;

  const resources = {
    file:
      Platform.OS === 'ios'
        ? 'downloadedDocument.pdf'
        : '/sdcard/Download/downloadedDocument.pdf',
    url: url,
    base64: 'JVBERi0xLjMKJcfs...',
  };
  const resourceType = 'url';
  return (
    <SafeAreaView style={{flexGrow: 1}}>
      <View style={{position: 'absolute', width: '100%'}}>
        <DefaultHeader onBack={() => navigation.pop()} title={screenName} />
      </View>

      <PDFView
        fadeInDuration={250.0}
        style={{flex: 1, marginTop: hp('8%')}}
        resource={resources[resourceType]}
        resourceType={resourceType}
        onLoad={() => console.log(`PDF rendered from ${resourceType}`)}
        onError={error => console.log('Cannot render PDF', error)}
      />
    </SafeAreaView>
  );
};
