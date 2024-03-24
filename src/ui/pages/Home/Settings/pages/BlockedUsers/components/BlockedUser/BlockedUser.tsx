import {Text, TouchableOpacity, View} from 'react-native';
import styles from './BlockedUserStyle';
import Avatar from '../../../../../../../components/avatar/avatar';
import colors from '../../../../../../../constants/colors';
import fontSizes from '../../../../../../../constants/font-sizes';
import { UserDetail } from "../../../../../../../../domain/User/User.ts";
import { BASEURL } from "../../../../../../../routes/ApiRoutes.ts";
import { images } from "../../../../../../../constants/images.ts";

type props = {
  data: UserDetail,
  deblock: (userId: number) => void;
}
const BlockedUser = ({data, deblock}: props) => {
  return (
    <View style={styles.container}>
      <Avatar
        size={'small'}
        imageUri={
          data.user!.images?.length! > 0 ?BASEURL+'/'+data.user!.images![0].image : images.default_image
        }
      />
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          margin: 10,
          width: '100%'
        }}>
        <Text style={styles.userName}> {`${data.user?.username}, ${data.user?.age}`}</Text>
        <TouchableOpacity
          onPress={() => {deblock(data.id!)}}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.principal,
            borderColor: colors.principal,
            borderWidth: 1,
            borderRadius: 10,
            width: '40%'
          }}>
          <Text style={{fontSize: fontSizes.text, color: colors.light}}>
            débloquer
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BlockedUser;
