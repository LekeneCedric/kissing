import { createAsyncThunk } from "@reduxjs/toolkit";
import { AddBlockedUserResponse } from "./AddBlockedUserResponse.ts";
import { AddBlockedUserCommand } from "./AddBlockedUserCommand.ts";
import { BlockedApiGateway } from "../../../../domain/Blocked/BlockedApiGateway.ts";

export const AddBlockedUserAsync = createAsyncThunk<
  AddBlockedUserResponse,
  AddBlockedUserCommand
>(
  'users/add-blocked-users',
  async(addBlockedUserCommand: AddBlockedUserCommand, thunkApi: any) => {
    const blockedApiGatewayHttp: BlockedApiGateway =
      thunkApi.extra.blockedApiGatewayHttp;
    try{
      return await blockedApiGatewayHttp.addBlockedUser(addBlockedUserCommand)
    } catch (error) {
      const err = error as any;
      const result: any = {};
      return thunkApi.rejectWithValue(result);
    }
  }
)
