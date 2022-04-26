import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../../constants/colors';
export default StyleSheet.create({
  safeArea: {
    flexGrow: 1,
  },
  mainContainer: {
    flex: 1,

    backgroundColor: 'white',
  },
  selfSection: {
    padding: hp('2%'),
  },
  parentSection: {
    padding: hp('2%'),
  },
  youCanAddSection: {
    padding: hp('2%'),
  },

  btnSection: {
    flex: 0.08,
    borderTopWidth: 1,
    borderTopColor: colors.gray,
    alignItems: 'flex-end',
    padding: hp('2%'),
    flexDirection: 'row',

    justifyContent: 'space-between',
  },
  submitBtn: {
    width: '100%',
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerNameSection: {},
  separator: {
    height: 1,
    marginTop: hp('1%'),

    backgroundColor: colors.gray,
  },
  listSeparator: {
    alignSelf: 'center',
    height: 1,
    width: '95%',
    marginTop: hp('1%'),

    backgroundColor: colors.gray,
  },
  selfNameText: {
    color: colors.app_theme_dark_green,
    fontSize: hp('1.8%'),
  },
  ageText: {
    marginTop: hp('0.5%'),
    color: colors.purplishGrey,
    fontSize: hp('1.3%'),
  },
  selfText: {
    color: colors.app_theme_dark_green,
    fontSize: hp('1.5%'),
  },
  sectionSeparator: {
    height: hp('0.5%'),
    backgroundColor: colors.sectionSeparatorColor,
  },
  listHeading: {},
  headingText: {
    color: colors.app_theme_dark_green,
    fontSize: hp('1.8%'),
  },
  alsoAddListSection: {
    marginTop: hp('1%'),
  },
  specialInstructionSection: {
    padding: hp('2%'),
  },
  instructionList: {
    marginTop: hp('1.5%'),
  },

  radioContent: {flexDirection: 'row', marginTop: hp('2%')},
  radioView: {
    height: 16,
    width: 16,
    borderColor: colors.app_theme_dark_green,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: colors.white,
  },
  radioGroup: {flexDirection: 'row', flex: 0.5, alignItems: 'center'},
  radioInnerView: {
    height: 10,
    width: 10,

    borderRadius: 5,
    backgroundColor: colors.app_theme_dark_green,
  },
  female: {
    fontSize: hp('1.5%'),
    marginLeft: hp('1%'),
  },
  paymentModeText: {
    fontSize: hp('1%'),
    marginLeft: hp('1%'),
  },
  genderText: {
    marginTop: hp('1.5%'),
    fontSize: hp('1.5%'),
  },
  radioButtonSection: {},
  paymentSection: {
    padding: hp('2%'),
  },
  couponCodeSection: {},
  couponHeadingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    height: hp('4%'),
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
    marginTop: hp('1%'),
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
  },
  payableText: {
    fontSize: hp('1.6%'),
    color: colors.app_theme_light_green,
  },
});
