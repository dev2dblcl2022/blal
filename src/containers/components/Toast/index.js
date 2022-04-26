import {Text, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../../constants/colors';

export default (message, type) => {
  // return Toast.show({
  //   text: message,
  //   position: 'top',
  //   duration: 2500,
  //   buttonText: 'Okay',
  //   type: type ? 'success' : 'danger',
  // });
  return showMessage({
    position: 'top',
    message: message,
    titleStyle: {fontFamily: 'Lato-Regular'},
    icon: type === 1 ? 'success' : 'danger',
    autoHide: 2000,
    duration: 2000,
    style: {marginTop: hp('10%'), borderRadius: 10, marginHorizontal: hp('2%')},
    textStyle: {fontFamily: 'Lato-Regular'},
    type: type === 1 ? 'success' : 'danger',
    backgroundColor: type === 1 ? colors.app_theme_light_green : colors.red,
    color: '#ffffff',
  });
};
