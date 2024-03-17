import * as yup from 'yup';
export const RecoverPasswordSendEmailValidateSchema = yup.object({
  email: yup
    .string()
    .required('Votre adresse email est obligatoire !')
    .email('Veuillez entrez une addresse email valide !'),
})
