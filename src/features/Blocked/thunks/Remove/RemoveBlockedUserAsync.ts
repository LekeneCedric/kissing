import {createAsyncThunk} from '@reduxjs/toolkit';
import { BlockedApiGateway } from "../../../../domain/Blocked/BlockedApiGateway.ts";
import { RemoveBlockedUserResponse } from "./RemoveBlockedUserResponse.ts";
import { RemoveBlockedUserCommand } from "./RemoveBlockedUserCommand.ts"
export const RemoveBlockedUserAsync = createAsyncThunk <
  RemoveBlockedUserResponse,
  RemoveBlockedUserCommand
>(
  "blocked/remove",
    async (removeBlockedUserCommand: RemoveBlockedUserCommand, thunkApi: any) => {
      const blockedApiGatewayHttp: BlockedApiGateway =
        thunkApi.extra.blockedApiGatewayHttp;
      try {
        return await blockedApiGatewayHttp.remove(removeBlockedUserCommand);
      } catch (error) {
        const err = error as any;
        const result: any = {};
        return thunkApi.rejectWithValue(result);
      }
    }
);
