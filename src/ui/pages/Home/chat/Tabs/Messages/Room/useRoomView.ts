import { useAppDispatch, useAppSelector } from "../../../../../../../app/hook.ts";
import { useEffect, useState } from "react";
import { GiftedChat, IMessage as IMessageGiftedChat } from "react-native-gifted-chat";
import { IMessage } from "../../../../../../../domain/Messages/Messages.ts";
import { selectAuth, selectUser } from "../../../../../../../features/auth/thunks/AuthenticationSelectors.ts";
import { useRoute } from "@react-navigation/native";
import {
  addMessage,
  seeConversationMessages,
  setCurrentUser
} from "../../../../../../../features/Messages/MessagesSlice.ts";
import { selectMessages } from "../../../../../../../features/Messages/MessagesSelectors.ts";
import WebsocketService from "../../../../../../../infrastructure/Messages/WebsocketService.ts";
import uuid from "react-native-uuid";
import { BASEURL, SOCKET_SERVER_URL } from "../../../../../../routes/ApiRoutes.ts";
import { images } from "../../../../../../constants/images.ts";

type user = {
  id: number,
  name: string,
  image_path: string,
  is_online: boolean,
}
interface useRoomViewBehaviour {
  messages: IMessageGiftedChat[],
  user: user,
  myId: number,
}

export const useRoomView = (): useRoomViewBehaviour => {
  const route = useRoute();
  const dispatch = useAppDispatch();
  //@ts-ignore
  const roomUser: user = {
    //@ts-ignore
    id: route.params!.user!.id,
    //@ts-ignore
    name: route.params!.user!.name,
    //@ts-ignore
    image_path: route.params!.user!.image_path,
    //@ts-ignore
    is_online: route.params!.user!.isOnline,
  };
  dispatch(setCurrentUser(roomUser.id));
  const user = useAppSelector(selectUser);
  const myId = useAppSelector(selectAuth)!.profileId;
  const messages_ = useAppSelector(selectMessages)?.messages;
  const [messages, setMessages] = useState<any[]>([]);
  const setImage = (image: string|undefined) => {
    return image ? BASEURL+image : images.default_image
  }
  useEffect(() => {
    setTimeout(() => {
      console.warn(messages_)
    }, 3000)
    console.warn('user_id', myId);
    //@ts-ignore
    const conversationId = route.params!.conversation?.id;
    if (conversationId) {
      dispatch(seeConversationMessages(conversationId));
    }
    let mess: any[] = [];
    messages_ !== undefined ? messages_.map(m => {
      let iAmSender = m.sender.id == myId;
      console.warn(iAmSender);
      mess = [...mess, {
        _id: m.id,
        text: m.message,
        createdAt: new Date(m.created_at),
        user: {
          _id: iAmSender ? m.receiver.id : myId,
          name: iAmSender ? m.receiver.name : user!.username,
          avatar: iAmSender ? setImage(m.receiver.image_path): setImage(user!.image_profile)
        }
      } ];
    }) : null;
    setMessages(mess.sort((a, b) => a.createdAt - b.createdAt));
  }, [messages_]);
  return {
    messages: messages,
    user: roomUser,
    myId: myId,
  };
};
