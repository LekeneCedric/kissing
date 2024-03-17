import {Text, TouchableOpacity, View} from 'react-native';
import styles from './MatcheStyle';
import Avatar from '../../../../../components/avatar/avatar';
import IsOnlineIndicator from '../../../../../components/isOnlineIndicator/isOnlineIndicator';
import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

type props = {
  id: number;
  image: string;
  username: string;
  age: number;
  isOnline: boolean;
};
const Matche = ({id, image, username, age, isOnline}: props) => {
  const [usernam, setUsernam] = useState<string>(username);
  const navigation = useNavigation();
  useEffect(() => {
    setUsernam(usernam.length > 10 ? `${usernam.slice(0, 10)}..` : usernam);
  }, []);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        console.log('id-to-go' + id);
        // @ts-ignore
        navigation.navigate('detailsProfil', {userId: id});
      }}>
      <Avatar size={'profil'} imageUri={image} />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.username}>
          {usernam.slice(0, 8)}
          {usernam.length > 8 ? '..' : ''}, {age}
        </Text>
        <IsOnlineIndicator isOnline={isOnline} />
      </View>
    </TouchableOpacity>
  );
};

export default Matche;
