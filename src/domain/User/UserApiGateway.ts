import {CreateProfileCommand} from '../../features/User/Thunks/CreateProfile/CreateProfileCommand';
import {CreateProfileResponse} from '../../features/User/Thunks/CreateProfile/CreateProfileResponse';
import {UploadProfileImageCommand} from '../../features/User/Thunks/UploadProfileImage/UploadProfileImageCommand';
import {UploadProfileImageResponse} from '../../features/User/Thunks/UploadProfileImage/UploadProfileImageResponse';
import {GetUserProfileCommand} from '../../features/User/Thunks/GetUserProfile/GetUserProfileCommand';
import {GetUserProfileResponse} from '../../features/User/Thunks/GetUserProfile/GetUserProfileResponse';
import {GetRecommendationsCommand} from '../../features/User/Thunks/GetUserRecommandations/GetRecommendationsCommand';
import {GetRecommendationsResponse} from '../../features/User/Thunks/GetUserRecommandations/GetRecommendationsResponse';
import {GetMyUserProfileCommand} from '../../features/User/Thunks/GetMyUserProfile/GetMyUserProfileCommand';
import {GetMyUserProfileResponse} from '../../features/User/Thunks/GetMyUserProfile/GetMyUserProfileResponse';
import {RemoveProfileImageCommand} from '../../features/User/Thunks/RemoveProfileImage/RemoveProfileImageCommand';
import {RemoveProfileImageResponse} from '../../features/User/Thunks/RemoveProfileImage/RemoveProfileImageResponse';
import { UpdateProfileCommand } from "../../features/User/Thunks/UpdateProfile/UpdateProfileCommand.ts";
import { UpdateProfileResponse } from "../../features/User/Thunks/UpdateProfile/UpdateProfileResponse.ts";

export interface UserApiGateway {
  createProfile: (
    createProfileCommand: CreateProfileCommand,
  ) => Promise<CreateProfileResponse>;
  uploadImageProfile: (
    uploadImageProfileCommand: UploadProfileImageCommand,
  ) => Promise<UploadProfileImageResponse>;
  getUserProfile: (
    getUserProfileCommand: GetUserProfileCommand,
  ) => Promise<GetUserProfileResponse>;
  getRecommendations: (
    getRecommendationsCommand: GetRecommendationsCommand,
  ) => Promise<GetRecommendationsResponse>;
  getMyUserProfile: (
    getMyUserProfileCommand: GetMyUserProfileCommand,
  ) => Promise<GetMyUserProfileResponse>;
  removeImageProfile: (
    removeProfileImageCommand: RemoveProfileImageCommand,
  ) => Promise<RemoveProfileImageResponse>;
  updateProfile: (
    updateProfileCommand: UpdateProfileCommand,
  ) => Promise<UpdateProfileResponse>;
  uploadProfilePhoto: (uploadProfileImageCommand: UploadProfileImageCommand) => Promise<UploadProfileImageResponse>;
}
