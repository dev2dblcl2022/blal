import {StyleSheet} from 'react-native';
import colors from '../../../constants/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default StyleSheet.create({
  BoldText: {
    fontSize: hp('2%'),
    fontFamily: 'Lato-Bold',
    fontWeight: '700',
    color: colors.white,
  },

  LightText: {
    fontSize: hp('2.5%'),
    fontFamily: 'Lato-Light',
    color: colors.red,
  },

  RegularText: {
    fontSize: hp('2%'),
    fontFamily: 'Lato-Regular',
    color: colors.purplishGrey,
  },

  ItalicText: {
    fontFamily: 'Lato-BlackItalic',
    color: colors.red,
    fontSize: hp('1.7%'),
    // marginBottom:10
  },
  ErrorText: {
    color: colors.red,
    fontFamily: 'Lato-Regular',
    fontSize: hp('1.5%'),
    marginLeft: wp('1%'),
    paddingVertical: hp('1%'),
  },
});
