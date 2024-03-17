import { createAsyncThunk } from "@reduxjs/toolkit";
import { BlockedApiGateway } from "../../../../domain/Blocked/BlockedApiGateway.ts";
import { GetAllBlockedUserCommand } from "./GetAllBlockedUserCommand.ts";
import { GetAllBlockedUserResponse } from "./GetAllBlockedUserResponse.ts";

export const GetAllBlockedUsersAsync = createAsyncThunk<
  GetAllBlockedUserResponse,
  GetAllBlockedUserCommand
>(
  'blocked/all',
  async (getAllBlockedUserCommand, thunkApi: any) => {
    const blockedApiGateway: BlockedApiGateway = thunkApi.extra.blockedApiGatewayHttp;
    try {
      return await blockedApiGateway.all(getAllBlockedUserCommand);
    } catch (error) {
      const err = error as any;
      const result: any = {};
      return thunkApi.rejectWithValue(result);
    }
  }
)
