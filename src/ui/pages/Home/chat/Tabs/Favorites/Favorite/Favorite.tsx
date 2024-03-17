import {Text, TouchableOpacity, View} from 'react-native';
import colors from '../../../../../../constants/colors';
import Avatar from '../../../../../../components/avatar/avatar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import icons from '../../../../../../constants/icons';
import iconSize from '../../../../../../constants/iconSize';
import fontSizes from '../../../../../../constants/font-sizes';
import {BASEURL} from '../../../../../../routes/ApiRoutes';
import { useNavigation } from "@react-navigation/native";

type favoritesProps = {
  imageUri: string;
  userId: number,
  userName: string;
};
const Favorite = ({imageUri, userId, userName}: favoritesProps) => {
  const navigation = useNavigation();
  const navigateToDetailProfil = (userId: number) => {
    //@ts-ignore
    navigation.navigate('detailsProfil', {userId: userId});
  }
  return (
    <TouchableOpacity
      onPress={() => {
        navigateToDetailProfil(userId);
      }}
      style={{
        flexDirection: 'row',
        width: '100%',
        padding: 5,
        backgroundColor: colors.light,
      }}>
      <Avatar imageUri={BASEURL + '/' + imageUri} size={'small'} />
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          flex: 5,
          marginTop: 20,
          marginBottom: 20,
        }}>
        <Text style={{fontWeight: 'bold'}}>{userName}</Text>
        <Text style={{fontSize: fontSizes.text, color: colors.gray}}>
          Depuis 2 mois
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'center',
        }}>
        <Icon
          name={icons.star_outline}
          size={iconSize.medium}
          color={colors.principal}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Favorite;
