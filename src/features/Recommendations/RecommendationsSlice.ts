import {LoadingState} from '../../shared/enum/LoadingState';
import {Recommendation} from '../../domain/User/User';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {GetRecommendationsAsync} from '../User/Thunks/GetUserRecommandations/GetRecommendationsAsync';
import {GetRecommendationsResponse} from '../User/Thunks/GetUserRecommandations/GetRecommendationsResponse';

interface RecommendationsState {
  loading: LoadingState;
  recommendations: Recommendation[];
  limit: number;
  offset: number;
  city?: string;
  search_type?: string;
  interests?: number[];
  min_old: number;
  max_old: number;
}

const initialState: RecommendationsState = {
  loading: LoadingState.idle,
  recommendations: [],
  limit: 3,
  offset: 0,
  min_old: 18,
  max_old: 25,
};
export const RecommendationsSlice = createSlice({
  name: 'recommendationsSlice',
  initialState: initialState,
  reducers: {
    cleanRecommendations: state => {
      state.recommendations = [];
    },
    resetFiltersParams: state => {
      state.recommendations = [];
      state.offset = 0;
      state.limit = 3;
      state.city = undefined;
      state.search_type = undefined;
      state.interests = undefined;
      state.min_old = 18;
      state.max_old = 35;
    },
    nextRecommendations: state => {
      state.offset = state.offset + 3;
      //console.log(`limit : ${state.limit} , offset : ${state.offset}`);
    },
    updateCityFilter: (state, {payload}: PayloadAction<string>) => {
      state.city = payload;
    },
    updateSearchTypeFilter: (state, {payload}: PayloadAction<string>) => {
      state.search_type = payload;
    },
    updateInterestsFilter: (state, {payload}: PayloadAction<number>) => {
      if (state.interests !== undefined) {
        if (state.interests.includes(payload)) {
          state.interests = state.interests.filter(int => int !== payload);
        } else {
          state.interests = [...state.interests, payload];
        }
      }
      if (state.interests === undefined) {
        state.interests = [payload];
      }
    },
    updateMinOldFilter: (state, {payload}: PayloadAction<number>) => {
      state.min_old = payload;
      if (state.min_old > state.max_old) {
        state.max_old = state.min_old;
      }
    },
    updateMaxOldFilter: (state, {payload}: PayloadAction<number>) => {
      state.max_old = payload;
      if (state.max_old < state.min_old) {
        state.max_old = state.min_old;
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(GetRecommendationsAsync.pending, state => {
        state.loading = LoadingState.pending;
      })
      .addCase(
        GetRecommendationsAsync.fulfilled,
        (state, {payload}: PayloadAction<GetRecommendationsResponse>) => {
          state.loading = LoadingState.success;
          //console.log(payload.results.length);
          // state.recommendations = [
          //     ...payload.results!
          // ]
          if (state.recommendations.length === 0) {
            state.recommendations = [...payload.results!];
          } else {
            const newRecommendationsIds = payload.results.map(r_ => r_.id)
            state.recommendations = [
              ...state.recommendations.filter(r => !newRecommendationsIds.includes(r.id)),
              ...payload.results!,
            ];
          }
        },
      )
      .addCase(GetRecommendationsAsync.rejected, state => {
        state.loading = LoadingState.failed;
      });
  },
});
export const {
  cleanRecommendations,
  resetFiltersParams,
  nextRecommendations,
  updateCityFilter,
  updateSearchTypeFilter,
  updateInterestsFilter,
  updateMinOldFilter,
  updateMaxOldFilter,
} = RecommendationsSlice.actions;

export default RecommendationsSlice.reducer;
