import {Text, TouchableOpacity, View} from 'react-native';
import colors from '../../../../../../constants/colors';
import Avatar from '../../../../../../components/avatar/avatar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import icons from '../../../../../../constants/icons';
import iconSize from '../../../../../../constants/iconSize';
import fontSizes from '../../../../../../constants/font-sizes';
import {BASEURL} from '../../../../../../routes/ApiRoutes';
import { useNavigation } from "@react-navigation/native";
import { images } from "../../../../../../constants/images.ts";
import { widthPercentageToDP } from "react-native-responsive-screen";

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
        borderBottomWidth: 0.2,
        borderBottomColor: colors.gray
      }}>
      <Avatar imageUri={imageUri ? imageUri: images.default_image} size={'chat'} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          flex: 5,
          paddingLeft: widthPercentageToDP('2%')
        }}>
        <Text style={{fontWeight: 'bold'}}>{userName}</Text>
        <Icon
          name={icons.star}
          size={iconSize.medium}
          color={colors.principal}
        />
      </View>
      {/*<View*/}
      {/*  style={{*/}
      {/*    flexDirection: 'column',*/}
      {/*    flex: 1,*/}
      {/*    justifyContent: 'center',*/}
      {/*  }}>*/}
      {/*  <Icon*/}
      {/*    name={icons.star_outline}*/}
      {/*    size={iconSize.medium}*/}
      {/*    color={colors.principal}*/}
      {/*  />*/}
      {/*</View>*/}
    </TouchableOpacity>
  );
};

export default Favorite;
