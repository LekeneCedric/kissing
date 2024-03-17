import {useAppDispatch, useAppSelector} from '../../../../../../app/hook';
import {useEffect} from 'react';
import {GetAllFavorisAsync} from '../../../../../../features/Favoris/thunks/GetAll/GetAllFavorisAsync';
import {User, UserDetail} from '../../../../../../domain/User/User';
import {selectFavoritesUsers} from '../../../../../../features/Favoris/FavorisSelectors';

type FavoritesViewBehaviour = {
  favorites: UserDetail[];
};
export const useFavoritesView = (): FavoritesViewBehaviour => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectFavoritesUsers);
  useEffect(() => {
    dispatch(GetAllFavorisAsync({}));
  }, []);
  return {
    favorites: favorites,
  };
};
