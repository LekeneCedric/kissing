import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthApiGateway } from "../../../../domain/Auth/AuthApiGateway.ts";
import { RecoverPasswordSendEmailResponse } from "./RecoverPasswordSendEmailResponse.ts";
import { RecoverPasswordSendEmailCommand } from "./RecoverPasswordSendEmailCommand.ts";

export const RecoverPasswordSendEmailAsync = createAsyncThunk<
  RecoverPasswordSendEmailResponse,
  RecoverPasswordSendEmailCommand
>(
  'auth/recover-password-send-email',
  async (recoverPasswordSendEmailCommand: RecoverPasswordSendEmailCommand, thunkApi: any) => {
    const authApiGatewayHttp: AuthApiGateway = thunkApi.extra.authApiGatewayHttp;
    try {
      return await authApiGatewayHttp.recoverPasswordSendEmail(recoverPasswordSendEmailCommand);
    } catch (error) {
      const err = error as any;
      const result: any = {};
      return thunkApi.rejectWithValue(result);
    }
  }
)
