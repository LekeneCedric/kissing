import { HttpProvider } from "../../../shared/gateways/HttpProvider.ts";
import { SubscriptionApiGateway } from "../../../domain/Subscription/SubscriptionApiGateway.ts";
import { GetAllSubscriptionResponse } from "../../../features/Subscription/thunks/GetAll/GetAllSubscriptionResponse.ts";
import { SubscriptionsApiRoutes } from "../../../ui/routes/ApiRoutes.ts";
import {
  CreateGetAllSubscriptionsResponseFactoryFromApi
} from "../factories/CreateGetAllSubscriptionsResponseFactoryFromApi.ts";
import { SubscribeCommand } from "../../../features/Subscription/thunks/Subscribe/SubscribeCommand.ts";
import { SubscribeResponse } from "../../../features/Subscription/thunks/Subscribe/SubscribeResponse.ts";

export class SubscriptionApiGatewayHttp
  extends HttpProvider
  implements SubscriptionApiGateway {
  async getAll(): Promise<GetAllSubscriptionResponse> {
    let result: any;

    try {
      const response = await this.get(SubscriptionsApiRoutes.getAll);
      if (!response.status.toString().startsWith('2')) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      //@ts-ignore
      result = response.data.results;
    } catch (e: any) {
      throw new Error(e);
    }
    return CreateGetAllSubscriptionsResponseFactoryFromApi(result);
  }

  async subscribe(subscribeCommand: SubscribeCommand): Promise<SubscribeResponse> {
    let result: any;
    let command = {
      subscription: subscribeCommand.subscription
    } as SubscribeCommand
    console.log(command);
    try {
      const response = await this.post(SubscriptionsApiRoutes.subscribe, command);
      if (!response.status.toString().startsWith('2')) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      //@ts-ignore
      result = response.data;
    } catch (e: any) {
      console.log(e);
      throw new Error(e);
    }

    console.log(result);
    return {
      subscription: result
    } as SubscribeResponse
  }
}
