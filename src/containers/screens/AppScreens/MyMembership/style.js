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
  sectionSeparator: {
    marginTop: hp('2%'),
    height: hp('0.5%'),
    backgroundColor: colors.gray_light,
  },
  scroll: {flex: 0.9, backgroundColor: colors.white},
  mainContainer: {
    flex: 1,
    padding: hp('2%'),
    backgroundColor: 'white',
  },
  headingSection: {},
  heading: {color: colors.purplishGrey, fontSize: hp('1.5%')},
  listSection: {
    flex: 1,
  },
  dataSectionOne: {flex: 1},
  btnSection: {flex: 0.1, justifyContent: 'center'},
  itemContainer: {
    padding: hp('1%'),
    marginTop: hp('1%'),
  },
  profilePicSection: {flex: 0.2, alignItems: 'center'},
  profilePicView: {
    height: hp('20%'),
    width: '100%',
    // justifyContent: 'center',
    // alignItems: 'center',

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
  profilePic: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 10,
  },
  dataSection: {marginTop: hp('2%'), flexDirection: 'row'},
  nameText: {fontSize: hp('1.6%'), color: colors.app_theme_dark_green},
  buyNowText: {fontSize: hp('1.6%'), color: colors.app_theme_dark_green},
  requestUpgradeText: {
    fontSize: hp('1.5%'),
    color: colors.app_theme_light_green,
  },
  requestUpgradeSection: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  emailText: {
    fontSize: hp('1.8%'),
    marginTop: hp('1%'),
    color: colors.app_theme_dark_green,
  },
  tillText: {
    fontSize: hp('1.6%'),
    marginTop: hp('1%'),
    color: colors.app_theme_dark_green,
  },
  buyNowBtn: {
    alignItems: 'flex-end',
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
  servicesSection: {
    marginTop: hp('2%'),
    flexDirection: 'row',
  },
  serviceCardSection: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('15%'),

    marginTop: hp('1%'),

    shadowOpacity: 0.1,
    shadowRadius: 2,

    elevation: 5,
  },
  cardTitle: {
    fontSize: hp('1.2%'),
    marginTop: hp('0%'),
    paddingRight: hp('1%'),
    paddingLeft: hp('1%'),
    position: 'relative',
    top: 10,
    color: colors.app_theme_dark_green,
  },
  remainingCount: {
    padding: hp('1%'),
    fontSize: hp('1.2%'),
    color: colors.app_theme_dark_green,
    position: 'relative',
    top: 10,
  },
  timeSection: {
    top: -20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',

    position: 'absolute',
    width: hp('5%'),
    height: hp('5%'),
    borderRadius: hp('2.5%'),
    backgroundColor: colors.app_theme_light_green,
  },
  timeCount: {
    fontSize: hp('1.8%'),
    color: colors.white,
  },
  timeText: {
    fontSize: hp('1.3%'),
    color: colors.white,
  },
  fullBodyCheckupSection: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderRadius: 10,
    shadowOpacity: 0.1,
    shadowRadius: 2,

    elevation: 5,
    margin: 1,
    marginTop: hp('2%'),

    backgroundColor: colors.white,
  },
  sectionOne: {
    padding: hp('1%'),
  },
  headingTestSection: {
    flexDirection: 'row',
  },
  sampleText: {
    fontSize: hp('1.5%'),
    color: colors.app_theme_dark_green,
  },
  patientSection: {
    paddingVertical: hp('1%'),
  },
  patientText: {
    fontSize: hp('1.6%'),
  },
  listSepVertical: {
    height: 1,
    backgroundColor: colors.whiteSmoke,
  },
  validitySection: {
    marginTop: hp('2%'),
    backgroundColor: colors.white,
    paddingVertical: hp('1.5%'),
    paddingHorizontal: hp('1.5%'),
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },

    margin: 1,
    // alignItems: 'center',
    shadowOpacity: 0.1,
    shadowRadius: 2,

    elevation: 5,

    justifyContent: 'space-between',
  },
  validityValText: {
    fontSize: hp('1.6%'),
    marginTop: hp('2%'),
    color: colors.purplishGrey,
  },
  validityText: {
    fontSize: hp('1.8%'),
    color: colors.app_theme_dark_green,
  },
  submitBtn: {},
});
