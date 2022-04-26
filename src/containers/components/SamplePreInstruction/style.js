import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../constants/colors';
export default StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',

    marginTop: hp('1%'),
  },

  dataSection: {flex: 1, flexDirection: 'row'},

  emailText: {
    fontSize: hp('1.3%'),
    marginTop: hp('0.5%'),
    color: colors.purplishGrey,
  },
  ageText: {
    fontSize: hp('1.3%'),
    marginTop: hp('0.5%'),
    color: colors.purplishGrey,
  },
  htmlText: {
    color: 'black',
    fontSize: hp('1.4%'),
    marginTop: hp('1%'),
    lineHeight: 18,
  },
});
