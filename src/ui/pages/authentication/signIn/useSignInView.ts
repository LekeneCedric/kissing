import {useForm, UseFormReturn} from 'react-hook-form';
import {InputSignInForm} from '../../../../infrastructure/validators/form/auth/signIn/InputSignInForm';
import {yupResolver} from '@hookform/resolvers/yup';
import {InputSignInValidateSchema} from '../../../../infrastructure/validators/form/auth/signIn/InputSignInValidateSchema';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../../../app/hook';
import {SignInAsync} from '../../../../features/auth/thunks/signIn/SignInAsync';
import {
  selectAuth,
  selectAuthLoading,
  selectUser,
} from '../../../../features/auth/thunks/AuthenticationSelectors';
import {LoadingState} from '../../../../shared/enum/LoadingState';
import {Auth} from '../../../../domain/Auth/Auth';
import {useToast} from 'react-native-toast-notifications';
import {
  cleanAuth,
  setupMyAuthUserProfile,
} from '../../../../features/auth/thunks/AuthenticationSlice';
import {GetMyUserProfileAsync} from '../../../../features/User/Thunks/GetMyUserProfile/GetMyUserProfileAsync';
import {GetAllInterestAsync} from '../../../../features/Interests/thunks/GetAll/GetAllInterestAsync';
import {GetMyUserProfileResponse} from '../../../../features/User/Thunks/GetMyUserProfile/GetMyUserProfileResponse';
import { GetAllFavorisAsync } from "../../../../features/Favoris/thunks/GetAll/GetAllFavorisAsync.ts";
import { GetAllFavorisResponse } from "../../../../features/Favoris/thunks/GetAll/GetAllFavorisResponse.ts";
import { GetAllBlockedUsersAsync } from "../../../../features/Blocked/thunks/GetAll/GetAllBlockedUsersAsync.ts";
import { setupMyUserProfile } from "../../../../features/User/UserSlice.ts";
import { setMyId } from "../../../../features/Messages/MessagesSlice.ts";
import { setMyNotificationId } from "../../../../features/Notifications/NotificationSlice.ts";

export interface SignInViewBehaviours {
  form: UseFormReturn<InputSignInForm>;
  goBack: () => void;
  onSubmit: (data: InputSignInForm) => void;
  loading: LoadingState;
  auth: Auth | undefined;
}

export default function   useSignInView(): SignInViewBehaviours {
  const navigation = useNavigation();
  const auth: Auth | undefined = useAppSelector(selectAuth);
  const loading = useAppSelector(selectAuthLoading);
  const toast = useToast();
  const dispatch = useAppDispatch();
  const form = useForm<InputSignInForm>({
    resolver: yupResolver(InputSignInValidateSchema),
  });
  const onSubmit = async (data: InputSignInForm) => {
    dispatch(cleanAuth());
    const response = await dispatch(SignInAsync(data));
    if (SignInAsync.fulfilled.match(response)) {
      try {
        const userDataResponse = await dispatch(GetMyUserProfileAsync({}));
        console.log(userDataResponse.payload);
        dispatch(
          setupMyAuthUserProfile(
            userDataResponse.payload as GetMyUserProfileResponse,
          ),
        );
        dispatch(
          setupMyUserProfile(
            userDataResponse.payload as GetMyUserProfileResponse,
          ),
        );
        dispatch(setMyId(userDataResponse.payload!.id!));
        dispatch(setMyNotificationId(userDataResponse.payload!.id!));
        dispatch(GetAllFavorisAsync({}));
        dispatch(GetAllBlockedUsersAsync({}));
        dispatch(GetAllInterestAsync());
        toast.show('Bienvenue', {
          type: 'success',
          placement: 'top',
          duration: 3000,
          animationType: 'slide-in',
        });
      } catch (e) {
        toast.show(
          'Une érreur est survenue lors du traitement de votre opération , veuillez réessayer',
          {
            type: 'danger',
            placement: 'top',
            duration: 3000,
            animationType: 'slide-in',
          },
        );
        dispatch(cleanAuth());
      }
    }
    if (SignInAsync.rejected.match(response)) {
      toast.show(
        'Impossible de se connecter , veuillez réessayer !',
        {
          type: 'danger',
          placement: 'top',
          duration: 3000,
          animationType: 'slide-in',
        },
      );
    }
  };
  const goBack = () => navigation.goBack();

  return {
    form: form,
    onSubmit: onSubmit,
    goBack: goBack,
    loading: loading,
    auth: auth,
  };
}
