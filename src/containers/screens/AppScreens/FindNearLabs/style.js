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
  content: {
    flexGrow: 1,
    backgroundColor: colors.white,
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
  heading: {color: colors.app_theme_dark_green, fontSize: hp('1.5%')},
  headingMain: {color: colors.purplishGrey, fontSize: hp('1.5%')},
  listSection: {
    flex: 1,
    padding: hp('1%'),
  },
  searchedItemOne: {
    flex: 0.9,
  },
  locationOff: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginVertical: hp('10%'),
  },
  innerPart: {marginTop: 30, padding: hp('2%')},
  allowText: {
    color: colors.app_theme_dark_green,
    fontSize: hp('2%'),
    marginTop: hp('2%'),
    alignSelf: 'center',
  },
  locationText: {
    color: colors.app_theme_light_green,
    fontSize: hp('2%'),
    textAlign: 'center',
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
    borderTopWidth: 1,
    padding: hp('2%'),
    borderBottomWidth: 1,
    borderColor: colors.gray,
  },
  dataSection: {flex: 1},
  btnSection: {flex: 0.1, justifyContent: 'center'},
});
