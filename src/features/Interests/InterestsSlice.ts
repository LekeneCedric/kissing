import {LoadingState} from '../../shared/enum/LoadingState';
import {Interest} from '../../domain/Interest/Interest';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {GetAllInterestAsync} from './thunks/GetAll/GetAllInterestAsync';
import {GetAllInterestResponse} from './thunks/GetAll/GetAllInterestResponse';

interface InterestsState {
  loading: LoadingState;
  interests: Interest[];
}

const initialState: InterestsState = {
  loading: LoadingState.idle,
  interests: [],
};

export const InterestsSlice = createSlice({
  name: 'interestsSlice',
  initialState: initialState,
  reducers: {
    cleanInterests: state => {
      state.interests = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(GetAllInterestAsync.pending, state => {
        state.loading = LoadingState.pending;
      })
      .addCase(
        GetAllInterestAsync.fulfilled,
        (state, {payload}: PayloadAction<GetAllInterestResponse>) => {
          state.loading = LoadingState.success;
          state.interests = payload.interests;
        },
      )
      .addCase(GetAllInterestAsync.rejected, state => {
        state.loading = LoadingState.failed;
      });
  },
});

export const {cleanInterests} = InterestsSlice.actions;
export default InterestsSlice.reducer;
