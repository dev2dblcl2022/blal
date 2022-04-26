import {Dimensions, StyleSheet} from 'react-native';
import {color} from 'react-native-reanimated';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../../constants/colors';
export default StyleSheet.create({
  safeArea: {
    flexGrow: 1,
  },
  scroll: {
    flex: 1,
  },
  fullContainer: {
    flex: 1,
    // padding: hp('2%'),
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  statusImage: {height: hp('55%'), width: hp('2.20%')},
  dataSection: {
    flex: 0.9,
  },
  bookingStatus: {
    paddingLeft: hp('4%'),
    flexDirection: 'row',
  },
  BookingCard: {
    paddingVertical: hp('1%'),
    padding: hp('2%'),
  },
  whiteSection: {
    paddingVertical: hp('5%'),
    backgroundColor: colors.white,
    padding: hp('1.5%'),
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  lottie: {
    width: hp('40%'),
    height: hp('10%'),
  },
  logoContainer: {},
  logo: {},
  animatedLoaderSection: {},
  textSection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  successText: {
    fontSize: hp('1.8%'),
    color: colors.app_theme_dark_green,
    fontWeight: 'bold',
    margin: hp('1%'),
  },
  dateTimeText: {
    fontSize: hp('1.8%'),
    lineHeight: 22,
    color: colors.purplishGrey,
    marginLeft: 30,
    marginRight: 30,
    textAlign: 'center',
  },
  bookingCard: {
    margin: hp('1%'),
    paddingHorizontal: hp('2%'),

    paddingVertical: hp('3%'),
    marginTop: hp('1%'),

    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    marginBottom: hp('2%'),
    borderRadius: 10,
    shadowOpacity: 0.1,
    shadowRadius: 2,

    elevation: 5,
  },
  pickupAddress: {
    paddingHorizontal: hp('3%'),
    marginTop: hp('2%'),

    paddingVertical: hp('1%'),
  },
  uploadBookingCard: {
    paddingHorizontal: hp('2%'),
    paddingTop: hp('2%'),
    // paddingVertical: hp('3%'),

    backgroundColor: 'white',
  },
  bookingCardPartOne: {flexDirection: 'row'},
  bookingIdText: {
    color: colors.app_theme_dark_green,
    fontSize: hp('2.5%'),
  },
  bookingIdLabel: {
    color: colors.purplishGrey,
    fontSize: hp('1.8%'),
    textDecorationLine: 'underline',
  },
  uploadedFile: {
    color: colors.app_theme_dark_green,
    fontSize: hp('1.6%'),
    textDecorationLine: 'underline',
  },
  addNameText: {
    color: colors.app_theme_dark_green,
    fontSize: hp('1.6%'),
  },
  addressText: {
    color: colors.purplishGrey,
    fontSize: hp('1.6%'),
    marginTop: hp('1%'),
  },
  percentText: {
    color: colors.red,
    fontSize: hp('1.4%'),
    marginLeft: hp('0.5%'),
  },
  viewMoreText: {
    color: colors.app_theme_dark_green,
    fontSize: hp('2%'),
  },
  cancelBookingText: {
    color: colors.red,
    fontSize: hp('2%'),
  },
  btnView: {
    borderRadius: 30,
    height: hp('4%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.app_theme_dark_green,
  },
  btnViewText: {
    fontSize: hp('1.5%'),
    color: colors.white,
  },
  cardPartTwo: {
    flexDirection: 'row',
    marginTop: hp('3%'),
  },
  bookingDateText: {
    color: colors.app_theme_light_green,
    fontSize: hp('2.3%'),
  },
  bookingRateText: {
    color: colors.app_theme_dark_green,
    fontSize: hp('2.1%'),
  },
  booingDateText: {
    fontSize: hp('1.8%'),
    color: colors.app_theme_light_green,
  },
  itemContainer: {
    backgroundColor: colors.app_theme_light_green,

    marginTop: hp('3%'),

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderRadius: 8,
    shadowOpacity: 0.1,
    shadowRadius: 2,

    elevation: 5,
  },
  tickImage: {
    marginTop: 5,
  },
  addressTextView: {width: hp('15%')},
  itemContainerInner: {
    backgroundColor: 'white',
    // height: hp('18%'),
    flexDirection: 'row',
    padding: hp('1%'),
    marginTop: hp('0.4%'),

    borderColor: colors.app_theme_dark_green,
    borderStyle: 'dotted',
    borderWidth: 1,
    borderRadius: 5,
  },
  profilePicSection: {
    flex: 0.2,

    justifyContent: 'space-between',
  },
  profilePicView: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.1,
    shadowRadius: 2,
    backgroundColor: 'white',
    elevation: 12,
  },
  addressTypeText: {
    fontSize: hp('1.3%'),
  },
  pickupAddLabel: {
    color: colors.app_theme_dark_green,
    fontSize: hp('2.3%'),
  },
  paymentHeadingSection: {
    justifyContent: 'center',
    marginTop: hp('3%'),
  },
  textInputSection: {
    marginTop: hp('2%'),
    flexDirection: 'row',

    marginLeft: hp('0.5%'),
  },
  headCoupon: {},
  headCouponText: {
    color: colors.app_theme_dark_green,
  },
  viewOfferText: {},
  inputSection: {
    flex: 0.8,
  },
  textInputView: {
    paddingHorizontal: hp('1%'),
    flexDirection: 'row',
    backgroundColor: 'white',
    height: hp('5%'),
    flex: 0.8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    marginRight: hp('0.5%'),
    shadowOpacity: 0.1,
    shadowRadius: 2,

    elevation: 12,
  },
  applyBtnSection: {
    flex: 0.2,
  },
  applyText: {
    fontSize: hp('1.5%'),
    color: colors.white,
  },
  applyBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginLeft: hp('0.5%'),
    backgroundColor: colors.app_theme_dark_green,
  },
  testPriceSection: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: hp('2%'),
  },
  testPrice: {
    fontSize: hp('1.5%'),
    color: colors.purplishGrey,
  },
  rateText: {
    fontSize: hp('1.5%'),
    color: colors.purplishGrey,
  },
  paymentRatesSection: {
    marginTop: hp('2%'),
  },
  totalPayableSection: {
    marginTop: hp('2%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  payableText: {
    fontSize: hp('1.6%'),
    color: colors.app_theme_light_green,
  },
  paymentDetailText: {
    fontSize: hp('2%'),
    color: colors.app_theme_dark_green,
  },
  paidText: {
    fontSize: hp('2%'),
    color: colors.app_theme_dark_green,
  },
  amountSection: {
    margin: hp('1%'),

    paddingHorizontal: hp('2%'),
    // backgroundColor: 'green',
  },
  downloadBtnView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadInvoiceBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: hp('1.5%'),
    paddingVertical: hp('1%'),
    backgroundColor: colors.app_theme_light_green,
    borderRadius: 10,
  },
  downloadText: {
    fontSize: hp('2.56%'),
    fontWeight: 'bold',
  },
  downloadIcon: {
    marginLeft: hp('1%'),
  },
  separator: {
    height: 5,
    marginTop: hp('2%'),

    backgroundColor: colors.gray,
  },
  cancelBookingBtn: {
    // marginTop: hp('1%'),
    padding: hp('2%'),
  },
  collectionDoneText: {
    fontSize: hp('1.8%'),
    textAlign: 'center',
    color: colors.purplishGrey,
  },
  reportApprovedText: {
    fontSize: hp('1.8%'),
    textAlign: 'center',
    color: colors.purplishGrey,
  },
  proAssignText: {
    fontSize: hp('1.8%'),
    textAlign: 'center',
    color: colors.purplishGrey,
  },
  bookingConfirmedText: {
    fontSize: hp('1.8%'),
    textAlign: 'center',
    color: colors.purplishGrey,
  },
  bookingStatusSection: {
    height: hp('53%'),
    width: '100%',
    marginLeft: hp('2%'),
  },

  section1: {
    flex: 1,

    alignItems: 'flex-start',
  },
  section2: {
    flex: 1,
    paddingTop: hp('1.5%'),

    // justifyContent: 'center',

    alignItems: 'flex-start',
  },
  section3: {
    flex: 1,
    // paddingTop: hp('3%'),

    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  section4: {
    flex: 1,
    // paddingTop: hp('5%'),

    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  section5: {
    flex: 1,

    // paddingTop: hp('3%'),
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  section6: {
    flex: 1,

    paddingTop: hp('2%'),
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  emptyView: {
    width: 20,
    height: 20,
  },
  lineView: {
    height: hp('8%'),
    width: hp('2%'),
    alignItems: 'center',
  },
  line: {
    height: hp('8%'),
    width: 1,
    borderColor: colors.app_theme_dark_green,
    borderStyle: 'dashed',
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: colors.white,
  },
  view1: {
    flex: 1,
    height: hp('5%'),

    alignItems: 'flex-start',
  },
  view2: {
    flex: 1,
    height: hp('5%'),
    paddingTop: hp('3%'),

    alignItems: 'flex-start',
  },
  view3: {
    flex: 1,
    height: hp('5%'),

    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  statusText2: {
    marginLeft: 10,
  },
});
