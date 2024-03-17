import {SignInViewBehaviours} from '../useSignInView';
import Input from '../../../../components/inputs/input/input';
import icons from '../../../../constants/icons';
import {View} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import InputPassword from '../../../../components/inputs/inputPassword/inputPassword';
import Button from '../../../../components/button/button';
import colors from '../../../../constants/colors';
import React from 'react';
import {Controller} from 'react-hook-form';
import {LoadingState} from '../../../../../shared/enum/LoadingState';

const SignInForm = ({
  signInViewBehaviours,
}: {
  signInViewBehaviours: SignInViewBehaviours;
}) => {
  const {form, onSubmit, loading} = signInViewBehaviours;
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = form;

  return (
    <View style={{flexDirection: 'column'}}>
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

      <View style={{marginTop: heightPercentageToDP('5%')}} />

      <Button
        isLoading={loading == LoadingState.pending}
        label="Se connecter"
        handleClick={handleSubmit(onSubmit)}
        customStyle={{
          textColor: colors.light,
          backgroundColor: colors.principal,
          isOutline: false,
        }}
      />
    </View>
  );
};

export default SignInForm;
