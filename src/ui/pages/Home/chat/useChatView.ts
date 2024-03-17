import {useAppDispatch} from '../../../../app/hook';
import {useEffect} from 'react';
import {GetAllFavorisAsync} from '../../../../features/Favoris/thunks/GetAll/GetAllFavorisAsync';

type useChatViewBehavior = {};
export const useChatView = (): useChatViewBehavior => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(GetAllFavorisAsync({}));
  }, []);
  return {};
};
