import React, {useEffect, useState} from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  FlatList,
  Platform,
  Linking,
} from 'react-native';
import {SpecialInstructionView, Toast} from '..';

import imagesConstants from '../../../constants/imagesConstants';
import {BoldText, RegularText} from '../Common';
import styles from './style';
import moment from 'moment';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {SubmitButton} from '../Buttons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Date_Format} from '../../../config/Setting';

export default props => {
  let {
    Centre,
    Address,
    Contact,
    Address2,
    Distance,
    Latitude,
    Longitude,
    selected,
  } = props?.data;
  let km = Number(Distance).toFixed(1);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [date, setDate] = useState(moment(new Date()).format('DD-MM-YYYY'));
  const [fullDate, setFullDate] = useState(
    moment(new Date()).format(Date_Format),
  );
  const [datePicker, setDatePicker] = useState(false);
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [selectedPreviewBookingRow, setSelectedPreviewBookingRow] =
    useState(false);
  const [instruction, setInstuction] = useState([1, 2]);
  const [maximumDate, setMaximumDate] = useState('');

  const formatDate = date => {
    return moment(date).format('DD-MM-YYYY');
  };

  // const onSelectedLabsRow = () => {
  //   setSelectedPreviewBookingRow(!selectedPreviewBookingRow);
  // };

  const handleDatePickerConfirm = date => {
    let newDate = moment(date).format(Date_Format);
    // const selectedDate =
    //   date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

    // const split_date = selectedDate.split('/');
    // setDay(split_date[0]);
    // setMonth(split_date[1]);
    // setYear(split_date[2]);
    setDate(formatDate(date));
    setFullDate(newDate);
    setDatePicker(false);
  };

  const getMaximumDate = async () => {
    var someDate = new Date();
    var numberOfDaysToAdd = 7;
    var result = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
    let maximumDate = new Date(result);
    setMaximumDate(maximumDate);
    // console.log('date i sdate', maximumDate);
  };
  useEffect(() => {
    getMaximumDate();
  }, []);
  const handleDatePickerCancel = () => {
    setDatePicker(false);
  };

  const renderSpecialInstruction = () => {
    return <SpecialInstructionView />;
  };

  const dialCall = () => {
    let firstPhoneNumber = Contact.split(',');
    let phoneNumber = Number(firstPhoneNumber[0]);
    let CallNumber = '';
    if (Platform.OS === 'android') {
      CallNumber = `tel:${phoneNumber}`;
    } else {
      CallNumber = `telprompt:${phoneNumber}`;
    }

    Linking.openURL(CallNumber);
  };

  const openInMaps = () => {
    if (Latitude && Longitude) {
      const scheme = Platform.select({
        ios: 'maps:0,0?q=',
        android: 'geo:0,0?q=',
      });
      const latLng = `${Number(Latitude)},${Number(Longitude)}`;
      const label = `${Address} ${Address2}`;
      const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`,
      });

      Linking.openURL(url);
    } else {
      Toast('Location Not available', 0);
    }
  };

  const clickPreviewButton = () => {
    if (date === 'Select Date') {
      // console.log('date is', date);
      Toast('Please select Date');
    } else {
      let labAddress = `${Address} ${Address2}`;
      let labLatitude = Number(Latitude);
      let labLongitude = Number(Longitude);

      props.onClickPreviewBooking(
        labAddress,
        fullDate,
        labLatitude,
        labLongitude,
      );
    }
  };

  return (
    <TouchableOpacity
      style={styles.cardBoxRow}
      onPress={props.onSelectedLabsRow}>
      <View style={styles.labTitle}>
        <BoldText style={styles.labTitleText} title={Centre} />
        <RegularText style={styles.kmText} title={`${km} Km away`} />
      </View>

      <View style={styles.dataSection}>
        <BoldText
          style={[styles.addressText]}
          title={`${Address} ${Address2}`}
        />
      </View>

      <View style={[styles.callDirectionBox]}>
        <View style={[styles.btnSection]}>
          <TouchableOpacity style={styles.btnView} onPress={dialCall}>
            <Image source={imagesConstants.call} />
            <RegularText style={styles.btnText} title={'Call'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnView} onPress={openInMaps}>
            <Image source={imagesConstants.direction} />
            <RegularText style={styles.btnText} title={'Direction'} />
          </TouchableOpacity>
        </View>
      </View>

      {
        /**click to show priview booking ui manager */
        selected ? (
          <View>
            <View style={styles.selectDateSection}>
              <View style={styles.listHeading}>
                <BoldText title={'Select Date'} style={styles.headingText} />
              </View>
              <TouchableOpacity
                hitSlop={{left: 40, right: 40, top: 40, bottom: 40}}
                onPress={() => setDatePicker(true)}
                style={styles.calendarView}>
                <RegularText style={styles.dateText} title={date} />
                <Image
                  style={styles.calendarIcon}
                  source={imagesConstants.calendar}
                />
              </TouchableOpacity>
            </View>

            <View style={[styles.specialInstructionSection]}>
              <View>
                <BoldText
                  style={styles.selfNameText}
                  title={'Special Instruction'}
                />
              </View>
              <View style={styles.instructionList}>
                <FlatList
                  data={instruction}
                  showsVerticalScrollIndicator={false}
                  extraData={instruction}
                  renderItem={renderSpecialInstruction}
                />
              </View>
            </View>
            <TouchableOpacity>
              <SubmitButton
                onPress={() => clickPreviewButton()}
                style={styles.submitBtn}
                title={'Preview Booking'}
              />
            </TouchableOpacity>
          </View>
        ) : null
      }

      {datePicker ? (
        <DateTimePickerModal
          date={selectedDate}
          isVisible={datePicker}
          mode="date"
          display={'spinner'}
          minimumDate={new Date()}
          maximumDate={maximumDate}
          onConfirm={handleDatePickerConfirm}
          onCancel={handleDatePickerCancel}
        />
      ) : null}
    </TouchableOpacity>
  );
};
