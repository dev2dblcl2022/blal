import React, {useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default ({props, children}) => {
  const myref = useRef();
  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      scrollEnabled={true}
      ref={myref}
      contentContainerStyle={styles.mainContainer}>
      {children}
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
});
