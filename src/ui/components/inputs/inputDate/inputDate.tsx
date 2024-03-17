import {ControllerRenderProps} from 'react-hook-form';
import {Text, TextInput, View} from 'react-native';
import styles from './inputDateStyle';
import colors from '../../../constants/colors';
import React, {useEffect, useState} from 'react';

type props = {
  field: ControllerRenderProps<any, any>;
  errorMessage?: string;
  label: string;
  notice: string;
};
const InputDate = ({field, errorMessage, label, notice}: props) => {
  const [year, setYear] = useState<string>('');
  const [day, setDay] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  useEffect(() => {
    field.onChange(`${year}-${month}-${day}`);
  }, [year, month, day]);
  return (
    <View style={{flexDirection: 'column'}}>
      <View style={[styles.container, {justifyContent: 'space-between'}]}>
        <Text style={styles.label}>{label}</Text>
        <Text style={[styles.textInputInfo, {color: colors.gray}]}>
          Je suis née le{' '}
        </Text>
        <View style={styles.inputView}>
          <TextInput
            keyboardType={'numeric'}
            placeholder={'YYYY'}
            maxLength={4}
            placeholderTextColor={colors.gray}
            cursorColor={colors.principal}
            style={styles.textInput}
            onBlur={field.onBlur}
            onChangeText={year => {
              setYear(year);
            }}
            value={year}
          />
          <Text style={styles.separator}>/</Text>
          <TextInput
            keyboardType={'numeric'}
            placeholder={'MM'}
            maxLength={2}
            placeholderTextColor={colors.gray}
            cursorColor={colors.principal}
            style={styles.textInput}
            onBlur={field.onBlur}
            onChangeText={month => {
              setMonth(month);
            }}
            value={month}
          />
          <Text style={styles.separator}>/</Text>
          <TextInput
            keyboardType={'numeric'}
            placeholder={'DD'}
            maxLength={2}
            placeholderTextColor={colors.gray}
            cursorColor={colors.principal}
            style={styles.textInput}
            onBlur={field.onBlur}
            onChangeText={day => {
              setDay(day);
            }}
            value={day}
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

export default InputDate;
