import {Recommendation} from '../../../../domain/User/User';

export interface GetRecommendationsResponse {
  count: number;
  next: string;
  previous: string;
  results: Recommendation[];
}
