import React from 'react';
import {Text} from 'react-native';
import styles from './styles';

export const BoldText = props => {
  return (
    <Text
      onPress={props.onPress}
      ellipsizeMode={props.ellipsizeMode}
      numberOfLines={props.numberOfLines}
      style={[styles.BoldText, props.style]}>
      {props.title}
    </Text>
  );
};
export const RegularText = props => {
  return (
    <Text
      ellipsizeMode={props.ellipsizeMode}
      onPress={props.onPress}
      numberOfLines={props.numberOfLines}
      style={[styles.RegularText, props.style]}>
      {props.title}
    </Text>
  );
};

export const ErrorText = props => {
  return (
    <Text
      onPress={props.onPress}
      ellipsizeMode={props.ellipsizeMode}
      numberOfLines={props.numberOfLines}
      style={[styles.ErrorText, props.style]}>
      {props.title}
    </Text>
  );
};

export const ItalicText = props => {
  return (
    <Text
      ellipsizeMode={props.ellipsizeMode}
      onPress={props.onPress}
      numberOfLines={props.numberOfLines}
      style={[styles.ItalicText, props.style]}>
      {props.title}
    </Text>
  );
};
export const LightText = props => {
  return (
    <Text
      ellipsizeMode={props.ellipsizeMode}
      onPress={props.onPress}
      numberOfLines={props.numberOfLines}
      style={[styles.LightText, props.style]}>
      {props.title}
    </Text>
  );
};
