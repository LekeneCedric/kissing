import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './BlockedUsersStyle';
import colors from '../../../../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import icons from '../../../../../constants/icons';
import iconSize from '../../../../../constants/iconSize';
import fontSizes from '../../../../../constants/font-sizes';
import {useNavigation} from '@react-navigation/native';
import BlockedUser from './components/BlockedUser/BlockedUser';
import { useBlockedUsers } from "./useBlockedUsers.ts";

const BlockerUsers = () => {
  const navigation = useNavigation();
  const {
    blockedUsers,
    deblockUser
  } = useBlockedUsers();
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          style={{
            borderRadius: 10,
            borderWidth: 1,
            borderColor: colors.principal,
            position: 'absolute',
            left: 10,
            zIndex: 100000,
          }}
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon
            name={icons.back}
            color={colors.principal}
            size={iconSize.normal}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: fontSizes.title,
            width: '100%',
            textAlign: 'center',
          }}>
          {' '}
          Utilisateurs bloqués
        </Text>
      </View>
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
        <View style={{borderWidth: 1, flex: 1, borderColor: colors.gray}} />
        <Text style={{fontSize: fontSizes.description, color: colors.gray}}>
          {' '}
          Liste des utilisateurs bloqués !{' '}
        </Text>
        <View style={{borderWidth: 1, flex: 1, borderColor: colors.gray}} />
      </View>

      <ScrollView>

        {
          blockedUsers.map(details => {
            return (
              <BlockedUser deblock={(userId: number) => {deblockUser(userId)}} data={details} />
            )
          })
        }
      </ScrollView>
    </SafeAreaView>
  );
};

export default BlockerUsers;
