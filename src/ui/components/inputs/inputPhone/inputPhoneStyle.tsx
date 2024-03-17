import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import colors from '../../../constants/colors';
import fontSizes from '../../../constants/font-sizes';
import GlobalStyles from '../../../Global/styles';

const styles = StyleSheet.create({
  inputGlobalContainer: GlobalStyles.inputGlobalContainer,
  container: GlobalStyles.inputContainer,
  inputHeader: GlobalStyles.inputLabel,
  phoneCodeContainer: {
    width: wp('37%'),
  },
  phoneNumberContainer: {
    borderLeftWidth: 1,
    borderLeftColor: colors.principal,
    paddingLeft: 10,
    justifyContent: 'center',
    width: wp('50%'),
  },
  inputText: {
    color: colors.dark,
    fontSize: fontSizes.inputLabel,
    textAlignVertical: 'center',
  },
  info: GlobalStyles.inputInfo,
});

export default styles;
