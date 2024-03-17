import {StyleSheet} from 'react-native';
import GlobalStyles from '../../../Global/styles';
import colors from '../../../constants/colors';
import fontSizes from '../../../constants/font-sizes';

const styles = StyleSheet.create({
  container: GlobalStyles.inputContainer,
  label: GlobalStyles.inputLabel,
  textInput: GlobalStyles.textInput,
  info: GlobalStyles.inputInfo,
  textInputInfo: GlobalStyles.textInputInfo,
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    color: colors.principal,
    fontSize: fontSizes.text,
    fontWeight: 'bold',
  },
});

export default styles;
