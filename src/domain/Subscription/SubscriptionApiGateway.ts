import { GetAllSubscriptionResponse } from "../../features/Subscription/thunks/GetAll/GetAllSubscriptionResponse.ts";
import { SubscribeCommand } from "../../features/Subscription/thunks/Subscribe/SubscribeCommand.ts";
import { SubscribeResponse } from "../../features/Subscription/thunks/Subscribe/SubscribeResponse.ts";

export interface SubscriptionApiGateway {
getAll: () => Promise<GetAllSubscriptionResponse>;
subscribe: (subscribeCommand: SubscribeCommand) =>  Promise<SubscribeResponse>;
}
