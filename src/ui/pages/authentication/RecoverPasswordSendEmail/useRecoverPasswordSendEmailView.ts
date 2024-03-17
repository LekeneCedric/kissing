import { useForm, UseFormReturn } from "react-hook-form";
import {
  RecoverPasswordSendEmailForm
} from "../../../../infrastructure/validators/form/auth/RecoverPasswordSendEmail/RecoverPasswordSendEmailForm.ts";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  RecoverPasswordSendEmailValidateSchema
} from "../../../../infrastructure/validators/form/auth/RecoverPasswordSendEmail/RecoverPasswordSendEmailValidateSchema.ts";
import { useAppDispatch, useAppSelector } from "../../../../app/hook.ts";
import { selectAuthLoading } from "../../../../features/auth/thunks/AuthenticationSelectors.ts";
import { LoadingState } from "../../../../shared/enum/LoadingState.ts";
import {
  RecoverPasswordSendEmailAsync
} from "../../../../features/auth/thunks/RecoverPasswordSendEmail/RecoverPasswordSendEmailAsync.ts";
import { useToast } from "react-native-toast-notifications";
import useNavigate from "../../../Global/hooks/useNavigation.tsx";

interface RecoverPasswordSendEmailBehaviour {
  form: UseFormReturn<RecoverPasswordSendEmailForm>;
  onSubmit: (data: RecoverPasswordSendEmailForm) => void;
  loading: LoadingState;
}
export default function  useRecoverPasswordSendEmailView(): RecoverPasswordSendEmailBehaviour {
  const {goTo} = useNavigate();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const loading = useAppSelector(selectAuthLoading);
  const form = useForm<RecoverPasswordSendEmailForm>({
    resolver: yupResolver(RecoverPasswordSendEmailValidateSchema),
  });

  const onSubmit = async (data: RecoverPasswordSendEmailForm) => {
    const response = await dispatch(RecoverPasswordSendEmailAsync(data));

    if (RecoverPasswordSendEmailAsync.rejected.match(response)) {
      toast.show(
        'Une erreur est survenue lors du traitement de votre requête, veuillez reessayer !',
        {
          type: 'danger',
          placement: 'top',
          duration: 3000,
          animationType: 'slide-in',
        },
      );
    }
    if (RecoverPasswordSendEmailAsync.fulfilled.match(response)) {
      toast.show('Code de réinitialisation envoyé avec succès !', {
        type: 'success',
        placement: 'top',
        duration: 3000,
        animationType: 'slide-in',
      });
      goTo('recover-password-confirmation', {
        email: data.email
      });
    }
  }

  return {
    form: form,
    onSubmit: onSubmit,
    loading: loading,
  }
}
