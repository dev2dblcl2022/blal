import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../../constants/colors';
export default StyleSheet.create({
  itemContainer: {
    backgroundColor: 'white',
  },
  descriptionText: {
    color: 'black',
    fontSize: hp('2%'),
    marginTop: hp('1%'),
    lineHeight: 18,
  },
  profilePicSection: {flex: 0.2, alignItems: 'center'},
  profilePicView: {
    height: hp('23%'),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePic: {width: '100%', height: '100%', marginBottom: 13},
  dataSection: {
    padding: hp('2%'),
    marginTop: hp('0.5%'),
    flexDirection: 'row',
  },
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
  footer: {
    right: 0,
    left: 0,
    bottom: 0,
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: colors.app_theme_light_green,
    height: hp('8%'),
  },
  footerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: hp('3%'),
  },
  mcontainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: '90%',
    padding: hp('2%'),
  },

  listSection: {
    flex: 0.9,
  },
  inputSection: {
    flex: 0.1,
    alignItems: 'center',
    // borderWidth: 2,
    // borderColor: colors.app_theme_light_green,
    flexDirection: 'row',
  },
  commentBubble: {
    backgroundColor: '#F8F7FD',
    borderRadius: 10,
    padding: hp('1%'),
    marginVertical: hp('1%'),
  },
  comment: {
    fontSize: hp('1.6%'),
    marginLeft: hp('1%'),
    marginTop: hp('0.5%'),
  },
  commentByText: {
    fontSize: hp('2%'),
    color: colors.app_theme_light_green,
  },
});
