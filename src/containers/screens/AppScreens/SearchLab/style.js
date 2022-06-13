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
  loaderArea: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: hp('5%'),
    paddingBottom: hp('5%'),
    fontWeight: 'bold',
  },
  content: {
    flexGrow: 1,
    backgroundColor: colors.white,
  },
  emptyView: {
    paddingTop: hp('10%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: colors.app_theme_dark_green,
    fontSize: hp('2.5%'),
    textAlign: 'center',
  },
  mainContainerSearching: {
    flex: 1,
    padding: hp('2%'),
    backgroundColor: colors.white,
  },
  mainContainerSearched: {
    flex: 1,

    backgroundColor: colors.white,
  },
  searchedView: {
    flex: 1,
  },
  topTest: {
    flex: 1,
  },
  headingSection: {paddingLeft: hp('2%'), paddingTop: hp('2%')},
  heading: {
    color: colors.app_theme_dark_green,
    fontSize: hp('2.3%'),
    fontWeight: 'bold',
  },
  headingMain: {color: colors.purplishGrey, fontSize: hp('1.5%')},
  listSection: {
    flex: 0.9,
    paddingTop: hp('2%'),
  },
  searchingListSection: {
    flex: 1,
    paddingTop: hp('3%'),
  },
  searchedItemOne: {
    flex: 0.9,
  },
  searchedTestText: {
    color: colors.purplishGrey,
    fontSize: hp('1.5%'),
  },
  searchedItemTwo: {
    flex: 0.1,
    alignItems: 'flex-end',
  },
  searchedItemSection: {
    flexDirection: 'row',
    borderTopWidth: 0.8,
    padding: hp('1%'),
    alignItems: 'center',
    borderBottomWidth: 0.8,
    borderColor: colors.gray,
  },
  dataSection: {flex: 1, padding: hp('1%')},
  btnSection: {flex: 0.1, justifyContent: 'center'},
});
