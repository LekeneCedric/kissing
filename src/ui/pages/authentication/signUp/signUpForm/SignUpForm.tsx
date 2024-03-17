import {SignUpViewBehaviour} from '../useSignUpView';
import icons from '../../../../constants/icons';
import Input from '../../../../components/inputs/input/input';
import InputPassword from '../../../../components/inputs/inputPassword/inputPassword';
import InputPhone from '../../../../components/inputs/inputPhone/inputPhone';
import {Text, TouchableOpacity, View} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Button from '../../../../components/button/button';
import colors from '../../../../constants/colors';
import styles from '../SignUpStyle';
import {Controller} from 'react-hook-form';
import React from 'react';
import {LoadingState} from '../../../../../shared/enum/LoadingState';
import useNavigate from '../../../../Global/hooks/useNavigation';
import {Routes} from '../../../../routes/Router';

const SignUpForm = ({
  signUpViewBehavior,
}: {
  signUpViewBehavior: SignUpViewBehaviour;
}) => {
  const {goTo} = useNavigate();
  const {form, loading, onSubmit} = signUpViewBehavior;
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = form;
  return (
    <View style={{flexDirection: 'column', alignItems: 'center'}}>
      {/*<SelectOption*/}
      {/*    defaultValue={"m"}*/}
      {/*    onChangeValue={(value: string) => {*/}
      {/*        setGender(value)*/}
      {/*    }}*/}
      {/*    options={[*/}
      {/*        {label: 'Homme', icon: icons.boy, value: 'm'},*/}
      {/*        {label: 'Femme', icon: icons.girl, value: 'f'}*/}
      {/*    ]}/>*/}
      <View style={{marginTop: heightPercentageToDP('2%')}} />

      <Controller
        name={'username'}
        control={control}
        render={({field}) => (
          <Input
            label={"Nom d'utilisateur"}
            placeholder={"Entrez votre nom d'utilisateur"}
            icon={icons.account}
            type={'default'}
            field={field}
            errorMessage={errors.username?.message}
          />
        )}
      />
      <View style={{marginTop: heightPercentageToDP('2%')}} />

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
      <View style={{marginTop: heightPercentageToDP('2%')}} />

      <Controller
        name={'phone_number'}
        control={control}
        render={({field}) => (
          <InputPhone
            placeholder={'Numéro de Téléphone'}
            label={'Numéro de téléphone'}
            type={'phone-pad'}
            errorMessage={errors.phone_number?.message}
            field={field}
          />
        )}
      />
      <View style={{marginTop: heightPercentageToDP('2%')}} />

      <Controller
        name={'password'}
        control={control}
        render={({field}) => (
          <InputPassword
            label={'Mot de passe'}
            errorMessage={errors.password?.message}
            field={field}
          />
        )}
      />
      <View style={{marginTop: heightPercentageToDP('2%')}} />

      <Controller
        name={'re_password'}
        control={control}
        render={({field}) => (
          <InputPassword
            label={'confirmation du mot de passe'}
            errorMessage={errors.re_password?.message}
            field={field}
          />
        )}
      />

      <View style={{marginTop: heightPercentageToDP('2%')}} />

      <Button
        isLoading={loading == LoadingState.pending}
        label={'Creer mon compte'}
        handleClick={handleSubmit(onSubmit)}
        customStyle={{
          textColor: colors.light,
          backgroundColor: colors.principal,
          isOutline: false,
        }}
      />

      <View style={{marginTop: heightPercentageToDP('1%')}} />

      <View style={styles.inlineRow}>
        <Text style={styles.createAccountDescription}>
          Vous avez dejà un compte ?
        </Text>
        <TouchableOpacity onPress={() => goTo(Routes.Auth.login)}>
          <Text style={styles.createAccountText}>Connectez vous</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpForm;
