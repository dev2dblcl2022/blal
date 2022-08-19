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
    flexDirection: 'row',
    padding: hp('1%'),
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
  img: {
    height: hp('5%'),
    width: hp('5%'),
  },
  testDetailSection: {
    flex: 0.5,
  },
  profilePicSection: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
    flex: 0.6,
  },
  testNameText: {
    fontSize: hp('1.7%'),
    color: colors.app_theme_dark_green,
  },
  testInclude: {
    fontSize: hp('1.4%'),
    color: colors.app_theme_light_green,
  },
  amountSection: {
    marginTop: hp('0.5%'),
  },
  reportGenTimeView: {
    marginTop: hp('1%'),
    paddingRight: hp('0.5%'),
  },
  nameText: {fontSize: hp('1.6%'), color: colors.app_theme_dark_green},
  emailText: {
    fontSize: hp('1.5%'),
    marginTop: hp('0.5%'),
    color: colors.purplishGrey,
  },
  addressText: {
    fontSize: hp('1.3%'),
    flex: 0.7,
    marginTop: hp('0.3%'),
    color: colors.purplishGrey,
  },
  kmText: {
    fontSize: hp('1.3%'),
    flex: 0.3,
    textAlign: 'right',
    color: colors.bean_red,
  },
  timeText: {
    fontSize: hp('1.4%'),

    color: colors.app_theme_light_green,
  },
  facilitiesSection: {
    marginTop: hp('1%'),
    flexDirection: 'row',
  },
  facilitiesView: {
    flexDirection: 'row',
    flex: 0.7,
    alignItems: 'center',
  },
  btnSection: {
    flexDirection: 'row',
    flex: 0.3,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  facilitiesText: {
    fontSize: hp('1.4%'),
    marginLeft: hp('0.8%'),
    color: colors.app_theme_dark_green,
  },
  btnView: {
    justifyContent: 'center',
    alignItems: 'center',
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
  btnText: {
    fontSize: hp('1.3%'),

    color: colors.purplishGrey,
  },
  hrsText: {
    fontSize: hp('1.3%'),

    color: colors.purplishGrey,
  },
  amountRightSection: {
    flex: 0.2,
    alignItems: 'flex-end',
  },
  percentText: {
    color: colors.bean_red,
    fontSize: hp('1%'),
    marginLeft: hp('0.5%'),
  },
  searchedItemTwo: {
    position: 'relative',
    width: 200,
    height: 100,
  },
  addButton: {
    borderRadius: 5,
    // padding: hp('0.7%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.app_theme_dark_green,
    // marginTop: hp('5%'),
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 50,
    height: 20,
  },
  removeButton: {
    borderRadius: 5,
    // padding: hp('0.7%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.red,
    // marginTop: hp('5%'),
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 50,
    height: 20,
  },
  btnViewText: {
    color: colors.white,
    fontSize: hp('1.5%'),
  },
  amountTextTwo: {fontSize: hp('1%'), color: colors.purplishGrey},
  offSection: {flexDirection: 'row', marginTop: hp('0.5%')},
});
