import React from 'react';
import {View, Text, StyleSheet, BackHandler} from 'react-native';
import {SubmitButton} from '../../../components/Buttons';
import NetInfo from '@react-native-community/netinfo';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../../../constants/colors';

export default function ConnectionHandle({navigation}) {
  const unsubscribe = NetInfo.addEventListener(state => {
    if (state.isConnected) {
      navigation.navigate('HomeScreen');
    }
  });

  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {});
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => {});
    };
  }, []);
  return (
    <View>
      <Text style={[styles.tried, {alignSelf: 'center'}]}>
        Please check your internet connection.
      </Text>
      <SubmitButton style={styles.test} title="RETRY" />
    </View>
  );
}

const styles = StyleSheet.create({
  tried: {
    alignSelf: 'flex-start',
    position: 'absolute',
    top: hp('40%'),
    fontFamily: 'Lato-Regulr',
    fontSize: hp('3%'),
    textAlign: 'center',
    color: colors.app_theme_dark_green,
  },
  test: {
    backgroundColor: colors.app_theme_dark_green,
    color: '#fff',
    justifyContent: 'center',
    position: 'absolute',
    borderRadius: 5,
    right: 0,
    left: 0,
    alignItems: 'center',
    top: hp('50%'),
    textAlign: 'center',
    marginLeft: 50,
    marginRight: 50,
  },
});
