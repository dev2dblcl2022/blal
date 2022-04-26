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
  selfCard: {
    paddingHorizontal: hp('2%'),
  },
  mainContainer: {
    flex: 1,
    paddingVertical: hp('2%'),
    backgroundColor: 'white',
  },
  headingSection: {},
  heading: {color: colors.purplishGrey, fontSize: hp('1.5%')},
  listSection: {
    // flex: 0.8,
    // backgroundColor: 'red',
    marginLeft: hp('3%'),
    paddingTop: hp('1%'),
  },
  listSectionTwo: {
    // backgroundColor: 'green',

    paddingBottom: hp('8%'),
    paddingHorizontal: hp('1%'),
    width: '100%',
    alignSelf: 'flex-end',
  },
  dataSection: {flex: 1},
  btnSection: {
    position: 'absolute',
    right: 0,
    height: '12%',
    left: 0,
    bottom: 0,
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: hp('2%'),
    paddingVertical: hp('1%'),
    // justifyContent: 'space-evenly',
  },
  addMemberSection: {alignItems: 'center'},
  addMemberText: {
    fontSize: hp('1.8%'),
    color: colors.app_theme_dark_green,
  },
});
