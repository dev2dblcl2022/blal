import React from 'react';
import LottieView from 'lottie-react-native';

const AnimatedLottieView = ({source, style}) => {
  return <LottieView source={source} style={style} autoPlay loop={false} />;
};

export default AnimatedLottieView;
