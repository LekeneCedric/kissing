import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderWidth: 0,
    borderColor: colors.light
  },
});

export default styles;
