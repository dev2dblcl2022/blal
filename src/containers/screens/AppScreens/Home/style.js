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
  trackingView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignContent: 'center',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: hp(7),
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
  },
  textContainer: {
    justifyContent: 'center',
    marginLeft: 10,
  },
  trackBookingText: {
    right: 5,
    fontSize: wp(3.5),
    fontWeight: '600',
    color: colors.app_theme_light_green,
    alignSelf: 'center',
  },
  bookingIdStyle: {
    fontSize: wp(3.2),
    fontWeight: '400',
    color: 'black',
  },
  bookingDateStyle: {
    fontSize: wp(3.2),
    fontWeight: '400',
    top: 2,
    color: colors.app_theme_dark_green,
  },
  trackingImageStyle: {
    width: wp(20),
    height: hp(7),
  },
});
