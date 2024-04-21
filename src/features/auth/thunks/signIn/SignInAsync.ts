import {createAsyncThunk} from '@reduxjs/toolkit';
import {AuthApiGateway} from '../../../../domain/Auth/AuthApiGateway';
import {SignInResponse} from './SignInResponse';
import {signInCommand} from './SignInCommand';

export const SignInAsync = createAsyncThunk<SignInResponse, signInCommand>(
  'auth/sign_in',
  async (SignInCommand: signInCommand, thunkApi: any) => {
    const authApiGatewayHttp: AuthApiGateway =
      thunkApi.extra.authApiGatewayHttp;
    try {
      return await authApiGatewayHttp.signIn(SignInCommand);
    } catch (error) {
      const err = error as any;
      const result: any = {
        message: err
      };
      return thunkApi.rejectWithValue(result);
    }
  },
);
