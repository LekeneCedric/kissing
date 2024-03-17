import {AddFavorisResponse} from '../../../features/Favoris/thunks/Add/AddFavorisResponse';

export const AddFavorisResponseFactoryFromCommand = (response: any) => {
  return {
    user_id: response.user_id,
  } as AddFavorisResponse;
};
