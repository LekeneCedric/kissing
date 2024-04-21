import {useRoute} from '@react-navigation/native';
import {Image} from '../../../domain/User/User';
import {BASEURL} from '../../routes/ApiRoutes';
import useNavigate from '../../Global/hooks/useNavigation';
import {useEffect} from 'react';

type useGalerieViewBehaviour = {
  images: {uri: string}[];
  goBack: () => void;
};
export const useGalerieView = (): useGalerieViewBehaviour => {
  const route = useRoute();
  const navigation = useNavigate();

  const goBack = () => {
    navigation.goBack();
  };
  //@ts-ignore
  const images = route.params!.images.map(img => {
    //@ts-ignore
    if (route.params!.isGalerie == true) {
      return {uri: img.image}
    }
    return {uri: BASEURL + img.image};
  });

  return {
    images: images,
    goBack: goBack,
  };
};
