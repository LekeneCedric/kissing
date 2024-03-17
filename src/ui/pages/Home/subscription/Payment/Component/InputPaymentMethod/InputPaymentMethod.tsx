import { Image, Text, TextInput, View } from "react-native";
import colors from "../../../../../../constants/colors.ts";
import styles from "./InputPaymentMethodStyle.tsx";
import { PaymentTypeEnum } from "../../../../../../../domain/Payment/PaymentTypeEnum.ts";

type InputPaymentMethodProps = {
  paymentType: PaymentTypeEnum
}
const InputPaymentMethod = ({ paymentType }: InputPaymentMethodProps) => {

  return (
    <View style={{ width: "90%" }}>
      <Text> Numéro de payement </Text>
      <View style={{
        borderWidth: 0.5,
        borderColor: colors.gray,
        padding: 5,
        borderRadius: 10,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center"
      }}>
        <TextInput
          keyboardType={"number-pad"}
          cursorColor={colors.principal}
          placeholder={"Entrez le numéro de payement"}
          placeholderTextColor={colors.gray}
          style={styles.textInput}
        />
        {
          paymentType === PaymentTypeEnum.ORANGE_MONEY ?
            <Image
              source={
                require("../../../../../../../assets/logo/orange-money.png")
              }
              style={{
                width: "20%",
                height: 35
              }}
            />
            :
            <Image
              source={
                require("../../../../../../../assets/logo/mtn-money.png")
              }
              style={{
                width: "20%",
                height: 35
              }}
            />
        }
      </View>
    </View>
  );
};

export default InputPaymentMethod;
