import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../../constants/colors';
export default StyleSheet.create({
  safeArea: {
    flexGrow: 1,
  },
  mainContainer: {
    flex: 1,

    backgroundColor: 'white',
  },
  selfSection: {},

  listSeparator: {
    alignSelf: 'center',
    height: 1,
    width: '100%',
    marginTop: hp('1%'),

    backgroundColor: colors.gray,
  },
  selfNameText: {
    color: colors.app_theme_dark_green,
    fontSize: hp('1.8%'),
  },
  ageText: {
    marginTop: hp('0.5%'),
    color: colors.purplishGrey,
    fontSize: hp('1.3%'),
  },
  selfText: {
    color: colors.app_theme_dark_green,
    fontSize: hp('1.5%'),
  },
});
