import {Recommendation} from '../../../../domain/User/User';
import {useAppDispatch, useAppSelector} from '../../../../app/hook';
import {LoadingState} from '../../../../shared/enum/LoadingState';
import React, {useCallback, useEffect, useState} from 'react';
import {GetRecommendationsAsync} from '../../../../features/User/Thunks/GetUserRecommandations/GetRecommendationsAsync';
import {searchTypes} from '../../../../shared/constants/searchType';
import cameroonCities from '../../../../shared/constants/cameroonCities';
import {selectInterests} from '../../../../features/Interests/InterestsSelectors';
import {Interest} from '../../../../domain/Interest/Interest';
import {
  selectCityFilterParam,
  selectFilterLimit,
  selectFilterOffset,
  selectFilterSelectedInterests,
  selectMaxOldFilterParam,
  selectMinOldFilterParam,
  selectRecommendationLoading,
  selectRecommendations,
  selectSearchTypeFilterParam,
} from '../../../../features/Recommendations/RecommendationsSelectors';
import {
  cleanRecommendations,
  nextRecommendations,
  resetFiltersParams,
} from '../../../../features/Recommendations/RecommendationsSlice';

export interface MatchListViewBehaviour {
  matches: Recommendation[];
  loading: LoadingState;
  cameroonCitiesList: any[];
  searchTypeList: any[];
  interests: Interest[];
  refreshing: boolean;
  onRefresh: () => void;
  filterRecommendations: () => void;
  groupRecommendations: (
    recommendations: Recommendation[],
  ) => Recommendation[][];
  nextPage: () => void;
  next: string | null;
}

export default function useMatchListView(): MatchListViewBehaviour {
  const [refreshing, setRefreshing] = React.useState(false);
  const dispatch = useAppDispatch();
  const recommendationsLoading = useAppSelector(selectRecommendationLoading);
  const recommendations = useAppSelector(selectRecommendations);
  const interests = useAppSelector(selectInterests);
  const searchTypesList = searchTypes;
  const cameroonCitiesList = cameroonCities;
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    });
  }, []);
  const limit = useAppSelector(selectFilterLimit);
  const offset = useAppSelector(selectFilterOffset);
  const city = useAppSelector(selectCityFilterParam);
  const search_type = useAppSelector(selectSearchTypeFilterParam);
  const interests_filter = useAppSelector(selectFilterSelectedInterests);
  const min_old = useAppSelector(selectMinOldFilterParam);
  const max_old = useAppSelector(selectMaxOldFilterParam);
  const [next, setNext] = useState<string | null>(null);
  const nextRec = async () => {
    dispatch(nextRecommendations());
  };
  const resetFilters = async () => {
    dispatch(resetFiltersParams());
  };
  const cleanRecs = async () => {
    dispatch(cleanRecommendations());
  };
  const refreshPage = async () => {
    const res = await dispatch(
      GetRecommendationsAsync({
        limit: limit,
        offset: offset,
        city: city,
        search_type: search_type,
        interests: interests_filter,
        min_old: min_old,
        max_old: max_old,
      }),
    );
    if (GetRecommendationsAsync.fulfilled.match(res)) {
      setNext(res.payload.next);
    }
  };
  const nextPage = () => {
    nextRec().then(async r => {
      refreshPage().then(() => {});
    });
  };
  const groupRecommendations = (recommendations: Recommendation[]) => {
    let result = [];
    for (let i = 0; i < recommendations.length - 1; i += 3) {
      result.push(recommendations.slice(i, i + 3));
      // console.log(recommendations.slice(i, i + 3).length)
    }
    return result;
  };
  const filterRecommendations = async () => {
    cleanRecs().then(() => {
      refreshPage().then(() => {});
    });
  };
  useEffect(() => {
    resetFilters().then(() => {
      refreshPage().then(() => {});
    });
  }, [refreshing]);
  return {
    loading: recommendationsLoading,
    matches: recommendations!,
    cameroonCitiesList: cameroonCitiesList,
    interests: interests,
    searchTypeList: searchTypesList,
    refreshing: refreshing,
    onRefresh: onRefresh,
    filterRecommendations: filterRecommendations,
    groupRecommendations: groupRecommendations,
    nextPage: nextPage,
    next: next,
  };
}
