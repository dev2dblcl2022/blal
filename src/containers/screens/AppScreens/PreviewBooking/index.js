import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import {SubmitButton} from '../../../components/Buttons';
import styles from './style';
import DefaultHeader from '../../../components/DefaultHeader';
import {BoldText, RegularText} from '../../../components/Common';
import {
  MainContainer,
  MyCartTestCard,
  SpecialInstructionView,
} from '../../../components';

const index = ({navigation}) => {
  const [male, setMale] = useState(true);
  const [profilesData, setProfilesData] = useState([1]);
  const [instruction, setInstuction] = useState([1, 2, 3, 4]);
  const [alsoAdd, setAlsoAdd] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const onChooseGender = () => {
    setMale(male ? false : true);
  };
  const renderSelfTextCard = () => {
    return <MyCartTestCard />;
  };

  const renderSpecialInstruction = () => {
    return <SpecialInstructionView />;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <DefaultHeader
        onBack={() => navigation.goBack()}
        title={'Preview Bookking'}
      />
      <View style={styles.mainContainer}>
        <MainContainer>
          <View style={styles.selfSection}>
            <View style={styles.rowHeader}>
              <View style={styles.headerNameSection}>
                <BoldText
                  style={styles.selfNameText}
                  title={'Raghav Upadhyay'}
                />
                <RegularText style={styles.ageText} title={'Male 25'} />
              </View>
              <View>
                <RegularText style={styles.selfText} title={'Self'} />
              </View>
            </View>
            <View style={styles.separator} />
            <View style={styles.selfTestList}>
              <FlatList
                data={profilesData}
                ItemSeparatorComponent={() => {
                  return <View style={styles.listSeparator} />;
                }}
                showsVerticalScrollIndicator={false}
                extraData={profilesData}
                renderItem={renderSelfTextCard}
              />
            </View>
          </View>
          <View style={styles.sectionSeparator} />
          <View style={styles.parentSection}>
            <View style={styles.rowHeader}>
              <View style={styles.headerNameSection}>
                <BoldText
                  style={styles.selfNameText}
                  title={'Anita Upadhyay'}
                />
                <RegularText style={styles.ageText} title={'Female 55'} />
              </View>
              <View>
                <RegularText style={styles.selfText} title={'Parent'} />
              </View>
            </View>
            <View style={styles.separator} />
            <View style={styles.selfTestList}>
              <FlatList
                data={profilesData}
                showsVerticalScrollIndicator={false}
                extraData={profilesData}
                renderItem={renderSelfTextCard}
              />
            </View>
          </View>
          <View style={styles.sectionSeparator} />
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
          <View style={[styles.specialInstructionSection]}>
            <View style={styles.instructionHeading}>
              <BoldText
                style={styles.selfNameText}
                title={'Select Payment Type'}
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
                    <RegularText style={styles.female} title={'Online'} />
                    <RegularText
                      style={styles.paymentModeText}
                      title={'(Payment can be done online)'}
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
                    <RegularText style={styles.female} title={'COD'} />
                    <RegularText
                      style={styles.paymentModeText}
                      title={'(Payment to be given at the time of test)'}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.sectionSeparator} />
          <View style={styles.paymentSection}>
            <View style={styles.couponCodeSection}>
              <View style={styles.couponHeadingSection}>
                <BoldText style={styles.selfNameText} title={'Coupon Code'} />
                <RegularText style={styles.selfText} title={'View Offers'} />
              </View>
              <View style={styles.textInputSection}>
                <View style={styles.textInputView}>
                  <TextInput
                    placeholderTextColor={styles.placeholderColor}
                    style={styles.textInput}
                    placeholder={'Enter the Coupon Code'}
                  />
                </View>
                <View style={styles.applyBtnSection}>
                  <View style={styles.applyBtn}>
                    <RegularText style={styles.applyText} title={'Apply'} />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.paymentDetailSection}>
              <View style={styles.paymentHeadingSection}>
                <BoldText
                  style={styles.selfNameText}
                  title={'Payment Detail'}
                />
              </View>
              <View style={styles.paymentRatesSection}>
                <View style={styles.testPriceSection}>
                  <RegularText style={styles.testPrice} title={'Test Price'} />
                  <RegularText style={styles.rateText} title={'Rs. 499'} />
                </View>
                <View style={styles.testPriceSection}>
                  <RegularText
                    style={styles.testPrice}
                    title={'Coupon Discount'}
                  />
                  <RegularText style={styles.rateText} title={'(-) Rs. 50'} />
                </View>
                <View style={styles.testPriceSection}>
                  <RegularText
                    style={styles.testPrice}
                    title={'Home Collection Charges'}
                  />
                  <RegularText style={styles.rateText} title={'Rs. 50'} />
                </View>
                <View style={styles.testPriceSection}>
                  <RegularText
                    style={styles.testPrice}
                    title={'Total (Amount)'}
                  />
                  <RegularText style={styles.rateText} title={'Rs. 499'} />
                </View>
                <View style={styles.totalPayableSection}>
                  <BoldText
                    style={styles.payableText}
                    title={'Total (Amount)'}
                  />
                  <BoldText style={styles.payableText} title={'Rs. 499'} />
                </View>
              </View>
            </View>
          </View>
        </MainContainer>
        <View style={styles.btnSection}>
          <SubmitButton style={styles.submitBtn} title={'Make Payment'} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default index;
