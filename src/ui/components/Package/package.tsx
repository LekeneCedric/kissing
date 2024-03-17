import {
  heightPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Text, TouchableOpacity, View} from 'react-native';
import colors from '../../constants/colors';
import fontSizes from '../../constants/font-sizes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import icons from '../../constants/icons';
import iconSize from '../../constants/iconSize';
import React from 'react';
import styles from './packageStyle';
import PackageItem from './PackageItem/packageItem';

type PackageItem = {
  isCheck?: boolean;
  value: string;
};
type Package = {
  title: string;
  icon: string;
  description: string;
  price: string;
  items: PackageItem[];
  action: () => void;
  theme?: string;
};
const Package = ({
  title,
  icon,
  description,
  price,
  items,
  action,
  theme,
}: Package) => {
  return (
    <View style={styles.container}>
      <View style={[styles.container2, {borderColor: theme, borderWidth: 1}]}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, theme ? {color: theme} : {}]}>
            {' '}
            {title}
          </Text>
          <Icon
            name={icon}
            color={theme ? theme : colors.light}
            size={iconSize.normal}
          />
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={[styles.descriptionText]}>{description}</Text>
          <Text style={[styles.descriptionPrice]}> {price}</Text>
        </View>
        {items.map(item => (
          <PackageItem
            isCheck={item.isCheck}
            value={item.value}
            theme={theme}
          />
        ))}

        <TouchableOpacity onPress={action} style={[styles.button, {backgroundColor: theme}]}>
          <Text style={{color: colors.light, fontWeight: 'bold'}}>
            {' '}
            Souscrire{' '}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Package;
