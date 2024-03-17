import {StyleSheet} from 'react-native';
import GlobalStyles from '../../../Global/styles';
import fontSizes from '../../../constants/font-sizes';
import colors from '../../../constants/colors';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const SelectStyles = StyleSheet.create({
  container: GlobalStyles.inputContainer,
  label: GlobalStyles.inputLabel,
  description: {
    fontSize: fontSizes.text,
    color: colors.gray,
    marginLeft: wp('3%'),
  },
  selectElement: {
    color: colors.dark,
    fontWeight: 'bold',
    fontSize: fontSizes.text,
  },
});

export default SelectStyles;
