import {RootState} from '../../app/store';

export const selectRecommendationLoading = (state: RootState) => {
  return state.recommendationsReducer.loading;
};

export const selectRecommendations = (state: RootState) => {
  return state.recommendationsReducer.recommendations;
};

export const selectFilterLimit = (state: RootState) => {
  return state.recommendationsReducer.limit;
};

export const selectFilterOffset = (state: RootState) => {
  return state.recommendationsReducer.offset;
};

export const selectFilterSelectedInterests = (state: RootState) => {
  return state.recommendationsReducer.interests;
};

export const selectCityFilterParam = (state: RootState) => {
  return state.recommendationsReducer.city;
};

export const selectSearchTypeFilterParam = (state: RootState) => {
  return state.recommendationsReducer.search_type;
};

export const selectMinOldFilterParam = (state: RootState) => {
  return state.recommendationsReducer.min_old;
};

export const selectMaxOldFilterParam = (state: RootState) => {
  return state.recommendationsReducer.max_old;
};
