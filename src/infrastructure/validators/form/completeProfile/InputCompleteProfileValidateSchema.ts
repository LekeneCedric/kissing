import * as yup from 'yup';

const dateSchema = yup.string().transform((originalValue, originalObject) => {
  // Use a regular expression to match the date pattern "YYYY-DD-MM"
  const dateRegex = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;

  // Check if the date string matches the pattern
  const match = originalValue.match(dateRegex);

  // If the date string doesn't match the pattern, return undefined
  if (!match) {
    return undefined;
  }

  // Extract the year, day, and month from the matched groups
  const year = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const day = parseInt(match[3], 10);

  // Create a JavaScript Date object using the extracted values
  const date = new Date(year, month - 1, day);

  // Check if the date is valid (accounting for month indexing starting from 0)
  if (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  ) {
    // If the date is valid, return it as a string
    return originalValue;
  }

  return undefined;
});
export const InputCompleteProfileValidateSchema = yup.object({
  city: yup.string().required('Veuillez selectionez la ville ou vous residez !'),
  birthday: dateSchema.required('Entrez une date de naissance valide'),
  about: yup
    .string()
    .required('Veuillez entrez une description de vous !')
    .min(30, 'Votre description doit au moins contenir 30 lettres !')
    .max(200, 'Votre description doit au maximum contenir 200 lettres !'),
  sex: yup.string().required('Veuillez selectionner votre sexe !'),
  search_type: yup
    .string()
    .required('Veuillez selectionner ce que vous rechercher !'),
  interests: yup
    .array()
    .of(yup.number().integer('Veuillez selectionner vos intérêts !'))
    .min(1, 'Selectionnez au moins 1 intérêt !'),
  // images: yup.number().min(0, 'Veuillez selectionner au moins 4 photos !'),
});
