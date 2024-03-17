import {StyleSheet} from 'react-native';
import fontSizes from '../../constants/font-sizes';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const ButtonStyle = StyleSheet.create({
  container: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    padding: hp('2.5%'),
    width: wp('90%'),
  },
  inputText: {
    fontWeight: 'bold',
    fontSize: fontSizes.text,
  },
});

export default ButtonStyle;
