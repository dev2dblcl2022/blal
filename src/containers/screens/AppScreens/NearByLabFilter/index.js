import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';

import styles from './style';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {DefaultHeader, Loader} from '../../../components';
import {BoldText, RegularText} from '../../../components/Common';
import {CancelButton, SubmitButton} from '../../../components/Buttons';
import DropDownPicker from 'react-native-dropdown-picker';
import imagesConstants from '../../../../constants/imagesConstants';
import colors from '../../../../constants/colors';

const index = ({navigation, route}) => {
  const [loader, setLoader] = useState(false);

  const [stateOpen, setStateOpen] = useState(false);
  const [stateValues, setSatateValues] = useState('');

  const [cityOpens, setCityOpens] = useState(false);
  const [cityValues, setCityValues] = useState('');

  const [areaOpen, setAreaOpen] = useState(false);
  const [areaValue, setAreaValue] = useState(null);

  const [city, setCity] = useState([
    {label: 'Jaipur', value: 'Confirmed'},

    {label: 'Bheelwara', value: 'Accepted'},
    {label: 'Alwar', value: 'Started'},

    {label: 'Kota', value: 'Successful'},
    {label: 'Bundi', value: 'Registered'},
    {label: 'Jodhpur', value: 'Approved'},
    {label: 'Bikaner', value: 'Cancelled'},
  ]);

  const [state, setState] = useState([
    {label: 'Rajasthan', value: 'Confirmed'},

    {label: 'Punjab', value: 'Accepted'},
    {label: 'Delhi', value: 'Started'},

    {label: 'Mp', value: 'Successful'},
    {label: 'Up', value: 'Registered'},
  ]);

  const [area, setArea] = useState([
    {label: 'Malviya nager', value: '1'},
    {label: 'Sanganer', value: '2'},
    {label: 'Sfs', value: '3'},
    {label: 'Khatipura', value: '4'},
  ]);
  const onResetFilter = async () => {
    // setDateStart('Start Date');
    // setDateEnd('End Date');
    await AsyncStorage.removeItem('startDate');
    await AsyncStorage.removeItem('endDate');
    navigation.pop();
  };

  useEffect(() => {
    getFilterData();
  });

  const getFilterData = async () => {
    let startDate = await AsyncStorage.getItem('startDate');
    let endDate = await AsyncStorage.getItem('endDate');
  };

  const onApplyFilter = async () => {
    // if (!fullDateEnd || !fullDateStart) {
    //   Toast('Please select any date', 0);
    // } else {
    //   let startDate = fullDateStart;
    //   let endDate = fullDateEnd;

    //   await AsyncStorage.setItem('startDate', startDate);
    //   await AsyncStorage.setItem('endDate', endDate);

    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <DefaultHeader onBack={() => navigation.goBack()} title={'Filter'} />

      <View style={styles.mainContainer}>
        <View style={styles.dropDownSections}>
          <View style={[styles.dropDownView]}>
            <DropDownPicker
              open={stateOpen}
              placeholder="Select State"
              value={stateValues}
              placeholderStyle={{color: colors.purplishGrey}}
              style={{borderColor: colors.purplishGrey, borderWidth: 1}}
              dropDownContainerStyle={styles.dropDownContainer}
              items={state}
              setOpen={setStateOpen}
              setValue={setStateOpen}
              zIndex={3000}
            />
          </View>

          <View style={styles.dropDownView}>
            <DropDownPicker
              open={cityOpens}
              placeholder="Select City"
              value={cityValues}
              placeholderStyle={{color: colors.purplishGrey}}
              style={{borderColor: colors.purplishGrey, borderWidth: 1}}
              dropDownContainerStyle={styles.dropDownContainer}
              items={city}
              setOpen={setCityOpens}
              setValue={setCityValues}
              zIndex={2000}
            />
          </View>

          <View style={styles.dropDownView}>
            <DropDownPicker
              open={areaOpen}
              placeholder="Select Area"
              placeholderStyle={{color: colors.purplishGrey}}
              value={areaValue}
              style={{borderColor: colors.purplishGrey, borderWidth: 1}}
              items={area}
              dropDownContainerStyle={styles.dropDownContainer}
              setOpen={setAreaOpen}
              setValue={setAreaValue}
              zIndex={1000}
            />
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <CancelButton
            onPress={onResetFilter}
            style={styles.btn}
            title={'Reset Filter'}
          />
          <SubmitButton
            onPress={onApplyFilter}
            style={styles.btn}
            title={'Apply Filter'}
          />
        </View>
      </View>

      <Loader display={loader} />
    </SafeAreaView>
  );
};

export default index;
