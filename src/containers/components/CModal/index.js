import React, {useRef} from 'react';
import {Modal, View} from 'react-native';

// styles
import styles from './styles';

export default props => {
  const {isVisible, animationType, closeModal, children} = props;

  const containerViewRef = useRef(null);

  const handleStartShouldSetResponder = event => {
    if (containerViewRef.current?._nativeTag === event.target?._nativeTag) {
      if (closeModal) {
        closeModal();
      }

      return true;
    }

    return false;
  };

  return (
    <Modal
      transparent
      animationType={animationType || 'none'}
      visible={isVisible}
      onRequestClose={closeModal}>
      <View
        ref={containerViewRef}
        style={styles.container}
        onStartShouldSetResponder={handleStartShouldSetResponder}>
        {children}
      </View>
    </Modal>
  );
};
