import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoadingState } from "../../shared/enum/LoadingState.ts";
import { GetAllSubscriptionAsync } from "./thunks/GetAll/GetAllSubscriptionAsync.ts";
import { GetAllSubscriptionResponse } from "./thunks/GetAll/GetAllSubscriptionResponse.ts";
import { Subscription } from "../../domain/Subscription/Subscription.ts";
import { SubscribeAsync } from "./thunks/Subscribe/SubscribeAsync.ts";
import { SubscribeResponse } from "./thunks/Subscribe/SubscribeResponse.ts";

interface SubscriptionState {
  loading: LoadingState,
  subscriptions: Subscription[];
}
const initialState: SubscriptionState = {
  loading: LoadingState.idle,
  subscriptions: [],
}
export const SubscriptionSlice = createSlice({
  name: 'subscriptionsSlice',
  initialState: initialState,
  reducers: {

  },
  extraReducers: builder => {
    builder
      .addCase(GetAllSubscriptionAsync.pending, state => {
        state.loading = LoadingState.pending;
      })
      .addCase(GetAllSubscriptionAsync.fulfilled, (state, {payload}: PayloadAction<GetAllSubscriptionResponse>) => {
        state.loading = LoadingState.success;
        state.subscriptions = [
          ...payload.subscriptions
        ];
      })
      .addCase(GetAllSubscriptionAsync.rejected, state => {
        state.loading = LoadingState.failed;
      })
    builder
      .addCase(SubscribeAsync.pending, state => {
        state.loading = LoadingState.pending
      })
      .addCase(SubscribeAsync.fulfilled, (state, {payload}: PayloadAction<SubscribeResponse>) => {
        state.loading = LoadingState.success;
      })
      .addCase(SubscribeAsync.rejected, state => {
        state.loading = LoadingState.failed;
      })
  }
});

export const {

} = SubscriptionSlice.actions;
export default SubscriptionSlice.reducer;
