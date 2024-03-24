import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IConversation, IMessage } from "../../domain/Messages/Messages.ts";
import uuid from "react-native-uuid";

interface initialState {
  nb_unread_messages: number,
  conversations: IConversation[],
  my_id?: number,
  current_user_id?: number,
}

const initialState: initialState = {
  nb_unread_messages: 0,
  conversations: []
}
const MessagesSlice = createSlice({
  name: 'messages',
  initialState: initialState,
  reducers: {
    cleanMessages: (state) => {
      state.current_user_id = undefined;
      state.nb_unread_messages = 0;
      state.conversations = []
    },
    setMyId: (state, {payload}: PayloadAction<number>) => {
      state.my_id = payload;
    },
    setCurrentUser: (state, {payload}: PayloadAction<number>) => {
      state.current_user_id = payload;
    },
    addMessage: (state, {payload}: PayloadAction<IMessage>) => {
      // console.warn('my_id', state.my_id);
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
      console.warn('corresponding conv', iAmReceiver, payload, correspondingConversation)
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
          if (iAmReceiver) {
            state.nb_unread_messages = state.nb_unread_messages + 1;
          }
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
          if (iAmReceiver) {
            state.nb_unread_messages = state.nb_unread_messages + 1
          }
          state.conversations = [
            ...state.conversations,
            currentConversation
          ]
      }
    },
    seeConversationMessages: (state, {payload}: PayloadAction<string>) => {
      const conversation = state.conversations.filter(c => c.id == payload)[0];
      const conversationNbUnreadMessages = conversation.nb_unread_messages;
      conversation.nb_unread_messages = 0;
      state.conversations = [
        ...state.conversations.filter(c => c.id !== conversation.id),
        conversation,
      ]
      state.nb_unread_messages = state.nb_unread_messages - conversationNbUnreadMessages;
    }
  }
})

export const {
  cleanMessages,
  setCurrentUser,
  addMessage,
  setMyId,
  seeConversationMessages
} = MessagesSlice.actions;

export default MessagesSlice.reducer;
