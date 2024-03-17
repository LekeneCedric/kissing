import styles from './inputAreaStyle';
import {Text, TextInput, View} from 'react-native';
import {ControllerRenderProps} from 'react-hook-form';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../../constants/colors';
import iconSize from '../../../constants/iconSize';
import React from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export type inputAreaProps = {
  label: string;
  placeholder: string;
  errorMessage?: string;
  onChangeText?: (value: string) => void;
  field: ControllerRenderProps<any, any>;
  myProfil?: boolean;
};
const InputArea = ({
  label,
  placeholder,
  field,
  errorMessage,
  myProfil,
}: inputAreaProps) => {
  return (
    <View style={{flexDirection: 'column'}}>
      <View
        style={[
          styles.container,
          {
            width: myProfil ? wp('100%') : wp('90%'),
            marginBottom: myProfil ? 0 : heightPercentageToDP('1%'),
          },
        ]}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.inputView}>
          <TextInput
            keyboardType={'default'}
            placeholder={placeholder}
            placeholderTextColor={colors.gray}
            cursorColor={colors.principal}
            style={[styles.textInput, {width: '100%', height: '100%'}]}
            multiline={true}
            numberOfLines={8}
            onBlur={field.onBlur}
            onChangeText={field.onChange}
            value={field.value}
          />
        </View>
      </View>
      {errorMessage ? (
        <Text style={[styles.info, {color: colors.red}]}>{errorMessage}</Text>
      ) : (
        <Text style={[styles.info, {color: colors.gray}]} />
      )}
    </View>
  );
};
export default InputArea;
