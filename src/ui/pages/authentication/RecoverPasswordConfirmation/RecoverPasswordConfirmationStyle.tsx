import { StyleSheet } from "react-native";
import GlobalStyles from "../../../Global/styles.tsx";
import fontSizes from "../../../constants/font-sizes.ts";
import colors from "../../../constants/colors.ts";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

const styles = StyleSheet.create({
  container: GlobalStyles.pageContainer,
  backIcon: GlobalStyles.backIcon,
  title: {
    fontSize: fontSizes.title,
    color: colors.dark,
    fontWeight: 'bold',
    marginTop: hp('2%'),
  },
  description: {
    fontSize: fontSizes.text,
    color: colors.gray,
    marginTop: hp('2%'),
    marginLeft: wp('2%'),
  },
});

export default styles;
