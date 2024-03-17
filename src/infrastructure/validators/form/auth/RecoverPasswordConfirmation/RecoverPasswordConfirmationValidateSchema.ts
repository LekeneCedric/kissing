import * as yup from 'yup';
export const RecoverPasswordConfirmationValidateSchema = yup.object({
  email: yup.string().email().required('Veuillez entrer votre addresse email'),
  code: yup.string().required('Veuillez entrer votre code de confirmation'),
  new_password: yup
    .string()
    .required('Veuillez entrer votre mot de passe'),
  re_new_password: yup
    .string()
    .oneOf(
      [yup.ref('password')],
      'Cette confirmation ne correspond pas a votre mot de passe !',
    )
    .required('Veuillez confirmer votre mot de passe !'),
})
