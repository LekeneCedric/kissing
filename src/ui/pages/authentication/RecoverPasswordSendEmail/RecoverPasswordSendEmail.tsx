import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from './RecoverPasswordSendEmailStyle.tsx';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { heightPercentageToDP, widthPercentageToDP as wp } from "react-native-responsive-screen";
import icons from "../../../constants/icons.ts";
import colors from "../../../constants/colors.ts";
import useNavigate from "../../../Global/hooks/useNavigation.tsx";
import useRecoverPasswordSendEmailView from "./useRecoverPasswordSendEmailView.ts";
import { Controller } from "react-hook-form";
import Input from "../../../components/inputs/input/input.tsx";
import { LoadingState } from "../../../../shared/enum/LoadingState.ts";
import Button from "../../../components/button/button.tsx";
import React from "react";
const RecoverPasswordSendEmail = () => {
  const {goBack, goTo} = useNavigate();
  const { form, onSubmit, loading } = useRecoverPasswordSendEmailView();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = form;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity onPress={goBack} style={styles.backIcon}>
            <Icon size={wp('10%')} name={icons.back} color={colors.principal} />
          </TouchableOpacity>
          <Text style={styles.title}> Confirmer votre adresse email</Text>
          <Text style={styles.description}>
            Vous recevrez un code par mail vous permettant de reinitialiser votre mot de passe
          </Text>

          <View style={{marginTop: 80, flexDirection: 'column'}}>
            <Controller
              name={'email'}
              control={control}
              render={({field}) => (
                <Input
                  placeholder={'Entrez votre addresse email'}
                  label={'Adresse email'}
                  icon={icons.email}
                  type={'email-address'}
                  errorMessage={errors.email?.message}
                  field={field}
                />
              )}
            />

            <View style={{marginTop: heightPercentageToDP('5%')}} />

            <Button
              isLoading={loading == LoadingState.pending}
              label="confirmer mon e-mail"
              handleClick={handleSubmit(onSubmit)}
              customStyle={{
                textColor: colors.light,
                backgroundColor: colors.principal,
                isOutline: false,
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
};

export default RecoverPasswordSendEmail;
