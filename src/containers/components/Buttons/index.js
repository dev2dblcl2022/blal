import React from 'react';
import {TouchableOpacity} from 'react-native';
import colors from '../../../constants/colors';
import {BoldText, RegularText} from '../Common';
import styles from './styles';

export const SubmitButton = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.SubmitButton, props.style]}>
      <BoldText title={props.title} />
    </TouchableOpacity>
  );
};
export const CancelButton = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[props.style, styles.cancelButton]}>
      <BoldText title={props.title} />
    </TouchableOpacity>
  );
};
export const BackButton = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[props.style, styles.BackButton]}>
      <BoldText style={{color: colors.purplishGrey}} title={props.title} />
    </TouchableOpacity>
  );
};
