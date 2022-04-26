import {StyleSheet} from 'react-native';
import colors from '../../../constants/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default StyleSheet.create({
  container: {
    backgroundColor: colors.app_theme_dark_green,
    alignItems: 'center',
    padding: hp('1%'),
    paddingVertical: hp('2.5%'),
  },
  headerTitle: {
    fontSize: hp('2.1%'),
    fontFamily: 'Lato-Regular',

    color: colors.white,
  },
  cartCountView: {
    position: 'absolute',
    top: -8,
    right: 0,
    height: hp('2%'),
    justifyContent: 'center',
    alignItems: 'center',
    width: hp('2%'),
    borderRadius: hp('1%'),
    backgroundColor: 'red',
  },
  backContainer: {
    flex: 0.1,

    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputView: {
    paddingHorizontal: hp('1%'),
    flexDirection: 'row',
    backgroundColor: 'white',
    height: hp('5%'),
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
  },
  headerContainer: {
    flex: 0.8,
    marginRight: 10,
    paddingLeft: hp('1%'),
    justifyContent: 'center',
  },
  row: {marginTop: hp('2%'), flexDirection: 'row', paddingHorizontal: hp('1%')},
  inputSection: {
    flex: 0.8,
  },
  textInput: {
    fontSize: hp('1.3%'),
    color: colors.black,
  },
  placeholderColor: {
    color: colors.black,
  },
  filterBtnSection: {
    flex: 0.2,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    borderRadius: 8,
    backgroundColor: colors.app_theme_light_green,
  },
  filterText: {
    fontSize: hp('1.3%'),
  },
  filterImg: {
    height: hp('2%'),
    width: hp('2%'),
  },
});
