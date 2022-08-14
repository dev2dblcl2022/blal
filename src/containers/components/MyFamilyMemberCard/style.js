import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../constants/colors';
export default StyleSheet.create({
  itemContainer: {
    margin: hp('1%'),
    backgroundColor: 'white',

    padding: hp('1%'),
    // paddingVertical: hp('3%'),
    marginTop: hp('1%'),

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
  innerSection: {flexDirection: 'row', flex: 1, margin: hp('1%')},
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
  typeUnSelect: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#125A2D',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  typeSelect: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#125A2D',
  },
  membersText: {
    fontSize: hp('1.8%'),
    marginLeft: hp('0.5%'),
    color: colors.app_theme_light_green,
  },
  footer: {
    marginTop: hp('1%'),
    padding: hp('1%'),
    flexDirection: 'row',
    alignItems: 'flex-end',

    justifyContent: 'space-between',
  },
  uhidText: {
    fontSize: hp('1.5%'),

    color: colors.white,
  },
  membersSection: {flexDirection: 'row', alignItems: 'center'},
  primaryUidView: {
    backgroundColor: colors.app_theme_light_green,
    borderRadius: 15,
    justifyContent: 'center',
    padding: hp('1%'),
  },
  memberImg: {
    height: hp('1.5%'),
    width: hp('2%'),
  },
});
