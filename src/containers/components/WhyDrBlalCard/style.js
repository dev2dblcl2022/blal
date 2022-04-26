import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../constants/colors';
export default StyleSheet.create({
  itemContainer: {
    marginRight: hp('2%'),
  },
  imgSection: {
    height: hp('12%'),
    width: hp('14%'),

    borderRadius: 10,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleSection: {
    width: hp('14%'),
    marginTop: hp('1%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {height: hp('10%'), width: hp('12%'), borderRadius: 10},
  cardTitle: {
    fontSize: hp('1.3%'),
    textAlign: 'center',
    color: colors.purplishGrey,
  },
});
