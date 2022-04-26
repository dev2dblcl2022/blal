import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../../constants/colors';
export default StyleSheet.create({
  safeArea: {
    flexGrow: 1,
  },
  mainContainer: {
    flex: 1,

    backgroundColor: 'white',
  },
  selfSection: {
    flex: 1,
  },

  listSeparator: {
    alignSelf: 'center',
    height: 1,
    width: '100%',
    marginTop: hp('1%'),

    backgroundColor: colors.gray,
  },
  selfNameText: {
    color: colors.app_theme_dark_green,
    fontSize: hp('1.8%'),
  },
  ageText: {
    marginTop: hp('0.5%'),
    color: colors.purplishGrey,
    fontSize: hp('1.3%'),
  },
  selfText: {
    color: colors.app_theme_dark_green,
    fontSize: hp('1.5%'),
  },
  itemContainer: {
    flexDirection: 'row',
    padding: hp('2%'),
    marginVertical: hp('1%'),
    marginHorizontal: hp('2%'),
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.30)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.5,

    elevation: 2,
  },
  logoSection: {
    flex: 0.4,
    justifyContent: 'center',
    // alignItems: 'flex-start',
  },
  textSection: {
    flex: 0.6,
    justifyContent: 'center',
  },

  img: {
    height: hp('4%'),
    width: hp('4%'),
  },
  imageView: {
    padding: hp('1%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dotted',
    borderRadius: hp('1%'),
    borderWidth: 2,
    borderColor: colors.app_theme_dark_green,
  },
  headText: {
    color: colors.app_theme_light_green,
    fontSize: hp('2 %'),
  },

  codeText: {
    color: colors.purplishGrey,
    fontSize: hp('1.8%'),
  },

  messageText: {
    color: colors.black,
    marginTop: hp('0.5%'),
    fontSize: hp('1.5%'),
  },
});
