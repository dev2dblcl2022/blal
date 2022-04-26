import {StyleSheet} from 'react-native';
import colors from '../../../constants/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default StyleSheet.create({
  modalContainer: {
    backgroundColor: '#fff',
    height: 170,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopWidth: 2,
    borderColor: colors.gray,
    alignItems: 'center',
  },
  whiteSection: {
    backgroundColor: 'white',
    padding: hp('1.5%'),
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleContainer: {
    flex: 1,
  },

  textSection: {},
  waitText: {
    fontSize: hp('2%'),
    color: colors.app_theme_dark_green,
    fontWeight: 'bold',
  },

  textInputSection: {
    marginTop: hp('2%'),
    flexDirection: 'row',

    marginLeft: hp('0.5%'),
  },
  textInputView: {
    paddingHorizontal: hp('1%'),
    flexDirection: 'row',
    backgroundColor: 'white',
    height: hp('5%'),
    flex: 0.9,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    marginRight: hp('0.5%'),
    shadowOpacity: 0.1,
    shadowRadius: 2,

    elevation: 12,
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
    marginLeft: hp('0.5%'),
    backgroundColor: '#ddd',
  },
  applyBtn: {
    justifyContent: 'center',
    alignItems: 'center',

    width: 100,
    height: 30,
    marginLeft: hp('0.5%'),
    backgroundColor: colors.app_theme_dark_green,
  },
  placeholderColor: {
    color: '#c0a',
  },
  textInput: {
    height: 40,
  },
  rowBtn: {
    flexDirection: 'row',
    height: 30,
    margin: 20,
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
    flex: 0.08,
    alignItems: 'flex-end',
    padding: hp('2%'),
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'space-between',
  },
});
