import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthApiGateway } from "../../../../domain/Auth/AuthApiGateway.ts";
import { RecoverPasswordConfirmationCommand } from "./RecoverPasswordConfirmationCommand.ts";
import { RecoverPasswordConfirmationResponse } from "./RecoverPasswordConfirmationResponse.ts";

export const RecoverPasswordConfirmationAsync = createAsyncThunk<
  RecoverPasswordConfirmationResponse,
  RecoverPasswordConfirmationCommand
>(
  'auth/recover-password-confimation',
  async(recoverPasswordConfirmationCommand: RecoverPasswordConfirmationCommand, thunkApi: any) => {
    const authApiGatewayHttp: AuthApiGateway = thunkApi.extra.authApiGatewayHttp;
    try {
      return await authApiGatewayHttp.recoverPasswordConfirmation(recoverPasswordConfirmationCommand);
    } catch (error) {
      const err = error as any;
      const result: any = {
        message: err
      };
      return thunkApi.rejectWithValue(result);
    }
  }
)
