import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../constants/colors';
export default StyleSheet.create({
  modalMainConatiner: {
    height: '100%',

    justifyContent: 'flex-end',
  },

  whiteContainer: {
    backgroundColor: 'white',
    height: '60%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: hp('2%'),
  },
  addMemberSection: {
    alignItems: 'center',
    marginTop: hp('2%'),
  },
  addMemberText: {
    fontSize: hp('1.8%'),
    color: colors.app_theme_dark_green,
  },
  submitBtn: {
    // marginTop: hp('3%'),
    width: '46%',
  },
  buttonSection: {
    flexDirection: 'row',

    marginTop: hp('2%'),
    justifyContent: 'space-between',
  },
  headingSection: {
    padding: hp('2%'),
  },
  patientListSection: {
    height: '80%',
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
  heading: {color: colors.purplishGrey, fontSize: hp('1.8%')},
});
