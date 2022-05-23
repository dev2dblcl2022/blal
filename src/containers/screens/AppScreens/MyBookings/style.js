import {Platform, StyleSheet} from 'react-native';
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
    marginHorizontal: hp('1%'),
    flex: 1,
  },
  dataSection: {flex: 1},
  btnSection: {
    position: 'absolute',
    right: 0,
    height: '12%',
    left: 0,
    bottom: 0,
    justifyContent: 'space-between',
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
  emptyView: {
    paddingTop: hp('20%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: colors.app_theme_dark_green,
    fontSize: hp('2.5%'),
    textAlign: 'center',
  },
  dropDownSections: {
    flexDirection: 'row',
    // marginTop: hp('3%'),
    paddingHorizontal: hp('1.4%'),
    paddingVertical: hp('1%'),
  },
  patientSection: {
    flex: 1,
    padding: hp('0.5%'),
  },
  timeSection: {
    flex: 1,
    padding: hp('0.5%'),
  },
  dropDown: {
    borderRadius: 0,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    marginBottom: hp('2%'),

    shadowOpacity: 0.1,
    shadowRadius: 2,

    elevation: 5,
    fontSize: hp('1%'),
    borderColor: colors.gray,
  },
  dropDownContainer: {
    borderRadius: 0,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    marginBottom: hp('2%'),
    borderWidth: 1,
    shadowOpacity: 0.1,
    shadowRadius: 2,
    zIndex: 99999,
    elevation: 5,
    borderColor: colors.purplishGrey,
  },
});
