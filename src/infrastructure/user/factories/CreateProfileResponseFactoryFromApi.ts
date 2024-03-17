import {CreateProfileResponse} from '../../../features/User/Thunks/CreateProfile/CreateProfileResponse';

export const CreateProfileResponseFactoryFromApi = (data: any) => {
  return {
    birthday: data.birthday,
    age: data.age,
    about: data.about,
    sex: data.sex,
    search_type: data.search_type,
    interests: data.interests,
  } as CreateProfileResponse;
};
