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
      state.my_id = 0;
      state.current_user_id = 0;
    },
    setMyId: (state, {payload}: PayloadAction<number>) => {
      state.my_id = payload;
    },
    setCurrentUser: (state, {payload}: PayloadAction<number>) => {
      state.current_user_id = payload;
    },
    addMessage: (state, {payload}: PayloadAction<IMessage>) => {
      if (state.my_id == 0 ) return;
      // console.warn('my_id', state.my_id);
      let currentConversation: IConversation | undefined = undefined;
      let iAmReceiver = payload.receiver.id == state.my_id;
      let iAmSender = payload.sender.id == state.my_id;

      const correspondingConversation = state.conversations.find(
        (conversation:IConversation) => {
          if (iAmReceiver) {
            return conversation.user.id == payload.sender.id;
          }
          if (iAmSender) {
            return conversation.user.id == payload.receiver.id;
          }
          // const userIds = [
          //   payload.sender.id,
          //   payload.receiver.id,
          // ];
          // return userIds.includes(conversation.user.id)
        });
      // console.warn('corresponding conv', iAmReceiver, payload, correspondingConversation)
      // console.warn('iamreceiver', iAmReceiver)

      if (correspondingConversation) {
        currentConversation = correspondingConversation;
        const messageAlreadyExist = currentConversation?.messages
          ?.find(m => m.id === payload.id) !== undefined;
        if (!messageAlreadyExist) {
          currentConversation = {
            ...currentConversation,
            messages: [
              ...currentConversation?.messages!,
              payload
            ],
            last_message: payload,
            nb_unread_messages: payload.receiver.id == state.my_id ? currentConversation?.nb_unread_messages + 1 : currentConversation?.nb_unread_messages
          }
          if (payload.receiver.id == state.my_id) {
            console.warn('nb message ++')
            state.nb_unread_messages = state.nb_unread_messages + 1;
          }
          state.conversations = [
            ...state.conversations.filter(c => c.id !== currentConversation?.id),
            currentConversation
          ];
        }
      } else {
        const user = payload.receiver.id == state.my_id ? payload.sender : payload.receiver;
          currentConversation = {
            id: uuid.v4().toString(),
            user: user,
            last_message: payload,
            nb_unread_messages: payload.receiver.id == state.my_id ? 1 : 0,
            messages: [payload]
          }
          if (payload.receiver.id == state.my_id) {
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
