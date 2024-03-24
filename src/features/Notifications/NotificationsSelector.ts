import { RootState } from "../../app/store.ts";

export const selectNotifications = (state: RootState) => {
  return state.notificationReducer.notifications;
}
