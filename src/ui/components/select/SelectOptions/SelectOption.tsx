import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './SelectOptionStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import icons from '../../../constants/icons';
import iconSize from '../../../constants/iconSize';
import colors from '../../../constants/colors';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import fontSizes from '../../../constants/font-sizes';
import {ControllerRenderProps} from 'react-hook-form';

type selectOptionOption = {
  label: string;
  icon: string;
  value: string;
};
type SelectOptionPros = {
  options: selectOptionOption[];
  label: string;
  placeholder: string;
  field: ControllerRenderProps<any, any>;
  errorMessage?: string;
  notice: string;
};
const SelectOption = ({
  options,
  label,
  placeholder,
  field,
  errorMessage,
  notice,
}: SelectOptionPros) => {
  const [gender, setGender] = useState<string>(field.value);
  return (
    <View style={{flexDirection: 'column'}}>
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <Text style={styles.description}>{placeholder}</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginRight: wp('2%'),
            }}>
            {options.map(option => {
              const isSelected = option.value === gender;
              const icon = isSelected ? icons.check : icons.uncheck;
              const color = isSelected ? colors.principal : colors.dark;
              const changeGender = (gender: string) => {
                field.onChange(gender);
                setGender(gender);
              };
              return (
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: wp('3%'),
                  }}
                  key={option.label}
                  onPress={() => changeGender(option.value)}>
                  <Icon name={icon} color={color} size={iconSize.normal} />
                  <Icon
                    style={{marginLeft: wp('2%')}}
                    name={option.icon}
                    size={iconSize.normal}
                    color={color}
                  />
                  <Text style={{color: color, fontSize: fontSizes.text}}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
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

export default SelectOption;
