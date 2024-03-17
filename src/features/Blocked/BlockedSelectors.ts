import { RootState } from "../../app/store.ts";

export const selectBlockedLoading = (state: RootState) => {
  return state.blockedReducer.loading;
}

export const selectBlockedUsersList = (state: RootState) => {
  return state.blockedReducer.blocked_list;
}

export const selectBlockedUsers = (state: RootState) => {
  return state.blockedReducer.blocked;
}
