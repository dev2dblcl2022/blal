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
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerNameSection: {
    marginTop: hp('0.5%'),
  },

  bookingHeading: {
    color: colors.app_theme_dark_green,
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },
  sampleType: {
    marginTop: hp('1%'),
    color: colors.purplishGrey,
    fontSize: hp('2%'),
  },
  sampleSection: {
    flexDirection: 'row',
    marginLeft: hp('0.5%'),
    marginTop: hp('1%'),
  },
  selectTypeHeading: {
    color: colors.app_theme_dark_green,
    fontSize: hp('2%'),
    marginTop: hp('2%'),
  },
  sampleDescription: {
    color: colors.purplishGrey,
    fontSize: hp('1.5%'),
  },
  typeUnSelect: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#125A2D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeSelect: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#125A2D',
  },
  profilePicView: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  profilePic: {height: 20, width: 20},
  LabListingSection: {
    marginTop: hp('2%'),
    marginRight: hp('2%'),
    marginLeft: hp('0.5%'),
  },
  amountRightSection: {
    flex: 0.4,
    alignItems: 'flex-end',
  },
  testNameText: {
    fontSize: hp('3%'),
    color: colors.app_theme_dark_green,
    fontWeight: 'bold',
  },
  offSection: {flexDirection: 'row', marginTop: hp('0.5%')},
  amountTextTwo: {
    fontSize: hp('1.2%'),
    color: colors.purplishGrey,
    textDecorationLine: 'line-through',
  },
  percentText: {
    color: colors.bean_red,
    fontSize: hp('1.2%'),
    marginLeft: hp('0.5%'),
  },

  dataSection: {
    flex: 1,
    marginBottom: hp('10%'),
  },
  searchingListSection: {
    flex: 1,
    paddingTop: hp('1%'),
  },
  labSelectNearBy: {
    marginTop: hp('0.5%'),
    color: colors.purplishGrey,
    fontSize: hp('1.5%'),
  },
  submitBtn: {
    width: '98%',
    margin: hp('0.5%'),
  },
  youCanAddSection: {
    // padding: hp('1%'),

    height: hp('25%'),
  },
  listHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headingText: {
    color: colors.app_theme_dark_green,
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },

  alsoAddListSection: {
    marginTop: hp('1%'),
  },
  addAddress: {
    color: colors.white,
    fontSize: hp('1.8%'),
    // position: 'absolute',
    // right: 15,
    // top: 2,
  },
  homeSection: {
    marginTop: hp('2%'),
  },
  selectDateSection: {
    marginTop: hp('2%'),
  },

  calendarView: {
    marginTop: hp('2%'),
    flexDirection: 'row',
  },
  dateText: {
    fontSize: hp('1.8%'),
  },
  calendarIcon: {
    marginLeft: hp('1%'),
  },

  specialInstructionSection: {
    marginTop: hp('2%'),
  },

  selfNameText: {
    color: colors.app_theme_dark_green,
    fontSize: hp('1.8%'),
  },
  instructionList: {
    marginTop: hp('1.5%'),
  },
  tabBar: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  tabItem: {
    paddingRight: wp('5.3%'),
  },
  bar: {
    width: wp(2),
    height: wp(2),
    backgroundColor: colors.app_theme_dark_green,
    borderRadius: wp(1),
    alignSelf: 'center',
  },
  tabsContainer: {
    backgroundColor: colors.white,
    flex: 1,
  },

  // Styles for Search input Labs

  textInputView: {
    paddingHorizontal: hp('1%'),
    marginHorizontal: hp('1%'),
    flexDirection: 'row',
    backgroundColor: colors.gray,
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
    fontSize: hp('1.8%'),
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
  //
});
