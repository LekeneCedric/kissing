import {HttpProvider} from '../../../shared/gateways/HttpProvider';
import {InterestApiGateway} from '../../../domain/Interest/InterestApiGateway';
import {GetAllInterestResponse} from '../../../features/Interests/thunks/GetAll/GetAllInterestResponse';
import {InterestApiRoutes} from '../../../ui/routes/ApiRoutes';
import {CreateGetAllInterestsResponseFactoryFromApi} from '../factories/CreateGetAllInterestsResponseFactoryFromApi';

export class InterestApiGatewayHttp
  extends HttpProvider
  implements InterestApiGateway
{
  async getAll(): Promise<GetAllInterestResponse> {
    let result: any;

    try {
      const response = await this.get(InterestApiRoutes.getAll);
      if (!response.status.toString().startsWith('2')) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      //@ts-ignore
      result = response.data.results;
    } catch (e: any) {
      throw new Error(e.detail);
    }

    return CreateGetAllInterestsResponseFactoryFromApi(result);
  }
}
