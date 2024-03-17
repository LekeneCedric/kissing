import {StyleSheet} from 'react-native';
import GlobalStyles from '../../../Global/styles';
import colors from '../../../constants/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import fontSizes from '../../../constants/font-sizes';

const styles = StyleSheet.create({
  container: GlobalStyles.pageContainer,
  backIcon: GlobalStyles.backIcon,
  timer: {
    fontWeight: 'bold',
    color: colors.dark,
    fontSize: fontSizes.large,
  },
  textDescription: {
    textAlign: 'center',
    color: colors.gray,
    fontSize: fontSizes.text,
  },
  codeCell: {
    borderWidth: 1,
    borderRadius: 10,
    flex: 1,
    borderColor: colors.principal,
    margin: wp('4%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  codeCellValue: {
    fontSize: fontSizes.large,
    alignSelf: 'center',
  },
  digitsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  digitCell: {
    flex: 1,
    margin: wp('5%'),
    alignItems: 'center',
  },
  digitCellValue: {
    color: colors.dark,
    fontSize: fontSizes.medium,
    fontWeight: 'bold',
  },
});

export default styles;
