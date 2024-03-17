import {StyleSheet} from 'react-native';
import fontSizes from '../../../../../constants/font-sizes';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import colors from '../../../../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    width: widthPercentageToDP('32%'),
    backgroundColor: colors.light,
  },
  username: {
    fontSize: fontSizes.text,
  },
});

export default styles;
