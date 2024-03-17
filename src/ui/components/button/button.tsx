/* eslint-disable react/react-in-jsx-scope */
import {TouchableOpacity, Text, ActivityIndicator} from 'react-native';
import colors from '../../constants/colors';
import ButtonStyle from './buttonStyle';
import iconSize from '../../constants/iconSize';

type ButtonStyle = {
  textColor: string;
  isOutline: boolean;
  backgroundColor: string;
};

type ButtonProps = {
  label: string;
  handleClick: () => void;
  customStyle: ButtonStyle;
  isLoading: boolean;
};

const Button = ({label, handleClick, customStyle, isLoading}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        ButtonStyle.container,
        customStyle.isOutline
          ? {borderWidth: 1, borderColor: customStyle.backgroundColor}
          : {borderWidth: 0, backgroundColor: customStyle.backgroundColor},
      ]}
      onPress={handleClick}>
      {isLoading ? (
        <ActivityIndicator size={iconSize.normal} color={colors.light} />
      ) : (
        <Text
          style={[
            ButtonStyle.inputText,
            customStyle.isOutline
              ? {color: customStyle.backgroundColor}
              : {color: colors.light},
          ]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
