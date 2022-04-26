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
    backgroundColor: '#ddd',
  },
  backContainer: {
    backgroundColor: '#fff',
    flex: 0.1,
    paddingLeft: hp('1%'),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  myLocation: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 22,
    bottom: 250,
    backgroundColor: 'white',
    borderColor: '#fff',
    borderRadius: 30,
  },
  myLocationImg: {height: 20, width: 20},
});
