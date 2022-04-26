import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../constants/colors';
export default StyleSheet.create({
  itemContainer: {
    // padding: hp('1.5%'),
    // margin: hp('0.1%'),
    flex: 1,
  },
  headSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  titleSection: {
    // alignItems: 'center',

    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: hp('0.5%'),
  },
  imageContainer: {
    width: '100%',

    borderRadius: 10,
    marginTop: hp('1.5%'),
  },
  img: {flex: 1, width: '100%', height: hp('18%'), borderRadius: 10},
  cardTitle: {flex: 1, fontSize: hp('1.3%')},
  seeMore: {flex: 1, fontSize: hp('1.5%'), color: colors.app_theme_dark_green},

  cardTitleName: {fontSize: hp('1.5%')},
  time: {fontSize: hp('1.3%'), color: colors.app_theme_dark_green},
});
