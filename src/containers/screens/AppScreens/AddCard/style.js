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
    paddingBottom: hp('2'),
    backgroundColor: colors.white,
  },
  emailText: {
    fontSize: hp('1.3%'),
    marginTop: hp('0.5%'),
    color: colors.purplishGrey,
  },
  headingSection: {
    padding: hp('3%'),
  },
  heading: {color: colors.purplishGrey, fontSize: hp('1.5%')},
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
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
  inputFieldsContainer: {
    paddingHorizontal: hp('3%'),
    paddingBottom: hp('2%'),
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
    fontSize: hp('1.3%'),
    color: colors.purplishGrey,
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
  dateText: {color: colors.black, fontSize: hp('1.8%')},
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
  validitySection: {
    marginTop: hp('2%'),
    backgroundColor: colors.white,
    paddingVertical: hp('1.5%'),
    paddingHorizontal: hp('1.5%'),
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },

    alignItems: 'center',
    shadowOpacity: 0.1,
    shadowRadius: 2,

    elevation: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addMemberSection: {alignItems: 'center', marginTop: hp('2%')},
  addMemberText: {
    fontSize: hp('1.8%'),
    color: colors.app_theme_dark_green,
  },

  submitBtn: {
    marginTop: hp('3%'),
  },
  enterAsGuest: {
    marginTop: hp('2%'),
    flexDirection: 'row',
    paddingBottom: hp('2%'),
  },
  validityValText: {
    fontSize: hp('1.6%'),
    color: colors.purplishGrey,
  },
  validityText: {
    fontSize: hp('1.8%'),
    color: colors.app_theme_dark_green,
  },
  fullBodyCheckupSection: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderRadius: 10,
    shadowOpacity: 0.1,
    shadowRadius: 2,

    elevation: 12,
    marginTop: hp('2%'),

    backgroundColor: colors.white,
  },
  sectionOne: {
    padding: hp('1%'),
  },
  headingCollection: {
    flexDirection: 'row',
  },
  sampleText: {
    fontSize: hp('1.5%'),
    color: colors.app_theme_dark_green,
  },
  accordionSection: {
    // marginTop: hp('1%'),
  },
  accordionTitleText: {color: colors.purplishGrey, fontSize: hp('1.5%')},
  headingTestSection: {
    flexDirection: 'row',
  },
  headContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,

    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp('1%'),
    paddingHorizontal: hp('1%'),
    // backgroundColor: colors.white,
  },
  headContainerLast: {
    flexDirection: 'row',
    padding: 10,

    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp('1%'),
    paddingHorizontal: hp('1%'),
    // backgroundColor: colors.white,
  },
});
