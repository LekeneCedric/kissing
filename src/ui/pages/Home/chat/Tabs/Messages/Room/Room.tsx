import { Image, SafeAreaView, StyleProp, Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import styles from "./RoomStyles.tsx";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../../../../../constants/colors.ts";
import icons from "../../../../../../constants/icons.ts";
import iconSize from "../../../../../../constants/iconSize.ts";
import Avatar from "../../../../../../components/avatar/avatar.tsx";
import { useNavigation, useRoute } from "@react-navigation/native";
import fontSizes from "../../../../../../constants/font-sizes.ts";
import {
  Bubble,
  GiftedChat,
  Send,
} from "react-native-gifted-chat";
import React, {useCallback} from "react";
import IsOnlineIndicator from "../../../../../../components/isOnlineIndicator/isOnlineIndicator.tsx";
import { useRoomView } from "./useRoomView.ts";
import { BASEURL } from "../../../../../../routes/ApiRoutes.ts";
import { images } from "../../../../../../constants/images.ts";
import { IMessage as IMessageGiftedChat } from "react-native-gifted-chat/lib/Models";
import useNavigate from "../../../../../../Global/hooks/useNavigation.tsx";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
type props = {
  onSendMessage: (messages: IMessageGiftedChat[], data: {id: any, name: any, image_path: any}) => void
}
const Room = ({onSendMessage}:props) => {
  const navigation = useNavigation();
  const {goTo} = useNavigate()
  const route = useRoute();
  const {
    messages,
    user,
    myId
  } = useRoomView();

  const onSend = useCallback((messages = []) => {
    onSendMessage(messages, {
      //@ts-ignore
      id: route.params!.user.id,
      //@ts-ignore
      name: route.params!.user.name,
      //@ts-ignore
      image_path: route.params!.user.image_path
    });
  }, []);
  const renderBubble = (props: any) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            zIndex: 1000000,
            borderWidth: 1,
            left:0,
            marginLeft: -widthPercentageToDP('10%'),
            borderColor: colors.principal,
            backgroundColor: colors.light // Change the background color for incoming messages
          },
          right: {
            zIndex: 10000000,
            backgroundColor: colors.principal // Change the background color for outgoing messages
          }
        }}
        textStyle={{
          left: {
            color: colors.principal // Change the text color for incoming messages
          },
          right: {
            color: colors.light // Change the text color for outgoing messages
          }
        }}
      />
    );
  };

  const renderSend = (props:any) => {
    return (
      <Send {...props}>
        <View style={{ margin: 10 }}>
          <Icon name={icons.sendMessage} color={colors.principal} size={iconSize.med} />
        </View>
      </Send>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingRight: 15, marginBottom: heightPercentageToDP('2%')}}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => {
            navigation.goBack();
          }}>
            <Icon name={icons.back} color={colors.principal} size={iconSize.normal} />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{
            goTo('detailsProfil', {userId: user.id});
          }} style={{ flexDirection: "row", alignItems: "center", justifyContent: 'center' }}>
            <Avatar
              imageUri={user.image_path ? BASEURL + user.image_path : images.default_image}
              size={"chat"}
            />
            <Text style={{ fontSize: fontSizes.sectionTitle, left: 10 }} numberOfLines={1}>{user.name}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <IsOnlineIndicator isOnline={user.is_online} />
        </View>
      </View>

      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderSend={renderSend}
        onSend={message => onSend(message)}
        user={{
          _id: user.id
        }}
        inverted={true} // Do not invert message order
        listViewProps={{
          style: {
            flex: 1,
            bottom: 10,
          },
          contentContainerStyle: {
            marginLeft: 0,
            paddingLeft: 0,
            flexDirection: "column-reverse",
          }
        }}
        textInputProps={{ autoFocus: true, color: colors.dark }}
      />
      <Image
        source={require("../../../../../../../assets/logo/logo.png")}
        style={[styles.logo, {
          position: "absolute",
          alignSelf: "center",
          justifyContent: "center",
          top: "42%",
          opacity: 0.2,
          zIndex: 0,
        }]}
      />
    </SafeAreaView>
  );
};

export default Room;
