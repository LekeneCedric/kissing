import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import icons from '../../../constants/icons';
import colors from '../../../constants/colors';
import iconSize from '../../../constants/iconSize';
import {Text, View} from 'react-native';
import fontSizes from '../../../constants/font-sizes';
import React from 'react';

type props = {
  isCheck?: boolean;
  value: string;
  theme?: string;
};
const PackageItem = ({isCheck, value, theme}: props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {isCheck !== undefined && (
        <Icon
          name={isCheck ? icons.simpleCheck : icons.close}
          color={theme ? theme : colors.light}
          size={iconSize.normal}
        />
      )}
      <Text
        style={{color: theme ? theme : colors.light, fontSize: fontSizes.text}}>
        {' '}
        {value}{' '}
      </Text>
    </View>
  );
};

export default PackageItem;
