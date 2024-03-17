import {StyleSheet} from 'react-native';
import GlobalStyles from '../../../Global/styles';
import colors from '../../../constants/colors';
import fontSizes from '../../../constants/font-sizes';

const styles = StyleSheet.create({
  container: GlobalStyles.pageContainer,
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: colors.dark,
    fontSize: fontSizes.title,
  },
});

export default styles;
