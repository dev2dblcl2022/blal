import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../constants/colors';
export default StyleSheet.create({
  itemContainer: {
    margin: hp('1%'),
    backgroundColor: colors.app_theme_light_green,

    // padding: hp('1%'),
    // marginTop: hp('1%'),

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderRadius: 8,
    shadowOpacity: 0.1,
    shadowRadius: 2,

    elevation: 12,
  },
  tickImage: {
    marginTop: 5,
  },
  addressTextView: {width: hp('15%')},
  itemContainerInner: {
    backgroundColor: 'white',

    padding: hp('1%'),
    marginTop: hp('0.4%'),

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderRadius: 5,
    shadowOpacity: 0.1,
    shadowRadius: 2,

    elevation: 12,
  },
  profilePicSection: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profilePicView: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.1,
    shadowRadius: 2,
    backgroundColor: 'white',
    elevation: 12,
  },
  addressTypeText: {
    fontSize: hp('1.3%'),
  },
  profilePic: {height: 20, width: 20},
  dataSection: {flex: 0.6, marginTop: hp('1.5%')},
  nameText: {fontSize: hp('1.3%'), color: colors.app_theme_dark_green},
  emailText: {
    fontSize: hp('1%'),
    marginTop: hp('0.5%'),
    color: colors.bean_red,
  },
  ageText: {
    fontSize: hp('1%'),
    marginTop: hp('0.5%'),
    color: colors.purplishGrey,
  },
  relationSection: {
    flex: 0.2,

    alignItems: 'flex-end',
    // marginTop: hp('2%'),
    // justifyContent: 'flex-end',
  },

  rateSection: {
    flex: 1,
  },
  bookNowSection: {
    flex: 1,
    alignItems: 'flex-end',
  },
  relationText: {
    fontSize: hp('1.5%'),
    marginTop: hp('0.5%'),
    color: colors.app_theme_light_green,
  },
  bookNowText: {
    fontSize: hp('1.3%'),
    color: colors.app_theme_dark_green,
  },
  testName: {
    fontSize: hp('1.1%'),
    color: colors.purplishGrey,
  },
  presentText: {
    fontSize: hp('1%'),
    color: colors.bean_red,
  },
  amountText: {
    fontSize: hp('1.5%'),
    color: colors.app_theme_dark_green,
  },
  amountSection: {
    flexDirection: 'row',
  },
  amountCutText: {
    fontSize: hp('1%'),
    alignSelf: 'center',

    marginLeft: hp('0.5%'),
    color: colors.purplishGrey,
  },
});
