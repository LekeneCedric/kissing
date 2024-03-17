import {createAsyncThunk} from '@reduxjs/toolkit';
import {UploadProfileImageResponse} from './UploadProfileImageResponse';
import {UploadProfileImageCommand} from './UploadProfileImageCommand';
import {UserApiGateway} from '../../../../domain/User/UserApiGateway';

export const UploadProfileImageAsync = createAsyncThunk<
  UploadProfileImageResponse,
  UploadProfileImageCommand
>(
  'user/profile/upload-image',
  async (
    uploadProfileImageCommand: UploadProfileImageCommand,
    thunkApi: any,
  ) => {
    const userApiGateway: UserApiGateway = thunkApi.extra.userApiGatewayHttp;
    try {
      return userApiGateway.uploadImageProfile(uploadProfileImageCommand);
    } catch (error) {
      const result = {
        error: error,
      };
      return thunkApi.rejectWithValue(result);
    }
  },
);
