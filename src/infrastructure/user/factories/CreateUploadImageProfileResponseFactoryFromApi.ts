import {UploadProfileImageResponse} from '../../../features/User/Thunks/UploadProfileImage/UploadProfileImageResponse';

export const CreateUploadImageProfileResponseFactoryFromApi = (data: any) => {
  return {
    id: data.id,
    image: data.profile_photo,
  } as UploadProfileImageResponse;
};
