import {StyleSheet} from 'react-native';
import {color} from 'react-native-reanimated';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../../constants/colors';
export default StyleSheet.create({
  safeArea: {
    flexGrow: 1,
  },
  scroll: {
    flex: 1,
  },
  textSection: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: hp('1%'),
  },
  fullContainer: {
    flex: 1,
    // padding: hp('2%'),
    backgroundColor: 'white',
  },
  wrongSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleView: {
    height: hp('10%'),
    justifyContent: 'center',
    alignItems: 'center',
    width: hp('10%'),
    borderRadius: hp('5%'),
  },
  cancelBookingBtn: {
    margin: hp('2%'),
    backgroundColor: colors.white,
  },
  testLabel: {
    fontSize: hp('1.6%'),
  },
});
