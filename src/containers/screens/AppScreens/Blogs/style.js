import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../../constants/colors';
export default StyleSheet.create({
  safeArea: {
    flexGrow: 1,
    backgroundColor: colors.whiteSmoke,
  },
  content: {
    flexGrow: 1,
    paddingBottom: hp('12%'),
    backgroundColor: colors.whiteSmoke,
  },
  fullContainer: {
    flex: 1,
    padding: hp('3%'),
  },
  findNearByLabsBtn: {
    flexDirection: 'row',
    marginTop: hp('2%'),
    alignItems: 'center',
    backgroundColor: colors.app_theme_dark_green,
  },
  testByCondition: {
    marginTop: hp('2%'),
  },
  listSepVertical: {
    height: hp('2%'),
    backgroundColor: colors.whiteSmoke,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  item: {
    width: '100%',
    height: hp('20%'),
  },
  activeDot: {
    backgroundColor: colors.white,
    height: hp('0.7%'),
    width: hp('1.5%'),
    padding: 0,
  },
  inactiveDot: {
    backgroundColor: colors.Soapstone,
    height: hp('1.6%'),
    width: hp('1.6%'),
    borderRadius: hp('0.8%'),
    padding: 0,
  },
  paginationSection: {
    marginHorizontal: '45%',
    position: 'absolute',
    alignSelf: 'center',
    bottom: 10,
  },
  row: {marginTop: hp('2%'), flexDirection: 'row', paddingHorizontal: hp('3%')},
  inputSection: {
    // flex: 0.8,
    flex: 1,
    marginTop: hp('1%'),
  },
  textInput: {
    fontSize: hp('1.3%'),
    flex: 0.85,
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
  textInputView: {
    paddingHorizontal: hp('1%'),
    flexDirection: 'row',
    backgroundColor: 'white',
    height: hp('5%'),
    borderRadius: 8,
  },
});
