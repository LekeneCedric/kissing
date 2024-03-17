import {GetMyUserProfileResponse} from '../../../features/User/Thunks/GetMyUserProfile/GetMyUserProfileResponse';

export const CreateGetMyUserProfileResponseFactoryFromApi = (
  result: any,
): GetMyUserProfileResponse => {
  return {
    user: result.user,
    age: result.age,
    city: result.city,
    about: result.about,
    interests: result.interests,
    sex: result.sex,
    search_type: result.search_type,
    images: result.images,
  } as GetMyUserProfileResponse;
};
