import {HttpProvider} from '../../../shared/gateways/HttpProvider';
import {UserApiGateway} from '../../../domain/User/UserApiGateway';
import {CreateProfileCommand} from '../../../features/User/Thunks/CreateProfile/CreateProfileCommand';
import {CreateProfileResponse} from '../../../features/User/Thunks/CreateProfile/CreateProfileResponse';
import {UserApiRoutes} from '../../../ui/routes/ApiRoutes';
import {CreateProfileResponseFactoryFromApi} from '../factories/CreateProfileResponseFactoryFromApi';
import {UploadProfileImageCommand} from '../../../features/User/Thunks/UploadProfileImage/UploadProfileImageCommand';
import {UploadProfileImageResponse} from '../../../features/User/Thunks/UploadProfileImage/UploadProfileImageResponse';
import {CreateUploadImageProfileResponseFactoryFromApi} from '../factories/CreateUploadImageProfileResponseFactoryFromApi';
import {GetUserProfileCommand} from '../../../features/User/Thunks/GetUserProfile/GetUserProfileCommand';
import {GetUserProfileResponse} from '../../../features/User/Thunks/GetUserProfile/GetUserProfileResponse';
import {CreateGetUserProfileResponseFactoryFromApi} from '../factories/CreateGetUserProfileResponseFactoryFromApi';
import {CreateGetRecommendationResponseFactoryFromApi} from '../factories/CreateGetRecommendationResponseFactoryFromApi';
import {GetRecommendationsCommand} from '../../../features/User/Thunks/GetUserRecommandations/GetRecommendationsCommand';
import {GetRecommendationsResponse} from '../../../features/User/Thunks/GetUserRecommandations/GetRecommendationsResponse';
import GetRecommendationsQueryFilterBuilder from '../../../features/User/Thunks/GetUserRecommandations/GetRecommendationsQueryFilterBuilder';
import {GetMyUserProfileCommand} from '../../../features/User/Thunks/GetMyUserProfile/GetMyUserProfileCommand';
import {GetMyUserProfileResponse} from '../../../features/User/Thunks/GetMyUserProfile/GetMyUserProfileResponse';
import {CreateGetMyUserProfileResponseFactoryFromApi} from '../factories/createGetMyUserProfileResponseFactoryFromApi';
import {
  RemoveProfileImageCommand
} from "../../../features/User/Thunks/RemoveProfileImage/RemoveProfileImageCommand.ts";
import {
  RemoveProfileImageResponse
} from "../../../features/User/Thunks/RemoveProfileImage/RemoveProfileImageResponse.ts";
import { UpdateProfileCommand } from "../../../features/User/Thunks/UpdateProfile/UpdateProfileCommand.ts";
import { UpdateProfileResponse } from "../../../features/User/Thunks/UpdateProfile/UpdateProfileResponse.ts";

export class UserApiGatewayHttp extends HttpProvider implements UserApiGateway {
  async updateProfile(updateProfileCommand: UpdateProfileCommand): Promise<UpdateProfileResponse> {
    let result: any;
    const data = {
      id: updateProfileCommand.id,
      birthday: updateProfileCommand.birthday,
      about: updateProfileCommand.about,
      city: updateProfileCommand.city,
      sex: updateProfileCommand.sex,
      search_type: updateProfileCommand.search_type,
      interests: updateProfileCommand.interests
    };
    console.log('code237sdaadas',data);
    try {
      const response = await this.update(UserApiRoutes.updateProfile+'/'+data.id+'/', data);

      if (!response.status.toString().startsWith('2')) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      //@ts-ignore
      result = response.data;
    } catch (e) {
      throw new Error();
    }


    return {
      birthday: result.birthday,
      about: result.about,
      sex: result.sex,
      age: result.age,
      search_type: result.search_type,
      city: result.city,
      interests: result.interests,
    } as UpdateProfileResponse
  }

  async createProfile(
    createProfileCommand: CreateProfileCommand,
  ): Promise<CreateProfileResponse> {
    const {birthday, about, city, sex, search_type, interests} =
      createProfileCommand;
    let result: any;

    try {
      const data = {
        birthday: birthday,
        about: about,
        city: city,
        sex: sex,
        search_type: search_type,
        interests: interests,
      };
      console.log(data);
      const response = await this.post(UserApiRoutes.createProfile, data);

      if (!response.status.toString().startsWith('2')) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      //@ts-ignore
      result = response.data;
    } catch (e) {
      throw new Error();
    }

    return CreateProfileResponseFactoryFromApi(result);
  }

  async uploadProfilePhoto(
    uploadProfileImageCommand: UploadProfileImageCommand
  ): Promise<UploadProfileImageResponse> {
    const {name, type, uri} = uploadProfileImageCommand;
    let result: any;

    const formData = new FormData();
    // @ts-ignore
    formData.append('profile_photo', {
      name: name,
      type: type,
      uri: uri,
    });

    try {
      const response = await this.upload(
        UserApiRoutes.uploadProfilePhoto,
        formData,
      );
      if (!response.status.toString().startsWith('2')) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      //@ts-ignore
      result = response.data;
    } catch (e: any) {
      console.log(e);
      throw new Error(e.detail);
    }

    return CreateUploadImageProfileResponseFactoryFromApi(result);
  }

  async uploadImageProfile(
    uploadImageProfileCommand: UploadProfileImageCommand,
    token?: string,
  ): Promise<UploadProfileImageResponse> {
    const {name, type, uri} = uploadImageProfileCommand;
    let result: any;

    const formData = new FormData();
    // @ts-ignore
    formData.append('image', {
      name: name,
      type: type,
      uri: uri,
    });

    try {
      const response = await this.upload(
        UserApiRoutes.uploadImageProfile,
        formData,
      );
      if (!response.status.toString().startsWith('2')) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      //@ts-ignore
      result = response.data;
    } catch (e: any) {
      console.log(e);
      throw new Error(e.detail);
    }

    return CreateUploadImageProfileResponseFactoryFromApi(result);
  }

  async getUserProfile(
    getUserProfileCommand: GetUserProfileCommand,
  ): Promise<GetUserProfileResponse> {
    const {id} = getUserProfileCommand;
    let result: any;

    try {
      const response = await this.get(`${UserApiRoutes.getUserProfile}/${id}`);
      if (!response.status.toString().startsWith('2')) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      //@ts-ignore
      result = response.data;
    } catch (e: any) {
      console.log(e);
      throw new Error(e.detail);
    }

    return CreateGetUserProfileResponseFactoryFromApi(result);
  }

  async getRecommendations(
    getRecommendationsCommand: GetRecommendationsCommand,
  ): Promise<GetRecommendationsResponse> {
    const query = GetRecommendationsQueryFilterBuilder.asQueryFilter()
      .withLimit(getRecommendationsCommand.limit)
      .withOffset(getRecommendationsCommand.offset)
      .withCity(getRecommendationsCommand.city)
      .withInterests(getRecommendationsCommand.interests)
      .withSearchType(getRecommendationsCommand.search_type)
      .withMinOld(getRecommendationsCommand.min_old)
      .withMaxOld(getRecommendationsCommand.max_old)
      .buildCommand();

    let result: any;

    try {
      const response = await this.get(
        `${UserApiRoutes.getRecommandation}/${query}`,
      );
      if (!response.status.toString().startsWith('2')) {
        throw new Error(
          'Une érreur est survenue lors du traitement de votre requête , veuillez ressayer plus tard!',
        );
      }
      //@ts-ignore
      result = response.data;
    } catch (e: any) {
      console.log(e.detail);
      throw new Error(e.detail);
    }

    return CreateGetRecommendationResponseFactoryFromApi(result);
  }

  async getMyUserProfile(
    getMyUserProfileCommand: GetMyUserProfileCommand,
  ): Promise<GetMyUserProfileResponse> {
    let result: any;

    try {
      const response = await this.get(UserApiRoutes.getMyUserProfile);
      if (!response.status.toString().startsWith('2')) {
        throw new Error(
          'Une érreur est survenue lors du traitement de votre requête , veuillez ressayer plus tard!',
        );
      }
      //@ts-ignore
      result = response.data;
    } catch (e: any) {
      throw new Error(e.detail);
    }

    return CreateGetMyUserProfileResponseFactoryFromApi(result);
  }

  async removeImageProfile(
    removeProfileImageCommand: RemoveProfileImageCommand,
  ): Promise<RemoveProfileImageResponse> {
    let result: any;

    try {
      const response = await this.delete(UserApiRoutes.deleteImageProfile+removeProfileImageCommand.imageId);
      if (!response.status.toString().startsWith('2')) {
        throw new Error(
          'Une érreur est survenue lors du traitement de votre requête , veuillez ressayer plus tard!',
        );
      }
      console.log(response.data);
      //@ts-ignore
      result = response.data;
    } catch (e: any) {
      console.log(e);
      throw new Error(e.detail);
    }

    return {} as RemoveProfileImageResponse;
  }
}
