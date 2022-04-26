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
    padding: 15,
  },
  content: {
    flex: 1,
    padding: hp('2%'),
  },

  mapStyle: {
    marginRight: 5,
    marginTop: 5,
    height: hp('50%'),
  },
  radioBoxSection: {
    flexDirection: 'row',
    marginTop: hp('1%'),
  },
  typeUnSelect: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#125A2D',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  typeSelect: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#125A2D',
  },
  imgboxView: {
    height: 20,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  imgIcon: {height: 15, width: 15},

  headingSection: {},
  heading: {color: colors.purplishGrey, fontSize: hp('1.5%')},

  inputFieldsContainer: {
    marginTop: hp('2%'),
  },

  typeTxt: {
    color: colors.app_theme_dark_green,
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    paddingHorizontal: hp('1%'),
    borderColor: colors.gray,
    borderRadius: 5,
  },
  placeholderText: {
    color: colors.purplishGrey,
  },
  marginTopInput: {
    marginTop: hp('2%'),
  },

  dropDownView: {
    marginTop: 20,
  },
  dropDownContainer: {
    borderColor: colors.gray,
  },

  addressTypeText: {
    marginTop: hp('1.5%'),

    fontSize: hp('1.5%'),
    color: colors.app_theme_dark_green,
    fontWeight: 'bold',
  },
  radioButtonSection: {
    marginTop: hp('2%'),
  },

  confirmBtn: {
    width: '46%',

    backgroundColor: colors.app_theme_dark_green,
    borderRadius: 0,
  },
  buttonSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: hp('2%'),
    alignSelf: 'center',
  },
  mobileNumberInput: {
    marginTop: hp('2%'),
  },
});
