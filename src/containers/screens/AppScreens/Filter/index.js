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
import {BoldText, RegularText} from '../../../components/Common';
import {
  LinkUhidCard,
  Loader,
  MyFamilyMemberCard,
  SelectPrimaryCard,
  Toast,
} from '../../../components';
import NetworkRequest, {
  method,
  servicesPoints,
} from '../../../../services/NetworkRequest';
import colors from '../../../../constants/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import imagesConstants from '../../../../constants/imagesConstants';
import NetworkRequestBlal, {
  blalMethod,
  blalServicesPoints,
} from '../../../../services/NetworkRequestBlal';
import AsyncStorage from '@react-native-async-storage/async-storage';
const index = ({navigation, route}) => {
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState([
    {id: 0, label: 'Body Part'},
    {id: 1, label: 'Health Conditions'},
  ]);
  const [filterType, setFilterType] = useState(1);
  const [bodyParts, setBodyParts] = useState([
    {label: 'Heart'},
    {label: 'Lungs'},
    {label: 'Kidney'},
    {label: 'Liver'},
    {label: 'Stomach'},
  ]);
  const [conditions, setConditions] = useState([
    {label: 'as'},
    {label: 'iopiop'},
    {label: 'yrtyh'},
    {label: 'vbnvbn'},
    {label: 'yiuio'},
  ]);

  const [testByCondition, setTestByCondition] = useState([]);
  const [resetFilter, setResetFilter] = useState(0);
  const [testByBodyParts, setTestByBodyPart] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getTestByBodyParts();
      getTestByCondition();
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (resetFilter) {
      getTestByBodyParts();
      getTestByCondition();
    }
  }, [resetFilter]);

  const getTestByBodyParts = async () => {
    try {
      const requestConfig = {
        method: blalMethod.post,

        url: `${blalServicesPoints.blalUserServices.GetBodyParts}`,
      };
      const response = await NetworkRequestBlal(requestConfig);

      if (response) {
        const {status_Code} = response;
        if (status_Code === 200) {
          let testIdBodyParts = await AsyncStorage.getItem(
            'filterDataBodyParts',
          );

          if (testIdBodyParts) {
            let responseArray = [];
            responseArray = response.data;
            let allBodyPartsIds = testIdBodyParts.split(',');

            const a = responseArray;
            const b = allBodyPartsIds;

            const output = a.map(e =>
              b.some(id => id === e.Id)
                ? {...e, selected: true}
                : {...e, selected: false},
            );

            setTestByBodyPart(output);
            setResetFilter(0);
          } else {
            setTestByBodyPart(response.data);
          }
        } else {
          setLoader(false);
        }
      }
    } catch (err) {
      setLoader(false);
    }
  };

  const getTestByCondition = async () => {
    try {
      let data = {
        limit: 6,
      };
      const requestConfig = {
        method: blalMethod.post,

        url: `${blalServicesPoints.blalUserServices.GetTestCondition}`,
      };
      const response = await NetworkRequestBlal(requestConfig);

      if (response) {
        const {status_Code} = response;
        if (status_Code === 200) {
          let testIdConditions = await AsyncStorage.getItem(
            'filterDataConditions',
          );

          if (testIdConditions) {
            let responseArray = [];
            responseArray = response.data;
            let allConditionsIds = testIdConditions.split(',');

            const a = responseArray;
            const b = allConditionsIds;

            const output = a.map(e =>
              b.some(id => id === e.Id)
                ? {...e, selected: true}
                : {...e, selected: false},
            );

            setTestByCondition(output);
          } else {
            setTestByCondition(response.data);
          }

          setLoader(false);
        } else {
          setLoader(false);
        }
      }
    } catch (error) {
      setLoader(false);
    }
  };

  const itemBodySelection = item => {
    let data = testByBodyParts;
    data = data.map((itn, index) => {
      if (itn.Id === item.Id) {
        itn.selected = !itn.selected;
      } else {
        null;
      }
      return itn;
    });
    setTestByBodyPart(data);
  };
  const itemConditionSelection = item => {
    let data = testByCondition;
    data = data.map((itn, index) => {
      if (itn.Id == item.Id) {
        itn.selected = !itn.selected;
      } else {
        null;
      }
      return itn;
    });
    setTestByCondition(data);
  };

  const onResetFilter = async () => {
    await AsyncStorage.removeItem('filterDataBodyParts');
    await AsyncStorage.removeItem('filterDataConditions');
    setResetFilter(1);
  };

  const onApplyFilter = async () => {
    let partsNames = [];
    let conditionNames = [];

    let bodyPartsData = [];
    let conditionData = [];

    bodyPartsData = testByBodyParts.filter(item => {
      if (item.selected) {
        partsNames.push(item.Id);
      } else {
        null;
      }
    });
    conditionData = testByCondition.filter(item => {
      if (item.selected) {
        conditionNames.push(item.Id);
      } else {
        null;
      }
    });

    await AsyncStorage.setItem('filterDataBodyParts', partsNames.join(','));
    await AsyncStorage.setItem(
      'filterDataConditions',
      conditionNames.join(','),
    );

    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <DefaultHeader onBack={() => navigation.goBack()} title={'Filter'} />

      <View style={styles.mainContainer}>
        <View style={styles.allListSection}>
          <View style={styles.listLabelSection}>
            <FlatList
              data={data}
              extraData={data}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() => setFilterType(item.id === 0 ? 1 : 0)}
                    style={styles.listItemView}>
                    <RegularText
                      style={{fontSize: hp('1.8%')}}
                      title={item.label}
                    />
                    <Image
                      style={styles.arrowImg}
                      source={imagesConstants.drawerArrow}
                    />
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <View style={styles.separator} />
          <View style={styles.listItemSection}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={filterType ? testByBodyParts : testByCondition}
              extraData={filterType ? testByBodyParts : testByCondition}
              renderItem={({item}) => {
                return (
                  <View style={styles.listItemView}>
                    <View style={{flex: 0.8}}>
                      <RegularText
                        style={{fontSize: hp('1.6%')}}
                        title={item.Name}
                      />
                    </View>
                    <View style={{flex: 0.2, alignItems: 'flex-end'}}>
                      <TouchableOpacity
                        hitSlop={{left: 20, right: 20, top: 20, bottom: 20}}
                        onPress={() =>
                          filterType
                            ? itemBodySelection(item)
                            : itemConditionSelection(item)
                        }
                        style={{
                          height: hp('2%'),
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: hp('2%'),
                          borderRadius: hp('1%'),
                          borderWidth: 1,
                          borderColor: 'black',
                        }}>
                        {item.selected ? (
                          <Image
                            style={styles.tickImage}
                            source={imagesConstants.tick}
                          />
                        ) : null}
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
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
