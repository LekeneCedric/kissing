import {createAsyncThunk} from '@reduxjs/toolkit';
import {GetUserProfileResponse} from './GetUserProfileResponse';
import {GetUserProfileCommand} from './GetUserProfileCommand';
import {UserApiGateway} from '../../../../domain/User/UserApiGateway';

export const GetUserProfileAsync = createAsyncThunk<
  GetUserProfileResponse,
  GetUserProfileCommand
>(
  'user/profile/get-profile',
  async (getUserProfileCommand: GetUserProfileCommand, thunkApi: any) => {
    const userApiGateway: UserApiGateway = thunkApi.extra.userApiGatewayHttp;
    try {
      return userApiGateway.getUserProfile(getUserProfileCommand);
    } catch (error) {
      const result = {
        error: error,
      };
      return thunkApi.rejectWithValue(result);
    }
  },
);
