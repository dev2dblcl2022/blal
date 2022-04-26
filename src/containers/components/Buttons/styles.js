import {StyleSheet} from 'react-native';
import colors from '../../../constants/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default StyleSheet.create({
  cancelButton: {
    backgroundColor: colors.red,
    height: hp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  SubmitButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colors.app_theme_light_green,
    height: hp('5%'),
  },

  BackButton: {
    backgroundColor: '#fff',
    height: hp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
