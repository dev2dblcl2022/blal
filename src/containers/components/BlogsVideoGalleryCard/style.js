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
    marginRight: hp('2%'),
  },
  titleSection: {
    alignItems: 'center',
    width: hp('13.5%'),

    justifyContent: 'center',
    paddingVertical: hp('0.5%'),
  },
  img: {height: hp('12%'), width: hp('14%'), borderRadius: 10},
  cardTitle: {flex: 1, fontSize: hp('1.3%'), textAlign: 'center'},
});
