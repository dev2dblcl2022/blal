import {StyleSheet} from 'react-native';
import colors from '../../../constants/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default StyleSheet.create({
  container: {},
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flatListSection: {
    marginTop: hp('2%'),
  },
  listTitle: {
    color: colors.app_theme_dark_green,
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },
  seeAll: {
    color: colors.app_theme_light_green,
    fontSize: hp('1.6%'),
  },
});
