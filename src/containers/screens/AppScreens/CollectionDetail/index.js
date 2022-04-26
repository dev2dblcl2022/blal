import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {SubmitButton} from '../../../components/Buttons';
import styles from './style';
import DefaultHeader from '../../../components/DefaultHeader';
import {BoldText, RegularText} from '../../../components/Common';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  AlsoAddCard,
  MainContainer,
  MyCartTestCard,
  SelectAddressCard,
  SpecialInstructionView,
} from '../../../components';

import imagesConstants from '../../../../constants/imagesConstants';
import moment from 'moment';

const index = ({navigation}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [date, setDate] = useState('Select Date');
  const [datePicker, setDatePicker] = useState(false);
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [male, setMale] = useState(true);
  const [profilesData, setProfilesData] = useState([1]);
  const [instruction, setInstuction] = useState([1, 2, 3, 4]);
  const [alsoAdd, setAlsoAdd] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const onChooseGender = () => {
    setMale(male ? false : true);
  };
  const formatDate = date => {
    return moment(date).format('MMMM DD, YYYY');
  };

  const handleDatePickerConfirm = date => {
    const selectedDate =
      date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    const split_date = selectedDate.split('/');
    setDay(split_date[0]);
    setMonth(split_date[1]);
    setYear(split_date[2]);
    setDate(formatDate(date));
    setDatePicker(false);
  };

  const handleDatePickerCancel = () => {
    setDatePicker(false);
  };

  const renderSelfTextCard = () => {
    return <MyCartTestCard />;
  };

  const renderSpecialInstruction = () => {
    return <SpecialInstructionView />;
  };

  const renderAlsoAddCard = () => {
    return <SelectAddressCard />;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <DefaultHeader
        onBack={() => navigation.goBack()}
        title={'Collection Details'}
      />
      <View style={styles.mainContainer}>
        <MainContainer>
          <View style={[styles.specialInstructionSection]}>
            <View style={styles.instructionHeading}>
              <BoldText
                style={styles.selfNameText}
                title={'Select Collection Type(Required)'}
              />
            </View>
            <View style={styles.paymentRadioSection}>
              <View style={styles.radioContent}>
                <TouchableOpacity
                  onPress={onChooseGender}
                  style={styles.radioGroup}>
                  <View style={styles.radioView}>
                    {male ? <View style={styles.radioInnerView} /> : null}
                  </View>
                  <View>
                    <RegularText style={styles.female} title={'Home'} />
                    <RegularText
                      style={styles.paymentModeText}
                      title={'(Sample will be collected from home)'}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onChooseGender}
                  style={[styles.radioGroup]}>
                  <View style={styles.radioView}>
                    {!male ? <View style={styles.radioInnerView} /> : null}
                  </View>

                  <View>
                    <RegularText style={styles.female} title={'Lab'} />
                    <RegularText
                      style={styles.paymentModeText}
                      title={'(Sample will be collected at Lab)'}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.sectionSeparator} />
          <View style={styles.youCanAddSection}>
            <View style={styles.listHeading}>
              <BoldText title={'You can also add'} style={styles.headingText} />
            </View>
            <View style={styles.alsoAddListSection}>
              <FlatList
                data={alsoAdd}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                showsVerticalScrollIndicator={false}
                extraData={alsoAdd}
                renderItem={renderAlsoAddCard}
              />
            </View>
          </View>
          <View style={styles.selectDateSection}>
            <View style={styles.listHeading}>
              <BoldText title={'Select Date'} style={styles.headingText} />
            </View>
            <TouchableOpacity
              onPress={() => setDatePicker(true)}
              style={styles.calendarView}>
              <RegularText style={styles.dateText} title={'151651'} />
              <Image
                style={styles.calendarIcon}
                source={imagesConstants.calendar}
              />
            </TouchableOpacity>
          </View>
          <View style={[styles.specialInstructionSection]}>
            <View style={styles.instructionHeading}>
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

          <View style={styles.sectionSeparator} />
        </MainContainer>
        <View style={styles.btnSection}>
          <SubmitButton style={styles.submitBtn} title={'Preview Booking'} />
        </View>
      </View>
      {datePicker ? (
        <DateTimePickerModal
          date={selectedDate}
          isVisible={datePicker}
          mode="date"
          display={'spinner'}
          onConfirm={handleDatePickerConfirm}
          onCancel={handleDatePickerCancel}
        />
      ) : null}
    </SafeAreaView>
  );
};

export default index;
