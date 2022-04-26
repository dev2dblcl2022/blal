import {StyleSheet} from 'react-native';
import colors from '../../../constants/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default StyleSheet.create({
  modalContainer: {
    backgroundColor: '#fff',

    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopWidth: 2,
    borderColor: colors.gray,
    alignItems: 'center',
  },
  whiteSection: {
    marginTop: hp('2%'),
    backgroundColor: 'white',

    // justifyContent: 'center',
    // alignItems: 'center',
  },
  circleContainer: {
    flex: 1,
    margin: hp('2%'),
  },

  textSection: {},
  waitText: {
    fontSize: hp('2%'),
    color: colors.app_theme_dark_green,
    fontWeight: 'bold',
  },

  textInputSection: {
    // marginTop: hp('2%'),
    flexDirection: 'row',

    // marginLeft: hp('0.5%'),
  },
  textInputView: {
    paddingHorizontal: hp('1%'),
    flexDirection: 'row',
    backgroundColor: 'white',
    height: hp('5%'),
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.1,
    shadowRadius: 2,

    elevation: 5,
  },
  applyBtnSection: {
    flex: 0.2,
  },
  applyText: {
    fontSize: hp('1.5%'),
    color: colors.white,
  },
  backBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 30,

    backgroundColor: '#ddd',
  },
  applyBtn: {
    justifyContent: 'center',
    alignItems: 'center',

    width: 100,
    height: 30,

    backgroundColor: colors.app_theme_dark_green,
  },
  placeholderColor: {
    color: '#c0a',
  },
  textInput: {
    height: 40,
    color: 'black',
  },
  rowBtn: {
    flexDirection: 'row',
    height: 30,

    flex: 1,
  },
  backBtnPinCode: {
    width: '48%',

    borderWidth: 0.5,
    borderColor: colors.gray_light,
    borderRadius: 0,
  },
  submitBtn: {
    width: '48%',

    backgroundColor: colors.app_theme_dark_green,
    borderRadius: 0,
  },
  btnSection: {
    alignItems: 'flex-end',
    marginTop: hp('3%'),
    flexDirection: 'row',

    justifyContent: 'space-between',
  },
});
