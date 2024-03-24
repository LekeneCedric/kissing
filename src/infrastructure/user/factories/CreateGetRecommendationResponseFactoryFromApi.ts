import {GetRecommendationsResponse} from '../../../features/User/Thunks/GetUserRecommandations/GetRecommendationsResponse';

export const CreateGetRecommendationResponseFactoryFromApi = (
  result: any,
): GetRecommendationsResponse => {
  // console.log(
  //   `next: ${result.next} | previous: ${result.previous} | count: ${result.count}`,
  // );
  return {
    count: result.count,
    next: result.next,
    previous: result.previous,
    results: result.results,
  } as GetRecommendationsResponse;
};
