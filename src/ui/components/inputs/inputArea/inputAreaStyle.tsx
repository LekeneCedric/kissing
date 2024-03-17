import {StyleSheet} from 'react-native';
import GlobalStyles from '../../../Global/styles';

const styles = StyleSheet.create({
  container: GlobalStyles.inputAreaContainer,
  label: GlobalStyles.inputLabel,
  textInput: GlobalStyles.textAreaInput,
  inputView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  info: GlobalStyles.inputInfo,
});

export default styles;
