import {StyleSheet} from 'react-native';
import GlobalStyles from '../../../Global/styles';
import fontSizes from '../../../constants/font-sizes';
import colors from '../../../constants/colors';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: GlobalStyles.pageContainer,
  title: {
    fontSize: fontSizes.title,
    fontWeight: 'bold',
    flex: 5,
    textAlign: 'center',
  },
  titleDescription: {
    fontSize: fontSizes.text,
    color: colors.gray,
    marginTop: hp('2%'),
  },
});

export default styles;
