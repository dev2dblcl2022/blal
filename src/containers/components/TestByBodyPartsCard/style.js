import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../constants/colors';
export default StyleSheet.create({
  itemContainer: {
    padding: hp('1.5%'),
    margin: hp('0.5%'),
    marginRight: hp('2%'),
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    flex: 1,
    borderRadius: 10,
    shadowOpacity: 0.1,
    shadowRadius: 2,
    width: hp('10%'),
    elevation: 5,
  },
  titleSection: {flex: 0.3, alignItems: 'center', justifyContent: 'center'},
  img: {
    height: hp('5%'),
    width: hp('10%'),
    borderRadius: hp('2.5%'),
    alignSelf: 'center',
  },
  blogImg: {
    height: hp('5%'),
    width: hp('5%'),
    borderRadius: hp('2.5%'),
    alignSelf: 'center',
  },
  cardTitle: {fontSize: hp('1.3%'), marginTop: hp('1%')},
});
