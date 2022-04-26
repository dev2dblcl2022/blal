import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {CancelButton, SubmitButton} from '../../../components/Buttons';
import styles from './style';
import DefaultHeader from '../../../components/DefaultHeader';

import {Loader, Toast} from '../../../components';

import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {Date_Format} from '../../../../config/Setting';
import {BoldText, RegularText} from '../../../components/Common';
import imagesConstants from '../../../../constants/imagesConstants';
const index = ({navigation, route}) => {
  const [loader, setLoader] = useState(false);
  const [selectedDateStart, setSelectedDateStart] = useState(new Date());
  const [selectedDateEnd, setSelectedDateEnd] = useState(new Date());
  const [datePickerStart, setDatePickerStart] = useState(false);
  const [datePickerEnd, setDatePickerEnd] = useState(false);
  const [dateStartLabel, setDateStartLabel] = useState('Start Date');
  const [dateEndLabel, setDateEndLabel] = useState('End Date');

  const onResetFilter = async () => {
    setDateStartLabel('Start Date');
    setDateEndLabel('End Date');
    await AsyncStorage.removeItem('startDate');
    await AsyncStorage.removeItem('endDate');
    navigation.pop();
  };

  useEffect(() => {
    getFilterData();
  }, [dateEndLabel, dateStartLabel]);

  const getFilterData = async () => {
    let startDate = await AsyncStorage.getItem('startDate');
    let endDate = await AsyncStorage.getItem('endDate');

    setDateStartLabel(startDate ? startDate : 'Start Date');
    setDateEndLabel(endDate ? endDate : 'End Date');
  };

  const onApplyFilter = async () => {
    if (dateStartLabel === 'Start Date' || dateEndLabel === 'End Date') {
      Toast('Please select any date', 0);
    } else {
      let startDate = dateStartLabel;
      let endDate = dateEndLabel;

      await AsyncStorage.setItem('startDate', startDate);
      await AsyncStorage.setItem('endDate', endDate);

      navigation.goBack();
    }
  };
  const formatDate = date => {
    return moment(date).format('DD/MM/YYYY');
  };

  //   const formatDate = date => {
  //   return moment(date).format('YYYY-MM-DD');
  // };

  const handleDatePickerConfirmStart = async date => {
    let newDate = moment(date).format(Date_Format);

    setDateStartLabel(newDate);
    await AsyncStorage.setItem('startDate', newDate);

    setDatePickerStart(false);
  };

  const handleDatePickerCancelStart = () => {
    setDatePickerStart(false);
  };

  const handleDatePickerConfirmEnd = async date => {
    let newDate = moment(date).format(Date_Format);

    await AsyncStorage.setItem('endDate', newDate);

    setDateEndLabel(newDate);

    setDatePickerEnd(false);
  };

  const handleDatePickerCancelEnd = () => {
    setDatePickerEnd(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <DefaultHeader onBack={() => navigation.goBack()} title={'Filter'} />

      <View style={styles.mainContainer}>
        <View style={styles.allListSection}>
          <View style={styles.listItemSection}>
            <View style={styles.selectDateSection}>
              <View style={styles.listHeading}>
                <BoldText
                  title={'Choose Start Date'}
                  style={styles.headingText}
                />
              </View>
              <TouchableOpacity
                onPress={() => setDatePickerStart(true)}
                style={styles.calendarView}>
                <RegularText style={styles.dateText} title={dateStartLabel} />
                <Image
                  style={styles.calendarIcon}
                  source={imagesConstants.calendar}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.separator} />

          <View style={styles.listItemSection}>
            <View style={styles.selectDateSection}>
              <View style={styles.listHeading}>
                <BoldText
                  title={'Choose End Date'}
                  style={styles.headingText}
                />
              </View>
              <TouchableOpacity
                onPress={() => setDatePickerEnd(true)}
                style={styles.calendarView}>
                <RegularText style={styles.dateText} title={dateEndLabel} />
                <Image
                  style={styles.calendarIcon}
                  source={imagesConstants.calendar}
                />
              </TouchableOpacity>
            </View>
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
      {datePickerStart ? (
        <DateTimePickerModal
          date={selectedDateStart}
          isVisible={datePickerStart}
          mode="date"
          maximumDate={new Date()}
          display={'spinner'}
          onConfirm={handleDatePickerConfirmStart}
          onCancel={handleDatePickerCancelStart}
        />
      ) : null}
      {datePickerEnd ? (
        <DateTimePickerModal
          date={selectedDateEnd}
          isVisible={datePickerEnd}
          mode="date"
          maximumDate={new Date()}
          display={'spinner'}
          onConfirm={handleDatePickerConfirmEnd}
          onCancel={handleDatePickerCancelEnd}
        />
      ) : null}
      <Loader display={loader} />
    </SafeAreaView>
  );
};

export default index;
