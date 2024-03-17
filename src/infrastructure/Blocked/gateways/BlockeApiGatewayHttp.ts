import { HttpProvider } from "../../../shared/gateways/HttpProvider.ts";
import { BlockedApiGateway } from "../../../domain/Blocked/BlockedApiGateway.ts";
import { AddBlockedUserCommand } from "../../../features/Blocked/thunks/Add/AddBlockedUserCommand.ts";
import { AddBlockedUserResponse } from "../../../features/Blocked/thunks/Add/AddBlockedUserResponse.ts";
import { UserApiRoutes } from "../../../ui/routes/ApiRoutes.ts";
import { RemoveBlockedUserCommand } from "../../../features/Blocked/thunks/Remove/RemoveBlockedUserCommand.ts";
import { RemoveBlockedUserResponse } from "../../../features/Blocked/thunks/Remove/RemoveBlockedUserResponse.ts";
import { GetAllBlockedUserCommand } from "../../../features/Blocked/thunks/GetAll/GetAllBlockedUserCommand.ts";
import { GetAllBlockedUserResponse } from "../../../features/Blocked/thunks/GetAll/GetAllBlockedUserResponse.ts";

export class BlockeApiGatewayHttp extends HttpProvider implements BlockedApiGateway {
  async addBlockedUser(addBlockedUserCommand: AddBlockedUserCommand): Promise<AddBlockedUserResponse> {
    const {
      user_id
    } = addBlockedUserCommand
    let result: any = null;

    try {
      const response = await this.post(UserApiRoutes.block.add, {
        user_id: user_id,
      })
      if (!response.status.toString().startsWith('2')) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      //@ts-ignore
      result = response.data;
      console.log('code237addblocked', result);
    } catch (e) {
      throw new Error('');
    }

    return {
      user_id: addBlockedUserCommand.user_id
    } as  AddBlockedUserResponse;
  }

  async remove(removeBlockedUserCommand: RemoveBlockedUserCommand): Promise<RemoveBlockedUserResponse> {
    const {
      user_id
    } = removeBlockedUserCommand
    let result: any = null;

    try {
      const response = await this.post(UserApiRoutes.block.remove, {
        user_id: user_id,
      })
      if (!response.status.toString().startsWith('2')) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      //@ts-ignore
      result = response.data;
      console.log('code237removeblock', result);
    } catch (e) {
      throw new Error('');
    }

    return {
      user_id: removeBlockedUserCommand.user_id
    } as  RemoveBlockedUserResponse;
  }

  async all(getAllBlockedUserCommand: GetAllBlockedUserCommand): Promise<GetAllBlockedUserResponse> {
    let result: any;
    try {
      const response = await this.get(UserApiRoutes.block.get);
      if (!response.status.toString().startsWith('2')) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      //@ts-ignore
      result = response.data;
      console.log('code237allblock', result);
    } catch (e) {
      throw new Error('');
    }

    return { blockeds: result} as GetAllBlockedUserResponse
  }
}
