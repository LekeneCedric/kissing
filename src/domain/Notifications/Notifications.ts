export enum INotificationType {
  MESSAGE = "message",
  SUBSCRIPTION_SUCCES = "subscription_success",
  SUBSCRIPTION_EXPIRE = "subscription_expired",
  FAVORIT = "favorite",
  NEW_PROFILE = "new_profiles",
  FAVORITE_ADD_MEDI = "favorite_add_media",
  FAVORITE_UPLOAD = "favorite_upload_",
}

export interface INotification {
  notification_type: INotificationType,
  sender?: any,
  recipient?: any,
  created_at: Date,
  content: string,
  already_send?: boolean;
  icon?:string,
}
