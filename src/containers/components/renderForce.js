import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function renderForce() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}
export default renderForce;

const styles = StyleSheet.create({});
