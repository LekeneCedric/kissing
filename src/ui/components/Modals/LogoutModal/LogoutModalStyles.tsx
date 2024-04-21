import { StyleSheet } from "react-native";
import colors from "../../../constants/colors.ts";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import FontSizes from "../../../constants/font-sizes.ts";
import Colors from "../../../constants/colors.ts";
import fontSizes from "../../../constants/font-sizes.ts";

const styles = StyleSheet.create({
  modalContainer: {
    width: wp('100%'),
    height: hp('100%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'column',
    width: wp('80%'),
    height: hp('35%'),
    marginTop: hp('32%'),
    alignSelf: 'center',
    backgroundColor: colors.light,
    shadowColor: '#171717',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: wp('10%'),
    elevation: 10
  },
  title: {
    fontSize: FontSizes.text,
    fontWeight: 'bold',
    color: Colors.principal,
    marginLeft: wp('3%'),
    marginTop: wp('3%'),
    marginBottom: hp('2%')
  },
  description: {
    fontSize: FontSizes.text,
    fontWeight: 'normal',
    color: Colors.dark,
    marginLeft: wp('3%'),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: wp('3%'),
    marginTop: hp('2%'),
  },
  disableButton: {
    backgroundColor: colors.gray,
    borderRadius: 10,
    padding: wp('3%')
  },
  disableText: {
    color: colors.light,
    fontWeight: 'bold',
    fontSize: fontSizes.sectionTitle
  },
  validateButton: {
    backgroundColor: colors.red,
    borderRadius: 10,
    padding: wp('3%')
  },
  validateText: {
    color: colors.light,
    fontWeight: 'bold',
    fontSize: fontSizes.sectionTitle
  }
});
export default styles;
