import {
  Platform,
  Dimensions,
  PixelRatio,
  KeyboardAvoidingView,
  View,
} from 'react-native';

export const IS_IOS = Platform.OS === 'ios';

export const DEV_HEIGHT = Dimensions.get('window').height;

export const DEV_WIDTH = Dimensions.get('window').width;

export const DEV_VERSION = Platform.Version;

const scale = DEV_WIDTH / 320;

export const KEYBOARD_VIEW =
  Platform.OS === 'ios' ? KeyboardAvoidingView : View;

export function normalize(size) {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}
