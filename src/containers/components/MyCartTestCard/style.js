import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../constants/colors';
export default StyleSheet.create({
  itemContainer: {
    // alignItems: 'center',
    marginTop: hp('1%'),

    borderColor: colors.gray,
    // height: hp('10%'),
  },
  selfSection: {
    // padding: hp('2%'),
  },
  selfNameText: {
    color: colors.app_theme_dark_green,
    fontSize: hp('1.8%'),
    fontWeight: 'bold',
  },
  selfText: {
    color: colors.app_theme_dark_green,
    fontSize: hp('1.5%'),
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerNameSection: {},
  separator: {
    height: 2,
    marginVertical: hp('1.5%'),

    backgroundColor: 'rgba(0,0,0,0.10)',
  },
  testListItem: {marginVertical: hp('1%'), flexDirection: 'row'},
  profilePicSection: {flex: 0.55},
  profilePicView: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    borderWidth: 1,
  },
  profilePic: {height: 50, width: 50, borderRadius: 25},
  dataSection: {
    flex: 0.4,

    alignItems: 'center',
  },
  nameText: {fontSize: hp('1.4%'), color: colors.app_theme_dark_green},
  amountText: {fontSize: hp('1.3%'), color: colors.app_theme_dark_green},
  amountTextTwo: {fontSize: hp('1.3%'), color: colors.purplishGrey},
  emailText: {
    fontSize: hp('1.3%'),

    marginTop: hp('1%'),
    color: colors.purplishGrey,
  },
  ageText: {
    fontSize: hp('1.5%'),
    marginTop: hp('0.5%'),
    color: colors.purplishGrey,
  },
  relationSection: {
    flex: 0.05,

    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  relationText: {
    fontSize: hp('1.5%'),
    marginTop: hp('0.5%'),
    color: colors.app_theme_light_green,
  },
  hrsText: {
    fontSize: hp('1.4%'),
    marginTop: hp('0.5%'),
    color: colors.purplishGrey,
  },
  crossImg: {
    marginTop: hp('1%'),
  },
  percentText: {
    color: colors.bean_red,
    fontSize: hp('1.3%'),
    marginLeft: hp('0.5%'),
  },
  offSection: {flexDirection: 'row', marginTop: hp('0.5%')},
});
