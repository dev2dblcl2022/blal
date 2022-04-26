import {StyleSheet} from 'react-native';
import colors from '../../../constants/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: hp('1.5%'),

    paddingVertical: hp('1%'),
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    paddingHorizontal: hp('1%'),
    borderColor: colors.gray,
    borderRadius: 10,
  },
});
