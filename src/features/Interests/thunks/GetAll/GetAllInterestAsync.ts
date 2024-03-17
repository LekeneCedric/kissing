import {createAsyncThunk} from '@reduxjs/toolkit';
import {GetAllInterestResponse} from './GetAllInterestResponse';
import {AuthApiGateway} from '../../../../domain/Auth/AuthApiGateway';
import {InterestApiGatewayHttp} from '../../../../infrastructure/interest/gateways/InterestApiGatewayHttp';

export const GetAllInterestAsync = createAsyncThunk<GetAllInterestResponse>(
  'interests/get-all',
  async (_, thunkApi: any) => {
    const interestApiGatewayHttp: InterestApiGatewayHttp =
      thunkApi.extra.interestsApiGatewayHttp;
    try {
      return await interestApiGatewayHttp.getAll();
    } catch (error) {
      const err = error as any;
      const result: any = {};
      return thunkApi.rejectWithValue(result);
    }
  },
);
