import icons from "../../ui/constants/icons.ts";
import colors from "../../ui/constants/colors.ts";

export enum INotificationType {
  MESSAGE = "message",
  SUBSCRIPTION_SUCCES = "subscription_success",
  SUBSCRIPTION_EXPIRE = "subscription_expired",
  FAVORIT = "favorite",
  NEW_PROFILE = "new_profiles",
  FAVORITE_ADD_MEDI = "favorite_add_media",
  FAVORITE_UPLOAD = "favorite_upload_",
}

export const InotificationIcon = {
  'message' : {icon: icons.message, color: colors.primary},
  'subscription_success' : {icon: icons.subscription, color: colors.principal},
  'subscription_expired' : {icon: icons.subscription, color: colors.principal},
  'favorite' : {icon: icons.star_outline, color: colors.red},
  'new_profiles' : {icon: icons.plus, color: colors.green},
  'favorite_add_media' : {icon: icons.star_outline, color: colors.red},
  'favorite_upload_' : {icon: icons.star_outline, color: colors.red},
  getValue(key: string): string {
    return this[key].icon;
  },
  getColor(key: string): string {
    return this[key].color;
  }
}
export interface INotification {
  id?: string,
  notification_type: INotificationType,
  sender?: any,
  recipient?: any,
  created_at: Date,
  content: string,
  already_send?: boolean;
  icon?:string,
  color?:string,
}
