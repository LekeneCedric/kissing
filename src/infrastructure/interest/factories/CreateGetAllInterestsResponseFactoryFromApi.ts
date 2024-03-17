import {GetAllInterestResponse} from '../../../features/Interests/thunks/GetAll/GetAllInterestResponse';

export const CreateGetAllInterestsResponseFactoryFromApi = (data: any) => {
  return {
    interests: data,
  } as GetAllInterestResponse;
};
