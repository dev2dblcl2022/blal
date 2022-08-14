import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../constants/colors';
export default StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    padding: hp('2%'),
  },
  logoSection: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  textSection: {
    flex: 0.8,
    justifyContent: 'center',
  },

  img: {
    height: hp('4%'),
    width: hp('4%'),
  },
  imageView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('8%'),
    width: hp('8%'),
    borderRadius: hp('4%'),
    borderWidth: 1,
    borderColor: colors.gray,
  },
  headText: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: hp('1.8%'),
  },

  messageText: {
    color: colors.black,
    marginTop: hp('0.5%'),
    fontSize: hp('1.5%'),
  },
  messageText1: {
    color: colors.black,
    marginTop: hp('0.5%'),
    fontSize: hp('1.5%'),
    position: 'relative',
    left: hp('25%'),
  },
});
