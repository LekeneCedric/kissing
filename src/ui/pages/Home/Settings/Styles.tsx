import {StyleSheet} from 'react-native';
import GlobalStyles from '../../../Global/styles';
import fontSizes from '../../../constants/font-sizes';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const styles = StyleSheet.create({
  container: GlobalStyles.pageContainer,
  userName: {
    marginTop: hp('1%'),
    fontWeight: 'bold',
    fontSize: fontSizes.title,
  },
  menuListStyle: {
    padding: wp('4%'),
    width: '100%',
  },
  logo: {
    position: 'relative',
    width: wp('25%'),
    height: wp('20%'),
  },
});

export default styles;
