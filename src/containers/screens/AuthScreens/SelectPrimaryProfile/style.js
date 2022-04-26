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
    padding: hp('2%'),
    backgroundColor: 'white',
  },
  headingSection: {},
  heading: {color: colors.purplishGrey, fontSize: hp('1.5%')},
  listSection: {
    flex: 0.9,
    paddingTop: hp('1%'),
  },
  dataSection: {flex: 1},
  btnSection: {flex: 0.1, justifyContent: 'center'},
});
