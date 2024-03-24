import {GetAllFavorisResponse} from '../../../features/Favoris/thunks/GetAll/GetAllFavorisResponse';

export const GetAllFavorisResponseFactoryFromResponse = (result: any) => {
  //console.log(result);
  return {
    favoris: result,
  } as GetAllFavorisResponse;
};
