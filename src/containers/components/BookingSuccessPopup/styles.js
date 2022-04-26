import {StyleSheet} from 'react-native';
import colors from '../../../constants/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
  },
  modalContainer: {
    backgroundColor: '#eee',
    height: hp('40%'),
    width: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    // shadowColor: 'black',
    // shadowOpacity: 0.3,
    // shadowOffset: {width: 10, height: 10},
    // shadowRadius: 5,
  },
  whiteSection: {
    backgroundColor: '#eee',
    padding: hp('1.5%'),
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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
  logo: {},
  animatedLoaderSection: {},
  textSection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  successText: {
    fontSize: hp('1.8%'),
    color: colors.app_theme_dark_green,
    fontWeight: 'bold',
    margin: hp('1%'),
  },
  dateTimeText: {
    fontSize: hp('1.8%'),
    lineHeight: 22,
    color: colors.purplishGrey,
    marginLeft: 30,
    marginRight: 30,
    textAlign: 'center',
  },
});
