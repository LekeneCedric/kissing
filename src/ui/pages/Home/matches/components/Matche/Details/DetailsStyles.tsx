import {Platform, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import GlobalStyles from '../../../../../../Global/styles';
import fontSizes from '../../../../../../constants/font-sizes';
import colors from '../../../../../../constants/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    flex: 1,
  },
  logo: {
    position: 'relative',
    width: wp('25%'),
    height: wp('20%'),
    alignSelf: 'center',
    marginBottom: hp('2%'),
  },
  backIcon: GlobalStyles.backIcon,
  detailsIcon: {
    width: wp('14%'),
    height: hp('6%'),
    alignItems: 'center',
    justifyContent: 'center',
    right: wp('2%'),
    borderRadius: 20,
  },
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
    left: wp('10%'),
    right: wp('76%'),
    height: 40,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  messageButton: {
    borderRadius: 100,
    backgroundColor: colors.light,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: -20,
    left: wp('42%'),
    right: wp('42%'),
    height: 40,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  blockButton: {
    borderRadius: 100,
    backgroundColor: colors.light,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: -20,
    left: wp('76%'),
    right: wp('10%'),
    height: 40,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
      },
      android: {
        elevation: 5,
      },
    }),
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
