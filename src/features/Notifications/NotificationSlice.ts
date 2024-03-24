import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INotification, INotificationType } from "../../domain/Notifications/Notifications.ts";
import icons from "../../ui/constants/icons.ts";

interface InitialState{
  notifications: INotification[]
}
const initialState: InitialState = {
  notifications: []
}
export const NotificationSlice = createSlice({
  name: 'notifications',
  initialState: initialState,
  reducers: {
    clearNotification: (state) => {
      state.notifications = [];
    },
    addNotification: (state, {payload}: PayloadAction<INotification>) => {
      let icon = "";
      switch (payload.notification_type) {
        case INotificationType.FAVORIT: icon=icons.star_outline; break;
        case INotificationType.MESSAGE: icon=icons.message; break;
        case INotificationType.FAVORITE_ADD_MEDI: icon=icons.star_outline; break;
        case INotificationType.FAVORITE_UPLOAD: icon=icons.star_outline; break;
        case INotificationType.NEW_PROFILE: icon=icons.addCircle; break;
        case INotificationType.SUBSCRIPTION_EXPIRE: icon=icons.subscription; break;
        case INotificationType.SUBSCRIPTION_SUCCES: icon=icons.subscription; break;
      }
      state.notifications = [
        ...state.notifications,
        {
          ...payload,
          icon: icon
        }
      ]
    }
  }
})

export const {
  addNotification,
  clearNotification,
} = NotificationSlice.actions;

export default NotificationSlice.reducer;
