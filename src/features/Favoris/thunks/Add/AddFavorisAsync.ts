import {createAsyncThunk} from '@reduxjs/toolkit';
import {AddFavorisResponse} from './AddFavorisResponse';
import {AddFavorisCommand} from './AddFavorisCommand';
import {FavorisApiGateway} from '../../../../domain/Favoris/FavorisApiGateway';

export const AddFavorisAsync = createAsyncThunk<
  AddFavorisResponse,
  AddFavorisCommand
>(
  'favoris/add',
  async (addFavorisCommand: AddFavorisCommand, thunkApi: any) => {
    const favorisApiGatewayHttp: FavorisApiGateway =
      thunkApi.extra.favorisApiGatewayHttp;
    try {
      return await favorisApiGatewayHttp.addFavoris(addFavorisCommand);
    } catch (error) {
      const err = error as any;
      const result: any = {};
      return thunkApi.rejectWithValue(result);
    }
  },
);
