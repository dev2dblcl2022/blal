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

    backgroundColor: 'white',
  },
  logoSection: {
    flex: 0.65,

    justifyContent: 'center',
    alignItems: 'center',
  },
  inputSection: {
    flex: 0.35,
    justifyContent: 'center',

    padding: hp('2%'),
    backgroundColor: 'white',
  },
  logoImg: {height: hp('18%'), width: hp('21%')},
  headingOne: {
    color: colors.purplishGrey,
    fontSize: hp('2.3%'),
  },
  headingTwo: {
    color: colors.purplishGrey,
    fontSize: hp('1.5%'),
    marginTop: hp('1.5%'),
  },
  mobileNumberInput: {
    marginTop: hp('1.5%'),
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    paddingHorizontal: hp('1%'),
    borderColor: colors.gray,
    borderRadius: 10,
  },
  submitBtn: {
    marginTop: hp('2%'),
  },
  enterGuestSection: {
    flexDirection: 'row',
    marginTop: hp('2%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  enterGuestInnerSection: {
    flexDirection: 'row',

    justifyContent: 'center',
    alignItems: 'center',
  },
  enterAsText: {
    color: colors.purplishGrey,
    textDecorationLine: 'underline',
    fontSize: hp('1.4%'),
  },
  guestText: {
    color: colors.purplishGrey,
    textDecorationLine: 'underline',
    fontSize: hp('1.4%'),
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('3%'),
  },
  bySigningText: {
    color: colors.purplishGrey,

    fontSize: hp('1.4%'),
  },
  termsConditionText: {
    color: colors.app_theme_dark_green,

    fontSize: hp('1.4%'),
  },
  footerTermsSection: {
    marginTop: hp('0.5%'),
    flexDirection: 'row',
  },
});
