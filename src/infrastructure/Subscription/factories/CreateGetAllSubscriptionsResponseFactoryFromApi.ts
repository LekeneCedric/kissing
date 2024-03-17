import { GetAllSubscriptionResponse } from "../../../features/Subscription/thunks/GetAll/GetAllSubscriptionResponse.ts";

export const CreateGetAllSubscriptionsResponseFactoryFromApi = (result: any) => {
  return {
    subscriptions: result,
  } as GetAllSubscriptionResponse
}
