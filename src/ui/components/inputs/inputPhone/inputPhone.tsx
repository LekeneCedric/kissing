import {View, Text, TextInput, KeyboardTypeOptions} from 'react-native';
import colors from '../../../constants/colors';
import fontSizes from '../../../constants/font-sizes';
import styles from './inputPhoneStyle';
import React, {useState} from 'react';
import {ControllerRenderProps} from 'react-hook-form';
import {Dropdown} from 'react-native-element-dropdown';

type inputPhone = {
  placeholder: string;
  label: string;
  type: KeyboardTypeOptions | undefined;
  errorMessage: string | undefined;
  field: ControllerRenderProps<any, any>;
};
const InputPhone = ({
  placeholder,
  label,
  type,
  errorMessage,
  field,
}: inputPhone) => {
  const [code, setCode] = useState<string>();
  return (
    <View style={styles.inputGlobalContainer}>
      <View style={styles.container}>
        <Text style={styles.inputHeader}>{label}</Text>
        <View style={styles.phoneCodeContainer}>
          <Dropdown
            style={{width: '100%', zIndex: 10000}}
            placeholderStyle={{color: colors.dark, fontSize: fontSizes.info}}
            selectedTextStyle={{color: colors.dark, fontSize: fontSizes.text}}
            inputSearchStyle={{fontSize: fontSizes.info}}
            placeholder={'code du pays'}
            data={[
              {key: 'cmr', label: '🇨🇲 (+237)', value: '+237'},
              {key: 'ca', label: '🇨🇦 (+1)', value: '+1'},
            ]}
            search
            value={code}
            labelField="label"
            valueField="value"
            onBlur={field.onBlur}
            onChange={item => {
              field.onChange(item.value);
              setCode(item.value);
            }}
          />
        </View>
        <View style={styles.phoneNumberContainer}>
          <TextInput
            keyboardType={type}
            style={styles.inputText}
            cursorColor={colors.principal}
            placeholder={placeholder}
            placeholderTextColor={colors.gray}
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

export default InputPhone;
