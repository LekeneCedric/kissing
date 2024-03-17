import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../constants/colors';
import fontSizes from '../constants/font-sizes';

const GlobalStyles = StyleSheet.create({
  pageContainer: {
    backgroundColor: colors.light,
    flex: 1,
    padding: wp('2%'),
    flexDirection: 'column',
  },
  backIcon: {
    borderWidth: 1,
    borderColor: colors.principal,
    width: wp('14%'),
    height: hp('6%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: wp('2%'),
    borderRadius: 20,
  },
  inputGlobalContainer: {
    flexDirection: 'column',
    width: wp('90%'),
  },
  inputContainer: {
    borderWidth: 1,
    height: hp('7%'),
    width: wp('90%'),
    borderRadius: 10,
    marginTop: hp('1%'),
    marginBottom: hp('1%'),
    borderColor: colors.principal,
    position: 'relative',
    padding: wp('1%'),
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  inputAreaContainer: {
    borderWidth: 1,
    height: hp('15%'),
    width: wp('90%'),
    borderRadius: 10,
    marginTop: hp('1%'),
    marginBottom: hp('1%'),
    borderColor: colors.principal,
    position: 'relative',
    padding: wp('1%'),
    flexDirection: 'row',
    alignSelf: 'center',
  },
  inputLabel: {
    position: 'absolute',
    fontSize: fontSizes.text,
    color: colors.principal,
    backgroundColor: colors.light,
    fontWeight: '400',
    top: -hp('1.5%'),
    left: wp('6%'),
    paddingLeft: 20,
    paddingRight: 20,
  },
  textInput: {
    paddingLeft: wp('2%'),
    fontSize: fontSizes.text,
    color: colors.dark,
  },
  textAreaInput: {
    paddingLeft: wp('2%'),
    fontSize: fontSizes.text,
    color: colors.dark,
    textAlignVertical: 'top',
  },
  inputInfo: {
    textAlign: 'center',
    fontSize: fontSizes.info,
  },
  textInputInfo: {
    textAlign: 'center',
    fontSize: fontSizes.text,
    color: colors.gray,
  },
});

export default GlobalStyles;
