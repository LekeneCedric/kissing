export interface IMessage {
  id: string,
  message: string,
  sender: {
    id: number,
    name: string,
    image_path?: string,
  }
  receiver: {
    id: number,
    name: string,
    image_path?: string,
  }
  created_at: Date,
  is_read?: boolean
}
export interface IConversation {
  id: string,
  user: {
    id: number,
    name: string,
    image_path?: string,
  },
  last_message: IMessage,
  nb_unread_messages: number,
  messages?: IMessage[]
}
