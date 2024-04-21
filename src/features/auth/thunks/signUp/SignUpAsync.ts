import {createAsyncThunk} from '@reduxjs/toolkit';
import {SignUpResponse} from './SignUpResponse';
import {signUpCommand} from './SignUpCommand';
import {AuthApiGateway} from '../../../../domain/Auth/AuthApiGateway';

export const SignUpAsync = createAsyncThunk<SignUpResponse, signUpCommand>(
  'auth/sign_up',
  async (signUpCommand: signUpCommand, thunkApi: any) => {
    const authApiGatewayHttp: AuthApiGateway =
      thunkApi.extra.authApiGatewayHttp;

    try {
      return await authApiGatewayHttp.signUp(signUpCommand);
    } catch (error) {
      const err = error as any;
      const result: any = {
        message: err
      };
      return thunkApi.rejectWithValue(result);
    }
  },
);
