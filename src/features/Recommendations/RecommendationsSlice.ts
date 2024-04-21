import {LoadingState} from '../../shared/enum/LoadingState';
import { DefaultRecommendationsParams, Recommendation } from "../../domain/User/User";
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
  limit: DefaultRecommendationsParams.NUMBER_PEER_PAGES,
  offset: 0,
  min_old: DefaultRecommendationsParams.MIN_OLD,
  max_old: DefaultRecommendationsParams.MAX_OLD,
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
      state.limit = DefaultRecommendationsParams.NUMBER_PEER_PAGES;
      state.city = undefined;
      state.search_type = undefined;
      state.interests = undefined;
      state.min_old = DefaultRecommendationsParams.MIN_OLD;
      state.max_old = DefaultRecommendationsParams.MAX_OLD;
    },
    growLimitBy: (state, {payload}: PayloadAction<number>) => {
      state.limit = state.limit + payload;
    },
    growOffsetBy: (state, {payload}: PayloadAction<number>) => {
      state.offset = state.offset + payload;
    },
    nextRecommendations: state => {
      state.offset = state.offset + DefaultRecommendationsParams.NUMBER_PEER_PAGES;
      //console.log(`limit : ${state.limit} , offset : ${state.offset}`);
    },
    updateCityFilter: (state, {payload}: PayloadAction<string>) => {
      state.city = payload;;
      state.offset = 0;
      state.limit = DefaultRecommendationsParams.NUMBER_PEER_PAGES;
    },
    updateSearchTypeFilter: (state, {payload}: PayloadAction<string>) => {
      state.search_type = payload;;
      state.offset = 0;
      state.limit = DefaultRecommendationsParams.NUMBER_PEER_PAGES;
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
      };
      state.offset = 0;
      state.limit = DefaultRecommendationsParams.NUMBER_PEER_PAGES;
    },
    updateMinOldFilter: (state, {payload}: PayloadAction<number>) => {
      state.min_old = payload;
      if (state.min_old > state.max_old) {
        state.max_old = state.min_old;
      };
      state.offset = 0;
      state.limit = DefaultRecommendationsParams.NUMBER_PEER_PAGES;
    },
    updateMaxOldFilter: (state, {payload}: PayloadAction<number>) => {
      state.max_old = payload;
      if (state.max_old < state.min_old) {
        state.max_old = state.min_old;
      };
      state.offset = 0;
      state.limit = DefaultRecommendationsParams.NUMBER_PEER_PAGES;
    },
    RemoveOnRecommendation: (state, {payload}: PayloadAction<number>) => {
      state.recommendations = state.recommendations.filter(r => r.id !== payload);
    }
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
            const currentRecommendationsIds = state.recommendations.map(r => r.id);
            const newRecommendations = payload.results.filter(r => !currentRecommendationsIds.includes(r.id))
            state.recommendations = [
              ...state.recommendations,
              ...newRecommendations,
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
  growOffsetBy,
  RemoveOnRecommendation,
} = RecommendationsSlice.actions;

export default RecommendationsSlice.reducer;
