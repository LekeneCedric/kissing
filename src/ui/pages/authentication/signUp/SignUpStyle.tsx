import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../constants/colors';
import fontSizes from '../../../constants/font-sizes';
import GlobalStyles from '../../../Global/styles';
const styles = StyleSheet.create({
  container: GlobalStyles.pageContainer,
  backIcon: GlobalStyles.backIcon,
  inlineRow: {
    flexDirection: 'row',
  },
  createAccountDescription: {
    fontSize: fontSizes.text,
    color: colors.dark,
  },
  createAccountText: {
    color: colors.principal,
    fontSize: fontSizes.text,
    fontWeight: 'bold',
    marginLeft: wp('2%'),
  },
});

export default styles;
