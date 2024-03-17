import {createAsyncThunk} from '@reduxjs/toolkit';
import {UserApiGateway} from '../../../../domain/User/UserApiGateway';
import {RemoveProfileImageResponse} from './RemoveProfileImageResponse';
import {RemoveProfileImageCommand} from './RemoveProfileImageCommand';

export const removeProfileImageAsync = createAsyncThunk<
  RemoveProfileImageResponse,
  RemoveProfileImageCommand
>(
  'user/profile/remove-image',
  async (
    removeProfileImageCommand: RemoveProfileImageCommand,
    thunkApi: any,
  ) => {
    const userApiGateway: UserApiGateway = thunkApi.extra.userApiGatewayHttp;

    try {
      return userApiGateway.removeImageProfile(removeProfileImageCommand);
    } catch (error) {
      const result = {
        error: error,
      };
      return thunkApi.rejectWithValue(result);
    }
  },
);
