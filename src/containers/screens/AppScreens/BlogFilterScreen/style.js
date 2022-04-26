import {StyleSheet} from 'react-native';
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
  mainContainer: {flex: 1},
  bottomContainer: {
    borderTopColor: 'rgba(0,0,0,0.10)',
    borderTopWidth: 2,
    flex: 0.1,
    alignItems: 'center',
    padding: hp('2%'),
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {width: '45%'},
  listItemSection: {flex: 0.7, padding: hp('3')},
  listLabelSection: {
    flex: 0.3,
    padding: hp('3'),
  },
  allListSection: {flex: 0.9, backgroundColor: 'white', flexDirection: 'row'},
  separator: {width: '0.5%', backgroundColor: 'rgba(0,0,0,0.10)'},
  listItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('3%'),
  },
  arrowImg: {
    height: hp('1.8%'),
    width: hp('1.5%'),
  },
  headingText: {
    color: colors.app_theme_dark_green,
    fontSize: hp('1.8%'),
  },
  tickImage: {
    height: hp('4%'),
    marginTop: 5,
    width: hp('4%'),
  },
  selectDateSection: {
    marginTop: hp('2%'),
    // backgroundColor: colors.app_theme_dark_green,
  },

  calendarView: {
    marginTop: hp('2%'),
    flexDirection: 'row',
    backgroundColor: colors.app_theme_dark_green,
    padding: hp('2%'),
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  dateText: {
    fontSize: hp('1.5%'),
    color: colors.white,
  },
  calendarIcon: {
    marginLeft: hp('0.5%'),
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
});
