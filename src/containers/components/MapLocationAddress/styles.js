import {StyleSheet} from 'react-native';
import colors from '../../../constants/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default StyleSheet.create({
  modalContainer: {
    backgroundColor: '#fff',
    height: hp('50%'),
    width: '100%',

    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
  },

  circleContainer: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: colors.purplishGrey,
  },
  currentLocationSection: {
    flex: 1,
    height: 50,

    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
  },
  textSection: {},
  doneText: {
    fontSize: hp('2.2%'),
    color: colors.app_theme_dark_green,
    fontWeight: 'bold',
    textAlign: 'right',
    marginRight: 25,
    marginTop: 15,
  },

  sectionSeparator: {
    height: hp('0.5%'),
    backgroundColor: colors.sectionSeparatorColor,
  },
  youCanAddSection: {
    padding: hp('2%'),
    height: 260,
  },
  listHeading: {flexDirection: 'row'},
  headingText: {
    color: colors.app_theme_dark_green,
    fontSize: hp('1.8%'),
  },

  alsoAddListSection: {
    marginTop: hp('1%'),
  },
  addAddress: {
    color: colors.app_theme_dark_green,
    fontSize: hp('1.8%'),
    position: 'absolute',
    right: 15,
    top: 2,
  },
  btnSection: {
    flex: 0.2,
    justifyContent: 'space-evenly',
    bottom: 15,
  },
  addMemberSection: {alignItems: 'center'},
  addMemberText: {
    fontSize: hp('1.8%'),
    color: colors.app_theme_dark_green,
  },
  gpsLocSection: {
    color: colors.purplishGrey,
    fontSize: hp('2'),
    marginLeft: 15,
  },
  gpsLocSubSection: {
    color: colors.purplishGrey,
    fontSize: hp('1.4'),
    marginLeft: 45,
    marginTop: -10,
  },
});
