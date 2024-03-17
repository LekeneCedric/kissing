import {useNavigation} from '@react-navigation/native';

export interface NavigationBehaviour {
  goBack: () => void;
  goTo: (path: string, params?: Object) => void;
}

const useNavigate = (): NavigationBehaviour => {
  const navigation = useNavigation();
  const goBack = () => navigation.goBack();
  // @ts-ignore
  const goTo = (path: string, params?: Object) =>
    navigation.navigate({name: path, params: {...params}});
  return {
    goBack: goBack,
    goTo: goTo,
  };
};

export default useNavigate;
