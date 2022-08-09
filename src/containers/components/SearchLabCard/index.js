import React from 'react';
import {Image, View, TouchableOpacity, Alert} from 'react-native';
import {Blal_City_Id, Blal_Panel_Id} from '../../../config/Setting';
import colors from '../../../constants/colors';
import imagesConstants from '../../../constants/imagesConstants';
import {BoldText, RegularText} from '../Common';
import SelectPatientPopup from '../SelectPatientPopup';
import styles from './style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetworkRequest, {
  method,
  servicesPoints,
} from '../../../services/NetworkRequest';
import Toast from '../Toast';

export default props => {
  let {
    NAME,
    Rate,
    DiscountPercentage,
    ReportGenerationTime,
    PreTestInfo,
    TotalMRP,
    TestType,
    Id,
  } = props?.data;
  console.log('hjfhj', Id);
  console.log('TestType', TestType);

  const [visible, setVisible] = React.useState(false);
  const [userToken, setUserToken] = React.useState('');
  const [loader, setLoader] = React.useState(true);
  const [panelId, setPanelId] = React.useState(Blal_Panel_Id);
  const [cityId, setCityId] = React.useState(Blal_City_Id);

  let type = props?.type;
  let imageType = props?.imageType;

  let testCountArray = [];

  if (props?.data.TestType === 'Test') {
    if (props?.data.ParameterName) {
      let data = props?.data.ParameterName;
      let testArray = data.split('#');
      if (data) {
        if (testArray.length) {
          let newArr = testArray.map(item => {
            return {Investigation: item, ParameterName: ''};
          });
          testCountArray = newArr;
        } else {
          testCountArray = {
            Investigation: props?.data.ParameterName,
            ParameterName: '',
          };
        }
      } else {
        testCountArray = [];
      }

      // setTestIncludedTest(newArr);
    } else {
      testCountArray = [];
    }
  }
  const moveAddToCart = async patientsId => {
    console.log('patientsId', patientsId);
    setVisible(false);

    try {
      setLoader(true);
      let apiData = {
        is_booking: false,
        test_type: TestType,
        test_id: Id,
        panel_id: panelId,
        test_name: NAME,
        city_id: cityId,
        booking_members: patientsId,
      };

      const requestConfig = {
        data: apiData,
        method: method.post,
        url: servicesPoints.bookingServices.add,
      };
      console.log('requestConfigrequestConfigrequestConfig', requestConfig);
      const response = await NetworkRequest(requestConfig);

      if (response) {
        const {success} = response;
        if (success) {
          setLoader(false);
          Toast(response.message, 1);
          props.getCartCount();
        } else {
          Toast(response.message, 0);

          if (response === 'Network Error') {
            Toast('Network Error', 0);
            // setHandleConnectionState(true);
            setLoader(false);
          } else if (response.status === 401) {
            // signOut();
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

  return (
    <TouchableOpacity onPress={props.onPress} style={styles.itemContainer}>
      <View style={styles.profilePicSection}>
        <Image
          style={styles.img}
          source={{
            uri: props?.data.Image,
          }}
        />
      </View>

      <View style={styles.dataSection}>
        <BoldText style={styles.testNameText} title={NAME} />
        {/* {props.data.TestType === 'Test' && testCountArray.length ? (
          <RegularText
            style={styles.addressText}
            title={`${testCountArray.length} test included`}
          />
        ) : null}
        {props.data.TestType === 'Package' ? (
          <RegularText
            style={styles.addressText}
            title={`${testCountArray.length} test included`}
          />
        ) : null} */}
        <View style={styles.reportGenTimeView}>
          {/* <BoldText
            style={styles.testInclude}
            title={'Blood Test, Blood Pressure and 8 more'}
          /> */}
        </View>
        <View style={styles.reportGenTimeView}>
          <RegularText
            style={styles.addressText}
            title={'Report Generation Time'}
          />
        </View>

        <View style={styles.amountSection}>
          {/* <BoldText style={styles.timeText} title={'8-10 hours'} /> */}
          <BoldText style={styles.timeText} title={ReportGenerationTime} />
        </View>
        {PreTestInfo ? (
          <View style={[styles.timeSection, {flexDirection: 'row'}]}>
            <Image
              style={{
                height: 11,
                width: 11,
                marginTop: 5,
                tintColor: colors.app_theme_dark_green,
              }}
              source={imagesConstants.infoPre}
            />
            <RegularText
              style={[styles.hrsText, {marginLeft: 5, marginTop: 4}]}
              title={PreTestInfo}
            />
          </View>
        ) : null}
      </View>
      <View style={styles.amountRightSection}>
        <BoldText style={styles.testNameText} title={`${'\u20B9'} ${Rate}`} />
        <View style={styles.offSection}>
          <RegularText
            style={[styles.amountTextTwo, {textAlign: 'right'}]}
            title={TotalMRP}
          />
          {DiscountPercentage && DiscountPercentage !== '0' ? (
            <RegularText
              style={styles.percentText}
              title={`${'\u20B9'} ${DiscountPercentage}%off`}
            />
          ) : null}
        </View>
        <TouchableOpacity
          hitSlop={{left: 40, right: 40, top: 40, bottom: 40}}
          onPress={props.onClickPlusAdd}
          style={styles.searchedItemTwo}>
          <BoldText
            style={{
              color: colors.app_theme_dark_green,
              fontSize: hp('3.5%'),
              fontWeight: 'bold',
            }}
            title={props.IsBestSeller ? '-' : '+'}
          />
        </TouchableOpacity>
      </View>
      <View style={{position: 'absolute', top: -2, left: 0}}>
        {TestType === 'Test' ? (
          <Image source={imagesConstants.testCorner} />
        ) : (
          <Image source={imagesConstants.packageCorner} />
        )}
      </View>
      {userToken === 'GuestUser' ? null : (
        <SelectPatientPopup
          navigation={props.navigation}
          onAddMember={props.onAddMember}
          onRequestClose={() => setVisible(false)}
          onPressCancel={() => setVisible(false)}
          onAddToCart={data => {
            moveAddToCart(data);
            console.log('fgfg', data);
          }}
          visible={visible}
        />
      )}
    </TouchableOpacity>
  );
};
