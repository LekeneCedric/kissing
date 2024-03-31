import { Text, TouchableOpacity, View } from "react-native";
import Avatar from "../../../../../../components/avatar/avatar";
import colors from "../../../../../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { IConversation } from "../../../../../../../domain/Messages/Messages.ts";
import { BASEURL } from "../../../../../../routes/ApiRoutes.ts";
import fontSizes from "../../../../../../constants/font-sizes.ts";
import { images } from "../../../../../../constants/images.ts";
import TimeAgo from "javascript-time-ago";
import fr from 'javascript-time-ago/locale/fr'
TimeAgo.addDefaultLocale(fr)

const Conversation = (
  {
    id,
    user,
    last_message,
    nb_unread_messages
  }: IConversation
) => {
  const timeAgo = new TimeAgo('fr-FR');
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
          },
          conversation: {
            id: id
          }
        });
      }}
      style={{
        flexDirection: "row",
        alignItems: 'center',
        width: "100%",
        padding: 5,
        backgroundColor: colors.light
      }}>
      <Avatar
        imageUri={user.image_path ?`${BASEURL}${user.image_path}`: images.default_image }
        size={"chat"}
        additionalStyle={{flex: 2}}
      />
      <View style={{flexDirection: 'column', flex: 7, left: 5}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{ fontWeight: "bold", fontSize: fontSizes.text }}>{user.name}</Text>
          <Text style={{fontSize: fontSizes.text, color: colors.gray}}>
            {timeAgo.format(new Date(last_message.created_at))}
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: '2%'}}>
          <Text numberOfLines={1} style={{fontSize: fontSizes.text, color: colors.gray, top: 5}}>{last_message.message}</Text>
          {
            nb_unread_messages > 0 && (
              <View
                style={{
                  backgroundColor: colors.principal,
                  borderRadius: 100,
                  padding: 2,
                  width: "10%",
                  top: '1%',
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                <Text style={{ color: colors.light, textAlign: "center" }}>{nb_unread_messages}</Text>
              </View>
            )
          }
        </View>
      </View>
      {/*<View*/}
      {/*  style={{*/}
      {/*    flexDirection: "column",*/}
      {/*    justifyContent: "space-between",*/}
      {/*    flex: 4,*/}
      {/*    marginTop: 20,*/}
      {/*    marginBottom: 20,*/}
      {/*    marginLeft: 5,*/}
      {/*  }}>*/}
      {/*  </View>*/}
      {/*<View*/}
      {/*  style={{*/}
      {/*    flexDirection: "column",*/}
      {/*    flex: 2,*/}
      {/*    justifyContent: "space-between",*/}
      {/*    marginTop: 20,*/}
      {/*    marginBottom: 20,*/}
      {/*    alignItems: "flex-end"*/}
      {/*  }}>*/}
      {/*  */}
      {/*</View>*/}
    </TouchableOpacity>
  );
};

export default Conversation;
