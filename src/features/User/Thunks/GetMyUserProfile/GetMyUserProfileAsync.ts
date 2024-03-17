import {createAsyncThunk} from '@reduxjs/toolkit';
import {GetMyUserProfileResponse} from './GetMyUserProfileResponse';
import {GetMyUserProfileCommand} from './GetMyUserProfileCommand';
import {UserApiGateway} from '../../../../domain/User/UserApiGateway';

export const GetMyUserProfileAsync = createAsyncThunk<
  GetMyUserProfileResponse,
  GetMyUserProfileCommand
>(
  'user-profile/me',
  async (getMyUserProfileCommand: GetMyUserProfileCommand, thunkApi: any) => {
    const userApiGateway: UserApiGateway = thunkApi.extra.userApiGatewayHttp;
    try {
      return userApiGateway.getMyUserProfile(getMyUserProfileCommand);
    } catch (error) {
      const result = {
        error: error,
      };
      return thunkApi.rejectWithValue(result);
    }
  },
);
