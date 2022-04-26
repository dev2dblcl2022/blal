import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import {AuthContext} from '../../../../../context/context';
import imagesConstants from '../../../../constants/imagesConstants';
import {DefaultHeader} from '../../../components';
import {RegularText} from '../../../components/Common';
import styles from './style';

const index = ({navigation}) => {
  const {signOut} = React.useContext(AuthContext);
  const [data, setData] = useState([
    {id: 1, screenName: 'My Profile', screen: 'MyProfile'},
    {
      id: 2,
      screenName: 'Recommendation & Reminders',
      screen: 'ReminderRecommendation',
    },
    {id: 3, screenName: 'Inquiry', screen: 'AddInquiry'},
  ]);

  const onNext = async item => {
    let user = await AsyncStorage.getItem('userToken');
    if (user === 'GuestUser') {
      Alert.alert(
        'You are browsing as Guest, Please login to your account',
        ``,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Login',
            onPress: () => signOut(),
          },
        ],
        {cancelable: false},
      );
    } else {
      navigation.navigate(item.screen);
    }
  };
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <DefaultHeader onBack={() => navigation.goBack()} title={'My Account'} />
      <View style={styles.fullSection}>
        <View style={styles.listSection}>
          <FlatList
            data={data}
            keyExtractor={data => data.id}
            extraData={data}
            ItemSeparatorComponent={() => {
              return <View style={styles.separator} />;
            }}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => onNext(item)}
                  style={styles.itemContainer}>
                  <View>
                    <RegularText
                      style={styles.itemText}
                      title={item.screenName}
                    />
                  </View>
                  <View>
                    <Image source={imagesConstants.downarrow} />
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default index;
