import {GetUserProfileResponse} from '../../../features/User/Thunks/GetUserProfile/GetUserProfileResponse';

export const CreateGetUserProfileResponseFactoryFromApi = (data: any) => {
  return {
    id: data.id,
    user: {
      id: data.user.id,
      username: data.user.username,
      email: data.user.email,
      age: data.age,
      phone_number: data.user.phone_number,
    },
    age: data.age,
    birthday: data.birthday,
    city: data.city,
    about: data.about,
    interests: data.interests,
    sex: data.sex,
    search_type: data.search_type,
    images: data.images,
  } as GetUserProfileResponse;
};
