import {createAsyncThunk} from '@reduxjs/toolkit';
import {CreateProfileResponse} from './CreateProfileResponse';
import {CreateProfileCommand} from './CreateProfileCommand';
import {UserApiGateway} from '../../../../domain/User/UserApiGateway';

export const createProfileAsync = createAsyncThunk<
  CreateProfileResponse,
  CreateProfileCommand
>(
  'user/profile/create',
  async (createProfileCommand: CreateProfileCommand, thunkApi: any) => {
    const userApiGateway: UserApiGateway = thunkApi.extra.userApiGatewayHttp;
    try {
      return userApiGateway.createProfile(createProfileCommand);
    } catch (error) {
      const result = {
        error: error,
      };
      return thunkApi.rejectWithValue(result);
    }
  },
);
