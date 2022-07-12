import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../constants/colors';
export default StyleSheet.create({
  cardBoxRow: {
    margin: hp('1%'),
    // position: 'relative',
    // bottom: hp('15%'),
    borderColor: colors.app_theme_dark_green,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: hp('1%'),
    zIndex: 999,
  },
  labTitle: {flex: 0.2},

  dataSection: {
    flex: 0.6,

    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },

  labTitleText: {fontSize: hp('2%'), color: colors.app_theme_dark_green},

  addressText: {
    fontSize: hp('1.3%'),

    color: colors.purplishGrey,
  },
  kmText: {
    fontSize: hp('1.3%'),
    flex: 0.3,
    textAlign: 'right',
    color: colors.bean_red,
  },

  callDirectionBox: {
    marginTop: hp('1%'),
    flexDirection: 'row',
  },

  btnSection: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    marginRight: 15,
    alignItems: 'flex-end',
  },

  btnView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
  ageText: {
    fontSize: hp('1.5%'),
    marginTop: hp('0.5%'),
    color: colors.purplishGrey,
  },
  relationSection: {
    flex: 0.2,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  relationText: {
    fontSize: hp('1.5%'),
    marginTop: hp('0.5%'),
    color: colors.app_theme_light_green,
  },
  btnText: {
    fontSize: hp('1.3%'),
    color: colors.purplishGrey,
  },

  selectDateSection: {
    padding: hp('1%'),
  },
  listHeading: {},
  headingText: {
    color: colors.app_theme_dark_green,
    fontSize: hp('1.8%'),
  },
  calendarView: {
    marginTop: hp('2%'),
    flexDirection: 'row',
  },
  dateText: {
    fontSize: hp('1.5%'),
  },
  calendarIcon: {
    marginLeft: hp('0.5%'),
  },

  specialInstructionSection: {
    padding: hp('1%'),
  },

  selfNameText: {
    color: colors.app_theme_dark_green,
    fontSize: hp('1.8%'),
  },
  instructionList: {
    marginTop: hp('1.5%'),
  },

  submitBtn: {
    width: '100%',
  },
});
