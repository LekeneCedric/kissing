import { StyleSheet } from "react-native";
import GlobalStyles from "../../../../../../Global/styles.tsx";
import colors from "../../../../../../constants/colors.ts";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    flex: 1,
    flexDirection: 'column',
  },
  logo: {
    position: 'relative',
    width: wp('25%'),
    height: wp('20%'),
    alignSelf: 'center',
    marginTop: hp('5%')
  },
});

export default styles;
