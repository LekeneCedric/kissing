import { StyleSheet } from "react-native";
import GlobalStyles from "../../../../Global/styles.tsx";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

const PaymentStyles = StyleSheet.create({
  container: GlobalStyles.pageContainer,
  backIcon: GlobalStyles.backIcon,
  logo: {
    position: 'relative',
    width: wp('25%'),
    height: wp('20%'),
    alignSelf: 'center',
    marginTop: hp('5%')
  },
});

export default PaymentStyles;
