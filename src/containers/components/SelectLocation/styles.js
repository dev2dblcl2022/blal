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
  },
  whiteSection: {
    backgroundColor: 'white',
    padding: hp('1.5%'),
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 1,
    borderColor: '#eee',
    flex: 1,
  },
  circleContainer: {
    flex: 1,
  },

  textSection: {
    // alignSelf: 'flex-start',
    paddingLeft: 20,
    flexDirection: 'row',
    flex: 1,
  },
  addressLoc: {
    fontSize: hp('1.8%'),
    color: colors.purplishGrey,
    // margin: hp('1%'),
    marginLeft: hp('1%'),
    // width: 260,
    textAlign: 'left',
    lineHeight: 20,
  },
  locationTitle: {
    fontSize: hp('2%'),
    color: colors.app_theme_dark_green,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 5,
  },

  submitBtn: {
    width: 160,
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
  location: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 1,
    padding: 1,
    backgroundColor: 'white',
    borderColor: '#fff',

    borderRadius: 30,
  },
  locationnImg: {
    margin: 5,
  },
});
