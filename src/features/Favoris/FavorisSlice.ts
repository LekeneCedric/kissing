import {LoadingState} from '../../shared/enum/LoadingState';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AddFavorisAsync} from './thunks/Add/AddFavorisAsync';
import {AddFavorisResponse} from './thunks/Add/AddFavorisResponse';
import {GetAllFavorisAsync} from './thunks/GetAll/GetAllFavorisAsync';
import {User, UserDetail} from '../../domain/User/User';
import {GetAllFavorisResponse} from './thunks/GetAll/GetAllFavorisResponse';
import { RemoveFromFavoritesAsync } from "./thunks/Remove/RemoveFromFavoritesAsync.ts";
import { RemoveFromFavoritesResponse } from "./thunks/Remove/RemoveFromFavoritesResponse.ts";

interface FavorisState {
  loading: LoadingState;
  favoris_list: number[];
  favoris: UserDetail[];
}

const initialState: FavorisState = {
  loading: LoadingState.idle,
  favoris_list: [],
  favoris: [],
};

export const FavorisSlice = createSlice({
  name: 'favoris',
  initialState: initialState,
  reducers: {
    cleanFavoris: state => {
      state.loading = LoadingState.idle;
      state.favoris_list = [];
    },
    addUserToFavoris: (state, {payload}: PayloadAction<UserDetail>) => {
      state.favoris = [
        ...state.favoris,
        payload
      ];
    },
    RemoveUserFromFavorites: (state, {payload}:PayloadAction<number>) => {
      state.favoris_list = state.favoris_list.filter(fav => fav !== payload)
      state.favoris = state.favoris.filter(fav => fav.user!.id !== payload);
    }
  },
  extraReducers: builder => {
    builder
      .addCase(AddFavorisAsync.pending, state => {
        state.loading = LoadingState.pending;
      })
      .addCase(
        AddFavorisAsync.fulfilled,
        (state, {payload}: PayloadAction<AddFavorisResponse>) => {
          state.loading = LoadingState.success;
          state.favoris_list = [...state.favoris_list, payload.user_id];
        },
      )
      .addCase(AddFavorisAsync.rejected, state => {
        state.loading = LoadingState.failed;
      });
    builder
      .addCase(GetAllFavorisAsync.pending, state => {
        state.loading = LoadingState.pending;
      })
      .addCase(
        GetAllFavorisAsync.fulfilled,
        (state, {payload}: PayloadAction<GetAllFavorisResponse>) => {
          state.loading = LoadingState.success;
          state.favoris = payload.favoris;
          state.favoris_list = payload.favoris.length > 0 ? payload.favoris.map(f => f.user!.id) : [];
        },
      )
      .addCase(GetAllFavorisAsync.rejected, state => {
        state.loading = LoadingState.failed;
      });
  },
});

export const {
  cleanFavoris,
  RemoveUserFromFavorites,
  addUserToFavoris,
} = FavorisSlice.actions;

export default FavorisSlice.reducer;
