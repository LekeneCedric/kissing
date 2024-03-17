/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import colors from '../../../constants/colors';
import fontSizes from '../../../constants/font-sizes';
import SelectStyles from './selectStyle';
import {ControllerRenderProps} from 'react-hook-form';
import styles from '../../inputs/inputArea/inputAreaStyle';
import {Dropdown} from 'react-native-element-dropdown';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

type items = {
  key?: string;
  label: string;
  value: string;
};
type props = {
  items: items[];
  label: string;
  description: string;
  errorMessage?: string;
  notice: string;
  field?: ControllerRenderProps<any, any>;
  myProfil?: boolean;
};
const SelectComponent = ({
  items,
  label,
  description,
  field,
  errorMessage,
  notice,
  myProfil,
}: props) => {
  return (
    <View style={{flexDirection: 'column'}}>
      <View
        style={[
          SelectStyles.container,
          {width: myProfil ? wp('100%') : wp('90%')},
        ]}>
        <Text style={SelectStyles.label}>{label}</Text>
        <Dropdown
          style={{width: '100%', zIndex: 10000}}
          placeholderStyle={{color: colors.dark, fontSize: fontSizes.info}}
          selectedTextStyle={{color: colors.dark, fontSize: fontSizes.text}}
          inputSearchStyle={{fontSize: fontSizes.info}}
          placeholder={description}
          data={items}
          search
          labelField="label"
          valueField="value"
          value={field?.value}
          onBlur={field?.onBlur}
          onChange={item => {
            field?.onChange(item.value);
          }}
        />
      </View>
      {errorMessage ? (
        <Text style={[styles.info, {color: colors.red}]}>{errorMessage}</Text>
      ) : (
        <Text style={[styles.info, {color: colors.gray}]} />
      )}
    </View>
  );
};

export default SelectComponent;
