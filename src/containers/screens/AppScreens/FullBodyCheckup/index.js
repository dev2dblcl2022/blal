import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import imagesConstants from '../../../../constants/imagesConstants';
import {
  Loader,
  MainContainer,
  SamplePreInstruction,
  SelectPatientPopup,
  Toast,
} from '../../../components';
import {BoldText, RegularText} from '../../../components/Common';
import Header from '../../../components/Header';
import style from './style';
import styles from './style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SubmitButton} from '../../../components/Buttons';
import NetworkRequest, {
  method,
  servicesPoints,
} from '../../../../services/NetworkRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../../../../context/context';

import {AccordionList} from 'accordion-collapse-react-native';
import {findLastIndex} from 'lodash-es';
import HTMLView from 'react-native-htmlview';
import NetworkRequestBlal, {
  blalMethod,
  blalServicesPoints,
} from '../../../../services/NetworkRequestBlal';

export default function index({navigation, route, props}) {
  const {signOut} = React.useContext(AuthContext);

  const {testPackageData} = route.params;

  const {comeFromMyCart} = route.params;
  const [packageData, setPackageData] = useState({});

  const [activeActions, setActiveSection] = useState([]);
  const [profilesData, setProfilesData] = useState([1, 2, 3, 4, 5, 6]);
  const [testIncludedTest, setTestIncludedTest] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loader, setLoader] = useState(Platform.OS === 'ios' ? false : true);
  const [cityId, setCityId] = useState('');
  const [panelId, setPanelId] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [faqList, setFaqList] = useState([
    {question: 'Liquid', answer: 'operation'},
    {question: 'Blood test', answer: 'blood'},
    {question: 'Liver Function', answer: 'mental report'},
    {question: 'HbA1c', answer: 'hospital'},
  ]);
  const [handleConnectionState, setHandleConnectionState] = useState(false);
  useEffect(() => {
    if (handleConnectionState) {
      navigation.navigate('ConnectionHandle');
    }
  }, [handleConnectionState]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getCityPanelId();
    });
    return unsubscribe;
  }, []);

  // useEffect(() => {
  //   getCityPanelId();
  // }, []);

  useEffect(() => {
    if (Object.keys(packageData).length > 0) {
      getIncludedTestFromTest();
    }
  }, [packageData]);

  useEffect(() => {
    if (cityId && panelId) {
      getPackageCartDetail();
    }
  }, [cityId, panelId]);

  const getPackageCartDetail = async () => {
    try {
      let data = {
        PanelId: Number(panelId),
        CityId: Number(cityId),
        Id: testPackageData.id,
        Type: testPackageData.type,
      };
      const requestConfig = {
        method: blalMethod.post,

        url: `${blalServicesPoints.blalUserServices.GetTestPackageDetails}?PanelId=${data.PanelId}&CityId=${data.CityId}&Id=${data.Id}&Type=${data.Type}`,
      };

      const response = await NetworkRequestBlal(requestConfig);

      if (response) {
        const {status_Code} = response;
        setLoader(false);
        if (status_Code === 200) {
          setPackageData({});
          setPackageData(response.data);
          setLoader(false);
        } else {
          setLoader(false);
        }
      }
    } catch (error) {
      setLoader(false);
    }
  };

  const getIncludedTestFromTest = () => {
    if (packageData?.TestType) {
      if (packageData?.ParameterName) {
        let data = packageData?.ParameterName;
        let testArray = data.split('#');
        let newArr = testArray.map(item => {
          return {Investigation: item, ParameterName: ''};
        });

        setTestIncludedTest(newArr);
      }
    }
  };

  const getCityPanelId = async () => {
    let city = await AsyncStorage.getItem('cityId');
    let panel = await AsyncStorage.getItem('panelId');

    setCityId(city);
    setPanelId(panel);
  };

  const renderCard = (item, index) => {
    return (
      <TouchableOpacity style={styles.itemContainer}>
        <View style={styles.dataSection}>
          <HTMLView
            textComponentProps={{style: {color: 'black'}}}
            value={item.Investigation}
            stylesheet={styles.htmlText}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const _renderHeaderPackage = (item, expanded, index) => {
    return (
      <View style={styles.headContainer}>
        <RegularText
          style={styles.accordionTitleText}
          title={item.Investigation}
        />
        {index ? (
          <Image source={imagesConstants.uparrow} />
        ) : (
          <Image source={imagesConstants.downarrow} />
        )}
      </View>
    );
  };

  const _renderContentPackage = (item, expanded) => {
    let data = item.ParameterName.replace(/#/g, ' ');
    return (
      <View style={styles.contentContainer}>
        <HTMLView
          textComponentProps={{style: {color: 'black'}}}
          value={data}
          stylesheet={styles.htmlText}
        />
        {/* <RegularText
          style={styles.accordionContentText}
          title={item.ParameterName}
        /> */}
      </View>
    );
  };

  const _renderHeaderTest = (item, expanded, index) => {
    return (
      <View style={styles.headContainer}>
        <RegularText
          style={styles.accordionTitleText}
          title={item.Investigation}
        />
        {expanded ? (
          <Image source={imagesConstants.uparrow} />
        ) : (
          <Image source={imagesConstants.downarrow} />
        )}
      </View>
    );
  };

  const _renderContentTest = (item, expanded) => {
    return (
      <View style={styles.contentContainer}>
        <RegularText
          style={styles.accordionContentText}
          title={item.ParameterName}
        />
      </View>
    );
  };

  const moveAddToCart = async patientsId => {
    setVisible(false);

    try {
      setLoader(true);
      let apiData = {
        is_booking: false,
        test_type: packageData?.TestType,
        test_id: packageData?.Id,
        panel_id: panelId,
        test_price: packageData?.Rate,
        test_name: packageData?.NAME,
        city_id: cityId,
        booking_members: patientsId,
      };

      const requestConfig = {
        data: apiData,
        method: method.post,
        url: servicesPoints.bookingServices.add,
      };
      const response = await NetworkRequest(requestConfig);

      if (response) {
        const {success} = response;
        if (success) {
          setLoader(false);

          Toast(response.message, 1);
          navigation.navigate('MyCart');
          // navigation.pop(2);
          // navigation.navigate('SearchLab');
        } else {
          Toast(response.message, 0);
          if (response === 'Network Error') {
            Toast('Network Error', 0);
            setHandleConnectionState
            setLoader(false);
          } else if (response.status === 401) {
            signOut();
          } else {
            null;
          }
          setLoader(false);
        }
      }
    } catch (err) {
      setLoader(false);
    }
  };

  const onAddMember = () => {
    setVisible(false);
    setTimeout(() => {
      navigation.navigate('AddFamilyMember');
    }, 200);
  };

  const onNext = async item => {
    let user = await AsyncStorage.getItem('userToken');
    if (user === 'GuestUser') {
      Alert.alert(
        'You are browsing as Guest, Please login to continue booking',
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
      setVisible(true);
    }
  };

  const _updateSections = activeSections => {
    setActiveSection(activeSections);
  };

  const _renderSectionTitle = item => {
    return (
      <View style={styles.headContainer}>
        <RegularText
          style={styles.accordionTitleText}
          title={item.Investigation}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainContainer}>
        <Header onBack={() => navigation.pop()} title={packageData?.NAME} />
        <ScrollView style={{flex: 0.9}}>
          {!loader ? (
            <MainContainer>
              <View style={styles.fullBodyCheckupSection}>
                <View style={styles.sectionOne}>
                  <View>
                    <View style={styles.titleDescriptionSection}>
                      <View style={styles.bodyImgSection}>
                        <Image
                          style={styles.bodyImg}
                          source={{uri: packageData?.Image}}
                        />
                      </View>
                      <View style={styles.desSection}>
                        <BoldText
                          style={styles.headingText}
                          title={packageData?.NAME}
                        />
                        <RegularText
                          style={styles.descriptionText}
                          // title={
                          //   'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud.'
                          // }
                          title={packageData?.Description}
                        />
                      </View>
                    </View>
                    <View style={styles.restDescription}>
                      <BoldText
                        style={styles.amountText}
                        title={`${'\u20B9'} ${packageData?.Rate}`}
                      />
                      <View style={styles.offSection}>
                        {packageData?.TotalMRP ? (
                          <RegularText
                            style={styles.cutText}
                            title={`${'\u20B9'} ${packageData?.TotalMRP}`}
                          />
                        ) : null}
                        {packageData?.DiscountPercentage ? (
                          <RegularText
                            style={styles.offText}
                            title={`${packageData?.DiscountPercentage}% off`}
                          />
                        ) : null}
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.separator} />
                <View style={styles.sectionTwo}>
                  <View style={[styles.rowOne]}>
                    <View style={[styles.recommendedFor]}>
                      <View style={styles.recommendedTextSection}>
                        <RegularText
                          style={styles.recommendedText}
                          title={'Recommended for'}
                        />
                      </View>
                      <View style={styles.genderSection}>
                        {packageData?.Gender === 'Male & Female' ? (
                          <View style={styles.gender}>
                            <Image
                              style={styles.maleImg}
                              source={imagesConstants.mandf}
                            />
                            <RegularText
                              style={styles.maleText}
                              title={packageData?.Gender}
                            />
                          </View>
                        ) : null}
                        {packageData?.Gender === 'Male' ? (
                          <View style={styles.gender}>
                            <Image
                              style={styles.maleImg}
                              source={imagesConstants.male}
                            />
                            <RegularText
                              style={styles.maleText}
                              title={'Male'}
                            />
                          </View>
                        ) : null}
                        {packageData?.Gender === 'Female' ? (
                          <View style={[styles.gender, {marginLeft: hp('1%')}]}>
                            <Image
                              style={styles.femaleImg}
                              source={imagesConstants.femaleIcon}
                            />
                            <RegularText
                              style={styles.maleText}
                              title={'Female'}
                            />
                          </View>
                        ) : null}
                      </View>
                    </View>
                    <View style={[styles.ageGroup]}>
                      <View style={styles.recommendedTextSection}>
                        <RegularText
                          style={styles.recommendedText}
                          title={'Age'}
                        />
                      </View>
                      <View style={styles.genderSection}>
                        <View style={styles.gender}>
                          <Image source={imagesConstants.people} />
                          <RegularText
                            style={styles.maleText}
                            title={
                              packageData?.FromAge === '0' &&
                              packageData?.ToAge === '99'
                                ? 'All Age Group'
                                : `${packageData?.FromAge} - ${packageData?.ToAge} Years`
                            }
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={[styles.rowOne, {marginTop: 20}]}>
                    <View style={[styles.recommendedFor]}>
                      <View style={styles.recommendedTextSection}>
                        <RegularText
                          style={styles.recommendedText}
                          title={'Report generation Time'}
                        />
                      </View>
                      <View style={styles.genderSection}>
                        <View style={styles.gender}>
                          <Image
                            style={styles.maleImg}
                            source={imagesConstants.timer}
                          />
                          {/* <RegularText
                          style={styles.maleText}
                          title={'Within 24 hrs'}
                        /> */}
                          <RegularText
                            style={styles.maleText}
                            title={packageData?.ReportGenerationTime}
                          />
                        </View>
                      </View>
                    </View>
                    <View style={[styles.ageGroup]}>
                      {packageData?.PackageTestList?.length ||
                      testIncludedTest?.length ? (
                        <View>
                          <View style={styles.recommendedTextSection}>
                            <RegularText
                              style={styles.recommendedText}
                              title={`Total ${
                                packageData?.TestType === 'Test'
                                  ? `Parameter(s)`
                                  : 'Test'
                              }`}
                            />
                          </View>
                          <View style={styles.genderSection}>
                            {packageData?.TestType === 'Package' &&
                            packageData?.PackageTestList?.length ? (
                              <View style={styles.gender}>
                                <Image source={imagesConstants.rep} />
                                <RegularText
                                  style={styles.maleText}
                                  title={`${packageData?.PackageTestList?.length} Tests included`}
                                />
                              </View>
                            ) : null}
                            {packageData?.TestType === 'Test' &&
                            testIncludedTest?.length ? (
                              <View style={styles.gender}>
                                <Image source={imagesConstants.rep} />
                                <RegularText
                                  style={styles.maleText}
                                  title={`${testIncludedTest?.length} Tests included`}
                                />
                              </View>
                            ) : null}
                          </View>
                        </View>
                      ) : null}
                    </View>
                  </View>
                  {packageData?.TestType === 'Test' ? (
                    <View style={{marginTop: hp('2%')}}>
                      <View style={styles.recommendedTextSection}>
                        <RegularText
                          style={styles.recommendedText}
                          title={'Sample Type'}
                        />
                      </View>
                      <View style={styles.genderSection}>
                        {packageData?.SampleType ? (
                          <View style={styles.gender}>
                            <Image source={imagesConstants.sameType} />
                            <RegularText
                              style={styles.maleText}
                              title={`${packageData?.SampleType}`}
                            />
                          </View>
                        ) : null}
                      </View>
                    </View>
                  ) : null}
                </View>
              </View>

              {packageData?.PackageTestList?.length ||
              testIncludedTest?.length ? (
                <View style={styles.fullBodyCheckupSection}>
                  {packageData?.TestType === 'Package' &&
                  packageData.PackageTestList.length > 0 ? (
                    <View>
                      <View style={styles.sectionOne}>
                        <View style={styles.headingCollection}>
                          <BoldText
                            style={styles.sampleText}
                            title={'Test List'}
                          />
                          <RegularText
                            style={styles.sampleText}
                            title={` ( ${packageData.PackageTestList?.length} Test Included )`}
                          />
                        </View>
                        <View style={styles.accordionSection}>
                          {/* <Accordion
                          sections={packageData.PackageTestList}
                          activeSections={activeActions}
                          renderSectionTitle={_renderSectionTitle}
                          // animation={true}

                          // style={styles.accordionSectionMain}
                          // expanded={[0]}
                          renderHeader={_renderHeaderPackage}
                          renderContent={_renderContentPackage}
                          onChange={_updateSections}
                        /> */}
                          <AccordionList
                            list={packageData.PackageTestList}
                            header={_renderHeaderPackage}
                            body={_renderContentPackage}
                            keyExtractor={item => `${item.Investigation_Id}`}
                          />
                        </View>
                      </View>
                    </View>
                  ) : (
                    <View>
                      <View style={styles.sectionOne}>
                        <View style={styles.headingCollection}>
                          <BoldText
                            style={styles.sampleText}
                            title={'Test List'}
                          />
                          <RegularText
                            style={styles.sampleText}
                            title={` ( ${testIncludedTest?.length} Test Included )`}
                          />
                        </View>
                        <View style={styles.accordionSection}>
                          {testIncludedTest.length > 0 ? (
                            // <Accordion
                            //   dataArray={testIncludedTest}
                            //   animation={true}
                            //   style={styles.accordionSectionMain}
                            //   // expanded={[0]}
                            //   renderHeader={_renderHeaderTest}
                            //   renderContent={_renderContentTest}
                            // />
                            <FlatList
                              data={testIncludedTest}
                              showsVerticalScrollIndicator={false}
                              extraData={testIncludedTest}
                              renderItem={({item, index}) =>
                                renderCard(item, index)
                              }
                            />
                          ) : null}
                        </View>
                      </View>
                    </View>
                  )}
                </View>
              ) : null}

              {packageData?.PreTestInfo ? (
                <View style={styles.fullBodyCheckupSection}>
                  <View style={style.sectionOne}>
                    <View style={styles.headingTestSection}>
                      <BoldText
                        style={styles.sampleText}
                        title={'Test Preparation'}
                      />
                    </View>
                    <View style={styles.instructionList}>
                      {/* <FlatList
                    data={profilesData}
                    showsVerticalScrollIndicator={false}
                    extraData={profilesData}
                    renderItem={renderCard}
                  /> */}
                      <RegularText
                        style={styles.ageText}
                        title={packageData?.PreTestInfo}
                      />
                    </View>
                  </View>
                </View>
              ) : null}
              <View style={styles.fullBodyCheckupSection}>
                <View style={styles.sectionOne}>
                  <View style={styles.headingCollection}>
                    <BoldText
                      style={styles.sampleText}
                      title={'Collection Type'}
                    />
                    {/* <RegularText
                    style={styles.sampleText}
                    title={' (2 options)'}
                  /> */}
                  </View>
                  <View style={[styles.genderSection, {marginTop: hp('2%')}]}>
                    {packageData?.HomeCollection === '1' || 'YES' ? (
                      <View style={styles.gender}>
                        <Image
                          style={styles.maleImg}
                          source={imagesConstants.house}
                        />
                        <RegularText
                          style={styles.collectionSubText}
                          title={'Home'}
                        />
                      </View>
                    ) : null}
                    <View style={[styles.gender, {marginLeft: hp('3%')}]}>
                      <Image
                        style={styles.femaleImg}
                        source={imagesConstants.flask}
                      />
                      <RegularText
                        style={styles.collectionSubText}
                        title={'Lab'}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </MainContainer>
          ) : null}
        </ScrollView>
        <View style={styles.submitBtnSection}>
          <SubmitButton onPress={onNext} title={'Book Now'} />
        </View>
        <SelectPatientPopup
          navigation={navigation}
          onAddMember={onAddMember}
          onRequestClose={() => setVisible(false)}
          onPressCancel={() => setVisible(false)}
          onAddToCart={data => moveAddToCart(data)}
          visible={visible}
        />
      </View>
      <Loader display={loader} />
    </SafeAreaView>
  );
}
