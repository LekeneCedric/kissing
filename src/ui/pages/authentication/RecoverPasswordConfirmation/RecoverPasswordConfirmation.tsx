import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "./RecoverPasswordConfirmationStyle.tsx";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { heightPercentageToDP, widthPercentageToDP as wp } from "react-native-responsive-screen";
import icons from "../../../constants/icons.ts";
import colors from "../../../constants/colors.ts";
import React from "react";
import useNavigate from "../../../Global/hooks/useNavigation.tsx";
import { useRecoverPasswordConfirmation } from "./useRecoverPasswordConfirmation.ts";
import Input from "../../../components/inputs/input/input.tsx";
import { Controller } from "react-hook-form";
import InputPassword from "../../../components/inputs/inputPassword/inputPassword.tsx";
import Button from "../../../components/button/button.tsx";
import { LoadingState } from "../../../../shared/enum/LoadingState.ts";

const RecoverPasswordConfirmation = () => {
  const { goBack, goTo } = useNavigate();
  const {
    form,
    onSubmit,
    loading,
    email
  } = useRecoverPasswordConfirmation();
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = form;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity onPress={goBack} style={styles.backIcon}>
            <Icon size={wp("10%")} name={icons.back} color={colors.principal} />
          </TouchableOpacity>
          <Text style={styles.title}> Changer de mot de passe </Text>
          <Text style={styles.description}>
            Un code de vérification vous à été envoyé à l'addresse .... ,
            renseignez le avec votre nouveau mot de passe
          </Text>
        </View>
        <View style={{ marginTop: 80, flexDirection: "column", alignItems: "center" }}>
          <Controller
            name={"code"}
            control={control}
            render={({ field }) => (
              <Input
                label={"Code de confirmation"}
                placeholder={"Entrez votre code de confirmation"}
                icon={icons.account}
                type={"default"}
                field={field}
                errorMessage={errors.code?.message}
              />
            )}
          />
          <View style={{ marginTop: heightPercentageToDP("2%") }} />

          <Controller
            name={"email"}
            control={control}
            render={({ field }) => {
              field.value = email;
              return (
                <Input
                  editable={false}
                  placeholder={"Entrez votre addresse email"}
                  label={"Adresse email"}
                  icon={icons.email}
                  type={"email-address"}
                  errorMessage={errors.email?.message}
                  field={field}
                />
              )
            }}
          />

          <Controller
            name={"new_password"}
            control={control}
            render={({ field }) => (
              <InputPassword
                label={"Nouveau mot de passe"}
                errorMessage={errors.new_password?.message}
                field={field}
              />
            )}
          />
          <View style={{ marginTop: heightPercentageToDP("2%") }} />

          <Controller
            name={"re_new_password"}
            control={control}
            render={({ field }) => (
              <InputPassword
                label={"confirmation du nouveau mot de passe"}
                errorMessage={errors.re_new_password?.message}
                field={field}
              />
            )}
          />

          <View style={{ marginTop: heightPercentageToDP("2%") }} />

          <Button
            isLoading={loading == LoadingState.pending}
            label={"Modifier mot de passe"}
            handleClick={handleSubmit(onSubmit)}
            customStyle={{
              textColor: colors.light,
              backgroundColor: colors.principal,
              isOutline: false
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecoverPasswordConfirmation;
