import {RootState} from '../../../app/store';

export const selectAuthLoading = (state: RootState) => {
  return state.authReducer.loading;
};
export const selectUser = (state: RootState) => {
  return state.userReducer.user;
};
export const selectAuth = (state: RootState) => {
  return state.authReducer.auth;
};
export const selectActivatedAccountStatus = (state: RootState) => {
  return state.authReducer.auth?.isActivated;
};
export const selectToken = (state: RootState) => {
  return state.authReducer.auth?.token;
};

export const selectProfileIsComplete = (state: RootState) => {
  return state.authReducer.auth?.isCompleteProfile;
};
