import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { styles } from './NotificationsStyle.tsx';
import fontSizes from "../../../constants/font-sizes.ts";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { useNotifications } from "./useNotifications.ts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import icons from "../../../constants/icons.ts";
import iconSize from "../../../constants/iconSize.ts";
import colors from "../../../constants/colors.ts";
const Notifications = () => {
  const {
    notifications,
  } = useNotifications();
  return <SafeAreaView style={styles.pageContainer}>
    <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: fontSizes.title, fontWeight: 'bold', marginTop: heightPercentageToDP('1%')}}>Notifications</Text>
    </View>
    <ScrollView style={{marginTop: heightPercentageToDP('3%')}}>


      {
        notifications.map(notif => {
          return (
            <View style={{width: '95%', flexDirection: 'row', marginTop: 15, alignSelf: 'center'}}>
              <Icon style={{flex: 2}} name={icons.star_outline} size={iconSize.medium} color={colors.gray} />
              <View style={{flex: 8, flexDirection: 'column', borderBottomWidth: 0.5, borderBottomColor: colors.gray}}>
                <Text style={{color: colors.dark, fontSize: fontSizes.text, fontWeight: 'bold'}}>{notif.content}</Text>
                <Text style={{color: colors.gray, fontSize: fontSizes.text, textAlign: 'right'}}>{new Date(notif.created_at).toDateString()}</Text>
              </View>
            </View>
          )
        })
      }
    </ScrollView>
  </SafeAreaView>
};

export default Notifications;
