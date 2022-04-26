import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../constants/colors';
export default StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    margin: hp('0.4%'),
    marginRight: hp('2.3%'),

    padding: hp('1%'),
    width: '46%',
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderRadius: 10,
    shadowOpacity: 0.5,
    shadowRadius: 2,

    elevation: 1,
    alignItems: 'center',
  },
  img: {height: 30, width: 30},
  cardTitle: {fontSize: hp('1.5%'), marginLeft: hp('1%')},
});
