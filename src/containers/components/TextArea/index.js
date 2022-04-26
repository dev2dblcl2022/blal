import * as React from 'react';
import {TextInput, View} from 'react-native';
import {ErrorText} from '../Common';
import styles from './style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../constants/colors';
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
        style={[
          props.style,
          {
            backgroundColor: 'white',
            fontSize: hp('1.5%'),
            borderRadius: 20,
            height: hp('18%'),

            borderWidth: 1,
            paddingHorizontal: hp('1%'),
            borderColor: colors.gray,
            borderRadius: 10,
          },
        ]}
        placeholder={placeholder}
        ref={refField}
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
