import {View} from 'react-native';
import styles from './isOnlineIndicatorStyle';
import colors from '../../constants/colors';

type props = {
  isOnline: boolean;
};
const IsOnlineIndicator = ({isOnline}: props) => {
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isOnline ? colors.green : colors.red},
      ]}
    />
  );
};

export default IsOnlineIndicator;
