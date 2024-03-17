import {Image, ImageProps, ImageStyle, View} from 'react-native';
import styles from './avatarStyle';
import {useEffect, useState} from 'react';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {StyleProps} from 'react-native-reanimated';
type props = {
  imageUri: string;
  size?: 'chat'| 'small' | 'medium' | 'large' | 'profil' | 'conversation';
  additionalStyle?: ImageProps;
};
const Avatar = ({imageUri, size, additionalStyle}: props) => {
  const [width, setWidth] = useState<string>('25%');
  const [height, setHeight] = useState<string>('25%');
  useEffect(() => {
    switch (size) {
      case 'chat':
        setWidth(15);
        setHeight(15);
        break;
      case 'small':
        setWidth('25%');
        setHeight('25%');
        break;
      case 'conversation':
        setWidth('15%');
        setHeight('15%');
        break;
      case 'medium':
        setWidth('30%');
        setHeight('30%');
        break;
      case 'large':
        setWidth('45%');
        setHeight('45%');
        break;
      case 'profil':
        setWidth('30%');
        setHeight('45%');
        break;
      default:
        setWidth('25%');
        setHeight('25%');
        break;
    }
  }, []);
  return (
    <Image
      source={{ uri: imageUri}}
      style={
        [
          styles.container,
          {
            width: wp(width),
            height: wp(height),
            marginRight: size === 'small' ? 10 : 0,
            marginTop: 10
          }
        ]
      } />
  );
};

export default Avatar;
