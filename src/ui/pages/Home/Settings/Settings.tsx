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

const Settings = () => {
  const {menuList, user, goToMyProfile} = useSettingsView();
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
      <Avatar
        size={'medium'}
        imageUri={user.images! ? BASEURL + '/' + user.images![0]?.image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJ8AAACUCAMAAAC6AgsRAAAAMFBMVEX+/v68vb////+5urzb3N22t7n7+/v//vzy8vLX19j39/e/wMLP0NLu7u7Fxsjj4+SSDwBZAAAEbUlEQVR4nO2c2ZLcIAxFjbCxMdv//23Avc+0u5EA4an4viSVPOSUsISQ7mQYTp06derggqRBKXX93bEEoFwYtU3SY3DqSISRxVkjhLxJGGPDcBREWEczSfEqOZlxPQIgQPA/4a6IPsQQzp3xlJ3e0iVNXnUOISw7wbuF0HUFhEV8wkuEPQHBfaFL6gcIyn/HE2btliQfv737CZuhTwRhzMGLgLoLHziThSc6fYKQdbpbAH0HPnD7dfmnpg4BhJzcvYk/gIivL8qwBzA3eS+SmhlvyCrNTwfM3CjAgglfzJCFmW/Mz96Nb2Tmsyg89hIIOLwoVj5Y0XysjxFwaL7AyheOzDfH9EXzMSbwjLw9kuTR+Rib1L/Ah8TjPt+j52/Ani8zH74+s3aosKLjxztsO3h/EPsrZAC5+6uA7E9Z2wN8fy8X4J0RqezpwYbnFfMMC/m+HLlnbLCg3ucL+wwQk8HSdpi/LIj5EPPr9wKos+drHcKX7rjcL9D0CN+Q3cRI5tr8AMxKkT6nu/GtGUVa+n5rwgzAnnjz/BVQmr5LVlAfv0Fpe++AIV7Ee4QyXrv9V9Sw2LeEUto+de9V8bEEzoofC345CesOELyLYFhCRJymzR0RfxU2LJ22gu+VLC+bw0Rf3SWHid1D8FBvlFP/hyBHHdHWJYTxk0JwawdDWywmq9PebO4X+UHpb4XXblWMdrF4YYy/boxPXYKcpNchee7mqNZwQ/BityfYZ4xhXJufMwxOT7jR0BPj5EPTPTDEXuWb4epLFP3YLIaJLv+j20UUjWIIaiyK3V1TC9NdzFnURO2TpNDVmy+FXOh/VtUQzl+fQRTVGyrMadhXG09IXS1NcF6hbEBbq9DkuDhJgFUiSNhlZQPWwFOt8KoshQG3SMACFmcxflOOU+GIAeOSpKjU95RvMqUCFp0wYU+O5SspMnkG8ULAgps4y19fyketMakt0G2z4wJYwNf+eGOvRRwBJz6G8JHN2zNqBUgX/ZLDmgyIfOT9EtqkQZNXVD6O9KCvN2Hl4aNan9q09b9FvYIJJjpmPpb0IP9wQ+vW9M5HfIbUf5Pv8BELTNOXx7MMqQUExZO+MYCkDgEUU/iIHQysHLfvxke6QHi6l42PdIG0flo+8ZEKNE93tfGRvOV8fDTvO/ZHtAr4SB10vn/u5HvLd/TzPfP3xkerf3z1mXZ/HP3+bTgYf5WkjQCP3j+zvT+o7yOUxb5A1AkqT4Uu2CJxXHGS9jq6KpQbDr7hFW1owNXf/L7gldqjQe37cyvgpe1HmaMouV8bpYmcQg2fxObPrR9DKapt+JOrSdQNopRV/ccwqJHgCtuFM3qtZoG5eOIA66rbhZuMDU3+fzsAtQQvp4IwSil9sm63crElp+YyWm8kwQEojbduaO8BBFhdGK2RU+ZpJ8u7t8E1DNwvxPgPxdNOoYzaMaFGtPiX3uuwqKF94N5ixsxenAub9d4+SevNvetW1dvx/mR0Vnc9/rgj2Z9WeyvxqVP/u/4BLEY7DW9461cAAAAASUVORK5CYII='}
      />
      <View style={{width: '100%', alignItems: 'center'}}>
        <Text style={styles.userName}>
          {' '}
          {user.username ? user.username : ''}, {user.age ? user.age : 0}
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
