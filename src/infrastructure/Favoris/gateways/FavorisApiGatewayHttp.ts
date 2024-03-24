import {HttpProvider} from '../../../shared/gateways/HttpProvider';
import {FavorisApiGateway} from '../../../domain/Favoris/FavorisApiGateway';
import {AddFavorisCommand} from '../../../features/Favoris/thunks/Add/AddFavorisCommand';
import {AddFavorisResponse} from '../../../features/Favoris/thunks/Add/AddFavorisResponse';
import {FavorisApiRoutes} from '../../../ui/routes/ApiRoutes';
import {AddFavorisResponseFactoryFromCommand} from '../factories/AddFavorisResponseFactoryFromCommand';
import {GetAllFavorisCommand} from '../../../features/Favoris/thunks/GetAll/GetAllFavorisCommand';
import {GetAllFavorisResponse} from '../../../features/Favoris/thunks/GetAll/GetAllFavorisResponse';
import {GetAllFavorisResponseFactoryFromResponse} from '../factories/GetAllFavorisResponseFactoryFromResponse';
import { RemoveFromFavoritesCommand } from "../../../features/Favoris/thunks/Remove/RemoveFromFavoritesCommand.ts";
import { RemoveFromFavoritesResponse } from "../../../features/Favoris/thunks/Remove/RemoveFromFavoritesResponse.ts";

export class FavorisApiGatewayHttp
  extends HttpProvider
  implements FavorisApiGateway
{
  async addFavoris(
    favorisCommand: AddFavorisCommand,
  ): Promise<AddFavorisResponse> {
    let result: any;
    const {user_id} = favorisCommand;
    try {
      const response = await this.post(FavorisApiRoutes.add, {
        user_id: user_id,
      });

      if (!response.status.toString().startsWith('2')) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      //@ts-ignore
      result = response.data;
      //console.log('code237addfav', result);
    } catch (error) {
      throw new Error('');
    }
    return AddFavorisResponseFactoryFromCommand(favorisCommand);
  }

  async getAll(
    getAllFavorisCommand: GetAllFavorisCommand,
  ): Promise<GetAllFavorisResponse> {
    let result: any;
    try {
      const response = await this.get(FavorisApiRoutes.getAll);
      if (!response.status.toString().startsWith('2')) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      //@ts-ignore
      result = response.data;
    } catch (error) {
      throw new Error('');
    }

    return GetAllFavorisResponseFactoryFromResponse(result);
  }

  async removeFavoris(removeFromFavoritesCommand: RemoveFromFavoritesCommand): Promise<RemoveFromFavoritesResponse> {
    let result: any
    let command = {
      user_id: removeFromFavoritesCommand.userId
    } as RemoveFromFavoritesResponse
    //console.log(command)
    try {
      const response = await this.post(FavorisApiRoutes.remove, command);
      if (!response.status.toString().startsWith('2')) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      //@ts-ignore
      result = response.data;
    } catch (error: any) {
      throw new Error(error)
    }
    console.log({
      command: command,
      result: result
    })
    return {user_id: result.user_id} as RemoveFromFavoritesResponse
  }
}
