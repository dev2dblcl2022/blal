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
  content: {
    flexGrow: 0.9,
    // padding: hp('2%'),
  },
  ageText: {
    fontSize: hp('1.3%'),
    marginTop: hp('0.5%'),
    color: colors.purplishGrey,
  },
  emailText: {
    fontSize: hp('1.3%'),
    marginTop: hp('0.5%'),
    color: colors.black,
  },
  htmlText: {
    color: 'black',
    fontSize: hp('1.4%'),
    marginTop: hp('1%'),
    lineHeight: 18,
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

    elevation: 12,
    margin: hp('2%'),

    backgroundColor: colors.white,
  },

  descriptionText: {
    color: colors.purplishGrey,
    fontSize: hp('1.3%'),
    marginTop: hp('0.5%'),
  },
  termsConditionText: {
    color: colors.app_theme_dark_green,
    fontSize: hp('1.4%'),
  },
  titleDescriptionSection: {
    flexDirection: 'row',
  },
  bodyImg: {
    height: 50,
    width: 50,
  },
  desSection: {flex: 0.8},
  headingText: {
    color: colors.app_theme_dark_green,
    fontSize: hp('1.8%'),
  },
  sectionOne: {
    padding: hp('1%'),
  },
  restDescription: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: hp('0.5%'),
  },
  amountText: {
    color: colors.app_theme_dark_green,
    fontSize: hp('1.8%'),
  },
  offSection: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: hp('0.3%'),
  },
  cutText: {
    marginRight: hp('0.5%'),
    color: colors.purplishGrey,
    fontSize: hp('1.3%'),
    textDecorationLine: 'line-through',
  },
  offText: {
    color: colors.red,
    fontSize: hp('1.3%'),
  },
  bodyImgSection: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    height: 1,
    marginTop: hp('1%'),
    backgroundColor: colors.gray,
  },
  rowOne: {
    flexDirection: 'row',
  },
  sectionTwo: {
    padding: hp('1%'),
  },

  recommendedFor: {flex: 0.7},
  recommendedTextSection: {},
  recommendedText: {fontSize: hp('1.5%')},
  genderSection: {
    flexDirection: 'row',
    marginTop: hp('1%'),
  },
  maleText: {
    marginLeft: hp('0.5%'),
    fontSize: hp('1.3%'),
    color: colors.app_theme_dark_green,
  },
  gender: {flexDirection: 'row', alignItems: 'center'},
  maleImg: {},
  femaleImg: {},
  ageGroup: {flex: 0.3, alignItems: 'flex-start'},
  headingTestSection: {
    flexDirection: 'row',
  },
  sampleText: {
    fontSize: hp('1.5%'),
    color: colors.app_theme_dark_green,
  },
  headingCollection: {
    flexDirection: 'row',
  },
  submitBtnSection: {
    flex: 0.1,
    paddingHorizontal: hp('2%'),
    justifyContent: 'center',
  },
  collectionSubText: {
    marginLeft: hp('0.5%'),
    fontSize: hp('1.3%'),
    color: colors.purplishGrey,
  },
  accordionSection: {
    marginTop: hp('1%'),
  },
  accordionTitleText: {color: colors.purplishGrey, fontSize: hp('1.5%')},
  headContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,

    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp('1%'),
    paddingHorizontal: hp('1%'),
    // backgroundColor: colors.white,
  },
  headContainerLast: {
    flexDirection: 'row',
    padding: 10,

    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp('1%'),
    paddingHorizontal: hp('1%'),
    // backgroundColor: colors.white,
  },
  accordionSectionMain: {
    borderWidth: 0,
  },
  contentContainer: {
    justifyContent: 'space-between',
    paddingVertical: hp('1%'),
    paddingHorizontal: hp('2%'),
  },
  accordionContentText: {color: colors.purplishGrey, fontSize: hp('1.3%')},
  itemContainer: {
    flexDirection: 'row',

    marginTop: hp('1%'),
  },
  dataSection: {flex: 1, flexDirection: 'row'},
});
