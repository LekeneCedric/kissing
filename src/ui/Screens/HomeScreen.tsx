import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import colors from '../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import icons from '../constants/icons';
import Subscription from '../pages/Home/subscription/Subscription';
import Chat from '../pages/Home/chat/Chat';
import Notifications from '../pages/Home/notifications/Notifications';
import MatchesList from '../pages/Home/matches/MatchesList';
import Settings from '../pages/Home/Settings/Settings';
import { Text, View } from "react-native";
import { useAppSelector } from "../../app/hook.ts";
import { selectNbUnreadMessages } from "../../features/Messages/MessagesSelectors.ts";
import { useEffect } from "react";
import fontSizes from "../constants/font-sizes.ts";

const Tab = createBottomTabNavigator();
const HomeScreen = () => {

  const nbUnreadMessage = useAppSelector(selectNbUnreadMessages);
  useEffect(() => {
    //console.log('unread-messages',nbUnreadMessage)
  }, []);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.principal,
      }}>
      <Tab.Screen
        name={'Matches'}
        component={MatchesList}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <Icon name={icons.love} size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name={'Chat'}
        component={Chat}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <View style={{position: 'relative'}}>
              <View style={{
                position: 'absolute',
                borderRadius: 100,
                padding: '2%',
                width: '20%',
                zIndex: 2,
                backgroundColor: colors.red,
                top: '-1%',
                right: '-1%',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: nbUnreadMessage > 0 ? 1 : 0
              }}>
              <Text style={{fontSize: fontSizes.info, color: colors.light}}>{nbUnreadMessage}</Text>
              </View>
              <Icon name={icons.chat} size={size} color={color} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name={'Notifications'}
        component={Notifications}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <Icon name={icons.notifications} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={'Subsciption'}
        component={Subscription}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <Icon name={icons.subscription} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={'settings'}
        component={Settings}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <Icon name={icons.settings} size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;
