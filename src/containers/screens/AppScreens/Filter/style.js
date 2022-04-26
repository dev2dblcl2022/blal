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
  mainContainer: {flex: 1},
  bottomContainer: {
    borderTopColor: 'rgba(0,0,0,0.10)',
    borderTopWidth: 2,
    flex: 0.1,
    alignItems: 'center',
    padding: hp('2%'),
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {width: '45%'},
  listItemSection: {flex: 0.7, padding: hp('3')},
  listLabelSection: {
    flex: 0.3,
    padding: hp('3'),
  },
  allListSection: {flex: 0.9, backgroundColor: 'white', flexDirection: 'row'},
  separator: {width: '0.5%', backgroundColor: 'rgba(0,0,0,0.10)'},
  listItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('3%'),
  },
  arrowImg: {
    height: hp('1.8%'),
    width: hp('1.5%'),
  },
  tickImage: {
    height: hp('1.5%'),

    width: hp('1.5%'),
  },
});
