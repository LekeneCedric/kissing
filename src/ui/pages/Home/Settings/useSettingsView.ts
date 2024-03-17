import icons from '../../../constants/icons';
import colors from '../../../constants/colors';
import {useAppDispatch, useAppSelector} from '../../../../app/hook';
import {cleanAuth} from '../../../../features/auth/thunks/AuthenticationSlice';
import {
  selectAuth,
  selectUser,
} from '../../../../features/auth/thunks/AuthenticationSelectors';
import {useEffect} from 'react';
import {User} from '../../../../domain/User/User';
import {useNavigation} from '@react-navigation/native';
import {cleanFavoris} from '../../../../features/Favoris/FavorisSlice';
import {cleanInterests} from '../../../../features/Interests/InterestsSlice';
import {resetFiltersParams} from '../../../../features/Recommendations/RecommendationsSlice';
import {cleanUser} from '../../../../features/User/UserSlice';
import { cleanMessages } from "../../../../features/Messages/MessagesSlice.ts";
import { cleanBlocked } from "../../../../features/Blocked/BlockedSlice.ts";

type MenuList = {
  icon: string;
  title: string;
  description: string;
  action: () => void;
  color?: string;
};
interface useSettingsViewBehaviour {
  menuList: MenuList[];
  user: User;
  goToMyProfile: () => void;
}

export default function useSettingsView(): useSettingsViewBehaviour {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const navigation = useNavigation();
  useEffect(() => {
    console.log(user);
  }, []);
  const logout = () => {
    dispatch(cleanAuth());
    dispatch(cleanFavoris());
    dispatch(cleanInterests());
    dispatch(resetFiltersParams());
    dispatch(cleanUser());
    dispatch(cleanMessages());
    dispatch(cleanBlocked());
  };
  const goToUserProfil = () => {
    // @ts-ignore
    navigation.navigate('myProfil');
  };
  const goToBlockedUsers = () => {
    // @ts-ignore
    navigation.navigate('blockedUsers');
  };

  const goToConfidentialPolitic = () => {
    // @ts-ignore
    navigation.navigate('confidential-politic');
  }

  const goToSignalProblems = () => {
    // @ts-ignore
    navigation.navigate('signal-problems');
  }

  const goToSecurity = () => {
    //@ts-ignore
    navigation.navigate('security');
  }
  const menuList: MenuList[] = [
    {
      icon: icons.blocked_user,
      title: 'Utilisateurs bloqués',
      description: 'Liste des utilisateurs bloqués',
      action: goToBlockedUsers,
    },
    {
      icon: icons.law,
      title: 'Politique de confidentialitée',
      description: '',
      action: goToConfidentialPolitic,
    },
    {
      icon: icons.warning,
      title: 'Signaler problème et aide',
      description: '',
      action: goToSignalProblems,
    },
    {
      icon: icons.security,
      title: 'Sécurité',
      description: '',
      action: goToSecurity,
    },
    {icon: icons.share, title: 'Partager', description: '', action: () => {}},
    {
      icon: icons.logout,
      title: 'Déconnexion',
      description: '',
      action: logout,
      color: colors.principal,
    },
  ];

  return {
    menuList: menuList,
    user: user!,
    goToMyProfile: goToUserProfil,
  };
}
