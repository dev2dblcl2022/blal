import {Platform, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../constants/colors';
import {DEV_HEIGHT, DEV_WIDTH, IS_IOS} from '../Device/DeviceDetails';
export default StyleSheet.create({
  safeArea: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
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
    ...StyleSheet.absoluteFillObject,
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
});
