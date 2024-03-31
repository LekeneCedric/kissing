import {useForm, UseFormReturn} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {InputSignUpForm} from '../../../../infrastructure/validators/form/auth/signUp/InputSignUpForm';
import {InputSignUpValidateSchema} from '../../../../infrastructure/validators/form/auth/signUp/InputSignUpValidateSchema';
import {useDispatch} from 'react-redux';
import {SignUpAsync} from '../../../../features/auth/thunks/signUp/SignUpAsync';
import {useAppDispatch, useAppSelector} from '../../../../app/hook';
import {selectAuthLoading} from '../../../../features/auth/thunks/AuthenticationSelectors';
import {LoadingState} from '../../../../shared/enum/LoadingState';
import useNavigate from '../../../Global/hooks/useNavigation';
import {Routes} from '../../../routes/Router';
import {useToast} from 'react-native-toast-notifications';
import { GetMyUserProfileAsync } from "../../../../features/User/Thunks/GetMyUserProfile/GetMyUserProfileAsync.ts";
import { setMyId } from "../../../../features/Messages/MessagesSlice.ts";
import { setMyNotificationId } from "../../../../features/Notifications/NotificationSlice.ts";

export interface SignUpViewBehaviour {
  form: UseFormReturn<InputSignUpForm>;
  onSubmit: (value: InputSignUpForm) => void;
  loading: LoadingState;
}

const useSignUpView = (): SignUpViewBehaviour => {
  const form = useForm<InputSignUpForm>({
    resolver: yupResolver(InputSignUpValidateSchema),
  });
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const loading = useAppSelector(selectAuthLoading);
  const toast = useToast();
  const onSubmit = async (data: InputSignUpForm) => {
    const response = await dispatch(SignUpAsync(data));
   // console.log(response);
    if (SignUpAsync.fulfilled.match(response)) {
      // navigation.goTo(Routes.Auth.activateAccount);
      const userDataResponse = await dispatch(GetMyUserProfileAsync({}));
      dispatch(setMyId(userDataResponse.payload!.id!));
      dispatch(setMyNotificationId(userDataResponse.payload!.id!));
    }
    if (!SignUpAsync.fulfilled.match(response)) {
      toast.show(
        'Une erreur est survenue lors du traitement de votre requète , reessayez !',
        {
          type: 'danger',
          placement: 'top',
          duration: 4000,
          animationType: 'slide-in',
        },
      );
    }
  };
  return {
    form: form,
    onSubmit: onSubmit,
    loading: loading,
  };
};

export default useSignUpView;
