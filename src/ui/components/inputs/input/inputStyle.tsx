import {StyleSheet} from 'react-native';
import GlobalStyles from '../../../Global/styles';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import colors from '../../../constants/colors';
import fontSizes from '../../../constants/font-sizes';

const styles = StyleSheet.create({
  container: GlobalStyles.inputContainer,
  label: GlobalStyles.inputLabel,
  textInput: GlobalStyles.textInput,
  inputView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: GlobalStyles.inputInfo,
});

export default styles;
