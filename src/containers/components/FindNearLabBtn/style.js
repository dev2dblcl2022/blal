import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../constants/colors';
export default StyleSheet.create({
  findNearByLabsBtn: {
    flexDirection: 'row',

    alignItems: 'center',
    backgroundColor: colors.app_theme_dark_green,
  },
  locationPinSection: {
    alignItems: 'center',
    flex: 1.5,

    justifyContent: 'center',
  },
  locationImg: {marginTop: 8},
  textSection: {
    flex: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {fontSize: 12, color: colors.white},
  arrowSection: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowCircle: {
    height: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
  },
});
