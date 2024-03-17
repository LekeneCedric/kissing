import {createAsyncThunk} from '@reduxjs/toolkit';
import {GetRecommendationsResponse} from './GetRecommendationsResponse';
import {GetRecommendationsCommand} from './GetRecommendationsCommand';
import {UserApiGateway} from '../../../../domain/User/UserApiGateway';

export const GetRecommendationsAsync = createAsyncThunk<
  GetRecommendationsResponse,
  GetRecommendationsCommand
>(
  'recommendations',
  async (
    getRecommendationsCommand: GetRecommendationsCommand,
    thunkApi: any,
  ) => {
    const userApiGateway: UserApiGateway = thunkApi.extra.userApiGatewayHttp;
    try {
      return userApiGateway.getRecommendations(getRecommendationsCommand);
    } catch (error) {
      const result = {
        error: error,
      };
      return thunkApi.rejectWithValue(result);
    }
  },
);
