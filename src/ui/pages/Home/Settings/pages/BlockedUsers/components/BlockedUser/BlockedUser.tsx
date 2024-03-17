import {Text, TouchableOpacity, View} from 'react-native';
import styles from './BlockedUserStyle';
import Avatar from '../../../../../../../components/avatar/avatar';
import colors from '../../../../../../../constants/colors';
import fontSizes from '../../../../../../../constants/font-sizes';

const BlockedUser = () => {
  return (
    <View style={styles.container}>
      <Avatar
        size={'small'}
        imageUri={
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8niZrdAiakWTN89rn8Is0nCUBb-V4_LUuFw&usqp=CAU'
        }
      />
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          margin: 10,
        }}>
        <Text style={styles.userName}> Maria Dezamparada</Text>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.principal,
            borderColor: colors.principal,
            borderWidth: 1,
            borderRadius: 10,
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
