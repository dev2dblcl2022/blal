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
  selectDateSection: {
    padding: hp('2%'),
  },
  calendarView: {
    marginTop: hp('2%'),
    flexDirection: 'row',
  },
  dateText: {
    fontSize: hp('1.5%'),
  },
  calendarIcon: {
    marginLeft: hp('0.5%'),
  },
});
