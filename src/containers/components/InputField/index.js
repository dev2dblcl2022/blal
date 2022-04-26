import * as React from 'react';
import {TextInput, View} from 'react-native';
import colors from '../../../constants/colors';
import {ErrorText} from '../Common';
import styles from './styles';

export default props => {
  let {
    refField,
    multiline,
    keyboardType,
    maxLength,
    disabled,
    returnKeyType,
    onSubmitEditing,
    onChangeText,
    pointerEvents,
    value,
    editable,
    error,
    blur,
    focus,
    secureTextEntry,
    placeholder,
  } = props;

  return (
    <View>
      <TextInput
        style={[props.style, styles.textInput]}
        placeholder={placeholder}
        ref={refField}
        placeholderTextColor={colors.purplishGrey}
        onBlur={blur}
        onFocus={focus}
        autoCapitalize={'none'}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        keyboardType={keyboardType}
        maxLength={maxLength}
        disabled={disabled}
        value={value}
        error={error}
        returnKeyType={returnKeyType}
        blurOnSubmit={false}
        onChangeText={onChangeText}
        pointerEvents={pointerEvents}
        editable={editable}
        onSubmitEditing={onSubmitEditing}
      />

      {error ? (
        <ErrorText title={props.error} style={styles.errorText} />
      ) : null}
    </View>
  );
};
