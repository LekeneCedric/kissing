import { useAppDispatch, useAppSelector } from "../../../../../../../app/hook.ts";
import { useEffect, useState } from "react";
import { GiftedChat, IMessage as IMessageGiftedChat } from "react-native-gifted-chat";
import { IMessage } from "../../../../../../../domain/Messages/Messages.ts";
import { selectAuth, selectUser } from "../../../../../../../features/auth/thunks/AuthenticationSelectors.ts";
import { useRoute } from "@react-navigation/native";
import { addMessage, setCurrentUser } from "../../../../../../../features/Messages/MessagesSlice.ts";
import { selectMessages } from "../../../../../../../features/Messages/MessagesSelectors.ts";
import WebsocketService from "../../../../../../../infrastructure/Messages/WebsocketService.ts";
import uuid from "react-native-uuid";
import { BASEURL, SOCKET_SERVER_URL } from "../../../../../../routes/ApiRoutes.ts";
import { images } from "../../../../../../constants/images.ts";

type user = {
  id: number,
  name: string,
  image_path: string
}
interface useRoomViewBehaviour {
  messages: IMessageGiftedChat[],
  addMessages: (messages: any[]) => void,
  user: user,
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
    image_path: route.params!.user!.image_path
  };
  dispatch(setCurrentUser(roomUser.id));
  const user = useAppSelector(selectUser);
  const messages_ = useAppSelector(selectMessages)?.messages;
  const authToken = useAppSelector(selectAuth)?.token;
  const ws = new WebSocket("ws://" + SOCKET_SERVER_URL + "/ws/chat/?token=" + authToken);
  const [messages, setMessages] = useState<any[]>([]);
  const addMessages = (messages: IMessageGiftedChat[]) => {
    const newMessage: IMessage = {
      id: uuid.v4().toString(),
      message: messages[messages.length - 1].text,
      sender: {
        id: user!.id!,
        name: user!.username!,
        image_path: user!.image_profile
      },
      receiver: {
        //@ts-ignore
        id: route.params!.user.id,
        //@ts-ignore
        name: route.params!.user.name,
        //@ts-ignore
        image_path: route.params!.user.image_path
      },
      created_at: new Date(),
      is_read: false
    };
    ws.send(JSON.stringify({
      action: "create",
      data: {
        content: messages[messages.length - 1].text,
        //@ts-ignore
        receiver: route.params!.user.id
      },
      request_id: new Date().getTime()
    }));
    dispatch(addMessage(newMessage));

  };

  const setImage = (image: string|undefined) => {
    return image ? BASEURL+'/'+image : images.default_image
  }
  useEffect(() => {
    let mess: any[] = [];
    messages_ !== undefined ? messages_.map(m => {
      let iAmSender = m.sender.id == user!.id;
      mess = [...mess, {
        _id: m.id,
        text: m.message,
        createdAt: m.created_at,
        user: {
          _id: iAmSender ? m.receiver.id : user!.id,
          name: iAmSender ? m.receiver.name : user!.username,
          avatar: iAmSender ? setImage(m.receiver.image_path): setImage(user!.image_profile)
        }
      }];
    }) : null;
    setMessages(mess.sort((a, b) => a.createdAt - b.createdAt));
  }, [messages_]);
  return {
    messages: messages,
    addMessages: addMessages,
    user: roomUser
  };
};
