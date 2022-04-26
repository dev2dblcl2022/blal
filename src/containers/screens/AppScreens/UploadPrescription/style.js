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
    padding: 15,
  },
  content: {
    flex: 1,
    padding: hp('2%'),
  },
  headingSection: {marginTop: hp('2%'), marginBottom: hp('2%')},
  heading: {
    color: colors.app_theme_dark_green,
    fontSize: hp('2%'),
    // fontWeight: 'bold',
  },
  youCanAddSection: {
    height: 220,
  },
  listHeading: {flexDirection: 'row', justifyContent: 'space-between'},
  headingText: {
    color: colors.app_theme_dark_green,
    fontSize: hp('1.8%'),
  },
  addAddress: {
    color: colors.app_theme_dark_green,
    fontSize: hp('1.8%'),
    // position: 'absolute',
    // right: 15,
    // top: 2,
  },
  alsoAddListSection: {
    marginTop: hp('1%'),
  },
  sampleTypeHeaderTitle: {
    backgroundColor: '#fff',
  },
  marginTopInput: {
    marginTop: hp('2%'),
  },
  textInput: {
    height: 100,
    borderWidth: 1,
    paddingHorizontal: hp('2%'),
    borderColor: colors.gray,
    borderRadius: 5,
    lineHeight: 20,
    textAlignVertical: 'top',
  },
  sectionOne: {},

  headingCollection: {
    flexDirection: 'row',
  },

  submitBtnSection: {
    flex: 0.1,
    paddingHorizontal: hp('2%'),
    justifyContent: 'center',
    padding: hp('2%'),
  },
  bookingHeading: {
    color: colors.app_theme_dark_green,
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },
  addMoreText: {
    color: colors.purplishGrey,
    fontSize: hp('2%'),
  },
  sampleText: {
    fontSize: hp('1.5%'),
    color: colors.app_theme_dark_green,
  },
  sampleType: {
    marginTop: hp('1%'),
    color: colors.purplishGrey,
    fontSize: hp('2%'),
  },
  sampleSection: {
    flexDirection: 'row',
    marginLeft: hp('0.5%'),
    marginTop: hp('1%'),
  },
  selectTypeHeading: {
    color: colors.app_theme_dark_green,
    fontSize: hp('2%'),
    marginTop: hp('2%'),
    marginLeft: hp('1%'),
  },
  sampleDescription: {
    color: colors.purplishGrey,
    fontSize: hp('1.5%'),
    marginTop: hp('0.5%'),
  },
  typeUnSelect: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#125A2D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeSelect: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#125A2D',
  },
  profilePicView: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  profilePic: {height: 20, width: 20},
  boxImgSection: {
    flexDirection: 'row',
    width: 130,
    height: 130,

    borderRadius: 10,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  touchAddImageBox: {
    margin: 5,
    borderRadius: 3,
    shadowColor: '#eee',
    shadowOffset: {
      width: 0,

      height: 2,
    },

    shadowOpacity: 0.5,
    shadowRadius: 10,
    backgroundColor: 'white',
    elevation: 5,

    justifyContent: 'center',
    alignItems: 'center',
    // width: hp('15%'),
    // height: hp('18%'),
  },
  selectedImageContainer: {
    width: hp('10%'),
    height: hp('10%'),
    borderRadius: 5,

    backgroundColor: colors.red,
    // marginVertical: 15,
    marginHorizontal: 5,
    overflow: 'hidden',
  },
  selectedImageCrossConatiner: {
    position: 'absolute',
    backgroundColor: 'red',
    right: 0,
  },
  removeView: {
    position: 'absolute',
    top: 15,

    right: 5,
  },

  patientSection: {
    flex: 1,
    padding: hp('0.5%'),
  },
  timeSection: {
    flex: 1,
    padding: hp('0.5%'),
  },
  dropDownContainer: {
    borderRadius: 0,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    marginBottom: hp('2%'),
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
    borderColor: colors.gray,
  },
});
