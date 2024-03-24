import {UploadProfileImageResponse} from '../../../features/User/Thunks/UploadProfileImage/UploadProfileImageResponse';

export const CreateUploadImageProfileResponseFactoryFromApi = (data: any) => {
  //console.log(data);
  return {
    id: data.id,
    image: data.image,
    is_main_photo: data.is_main_photo,
  } as UploadProfileImageResponse;
};
