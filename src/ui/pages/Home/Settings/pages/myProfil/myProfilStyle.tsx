import {StyleSheet} from 'react-native';
import GlobalStyles from '../../../../../Global/styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import fontSizes from '../../../../../constants/font-sizes';
import colors from '../../../../../constants/colors';

const styles = StyleSheet.create({
  container: GlobalStyles.pageContainer,
  backIcon: GlobalStyles.backIcon,
  userName: {
    marginTop: hp('1%'),
    fontWeight: '200',
    fontSize: fontSizes.sectionTitle,
  },
  button: {
    backgroundColor: colors.principal,
    padding: 10,
    borderRadius: 100,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: fontSizes.sectionTitle,
  },
  addImageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: colors.principal,
    borderRadius: 10,
    marginLeft: wp('4%'),
  },
  subTitle: {
    fontSize: fontSizes.sectionTitle,
    fontWeight: 'bold',
  },
});

export default styles;
