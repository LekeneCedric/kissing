import React, { useEffect, useMemo, useRef } from "react";
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
import { addNotification } from "../../features/Notifications/NotificationSlice.ts";
import { IMessage as IMessageGiftedChat } from "react-native-gifted-chat/lib/Models";
import uuid from "react-native-uuid";

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

  console.warn(`my id : ${myId}`);
  const user = useAppSelector(selectUser);
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
    const ws_ = new WebSocket("ws://" + SOCKET_SERVER_URL + "/ws/chat/?token=" + authToken);
    ws_.onopen = () => {
      ws_.send(JSON.stringify({
        action: "create",
        data: {
          content: messages[messages.length - 1].text,
          //@ts-ignore
          receiver: data.id
        },
        request_id: new Date().getTime()
      }));
    };
    ws_.onclose = () => {

    };
    dispatch(addMessage(newMessage));
  };


  const ws = new WebSocket("ws://" + SOCKET_SERVER_URL + "/ws/chat/?token=" + authToken);
  const wsNotifications = new WebSocket("ws://" + SOCKET_SERVER_URL + "/ws/notifications?token=" + authToken);
  useEffect(() => {
    console.warn("socket change.........");
    ws.onopen = () => {
      // ws.send(
      //   JSON.stringify({
      //     action: "subscribe_to_chat_activity",
      //     request_id: new Date().getTime()
      //   })
      // );
      // setInterval(() => {
      //   ws.send(
      //     JSON.stringify({
      //       action: "list",
      //       request_id: new Date().getTime()
      //     })
      //   );
      // }, 3000)


      ws.onmessage = (event: WebSocketMessageEvent) => {
        // console.warn(`${user!.id} - new message !`)
        const response = JSON.parse(event.data);
        //console.log("code237f2f", response);
        // if (response.content) {
        //   ws.send(
        //     JSON.stringify({
        //       action: "list",
        //       request_id: new Date().getTime()
        //     })
        //   );
        // }
        try {
          console.warn(`msg : ${myId}`, response);
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
            // ws.send(JSON.stringify({
            //   action: "delivery_receipt_acknowledgement",
            //   request_id: new Date().getTime(),
            //   message_id: m.id
            // }));
            dispatch(addMessage(message));
          });
        } catch (e) {
          //console.log(event.data);
        }
      };
      ws.onerror = (error) => {
        //console.log('error', error)
      };

    };

    wsNotifications.onopen = () => {
      //console.log("connect to notif");
      wsNotifications.send(
        JSON.stringify({
          action: "list",
          request_id: new Date().getTime()
        })
      );
      wsNotifications.send(
        JSON.stringify({
          action: "subscribe_to_notification_activity",
          request_id: new Date().getTime()
        })
      );
      wsNotifications.onmessage = (event: WebSocketMessageEvent) => {
        const response = JSON.parse(event.data);
        // console.warn('new notif', response)
        if (response.content) {
          ws.send(
            JSON.stringify({
              action: "list",
              request_id: new Date().getTime()
            })
          );
        }
        try {
          response.data.map((notif: any) => {
            const newNotification: INotification = {
              notification_type: notif.notification_type,
              sender: notif.sender,
              recipient: notif.recipient,
              created_at: notif.created_at,
              content: notif.content,
              already_send: notif.already_send
            };
            dispatch(addNotification(newNotification));
          });
        } catch (e) {

        }
      };
      ws.onclose = (e) => {
        // Connection closed
        //console.log(e.code, e.reason);
      };
      wsNotifications.onclose = (e) => {
        // Connection closed
        //console.log(e.code, e.reason);
      };
    };
  }, [ws, wsNotifications]);
  setInterval(() => {
    ws.send(
      JSON.stringify({
        action: "list",
        request_id: new Date().getTime()
      })
    );
  }, 10000);

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
