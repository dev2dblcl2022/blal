import {StyleSheet} from 'react-native';
import colors from '../../../constants/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default StyleSheet.create({
  modalContainer: {
    backgroundColor: colors.transparent,
    flex: 1,

    alignItems: 'center',
  },
  whiteSection: {
    backgroundColor: 'white',
    padding: hp('1.5%'),
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  lottie: {
    width: hp('40%'),
    height: hp('10%'),
  },
  logoContainer: {},
  logo: {
    height: hp('10.3%'),
    width: hp('12%'),
  },
  animatedLoaderSection: {},
  textSection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  waitText: {
    fontSize: hp('1.8%'),
    color: colors.app_theme_dark_green,
  },
  fetchingDetailText: {
    fontSize: hp('1.6%'),
    color: colors.app_theme_dark_green,
  },
});
