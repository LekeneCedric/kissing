export interface GetRecommendationsCommand {
  city?: string;
  interests?: number[];
  limit: number;
  offset: number;
  search_type?: string;
  min_old?: number;
  max_old?: number;
}
