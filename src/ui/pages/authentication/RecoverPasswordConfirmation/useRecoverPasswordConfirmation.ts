import { useForm, UseFormReturn } from "react-hook-form";
import {
  RecoverPasswordConfirmationForm
} from "../../../../infrastructure/validators/form/auth/RecoverPasswordConfirmation/RecoverPasswordConfirmationForm.ts";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  RecoverPasswordConfirmationValidateSchema
} from "../../../../infrastructure/validators/form/auth/RecoverPasswordConfirmation/RecoverPasswordConfirmationValidateSchema.ts";
import { useAppDispatch, useAppSelector } from "../../../../app/hook.ts";
import { selectAuthLoading } from "../../../../features/auth/thunks/AuthenticationSelectors.ts";
import { useToast } from "react-native-toast-notifications";
import { LoadingState } from "../../../../shared/enum/LoadingState.ts";
import {
  RecoverPasswordConfirmationAsync
} from "../../../../features/auth/thunks/RecoverPasswordConfirmation/RecoverPasswordConfirmationAsync.ts";
import useNavigate from "../../../Global/hooks/useNavigation.tsx";
import { AuthenticationRoutes } from "../../../routes/Router.ts";
import { useRoute } from "@react-navigation/native";
import {
  RecoverPasswordConfirmationCommand
} from "../../../../features/auth/thunks/RecoverPasswordConfirmation/RecoverPasswordConfirmationCommand.ts";

interface useRecoverPasswordConfirmationBehavior {
  form: UseFormReturn<RecoverPasswordConfirmationForm>;
  onSubmit: (data: RecoverPasswordConfirmationForm) => void;
  loading: LoadingState;
}
export const useRecoverPasswordConfirmation = (): useRecoverPasswordConfirmationBehavior => {
    const route = useRoute();
    //@ts-ignore
    const email = route!.params!.email;
    const {goTo} = useNavigate();
    const dispatch = useAppDispatch();
    const toast = useToast();
    const loading = useAppSelector(selectAuthLoading);
    const form = useForm<RecoverPasswordConfirmationForm>({
      resolver: yupResolver(RecoverPasswordConfirmationValidateSchema),
    });

    const onSubmit = async (data: RecoverPasswordConfirmationForm) => {
      const formData: RecoverPasswordConfirmationCommand = {
        ...data,
        email: email
      }
      const response = await dispatch(RecoverPasswordConfirmationAsync(formData));

      if (RecoverPasswordConfirmationAsync.fulfilled.match(response)) {
        toast.show(
          'Mot de passe changé avec succès !',
          {
            type: 'success',
            placement: 'top',
            duration: 3000,
            animationType: 'slide-in',
          },
        );
        goTo(AuthenticationRoutes.login);
      }
      if (RecoverPasswordConfirmationAsync.rejected.match(response)) {
        toast.show(
          response?.payload?.message?.message,
          {
            type: 'danger',
            placement: 'top',
            duration: 3000,
            animationType: 'slide-in',
          },
        );
      }
    }

    return {
      form: form,
      onSubmit: onSubmit,
      loading: loading
    }
}
