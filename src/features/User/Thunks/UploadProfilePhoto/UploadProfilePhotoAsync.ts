import { createAsyncThunk } from "@reduxjs/toolkit";
export const UploadProfilePhotoAsync = createAsyncThunk<
  UploadProfileImageResponse,
  UploadProfileImageCommand
>(
  'user/profile/upload-profile',
  async(
    uploadProfileImageCommand: UploadProfileImageCommand,
    thunkApi: any) => {
    const userApiGateway: UserApiGateway = thunkApi.extra.userApiGatewayHttp;
    try {
      return userApiGateway.uploadProfilePhoto(uploadProfileImageCommand)
    } catch (error) {
      const result = {
        error: error,
      };
      return thunkApi.rejectWithValue(result);
    }
  }
)
import { UploadProfileImageCommand } from "../UploadProfileImage/UploadProfileImageCommand.ts";
import { UploadProfileImageResponse } from "../UploadProfileImage/UploadProfileImageResponse.ts";

import { UserApiGateway } from "../../../../domain/User/UserApiGateway.ts";
