import {createAsyncThunk} from '@reduxjs/toolkit';
import {ActivateAccountResponse} from './ActivateAccountResponse';
import {ActivateAccountCommand} from './ActivateAccountCommand';
import {AuthApiGateway} from '../../../../../domain/Auth/AuthApiGateway';

export const ActivateAccountAsync = createAsyncThunk<
  ActivateAccountResponse,
  ActivateAccountCommand
>(
  'auth/activate_account',
  async (activateAccountCommand: ActivateAccountCommand, thunkApi: any) => {
    const authApiGatewayHttp: AuthApiGateway =
      thunkApi.extra.authApiGatewayHttp;
    try {
      return await authApiGatewayHttp.activateAccount(activateAccountCommand);
    } catch (error) {
      const err = error as any;
      const result: any = {};
      return thunkApi.rejectWithValue(result);
    }
  },
);
