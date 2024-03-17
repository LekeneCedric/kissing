import { Text, TouchableOpacity, View } from "react-native";
import Avatar from "../../../../../../components/avatar/avatar";
import colors from "../../../../../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { IConversation } from "../../../../../../../domain/Messages/Messages.ts";
import { BASEURL } from "../../../../../../routes/ApiRoutes.ts";
import fontSizes from "../../../../../../constants/font-sizes.ts";
import { images } from "../../../../../../constants/images.ts";


const Conversation = (
  {
    user,
    last_message,
    nb_unread_messages
  }: IConversation
) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        //@ts-ignore
        navigation.navigate("room", {
          user: {
            id: user!.id,
            name: user?.name,
            image_path: user?.image_path ?? ""
          }
        });
      }}
      style={{
        flexDirection: "row",
        width: "100%",
        padding: 5,
        backgroundColor: colors.light
      }}>
      <Avatar
        imageUri={user.image_path ?`${BASEURL}/${user.image_path}`: images.default_image }
        size={"conversation"}
      />
      <View
        style={{
          flexDirection: "column",
          justifyContent: "space-between",
          flex: 6,
          marginTop: 20,
          marginBottom: 20,
          marginLeft: 5,
        }}>
        <Text style={{ fontWeight: "bold", fontSize: fontSizes.text }}>{user.name}</Text>
        <Text numberOfLines={1} style={{fontSize: fontSizes.text, color: colors.gray, top: 5}}>{last_message.message}</Text>
      </View>
      <View
        style={{
          flexDirection: "column",
          flex: 2,
          justifyContent: "space-between",
          marginTop: 20,
          marginBottom: 20,
          alignItems: "center"
        }}>
        <Text style={{fontSize: fontSizes.text, color: colors.gray}}>
          {`${new Date(last_message.created_at).toDateString().split(" ")[0]}   ${String(new Date(last_message.created_at).getHours()).padStart(2, '0')}:${String(new Date(last_message.created_at).getMinutes()).padStart(2, '0')}`} </Text>
        {
          nb_unread_messages > 0 && (
            <View
              style={{
                backgroundColor: colors.principal,
                borderRadius: 10,
                padding: 2,
                width: "50%",
                alignItems: "center",
                justifyContent: "center"
              }}>
              <Text style={{ color: colors.light, textAlign: "center" }}>{nb_unread_messages}</Text>
            </View>
          )
        }
      </View>
    </TouchableOpacity>
  );
};

export default Conversation;
