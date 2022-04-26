import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../constants/colors';
export default StyleSheet.create({
  fourBtnSection: {},
  row: {
    flexDirection: 'row',
  },
  browseLabCard: {
    flex: 1,
    flexDirection: 'row',
    padding: hp('1%'),
    alignItems: 'center',

    marginVertical: hp('1%'),

    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderRadius: 10,
    shadowOpacity: 0.1,
    shadowRadius: 2,

    elevation: 12,
  },
  browseLabText: {
    flex: 1,
    fontSize: hp('1.3%'),
    marginLeft: hp('1%'),
  },
});
