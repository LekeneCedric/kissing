import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetAllSubscriptionResponse } from "./GetAllSubscriptionResponse.ts";
import { SubscriptionApiGateway } from "../../../../domain/Subscription/SubscriptionApiGateway.ts";

export const GetAllSubscriptionAsync = createAsyncThunk<GetAllSubscriptionResponse>(
  'subscription/get-all',
  async(_, thunkApi: any) => {
    const subscriptionApiGatewayHttp: SubscriptionApiGateway =
      thunkApi.extra.subscriptionApiGatewayHttp;
    try {
      return await subscriptionApiGatewayHttp.getAll();
    } catch (error) {
      const err = error as any;
      const result: any = {};
      return thunkApi.rejectWithValue(result);
    }
  }
)
