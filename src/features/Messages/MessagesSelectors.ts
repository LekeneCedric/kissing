import { RootState } from "../../app/store.ts";
import { User } from "../../domain/User/User.ts";

export const selectConversations = (state: RootState) => {
  return state.messagesReducer.conversations;
}

export const selectMessages = (state: RootState) => {
  const currentUserId = state.messagesReducer.current_user_id;
  console.warn('currentUserId',currentUserId);
  console.log(state.messagesReducer.conversations);
  return state.messagesReducer.conversations
    .filter(c => c.user.id === currentUserId)[0];
}

export const selectNbUnreadMessages = (state: RootState) => {
  return state.messagesReducer?.nb_unread_messages;
}
