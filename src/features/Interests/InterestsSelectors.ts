import {RootState} from '../../app/store';

export const selectInterests = (state: RootState) => {
  return state.interestsReducer.interests;
};

export const selectInterestsLoading = (state: RootState) => {
  return state.interestsReducer.loading;
};
