import {AddFavorisCommand} from '../../features/Favoris/thunks/Add/AddFavorisCommand';
import {AddFavorisResponse} from '../../features/Favoris/thunks/Add/AddFavorisResponse';
import {GetAllFavorisCommand} from '../../features/Favoris/thunks/GetAll/GetAllFavorisCommand';
import {GetAllFavorisResponse} from '../../features/Favoris/thunks/GetAll/GetAllFavorisResponse';
import { RemoveFromFavoritesResponse } from "../../features/Favoris/thunks/Remove/RemoveFromFavoritesResponse.ts";
import { RemoveFromFavoritesCommand } from "../../features/Favoris/thunks/Remove/RemoveFromFavoritesCommand.ts";

export interface FavorisApiGateway {
  addFavoris: (
    favorisCommand: AddFavorisCommand,
  ) => Promise<AddFavorisResponse>;
  getAll: (
    getAllFavorisCommand: GetAllFavorisCommand,
  ) => Promise<GetAllFavorisResponse>;
  removeFavoris: (
    removeFromFavoritesCommand: RemoveFromFavoritesCommand
  ) => Promise<RemoveFromFavoritesResponse>;
}
