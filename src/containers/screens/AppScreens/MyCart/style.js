import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../../constants/colors';
export default StyleSheet.create({
  safeArea: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  mainContainer: {
    flexGrow: 0.7,
    backgroundColor: 'white',
  },
  content: {
    flexGrow: 1,
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
    borderTopWidth: 1,
    borderTopColor: colors.gray,
    alignItems: 'center',
    padding: hp('2%'),
    flexDirection: 'row',

    justifyContent: 'space-between',
  },
  submitBtn: {
    width: '48%',
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
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  emptyImage: {height: hp('50%'), width: '85%'},
  container: {
    flexDirection: 'row',
    backgroundColor: colors.app_theme_dark_green,
    alignItems: 'center',
    height: hp('8%'),
    paddingHorizontal: hp('1%'),
  },
  headerTitle: {
    fontSize: hp('2.1%'),
    fontFamily: 'Lato-Regular',

    color: colors.white,
  },
  backContainer: {
    flex: 0.2,
    paddingLeft: hp('1%'),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerContainer: {flex: 0.6, paddingLeft: hp('1%'), alignItems: 'center'},
});
