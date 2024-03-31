import { INotification } from "../../../../domain/Notifications/Notifications.ts";
import { useAppDispatch, useAppSelector } from "../../../../app/hook.ts";
import { selectNotifications } from "../../../../features/Notifications/NotificationsSelector.ts";
import { useEffect } from "react";
import { seeNotifications } from "../../../../features/Notifications/NotificationSlice.ts";

interface useNotificationBehaviour {
  notifications: INotification[]
}
export const useNotifications = (): useNotificationBehaviour => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(selectNotifications);
  useEffect(() => {
    dispatch(seeNotifications())
  }, [dispatch]);
  return {
    notifications: notifications,
  }
}
