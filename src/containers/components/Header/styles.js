import {StyleSheet} from 'react-native';
import colors from '../../../constants/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.app_theme_dark_green,
    alignItems: 'center',
    height: hp('8%'),
  },
  headerTitle: {
    fontSize: hp('2.1%'),
    fontFamily: 'Lato-Regular',

    color: colors.white,
  },
  backContainer: {
    flex: 0.1,
    paddingLeft: hp('1%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {flex: 0.8, paddingLeft: hp('1%')},
});
