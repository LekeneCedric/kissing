import {StyleSheet} from 'react-native';
import fontSizes from '../../../../../constants/font-sizes';
import colors from '../../../../../constants/colors';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('3%'),
  },
  subContainer1: {
    width: '13%',
  },
  subContainer2: {},
  title: {
    fontSize: fontSizes.text,
    color: colors.principal,
  },
  description: {
    fontSize: fontSizes.description,
    color: colors.gray,
  },
});

export default styles;
