import {RootState} from '../../app/store';

export const selectImages = (state: RootState) => {
  return state.userReducer.user?.images;
};
export const selectUserLoading = (state: RootState) => {
  return state.userReducer.loading;
};

export const selectUserInterests = (state: RootState) => {
  return state.userReducer.user?.interests;
};

export const selectCurrentUserDetail = (state: RootState) => {
  return state.userReducer.userDetails;
};
