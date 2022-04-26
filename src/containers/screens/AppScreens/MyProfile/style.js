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
  scrollView: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  placeHolderImage: {
    height: hp('10%'),
    width: hp('10%'),
    borderRadius: hp('5%'),
  },
  profileImage: {
    height: hp('13%'),
    width: hp('13%'),
    borderRadius: hp('6.5%'),
  },
  termsBox: {
    height: 15,
    width: 15,
    borderRadius: 5,

    backgroundColor: colors.app_theme_dark_green,
  },
  content: {
    flexGrow: 1,
  },
  profilePicContainer: {
    padding: hp('3%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  noteSection: {
    paddingVertical: hp('1.5%'),
    paddingHorizontal: hp('2%'),
    marginHorizontal: hp('3%'),
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'rgb(230,238,233)',
    // alignItems: 'center',
  },
  notesTextTwo: {
    fontSize: hp('1.5%'),
    color: colors.app_theme_dark_green,
  },
  noteText: {
    fontSize: hp('1.5%'),
    color: colors.app_theme_dark_green,
  },
  inputFieldsContainer: {
    paddingHorizontal: hp('3%'),
    paddingBottom: hp('3%'),
  },
  profileView: {
    height: hp('15%'),
    width: hp('15%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hp('7.5%'),
    borderColor: colors.gray,
    borderWidth: 1,
    backgroundColor: colors.white,
  },
  addProfile: {
    height: hp('3.6%'),
    justifyContent: 'center',
    alignItems: 'center',
    width: hp('3.6%'),
    position: 'absolute',
    bottom: 10,
    alignSelf: 'flex-end',
    borderRadius: hp('2%'),
    backgroundColor: colors.app_theme_dark_green,
  },
  addProfileTextView: {
    marginTop: hp('1%'),
  },
  addProfileText: {
    fontSize: hp('1.8%'),
    color: colors.app_theme_light_green,
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    paddingHorizontal: hp('1%'),
    borderColor: colors.gray,
    borderRadius: 10,
  },
  placeholderText: {
    color: colors.purplishGrey,
  },
  mobileNumberInput: {
    marginTop: hp('2%'),
  },
  dateBirthContainer: {
    height: 50,
    justifyContent: 'center',
    marginTop: hp('2%'),
    borderWidth: 1,
    flexDirection: 'row',
    padding: hp('1%'),
    borderColor: colors.gray,
    borderRadius: 10,
  },
  dateView: {flex: 0.8, justifyContent: 'center'},
  calendarView: {flex: 0.2, justifyContent: 'center', alignItems: 'flex-end'},
  dateText: {color: colors.purplishGrey, fontSize: hp('1.8%')},
  calendarImage: {
    height: 20,
    width: 20,
  },
  dropDownView: {
    marginTop: 20,
  },
  dropDownContainer: {
    borderColor: colors.gray,
  },
  radioContent: {flexDirection: 'row', marginTop: hp('2%')},
  radioView: {
    height: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colors.gray,
  },
  radioGroup: {flexDirection: 'row', alignItems: 'center'},
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
  genderText: {
    marginTop: hp('1.5%'),
    fontSize: hp('1.5%'),
  },
  radioButtonSection: {},
  termsCheckContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('2%'),
  },
  bySigningText: {
    color: colors.purplishGrey,
    fontSize: hp('1.4%'),
  },
  termsConditionText: {
    color: colors.app_theme_dark_green,
    fontSize: hp('1.4%'),
  },
  checkTextContainer: {
    marginLeft: hp('1%'),
    flexDirection: 'row',
  },
  checkBox: {
    height: 20,
    width: 23,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.gray,
  },
  checkContainer: {},
  submitBtn: {
    marginTop: hp('3%'),
  },
  enterAsGuest: {
    marginTop: hp('2%'),
    flexDirection: 'row',
    paddingBottom: hp('2%'),
  },
});
