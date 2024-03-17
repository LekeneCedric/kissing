import * as yup from 'yup';

const passwordValidationRegex =
  /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,}$/;
const phoneNumberRegex = /^\+237[2368]\d{8}$/;
export const InputSignUpValidateSchema = yup.object({
  username: yup.string().required("Veuillez entrer votre nom d'utilisateur"),
  email: yup.string().email().required('Veuillez entrer votre addresse email'),
  phone_number: yup
    .string()
    .matches(
      phoneNumberRegex,
      'Le numéro de téléphone ne correspond pas a un numéro de téléphone camerounais !',
    )
    .required('Veuillez entrer votre numéro de téléphone'),
  password: yup
    .string()
    .matches(
      passwordValidationRegex,
      'Le mot de passe doit comporter au moins 6 caractères et inclure une lettre majuscule, un chiffre numérique et un caractère spécial ( ex : Mot de passe@123)',
    )
    .required('Veuillez entrer votre mot de passe'),
  re_password: yup
    .string()
    .oneOf(
      [yup.ref('password')],
      'Cette confirmation ne correspond pas a votre mot de passe !',
    )
    .required('Veuillez confirmer votre mot de passe !'),
});
