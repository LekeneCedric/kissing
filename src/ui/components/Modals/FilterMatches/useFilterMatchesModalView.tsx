import {useAppDispatch, useAppSelector} from '../../../../app/hook';
import {
  resetFiltersParams,
  updateCityFilter,
  updateMaxOldFilter,
  updateMinOldFilter,
  updateSearchTypeFilter,
} from '../../../../features/Recommendations/RecommendationsSlice';
import {
  selectCityFilterParam,
  selectMaxOldFilterParam,
  selectMinOldFilterParam,
  selectSearchTypeFilterParam,
} from '../../../../features/Recommendations/RecommendationsSelectors';
import CameroonCities from '../../../../shared/constants/cameroonCities';
import {items} from '../../select/SelectComponent/SimpleSelectComponent';
import {searchTypes} from '../../../../shared/constants/searchType';
import { DefaultRecommendationsParams } from "../../../../domain/User/User.ts";

export type useFilterMatchesModalViewBehaviour = {
  updateCityFilterParam: (city: string) => void;
  updateSearchTypeFilterParam: (search_type: string) => void;
  updateMinOldFilterParam: (min_old: number) => void;
  updateMaxOldFilterParam: (max_old: number) => void;
  cleanFilterParams: () => void;
  cityFilterParam: items;
  searchTypeFilterParam: items;
  minOldFilterParam: number;
  maxOldFilterParam: number;
};
export default function useFilterMatchesModalView(): useFilterMatchesModalViewBehaviour {
  const dispatch = useAppDispatch();
  const cityFilterParam = CameroonCities.filter(
    city => city.value === useAppSelector(selectCityFilterParam),
  )[0];
  const updateCityFilterParam = (city: string) => {
    dispatch(updateCityFilter(city));
  };
  const searchTypeFilterParam = searchTypes.filter(
    search_type =>
      search_type.value === useAppSelector(selectSearchTypeFilterParam),
  )[0];
  const updateSearchTypeFilterParam = (search_type: string) => {
    dispatch(updateSearchTypeFilter(search_type));
  };

  const minOldFilterParam =
    useAppSelector(selectMinOldFilterParam) !== undefined
      ? useAppSelector(selectMinOldFilterParam)
      : DefaultRecommendationsParams.MIN_OLD;
  const updateMinOldFilterParam = (min_old: number) => {
    dispatch(updateMinOldFilter(min_old));
  };
  const maxOldFilterParam =
    useAppSelector(selectMaxOldFilterParam) !== undefined
      ? useAppSelector(selectMaxOldFilterParam)
      : DefaultRecommendationsParams.MAX_OLD;
  const updateMaxOldFilterParam = (max_old: number) => {
    dispatch(updateMaxOldFilter(max_old));
  };

  const cleanFilterParams = () => {
    dispatch(resetFiltersParams());
  };
  return {
    updateCityFilterParam: updateCityFilterParam,
    updateSearchTypeFilterParam: updateSearchTypeFilterParam,
    updateMinOldFilterParam: updateMinOldFilterParam,
    updateMaxOldFilterParam: updateMaxOldFilterParam,
    searchTypeFilterParam: searchTypeFilterParam,
    cityFilterParam: cityFilterParam,
    minOldFilterParam: minOldFilterParam!,
    maxOldFilterParam: maxOldFilterParam!,
    cleanFilterParams: cleanFilterParams,
  };
}
