import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserApiGateway } from "../../../../domain/User/UserApiGateway.ts";
import { UpdateProfileCommand } from "./UpdateProfileCommand.ts";
import { UpdateProfileResponse } from "./UpdateProfileResponse.ts";

export const UpdateProfileAsync = createAsyncThunk<
  UpdateProfileResponse,
  UpdateProfileCommand
>(
  'user/profile/update',
  async(
    updateProfileCommand: UpdateProfileCommand,
    thunkApi: any
  ) => {
    const userApiGateway: UserApiGateway = thunkApi.extra.userApiGatewayHttp;
    try {
      return userApiGateway.updateProfile(updateProfileCommand);
    } catch (error) {
      const result = {
        error: error,
      };
      return thunkApi.rejectWithValue(result);
    }
  }
)
