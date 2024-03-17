import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../../constants/colors';
import fontSizes from '../../../constants/font-sizes';
import GlobalStyles from '../../../Global/styles';

const styles = StyleSheet.create({
  container: GlobalStyles.pageContainer,
  backIcon: GlobalStyles.backIcon,
  title: {
    fontSize: fontSizes.title,
    color: colors.dark,
    fontWeight: 'bold',
    marginTop: hp('2%'),
  },
  description: {
    fontSize: fontSizes.text,
    color: colors.gray,
    marginTop: hp('2%'),
    marginLeft: wp('2%'),
  },
  forgetPasswordText: {
    color: colors.principal,
    fontSize: fontSizes.text,
    fontWeight: 'bold',
  },
  inlineRow: {
    flexDirection: 'row',
  },
  createAccountDescription: {
    fontSize: fontSizes.text,
    fontWeight: '400',
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
