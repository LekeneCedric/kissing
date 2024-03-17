import * as yup from 'yup';

const passwordValidationRegex =
  /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,}$/;
export const InputSignInValidateSchema = yup.object({
  email: yup
    .string()
    .required('Votre adresse email est obligatoire !')
    .email('Veuillez entrez une addresse email valide !'),
  password: yup.string().required('Veuillez entrez votre mot de passe !'),
});
