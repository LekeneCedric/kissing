import {Text, TextInput, View} from 'react-native';
import styles from '../inputArea/inputAreaStyle';
import {
  heightPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../../constants/colors';
import React from 'react';

type props = {
  label: string;
  placeholder: string;
  value: string;
  onchange: (value: string) => void;
};
export const SimpleInputArea = ({
  label,
  placeholder,
  value,
  onchange,
}: props) => {
  return (
    <View style={{flexDirection: 'column'}}>
      <View style={[styles.container, {width: wp('90%'), marginBottom: 0}]}>
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
            value={value}
            onChangeText={onchange}
          />
        </View>
      </View>
    </View>
  );
};
export default SimpleInputArea;
