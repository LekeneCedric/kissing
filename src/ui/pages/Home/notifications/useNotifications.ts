import { INotification } from "../../../../domain/Notifications/Notifications.ts";
import { useAppSelector } from "../../../../app/hook.ts";
import { selectNotifications } from "../../../../features/Notifications/NotificationsSelector.ts";

interface useNotificationBehaviour {
  notifications: INotification[]
}
export const useNotifications = (): useNotificationBehaviour => {

  const notifications = useAppSelector(selectNotifications);

  return {
    notifications: notifications,
  }
}
