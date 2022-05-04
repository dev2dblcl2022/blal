import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../constants/colors';
export default StyleSheet.create({
  bookingCard: {
    margin: hp('1%'),

    padding: hp('1%'),
    paddingVertical: hp('3%'),
    marginTop: hp('1%'),

    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    marginBottom: hp('2%'),
    borderRadius: 10,
    shadowOpacity: 0.1,
    shadowRadius: 2,

    elevation: 5,
  },
  bookingCardPartOne: {flexDirection: 'row'},
  bookingIdText: {
    color: colors.app_theme_dark_green,
    fontSize: hp('2.5%'),
  },
  bookingIdLabel: {
    color: colors.purplishGrey,
    fontSize: hp('2%'),
  },
  percentText: {
    color: colors.red,
    fontSize: hp('1.4%'),
    marginLeft: hp('0.5%'),
  },
  viewMoreText: {
    color: colors.app_theme_dark_green,
    fontSize: hp('2%'),
  },
  cancelBookingText: {
    color: colors.red,
    height: hp('4%'),
    borderRadius: 30,
    borderColor: colors.purplishGrey,
    borderWidth: 1,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnView: {
    borderRadius: 30,
    height: hp('4%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.app_theme_dark_green,
  },
  grayBtnView: {
    borderRadius: 30,
    height: hp('4%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gray,
  },
  btnViewText: {
    fontSize: hp('1.5%'),
    color: colors.white,
  },
  cardPartTwo: {
    flexDirection: 'row',
    marginTop: hp('3%'),
  },
  bookingDateText: {
    color: colors.app_theme_light_green,
    fontSize: hp('2.3%'),
  },
  bookingRateText: {
    color: colors.app_theme_dark_green,
    fontSize: hp('2.1%'),
  },
  booingDateText: {
    color: colors.app_theme_light_green,
  },
});
