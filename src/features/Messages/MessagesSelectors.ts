import { RootState } from "../../app/store.ts";
import { User } from "../../domain/User/User.ts";

export const selectConversations = (state: RootState) => {
  const sortedConv = state.messagesReducer.conversations.map(chat => ({ ...chat }));
  return sortedConv.sort((a,b) => {
    return new Date(b.last_message.created_at).getTime() - new Date(a.last_message.created_at).getTime()
  });
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
