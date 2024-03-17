import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hook.ts";
import { GetAllSubscriptionAsync } from "../../../../features/Subscription/thunks/GetAll/GetAllSubscriptionAsync.ts";
import { selectSubscriptions } from "../../../../features/Subscription/SubscriptionsSelectors.ts";
import { Subscription } from "../../../../domain/Subscription/Subscription.ts";

interface useSubscriptionViewBehaviour {
  subscriptions: Subscription[];
}
export const useSubscriptionView = (): useSubscriptionViewBehaviour => {
  const dispatch = useAppDispatch();
  const subscriptions = useAppSelector(selectSubscriptions)
  useEffect(() => {
    dispatch(GetAllSubscriptionAsync());
  }, [])
  return {
    subscriptions: subscriptions
  };
}
