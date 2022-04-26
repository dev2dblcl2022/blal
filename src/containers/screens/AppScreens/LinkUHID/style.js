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

    backgroundColor: 'white',
  },
  headingSection: {
    padding: hp('2%'),
  },
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
    left: 0,
    bottom: 0,
    backgroundColor: 'white',
    padding: hp('2%'),
    justifyContent: 'center',
  },
});
