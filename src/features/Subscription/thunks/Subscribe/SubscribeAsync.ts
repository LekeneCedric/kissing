import { createAsyncThunk } from "@reduxjs/toolkit";
import { SubscribeResponse } from "./SubscribeResponse.ts";
import { SubscribeCommand } from "./SubscribeCommand.ts";
import { SubscriptionApiGateway } from "../../../../domain/Subscription/SubscriptionApiGateway.ts";

export const SubscribeAsync = createAsyncThunk<SubscribeResponse, SubscribeCommand>(
  'subscription/subscribe',
  async (subscribeCommand: SubscribeCommand, thunkApi: any) => {
    const subscritionApiGatewayHttp: SubscriptionApiGateway = thunkApi.extra
      .subscriptionApiGatewayHttp;
    try {
      return await subscritionApiGatewayHttp.subscribe(subscribeCommand);
    } catch (error) {
      const err = error as any;
      const result: any = {};
      return thunkApi.rejectWithValue(result);
    }
  }
)
