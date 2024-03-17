import {ControllerRenderProps} from 'react-hook-form';
import {Text, View} from 'react-native';
import SelectStyles from './selectStyle';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Dropdown} from 'react-native-element-dropdown';
import colors from '../../../constants/colors';
import fontSizes from '../../../constants/font-sizes';
import styles from '../../inputs/inputArea/inputAreaStyle';
import React, {useState} from 'react';

export type items = {
  key?: string;
  label: string;
  value: string;
};
type props = {
  items: items[];
  label: string;
  description: string;
  onChange: (value: items) => void;
  value_: items;
};
const SimpleSelectComponent = ({
  items,
  label,
  description,
  value_,
  onChange,
}: props) => {
  const [value, setValue] = useState('');
  return (
    <View style={{flexDirection: 'column'}}>
      <View style={[SelectStyles.container, {width: wp('90%')}]}>
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
          value={value_}
          onChange={item => {
            setValue(value);
            onChange(item);
          }}
        />
      </View>
    </View>
  );
};
export default SimpleSelectComponent;
