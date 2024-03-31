import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INotification, InotificationIcon, INotificationType } from "../../domain/Notifications/Notifications.ts";
import icons from "../../ui/constants/icons.ts";

interface InitialState{
  notifications: INotification[],
  my_id: number,
  nb_unread_notif: number,
}
const initialState: InitialState = {
  notifications: [],
  my_id: 0,
  nb_unread_notif: 0,
}
export const NotificationSlice = createSlice({
  name: 'notifications',
  initialState: initialState,
  reducers: {
    setMyNotificationId: (state, {payload}: PayloadAction<number>) => {
      state.my_id = payload;
    },
    seeNotifications: (state) => {
      state.nb_unread_notif = 0
    },
    clearNotification: (state) => {
      state.notifications = [];
      state.my_id = 0;
      state.nb_unread_notif = 0;
    },
    addNotification: (state, {payload}: PayloadAction<INotification>) => {
      if (state.my_id != 0) {
        console.warn('notif:start-register')
        let already_exist = state.notifications.filter(n => {
          return n.id === payload.id
        }).length > 0
        console.warn('notif:exist', already_exist)
        console.warn('my-id:', state.my_id);
        if((payload.recipient == state.my_id) && !already_exist) {
          console.warn('notif:register')
          let icon = InotificationIcon.getValue(payload.notification_type)
          let color = InotificationIcon.getColor(payload.notification_type);
          state.notifications = [
            ...state.notifications,
            {
              ...payload,
              icon: icon,
              color: color,
            }
          ]
          state.notifications = state.notifications.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
          state.nb_unread_notif = state.nb_unread_notif + 1;
        }
      }
    }
  }
})

export const {
  addNotification,
  clearNotification,
  setMyNotificationId,
  seeNotifications,
} = NotificationSlice.actions;

export default NotificationSlice.reducer;
