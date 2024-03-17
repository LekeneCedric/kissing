import {StyleSheet} from 'react-native';
import GlobalStyles from '../../../../Global/styles';
import colors from '../../../../constants/colors';
import fontSizes from '../../../../constants/font-sizes';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: GlobalStyles.pageContainer,
  backIcon: GlobalStyles.backIcon,
  scroolView: {},
  title: {
    fontSize: fontSizes.title,
    color: colors.dark,
    fontWeight: 'bold',
    marginTop: hp('2%'),
  },

  sectionTitle: {
    fontSize: fontSizes.sectionTitle,
    color: colors.dark,
    fontWeight: 'bold',
    marginTop: hp('2%'),
  },
  info: {
    fontSize: fontSizes.info,
    color: colors.gray,
    fontWeight: '300',
    justifyContent: 'center',
    textAlign: 'center',
  },
  favButton: {
    borderRadius: 100,
    backgroundColor: colors.light,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: -20,
    left: wp('20%'),
    right: wp('66%'),
    height: 40,
  },
  messageButton: {
    borderRadius: 100,
    backgroundColor: colors.light,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: -20,
    left: wp('66%'),
    right: wp('20%'),
    height: 40,
  },
  username: {
    fontSize: fontSizes.title,
    marginTop: hp('4%'),
  },
  subTitle: {
    fontSize: fontSizes.sectionTitle,
    fontWeight: 'bold',
  },
});

export default styles;
