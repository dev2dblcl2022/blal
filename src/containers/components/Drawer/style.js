import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../constants/colors';
export default StyleSheet.create({
  safeAreaView: {
    flexGrow: 1,
  },
  fullSection: {
    flex: 1,
  },
  profileSection: {
    paddingTop: hp('2%'),
    alignItems: 'center',
  },

  placeHolderImage: {
    height: hp('12.8%'),
    width: hp('12.8%'),
    borderRadius: hp('6.4%'),
  },
  profileView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('14%'),
    width: hp('14%'),
    borderRadius: hp('7%'),
    borderWidth: hp('0.7%'),
    borderColor: colors.gray,
  },
  profileNameText: {
    color: colors.app_theme_light_green,
    fontSize: hp('1.8%'),
    marginTop: hp('1%'),
  },
  versionText: {
    fontSize: hp('1.8%'),
    marginTop: hp('2%'),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  profileImg: {
    height: hp('12.6%'),
    borderRadius: hp('6.6%'),
    width: hp('12.6%'),
  },
  listSection: {
    padding: hp('2%'),
  },
  itemContainer: {
    paddingVertical: hp('2%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: hp('1.5%'),
    color: colors.purplishGrey,
  },
  separator: {
    height: 1,
    backgroundColor: colors.gray,
    width: '95%',
    alignSelf: 'center',
  },
  arrow: {
    height: hp('1.5%'),
    width: hp('1%'),
  },
});
