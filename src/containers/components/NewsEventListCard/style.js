import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../constants/colors';
export default StyleSheet.create({
  itemContainer: {
    backgroundColor: 'white',

    padding: hp('1%'),
    marginTop: hp('1%'),
  },
  profilePicSection: {flex: 0.2, alignItems: 'center'},
  profilePicView: {
    height: hp('28%'),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.1,
    shadowRadius: 2,

    elevation: 5,
  },
  profilePic: {width: '100%', height: '100%', borderRadius: 10},
  dataSection: {marginTop: hp('2%'), flexDirection: 'row'},
  nameText: {fontSize: hp('1.8%'), color: colors.purplishGrey},
  buyNowText: {fontSize: hp('1.8%'), color: colors.app_theme_dark_green},
  emailText: {
    fontSize: hp('1.8%'),
    marginTop: hp('0.5%'),
    color: colors.app_theme_dark_green,
  },
  buyNowBtn: {
    backgroundColor: colors.app_theme_light_green,
    borderRadius: 20,
    paddingVertical: hp('1%'),
    paddingHorizontal: hp('2%'),
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
});
