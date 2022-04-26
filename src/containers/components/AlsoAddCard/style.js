import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../constants/colors';
export default StyleSheet.create({
  itemContainer: {
    marginVertical: hp('0.5%'),
    marginHorizontal: hp('0.5%'),
    marginRight: hp('2%'),
    backgroundColor: colors.app_theme_light_green,
    width: hp('20%'),

    height: hp('17%'),
    // padding: hp('1%'),

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderRadius: 8,
    shadowOpacity: 0.1,
    shadowRadius: 2,

    elevation: 5,
  },
  itemContainerInner: {
    backgroundColor: 'white',
    height: '100%',
    padding: hp('1%'),
    marginTop: hp('0.4%'),

    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // borderRadius: 5,
    // shadowOpacity: 0.1,
    // shadowRadius: 2,

    // elevation: 12,
  },
  profilePicSection: {flex: 0.2},
  profilePicView: {
    height: hp('5%'),
    width: hp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hp('2.5%'),
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
  packageNameSection: {
    width: '85%',
  },
  profilePic: {
    height: hp('4%'),
    width: hp('4%'),
    borderRadius: hp('2%'),
    resizeMode: 'cover',
  },
  dataSection: {flex: 0.5, marginTop: hp('4%')},
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
    flexDirection: 'row',
    marginTop: hp('1%'),
    justifyContent: 'space-between',
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
    fontSize: hp('1.3%'),
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
  bestSellerText: {
    fontSize: hp('1%'),
    color: colors.white,
    paddingHorizontal: hp('0.2%'),
  },
  bestSellerSection: {
    position: 'absolute',
    backgroundColor: 'red',
    borderRadius: 10,
    top: 8,
    right: 10,
    width: '35%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
