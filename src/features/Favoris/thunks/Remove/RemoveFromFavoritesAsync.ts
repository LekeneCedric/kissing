import { createAsyncThunk } from "@reduxjs/toolkit";
import { FavorisApiGateway } from "../../../../domain/Favoris/FavorisApiGateway.ts";
import { RemoveFromFavoritesResponse } from "./RemoveFromFavoritesResponse.ts";
import { RemoveFromFavoritesCommand } from "./RemoveFromFavoritesCommand.ts";

export const RemoveFromFavoritesAsync = createAsyncThunk<RemoveFromFavoritesResponse, RemoveFromFavoritesCommand>(
  'favorites/remove',
  async (removeFromFavoritesCommand: RemoveFromFavoritesCommand, thunkApi: any) => {
      const favorisHttp: FavorisApiGateway  = thunkApi.extra.favorisApiGatewayHttp;
      try {
        return await favorisHttp.removeFavoris(removeFromFavoritesCommand);
      } catch (e: any) {
        return thunkApi.rejectWithValue(e);
      }
  }
)
