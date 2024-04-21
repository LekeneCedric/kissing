import React, { useEffect, useRef } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useAppView from "../Global/hooks/useAppView";
import ActiveAccountView from "../pages/authentication/activate_account/ActiveAccountView";
import WelcomeView from "../pages/authentication/welcome/WelcomeView";
import SignInView from "../pages/authentication/signIn/SignInView";
import SignUpView from "../pages/authentication/signUp/SignUpView";
import CompleteProfileView from "../pages/User/Profile/Complete/CompleteProfileView";
import HomeScreen from "./HomeScreen";
import MyProfil from "../pages/Home/Settings/pages/myProfil/myProfil";
import Details from "../pages/Home/matches/components/Matche/Details/Details";
import BlockerUsers from "../pages/Home/Settings/pages/BlockedUsers/BlockerUsers";
import Galerie from "../pages/Galerie/Galerie";
import Room from "../pages/Home/chat/Tabs/Messages/Room/Room.tsx";
import Payment from "../pages/Home/subscription/Payment/Payment.tsx";
import ConfidentialPolitic from "../pages/Home/Settings/pages/ConfidentialPolitic/ConfidentialPolitic.tsx";
import SignalProblem from "../pages/Home/Settings/pages/SignalProblems/SignalProblem.tsx";
import Security from "../pages/Home/Settings/pages/Security/security.tsx";
import { useAppDispatch, useAppSelector } from "../../app/hook.ts";
import { selectAuth, selectUser } from "../../features/auth/thunks/AuthenticationSelectors.ts";
import { SOCKET_SERVER_URL } from "../routes/ApiRoutes.ts";
import { IMessage } from "../../domain/Messages/Messages.ts";
import { addMessage, cleanMessages, setMyId } from "../../features/Messages/MessagesSlice.ts";
import RecoverPasswordSendEmail from "../pages/authentication/RecoverPasswordSendEmail/RecoverPasswordSendEmail.tsx";
import RecoverPasswordConfirmation
  from "../pages/authentication/RecoverPasswordConfirmation/RecoverPasswordConfirmation.tsx";
import { INotification } from "../../domain/Notifications/Notifications.ts";
import {
  addNotification,
  clearNotification,
  setMyNotificationId
} from "../../features/Notifications/NotificationSlice.ts";
import { IMessage as IMessageGiftedChat } from "react-native-gifted-chat/lib/Models";
import uuid from "react-native-uuid";
import { useToast } from "react-native-toast-notifications";

const Stack = createNativeStackNavigator();

function MainScreens(): JSX.Element {
  const {
    accountIsPendingActivation,
    accountIsNotActivated,
    profileIsComplete,
    profileIsPendingComplete,
    accountIsActivated,
    isTokenPresent
  } = useAppView();
  const dispatch = useAppDispatch();
  const authToken = useAppSelector(selectAuth)?.token;
  const myId = useAppSelector(selectAuth)?.profileId;
  const user = useAppSelector(selectUser);
  const toast = useToast();
  const ws = useRef<WebSocket | null>(null);
  const wsNotifications = useRef<WebSocket | null>(null);
  const interval = useRef<any>(null);
  const addMessages = async (messages: IMessageGiftedChat[], data: { id: any, name: any, image_path: any }) => {
    const newMessage: IMessage = {
      id: uuid.v4().toString(),
      message: messages[messages.length - 1].text,
      sender: {
        id: myId!,
        name: user!.username!,
        image_path: user!.image_profile
      },
      receiver: {
        id: data.id,
        name: data.name,
        image_path: data.image_path
      },
      created_at: new Date(),
      is_read: false
    };
    console.warn(newMessage);
    const ws_ = new WebSocket("wss://" + SOCKET_SERVER_URL + "/ws/chat/?token=" + authToken);
    ws_.onopen = () => {
      if (ws_.readyState === WebSocket.OPEN) {
        ws_.send(JSON.stringify({
          action: "create",
          data: {
            content: messages[messages.length - 1].text,
            //@ts-ignore
            receiver: data.id
          },
          request_id: new Date().getTime()
        }));
        dispatch(addMessage(newMessage));
      }
    };
    ws_.onclose = (e) => {
      console.warn(e);
      toast.show("Vérifiez votre connexion internet et réessayer !", {
        type: "danger",
        placement: "top",
        duration: 4000,
        animationType: "slide-in"
      });
    };
  };

  const connectToWsSocket = () => {
    console.warn('socket: try-connect')
    if (authToken && ws.current === null) {
      ws.current = new WebSocket("wss://" + SOCKET_SERVER_URL + "/ws/chat/?token=" + authToken);
    }
    if (authToken && ws.current !== null) {
      console.warn("socket:open");
      if (ws.current?.readyState === WebSocket.CLOSED) {
        ws.current = new WebSocket("wss://" + SOCKET_SERVER_URL + "/ws/chat/?token=" + authToken);
      }
      ws.current!.onopen = () => {
        if (ws.current!.readyState === WebSocket.OPEN) {
          ws.current!.onmessage = (event: WebSocketMessageEvent) => {
            console.warn("socket:onMessage");
            const response = JSON.parse(event.data);
            try {
              let mIds: number[] = [];
              response.data.map((m: any) => {
                const message: IMessage = {
                  id: m.id,
                  message: m.content,
                  sender: {
                    id: m.sender.id,
                    name: m.sender.username,
                    image_path: m.sender.profile_photo.image
                  },
                  receiver: {
                    id: m.receiver.id,
                    name: m.receiver.username,
                    image_path: m.receiver.profile_photo.image
                  },
                  created_at: new Date(m.created_at)
                };
                mIds.push(m.id);
                dispatch(addMessage(message));
              });
              let w = new WebSocket("wss://" + SOCKET_SERVER_URL + "/ws/chat/?token=" + authToken);
              mIds.map(id => {
                w.send(JSON.stringify({
                  action: "delivery_receipt_acknowledgement",
                  request_id: new Date().getTime(),
                  message_id: id
                }));
              })
            } catch (e) {
            }
          };
        }
      };
      ws.current!.onclose = (e: any) => {
        connectToWsSocket();
      };
    }
  };

  const connectToWsNotificationSocket = () => {
    console.log('socket:notif try to connect');
    if (authToken && wsNotifications.current === null) {
      wsNotifications.current = new WebSocket("wss://" + SOCKET_SERVER_URL + "/ws/notifications/?token=" + authToken);
    }
    if (authToken && wsNotifications.current !== null) {
      console.warn("socket_notif:open");
      if (wsNotifications.current?.readyState === WebSocket.CLOSED) {
        wsNotifications.current = new WebSocket("wss://" + SOCKET_SERVER_URL + "/ws/notifications/?token=" + authToken);
      }
      wsNotifications.current!.onopen = () => {
        console.log("connect to notif");
        if (wsNotifications.current!.readyState === WebSocket.OPEN) {
          console.warn('notif-is-connect')
          wsNotifications.current!.onmessage = (event: WebSocketMessageEvent) => {
            const response = JSON.parse(event.data);
            console.log('notif-new-message', response);

            // console.warn('new notif', response)
            response.data.map((notif: any) => {
              const newNotification: INotification = {
                id: `${notif.notification_type}${notif.content}${notif.created_at}`,
                notification_type: notif.notification_type,
                sender: notif.sender,
                recipient: notif.recipient,
                created_at: notif.created_at,
                content: notif.content,
                already_send: notif.already_send
              };
              console.warn("new-notif", newNotification);
              dispatch(addNotification(newNotification));
            });
          };
        }
      };
      wsNotifications.current!.onclose = (e: any) => {
        connectToWsNotificationSocket();
      };
      wsNotifications.current!.onerror = (e: any) => {
        console.log('socket-notif-err', e)
      }
    }
  };
  const connectionCheck = () => {
    setTimeout(() => {
      connectToWsSocket();
    }, 2000);
    setTimeout(() => {
      connectToWsNotificationSocket();
    }, 2000);
    clearInterval(interval.current);
    interval.current = setInterval(() => {
      console.log('interval', interval.current)
      console.warn("token:", authToken);
      // if (authToken && ws.current === null) {
      //   console.warn("socket:create");
      //   ws.current = new WebSocket("wss://" + SOCKET_SERVER_URL + "/ws/chat/?token=" + authToken);
      //   connectToWsSocket();
      // }
      if (authToken && ws.current?.readyState === WebSocket.OPEN) {
        ws!.current!.send(
          JSON.stringify({
            action: "list",
            request_id: new Date().getTime()
          })
        );
      }
      // if (authToken && wsNotifications.current === null) {
      //   console.warn("socket-notif:create");
      //   wsNotifications.current = new WebSocket("wss://" + SOCKET_SERVER_URL + "/ws/notifications/?token=" + authToken);
      //   connectToWsNotificationSocket();
      // }
      if (authToken && wsNotifications.current?.readyState === WebSocket.OPEN) {
        wsNotifications!.current!.send(
          JSON.stringify({
            action: "list",
            request_id: new Date().getTime()
          })
        );
      }
      // clearInterval(wsInterval)
    }, 5000);
  }

  useEffect(() => {
    dispatch(setMyId(myId!));
    dispatch(setMyNotificationId(myId!));
    connectionCheck()
  }, [authToken]);

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}>
      {accountIsNotActivated && (
        <>
          <Stack.Screen name={"Welcome"} component={WelcomeView} />
          <Stack.Screen name={"SignIn"} component={SignInView} />
          <Stack.Screen name={"SignUp"} component={SignUpView} />
          <Stack.Screen name={"recover-password-send-email"} component={RecoverPasswordSendEmail} />
          <Stack.Screen name={"recover-password-confirmation"} component={RecoverPasswordConfirmation} />
        </>
      )}
      {accountIsPendingActivation && (
        <>
          <Stack.Screen
            name={"Activate-Account"}
            component={ActiveAccountView}
          />
        </>
      )}
      {accountIsActivated && !profileIsComplete && (
        <>
          <Stack.Screen
            name={"complete-profile"}
            component={CompleteProfileView}
          />
        </>
      )}
      {accountIsActivated && profileIsComplete && isTokenPresent && (
        <>
          <Stack.Screen name={"home"} component={HomeScreen} />
          <Stack.Screen name={"myProfil"} component={MyProfil} />
          <Stack.Screen name={"blockedUsers"} component={BlockerUsers} />
          <Stack.Screen name={"detailsProfil"} component={Details} />
          <Stack.Screen name={"galerie"} component={Galerie} />
          <Stack.Screen name={"room"}>
            {props => <Room {...props} onSendMessage={addMessages} />}
          </Stack.Screen>
          <Stack.Screen name={"payment"} component={Payment} />
          <Stack.Screen name={"confidential-politic"} component={ConfidentialPolitic} />
          <Stack.Screen name={"signal-problems"} component={SignalProblem} />
          <Stack.Screen name={"security"} component={Security} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default MainScreens;
