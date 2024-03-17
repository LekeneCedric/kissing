import {GetAllInterestResponse} from '../../features/Interests/thunks/GetAll/GetAllInterestResponse';

export interface InterestApiGateway {
  getAll: () => Promise<GetAllInterestResponse>;
}
