import { RootState } from "../../app/store.ts";

export const selectNotifications = (state: RootState) => {
  return state.notificationReducer.notifications;
}

export const selectNbUnreadNotifications = (state: RootState) => {
  return state.notificationReducer.nb_unread_notif;
}
