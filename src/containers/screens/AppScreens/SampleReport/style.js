import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../../constants/colors';
export default StyleSheet.create({
  safeArea: {
    flexGrow: 1,
    backgroundColor: colors.white,
  },
  dropDownContainer: {
    color: colors.purplishGrey,
    borderWidth: 1,
  },
  mainContainer: {
    flexGrow: 1,
    padding: hp('2%'),
    backgroundColor: colors.white,
  },
  listItemContainer: {
    // margin: hp('0.5%'),

    alignItems: 'center',
  },
  chart: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    margin: wp(2),
  },
  headingSection: {marginTop: hp('2%')},
  heading: {color: colors.purplishGrey, fontSize: hp('1.5%')},
  itemCircle: {
    // backgroundColor: colors.app_theme_dark_green,
    height: hp('7%'),
    justifyContent: 'center',
    marginLeft: hp('2%'),
    alignItems: 'center',
    marginRight: 20,
    width: hp('7%'),
    borderRadius: hp('3.5%'),
  },
  nameText: {
    fontSize: hp('3%'),
    color: colors.white,
  },
  membersName: {
    fontSize: hp('2%'),
    marginTop: hp('1%'),
    color: colors.purplishGrey,
  },
  line: {
    marginTop: hp('1%'),
    width: hp('8%'),
    height: hp('0.6%'),
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,

    backgroundColor: '#4B6EAA',
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
  chartNameSection: {
    marginTop: hp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  testText: {
    fontSize: hp('3%'),

    color: colors.app_theme_dark_green,
  },
  testDate: {
    fontSize: hp('2%'),
    marginTop: hp('2.5%'),
    color: colors.purplishGrey,
  },
  chartSection: {flex: 1, paddingVertical: hp('4%')},
  dateBirthContainer: {
    height: 50,
    flex: 1,
    justifyContent: 'center',

    borderWidth: 1,

    flexDirection: 'row',
    padding: hp('1%'),
    borderColor: colors.gray,
    borderRadius: 10,
  },
  dateView: {flex: 1, justifyContent: 'center'},
  dateText: {color: colors.black, fontSize: hp('1.8%')},
  calendarView: {flex: 0.2, justifyContent: 'center', alignItems: 'flex-end'},
});
