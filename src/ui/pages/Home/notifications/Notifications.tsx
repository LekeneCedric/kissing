import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { styles } from './NotificationsStyle.tsx';
import fontSizes from "../../../constants/font-sizes.ts";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { useNotifications } from "./useNotifications.ts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import icons from "../../../constants/icons.ts";
import iconSize from "../../../constants/iconSize.ts";
import colors from "../../../constants/colors.ts";
import TimeAgo from "javascript-time-ago";
import fr from 'javascript-time-ago/locale/fr'
import { useEffect } from "react";
TimeAgo.addDefaultLocale(fr)
const Notifications = () => {
  const timeAgo = new TimeAgo('fr-FR');
  const {
    notifications,
  } = useNotifications();
  return <SafeAreaView style={styles.pageContainer}>
    <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: fontSizes.title, fontWeight: 'bold', marginTop: heightPercentageToDP('1%')}}>Notifications</Text>
    </View>
    <ScrollView style={{marginTop: heightPercentageToDP('1%')}}>


      {
        notifications.map(notif => {
          console.warn('icon',notif.icon)
          return (
            <View style={{width: '95%', flexDirection: 'row', marginTop: 15, alignSelf: 'center'}}>
              <Icon style={{flex: 1}} name={notif.icon!} size={iconSize.normal} color={notif.color} />
              <View style={{flex: 9, flexDirection: 'column', borderBottomWidth: 0.5, borderBottomColor: colors.gray}}>
                <Text style={{color: colors.dark, fontSize: fontSizes.text, fontWeight: 'normal'}}>{notif.content}</Text>
                <Text style={{color: colors.gray, fontSize: fontSizes.text, textAlign: 'right', marginTop: 5}}>{timeAgo.format(new Date(notif.created_at))}</Text>
              </View>
            </View>
          )
        })
      }
    </ScrollView>
  </SafeAreaView>
};

export default Notifications;
