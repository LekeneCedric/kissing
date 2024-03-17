import {createAsyncThunk} from '@reduxjs/toolkit';
import {GetAllFavorisCommand} from './GetAllFavorisCommand';
import {FavorisApiGateway} from '../../../../domain/Favoris/FavorisApiGateway';
import {GetAllFavorisResponse} from './GetAllFavorisResponse';

export const GetAllFavorisAsync = createAsyncThunk<
  GetAllFavorisResponse,
  GetAllFavorisCommand
>(
  'favoris/get-all',
  async (getAllFavorisCommand: GetAllFavorisCommand, thunkApi: any) => {
    const favorisApiGateway: FavorisApiGateway =
      thunkApi.extra.favorisApiGatewayHttp;
    try {
      return await favorisApiGateway.getAll(getAllFavorisCommand);
    } catch (error) {
      const err = error as any;
      const result: any = {};
      return thunkApi.rejectWithValue(result);
    }
  },
);
