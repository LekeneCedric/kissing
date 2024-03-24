import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './Styles';
import Avatar from '../../../components/avatar/avatar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import iconSize from '../../../constants/iconSize';
import icons from '../../../constants/icons';
import colors from '../../../constants/colors';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MenuItem from './components/MenuItem/MenuItem';
import useSettingsView from './useSettingsView';
import {BASEURL} from '../../../routes/ApiRoutes';
import { images } from "../../../constants/images.ts";
import useNavigate from "../../../Global/hooks/useNavigation.tsx";

const Settings = () => {
  const {menuList, user, auth, goToMyProfile} = useSettingsView();
  const {goTo} = useNavigate();
  return (
    <SafeAreaView
      style={[
        styles.container,
        {alignItems: 'center', backgroundColor: colors.light},
      ]}>
      <View style={{width: '100%', alignItems: 'flex-end'}}>
        <TouchableOpacity onPress={goToMyProfile}>
          <Icon name={icons.edit} size={iconSize.medium} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          goTo('galerie', {images: [{image: user.image_profile, is_main_photo: true}]})
        }}
      >
        <Avatar
          size={'medium'}
          imageUri={user.image_profile ? user.image_profile: images.default_image}
        />
      </TouchableOpacity>

      <View style={{width: '100%', alignItems: 'center'}}>
        <Text style={styles.userName}>
          {' '}
          {auth.user!.username ? auth.user!.username : ''}, {user.age ? user.age : 0}
        </Text>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: colors.gray,
          width: '90%',
          marginTop: hp('2%'),
        }}
      />
      <ScrollView style={styles.menuListStyle}>
        {menuList.map(menu => (
          <MenuItem
            icon={menu.icon}
            title={menu.title}
            description={menu.description}
            action={menu.action}
            color={menu.color}
          />
        ))}
      </ScrollView>
      <Image
        source={require('../../../../assets/logo/logo.png')}
        style={styles.logo}
      />
    </SafeAreaView>
  );
};

export default Settings;
