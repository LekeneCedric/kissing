import {KeyboardType, Text, TextInput, View} from 'react-native';
import styles from './inputStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../../constants/colors';
import iconSize from '../../../constants/iconSize';
import fontSizes from '../../../constants/font-sizes';
import {
  ControllerRenderProps,
  FieldError,
  UseFormRegister,
} from 'react-hook-form';
import {useEffect} from 'react';

type inputProps = {
  icon: string;
  label: string;
  placeholder: string;
  type: KeyboardType;
  errorMessage?: string;
  onChangeText?: (value: string) => void;
  field: ControllerRenderProps<any, any>;
  editable?: boolean;
};
const Input = ({
  icon,
  label,
  placeholder,
  type,
  errorMessage,
  field,
  editable,
}: inputProps) => {
  return (
    <View style={{flexDirection: 'column'}}>
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <View style={[styles.inputView]}>
          <Icon name={icon} color={colors.dark} size={iconSize.normal} />
          <TextInput
            editable={editable}
            keyboardType={type}
            placeholder={placeholder}
            placeholderTextColor={colors.gray}
            cursorColor={colors.principal}
            style={[styles.textInput, {width: '100%'}]}
            onBlur={field.onBlur}
            onChangeText={text => {
              field.onChange(text);
            }}
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

export default Input;
