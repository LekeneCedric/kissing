import React, { useEffect } from "react";
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
import { addMessage } from "../../features/Messages/MessagesSlice.ts";
import RecoverPasswordSendEmail from "../pages/authentication/RecoverPasswordSendEmail/RecoverPasswordSendEmail.tsx";
import RecoverPasswordConfirmation
  from "../pages/authentication/RecoverPasswordConfirmation/RecoverPasswordConfirmation.tsx";

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
  const myId = useAppSelector(selectUser)?.id;
  const ws = new WebSocket("ws://" + SOCKET_SERVER_URL + "/ws/chat/?token=" + authToken);
  setTimeout(() => {

  })
  ws.onopen = () => {
    setInterval(() => {
      ws.send(
        JSON.stringify({
          action: "list",
          request_id: new Date().getTime()
        })
      );
    }, 3000);

    setInterval(() => {
      ws.send(
        JSON.stringify({
          action: "subscribe_to_chat_activity",
          request_id: new Date().getTime()
        })
      );
    }, 10000);
    ws.onmessage = (event: WebSocketMessageEvent) => {
      const response = JSON.parse(event.data);
      console.log("code237f2f", response);
      try {
        response.data.map((m: any) => {
          const message: IMessage = {
            id: m.id,
            message: m.content,
            sender: {
              id: m.sender.id,
              name: m.sender.username,
              image_path: m.sender.profile_photo
            },
            receiver: {
              id: m.receiver.id,
              name: m.receiver.username,
              image_path: m.receiver.profile_photo
            },
            created_at: new Date(m.created_at)
          };
          if (m.receiver.id === myId) {
            ws.send(JSON.stringify({
              action: "delivery_receipt_acknowledgement",
              request_id: new Date().getTime(),
              message_id: m.id
            }));
          }
          dispatch(addMessage(message));
        });
      } catch (e) {
        console.log(event.data);
      }
    };

  };
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}>
      {accountIsNotActivated && (
        <>
          <Stack.Screen name={"Welcome"} component={WelcomeView} />
          <Stack.Screen name={"SignIn"} component={SignInView} />
          <Stack.Screen name={"SignUp"} component={SignUpView} />
          <Stack.Screen name={'recover-password-send-email'} component={RecoverPasswordSendEmail} />
          <Stack.Screen name={'recover-password-confirmation'} component={RecoverPasswordConfirmation} />
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
          <Stack.Screen name={"room"} component={Room} />
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
