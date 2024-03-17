import {RootState} from '../../app/store';

export const selectFavorisLoading = (state: RootState) => {
  return state.favorisReducer.loading;
};

export const selectFavorisList = (state: RootState) => {
  return state.favorisReducer.favoris_list;
};

export const selectFavoritesUsers = (state: RootState) => {
  return state.favorisReducer.favoris;
};
