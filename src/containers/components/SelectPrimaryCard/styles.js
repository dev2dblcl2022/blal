import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../constants/colors';
export default StyleSheet.create({
  itemContainer: {
    backgroundColor: colors.gray,

    height: hp('15%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderRadius: 10,
    shadowOpacity: 0.1,
    shadowRadius: 2,

    elevation: 5,
  },
  profilePicSection: {flex: 0.2, alignItems: 'center'},
  profilePicView: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    borderWidth: 1,
  },
  profilePic: {height: 50, width: 50, borderRadius: 25},
  dataSection: {flex: 0.6},
  nameText: {fontSize: hp('1.5%'), color: colors.app_theme_dark_green},
  emailText: {
    fontSize: hp('1.5%'),
    marginTop: hp('0.5%'),
    color: colors.purplishGrey,
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
  footer: {
    padding: hp('1%'),

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  uhidText: {
    fontSize: hp('1.5%'),

    color: colors.white,
  },
  membersSection: {flexDirection: 'row', alignItems: 'center'},
  primaryUidView: {
    backgroundColor: colors.app_theme_light_green,
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: hp('0.8%'),
  },
  memberImg: {
    height: hp('1.5%'),
    width: hp('2%'),
  },
  membersText: {
    marginLeft: hp('1%'),
  },
});
