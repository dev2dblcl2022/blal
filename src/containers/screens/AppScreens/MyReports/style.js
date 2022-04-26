import {StyleSheet} from 'react-native';
import {color} from 'react-native-reanimated';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../../constants/colors';
export default StyleSheet.create({
  safeAreaView: {
    flexGrow: 1,
  },
  fullSection: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: colors.app_theme_dark_green,
    alignItems: 'center',
    height: hp('8%'),
  },
  container_trasparent: {
    flexDirection: 'row',
    alignItems: 'center',
    height: hp('8%'),
    position: 'absolute',
    top: 50,
    left: 50,
  },
  backContainer_trasparent: {
    flex: 0.1,
    paddingLeft: hp('1%'),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 15,
    top: 15,
    zIndex: 999,
  },
  reportDetail: {
    flex: 0.6,
  },
  headerTitle: {
    fontSize: hp('2.1%'),
    fontFamily: 'Lato-Regular',

    color: colors.white,
  },
  backContainerFirst: {
    flex: 0.5,
    paddingLeft: hp('1%'),
    justifyContent: 'center',
    flexDirection: 'row',
  },
  backContainer: {
    flex: 0.2,
    flexDirection: 'row',
    paddingLeft: hp('1%'),
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  headerContainer: {flex: 1, alignItems: 'center'},
  trendAnalysisText: {
    color: colors.app_theme_dark_green,
    fontSize: hp('2%'),
  },
  headingSection: {marginTop: hp('2%')},
  headingSection1: {marginTop: hp('25%')},
  heading: {color: colors.black, fontSize: hp('1.5%')},
  dropDownView: {},
  dropDownContainer: {
    borderColor: colors.purplishGrey,
    borderWidth: 1,
  },
  dropDownSections: {
    flexDirection: 'row',
    marginTop: hp('2%'),
  },
  patientSection: {
    flex: 1,
    padding: hp('0.5%'),
  },
  timeSection: {
    flex: 1,
    padding: hp('0.5%'),
  },
  manualReportSection2: {
    flex: 1,

    padding: hp('0.5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  manualReportSection: {
    flex: 1,
    padding: hp('0.5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoSection: {
    flexGrow: 1,
    backgroundColor: colors.white,
    padding: hp('2%'),
  },
  manualText: {
    fontSize: hp('1.6%'),
    color: colors.app_theme_dark_green,
  },
  listSection: {
    flex: 1,
    paddingTop: hp('1%'),
  },
  reportListSection: {
    marginTop: hp('3%'),
  },
  reportCheckSection: {
    flex: 0.1,
  },
  bookingIdSection: {flexDirection: 'row', justifyContent: 'space-between'},
  itemContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    padding: hp('2%'),
    shadowOpacity: 0.1,
    shadowRadius: 2,
    margin: hp('1%'),
    elevation: 5,
  },
  itemTestContainer: {
    marginTop: hp('1%'),
    paddingVertical: hp('0.5%'),
    alignItems: 'center',
    flexDirection: 'row',
  },
  idText: {
    color: colors.app_theme_light_green,
    fontSize: hp('1.8%'),
  },
  labelText: {
    color: colors.purplishGrey,
    fontSize: hp('1.6%'),
    marginTop: hp('1%'),
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
  termsBox: {
    height: 15,
    width: 15,
    borderRadius: 5,

    backgroundColor: colors.app_theme_dark_green,
  },
  selectAllCheckContainer: {
    marginTop: hp('4%'),
    flexDirection: 'row',
  },
  checkTextContainer: {
    marginLeft: hp('1%'),
    flexDirection: 'row',
  },
  termsConditionText: {
    flexDirection: 'row',
    color: colors.purplishGrey,
  },
  reportBtnSection: {
    flex: 0.3,
  },
  reportButton: {
    backgroundColor: colors.app_theme_dark_green,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: hp('1%'),
    borderRadius: hp('2%'),
    paddingVertical: hp('1%'),
  },
  reportBtnText: {
    fontSize: hp('1.3%'),

    color: colors.white,
  },
  reportTitleText: {
    fontSize: hp('2%'),

    color: colors.purplishGrey,
  },
  reportIdText: {
    fontSize: hp('1.8%'),
    marginTop: hp('1%'),
    color: colors.purplishGrey,
  },
  reportLabel: {
    fontSize: hp('1.3%'),
    marginTop: hp('1%'),
    color: colors.purplishGrey,
  },
  downloadReportBtnSection: {
    marginTop: hp('2%'),
    flex: 1,
    alignItems: 'center',
  },
  downloadBtn: {
    paddingHorizontal: hp('1.5%'),
    paddingVertical: hp('1%'),
    borderRadius: hp('2%'),
    backgroundColor: colors.app_theme_dark_green,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    // width: hp('28%'),
  },
  downloadInvoiceText: {
    color: colors.white,
    fontSize: hp('1.8%'),
  },
  dateBirthContainer: {
    height: 50,
    flex: 1,
    justifyContent: 'center',
    marginTop: hp('2%'),
    borderWidth: 1,
    marginHorizontal: hp('1%'),
    flexDirection: 'row',
    padding: hp('1%'),
    borderColor: colors.gray,
    borderRadius: 10,
  },
  dateView: {flex: 0.8, justifyContent: 'center'},
  dateText: {color: colors.black, fontSize: hp('1.8%')},
  calendarView: {flex: 0.2, justifyContent: 'center', alignItems: 'flex-end'},
});
