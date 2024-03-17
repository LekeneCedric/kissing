import {Text, TouchableOpacity, View} from 'react-native';
import styles from './MenuItemStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import iconSize from '../../../../../constants/iconSize';

type props = {
  icon: string;
  title: string;
  description: string;
  action: () => void;
  color?: string;
};
const MenuItem = ({icon, title, description, action, color}: props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={action}>
      <View style={styles.subContainer1}>
        <Icon color={color} name={icon} size={iconSize.medium} />
      </View>
      <View style={styles.subContainer2}>
        <Text style={[styles.title, {color: color}]}>{title}</Text>
        {description.length > 0 && (
          <Text style={styles.description}>{description}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default MenuItem;
