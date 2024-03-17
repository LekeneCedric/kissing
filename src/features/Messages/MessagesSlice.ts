import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IConversation, IMessage } from "../../domain/Messages/Messages.ts";
import uuid from "react-native-uuid";

interface initialState {
  nb_unread_messages: number,
  conversations: IConversation[],
  my_id: number,
  current_user_id: number,
}

const initialState: initialState = {
  nb_unread_messages: 0,
  conversations: [],
  my_id: 1,
  current_user_id: 1,
}
const MessagesSlice = createSlice({
  name: 'messages',
  initialState: initialState,
  reducers: {
    cleanMessages: (state) => {
      state.current_user_id = 1;
      state.conversations = []
    },
    setCurrentUser: (state, {payload}: PayloadAction<number>) => {
      state.current_user_id = payload;
    },
    addMessage: (state, {payload}: PayloadAction<IMessage>) => {
      let currentConversation: IConversation | undefined = undefined;
      const iAmReceiver = payload.receiver.id == state.my_id;
      const correspondingConversation = state.conversations.filter(
        (conversation:IConversation) => {
          const userIds = [
            payload.sender.id,
            payload.receiver.id,
          ];
          return userIds.includes(conversation.user.id)
        });
      if (correspondingConversation?.length > 0) {
        currentConversation = correspondingConversation[0];
        const messageAlreadyExist = currentConversation?.messages
          ?.filter(m => m.id === payload.id)?.length! > 0
        if (!messageAlreadyExist) {
          currentConversation = {
            ...currentConversation,
            messages: [
              ...currentConversation?.messages!,
              payload
            ],
            last_message: payload,
            nb_unread_messages: iAmReceiver ? currentConversation?.nb_unread_messages + 1 : currentConversation?.nb_unread_messages
          }
          iAmReceiver ? state.nb_unread_messages += 1 : null;
          state.conversations = [
            ...state.conversations.filter(c => c.id !== currentConversation?.id),
            currentConversation
          ];
        }

      } else {
        const user = iAmReceiver ? payload.sender : payload.receiver;
        currentConversation = {
          id: uuid.v4().toString(),
          user: user,
          last_message: payload,
          nb_unread_messages: iAmReceiver ? 1 : 0,
          messages: [payload]
        }
        state.conversations = [
          ...state.conversations,
          currentConversation
        ]
      }
    },

  }
})

export const {
  cleanMessages,
  setCurrentUser,
  addMessage
} = MessagesSlice.actions;

export default MessagesSlice.reducer;
