import { RootState } from "../../app/store.ts";

export const selectSubscriptions = (state: RootState) => {
  return state.subscriptionsReducter.subscriptions;
}

export const selectSubscriptionLoading = (state: RootState) => {
  return state.subscriptionsReducter.loading;
}
