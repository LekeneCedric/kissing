import {StyleSheet} from 'react-native';
import fontSizes from '../../../constants/font-sizes';
import GlobalStyles from '../../../Global/styles';

const styles = StyleSheet.create({
  title: {
    fontSize: fontSizes.title,
    fontWeight: 'bold',
    flex: 5,
    textAlign: 'center',
  },
  container: GlobalStyles.pageContainer,
});

export default styles;
