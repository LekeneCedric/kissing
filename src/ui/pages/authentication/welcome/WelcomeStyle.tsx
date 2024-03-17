import {StyleSheet} from 'react-native';
import fontSizes from '../../../constants/font-sizes';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  logo: {
    marginTop: hp('10%'),
    width: wp('50%'),
    height: hp('20%'),
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingLeft: wp('2%'),
    paddingRight: wp('2%'),
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: fontSizes.title,
    color: 'black',
    textAlign: 'center',
  },
});

export default styles;
