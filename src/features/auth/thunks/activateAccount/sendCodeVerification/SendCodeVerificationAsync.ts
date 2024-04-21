import {createAsyncThunk} from '@reduxjs/toolkit';
import {SendCodeVerificationCommand} from './SendCodeVerificationCommand';
import {SendCodeVerificationResponse} from './SendCodeVerificationResponse';
import {AuthApiGateway} from '../../../../../domain/Auth/AuthApiGateway';

export const SendCodeVerificationAsync = createAsyncThunk<
  SendCodeVerificationResponse,
  SendCodeVerificationCommand
>(
  'auth/resend_verification',
  async (
    sendCodeVerificationCommand: SendCodeVerificationCommand,
    thunkApi: any,
  ) => {
    const authApiGatewayHttp: AuthApiGateway =
      thunkApi.extra.authApiGatewayHttp;
    try {
      return await authApiGatewayHttp.sendCodeVerification(
        sendCodeVerificationCommand,
      );
    } catch (error) {
      const err = error as any;
      const result: any = {
        message: err
      };
      return thunkApi.rejectWithValue(result);
    }
  },
);
