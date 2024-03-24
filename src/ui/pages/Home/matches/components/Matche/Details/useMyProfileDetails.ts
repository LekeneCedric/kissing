import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../../../app/hook";
import { GetUserProfileAsync } from "../../../../../../../features/User/Thunks/GetUserProfile/GetUserProfileAsync";
import { selectCurrentUserDetail } from "../../../../../../../features/User/UserSelectors";
import { Image, UserDetail } from "../../../../../../../domain/User/User";
import { LoadingState } from "../../../../../../../shared/enum/LoadingState";
import {
  selectFavorisList,
  selectFavorisLoading
} from "../../../../../../../features/Favoris/FavorisSelectors";
import { AddFavorisAsync } from "../../../../../../../features/Favoris/thunks/Add/AddFavorisAsync";
import { useToast } from "react-native-toast-notifications";
import colors from "../../../../../../constants/colors";
import {
  RemoveFromFavoritesAsync
} from "../../../../../../../features/Favoris/thunks/Remove/RemoveFromFavoritesAsync.ts";
import { addUserToFavoris, RemoveUserFromFavorites } from "../../../../../../../features/Favoris/FavorisSlice.ts";
import { selectUser } from "../../../../../../../features/auth/thunks/AuthenticationSelectors.ts";
import {
  selectBlockedLoading,
  selectBlockedUsersList
} from "../../../../../../../features/Blocked/BlockedSelectors.ts";
import { AddBlockedUserAsync } from "../../../../../../../features/Blocked/thunks/Add/AddBlockedUserAsync.ts";
import { AddBlockedUser, RemoveBlockedUser } from "../../../../../../../features/Blocked/BlockedSlice.ts";
import { RemoveBlockedUserAsync } from "../../../../../../../features/Blocked/thunks/Remove/RemoveBlockedUserAsync.ts";

interface myProfileDetailsBehaviour {
  goBack: () => void;
  userDetails: UserDetail;
  addFavoris: () => void;
  removeToFavoris: () => void;
  favoris_loading: LoadingState;
  in_favoris_list: boolean;
  navigateToGalerie: (image?: Image) => void;
  navigateToRoom: () => void;
  addToBlocked: () => void;
  removeToBlocked: () => void;
  blocked_loading: LoadingState;
  in_blocked_list: boolean;
}

export default function useMyProfileDetails(): myProfileDetailsBehaviour {
  const route = useRoute();
  const toast = useToast();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [userDetails, setUserDetails] = useState<UserDetail | null>(null);
  const favoris_loading = useAppSelector(selectFavorisLoading);
  const favoris_list = useAppSelector(selectFavorisList);
  //@ts-ignore
  const inFavorisList = favoris_list.includes(route.params?.userId);
  const blocked_loading = useAppSelector(selectBlockedLoading);
  const blocked_list = useAppSelector(selectBlockedUsersList);
  //@ts-ignore
  const inBlockedList = blocked_list.includes(route.params?.userId);
  const goBack = () => {
    navigation.goBack();
  };
  const navigateToGalerie = (image?: Image) => {
    if (!image) {
      //@ts-ignore
      navigation.navigate("galerie", { images: userDetails?.images });
    }
    if (image) {
      //@ts-ignore
      navigation.navigate("galerie", { images: [image] });
    }
  };
  const addToBlocked = async() => {
    const response = await dispatch(
      //@ts-ignore
      AddBlockedUserAsync({user_id: route.params?.userId})
    )

    if (AddBlockedUserAsync.fulfilled.match(response)) {
      dispatch(AddBlockedUser(userDetails!));
      toast.show("Bloqué avec succès !", {
        type: "success",
        placement: "top",
        duration: 3000,
        animationType: "slide-in",
        successColor: colors.principal
      });
    } else {
      toast.show("Une érreur est survenue , réessayez plus tard !", {
        type: "danger",
        placement: "top",
        duration: 3000,
        animationType: "slide-in",
        successColor: colors.principal
      });
    }
  }
  const addToFavoris = async () => {
    //@ts-ignore
    const response = await dispatch(
      //@ts-ignore
      AddFavorisAsync({ user_id: route.params?.userId })
    );
    // console.warn('user-id',route.params?.userId)

    if (AddFavorisAsync.fulfilled.match(response)) {
      dispatch(addUserToFavoris(userDetails!));
      toast.show("Ajouté au favoris", {
        type: "success",
        placement: "top",
        duration: 3000,
        animationType: "slide-in",
        successColor: colors.principal
      });
    } else {
      toast.show("Impossible d'éffectuer cette opération , réssayez plus-tard !", {
        type: "danger",
        placement: "top",
        duration: 3000,
        animationType: "slide-in",
        successColor: colors.principal
      });
    }
  };

  const navigateToRoom = () => {
    //@ts-ignore
    navigation.navigate("room", {
      user: {
        id: userDetails?.id,
        name: userDetails?.user?.username,
        image_path: userDetails?.images?.find(i => i.is_main_photo === true)?.image,
        isOnline: userDetails?.user?.is_online
      }
    });
  };
  const removeToFavoris = async () => {
    //@ts-ignore
    let user_id = route.params?.userId;
    const response = await dispatch(
      RemoveFromFavoritesAsync({ userId: user_id })
    );

    if (RemoveFromFavoritesAsync.fulfilled.match(response)) {
      toast.show("Retiré des favoris", {
        type: "success",
        placement: "top",
        duration: 3000,
        animationType: "slide-in",
        successColor: colors.gray
      });
      dispatch(RemoveUserFromFavorites(user_id));
    }
    if(RemoveFromFavoritesAsync.rejected.match(response)) {
      toast.show("Impossible d'éffectuer cette opération , réssayez plus-tard !", {
        type: "danger",
        placement: "top",
        duration: 3000,
        animationType: "slide-in",
        successColor: colors.gray
      });
    }
  };

  const removetoBlocked = async () => {
    //@ts-ignore
    let user_id = route.params?.userId;
    const response = await dispatch(
      RemoveBlockedUserAsync({user_id: user_id})
    );

    if (RemoveFromFavoritesAsync.fulfilled.match(response)) {
      toast.show("Débloqué avec succès !", {
        type: "success",
        placement: "top",
        duration: 3000,
        animationType: "slide-in",
        successColor: colors.gray
      });
      dispatch(RemoveBlockedUser(user_id));
    } else if (RemoveFromFavoritesAsync.rejected.match(response)) {
      toast.show("Impossible d'éffectuer cette opération , réssayez plus-tard !", {
        type: "danger",
        placement: "top",
        duration: 3000,
        animationType: "slide-in",
        successColor: colors.gray
      });
    }
  }
  useEffect(() => {
    // console.log(favoris_list);
    const fetchData = async () => {
      const { params } = route;
      //@ts-ignore
      const userId = params?.userId;
      const response = await dispatch(GetUserProfileAsync({ id: userId }));
      if (GetUserProfileAsync.fulfilled.match(response)) {
       // console.log('code237-user-details',response.payload);
        setUserDetails(response.payload);
       // console.log(response.payload.user.username);
      }
    };

    fetchData().then(r => {
    });
    //@ts-ignore
  }, [route.params.userId]);
  return {
    goBack: goBack,
    userDetails: userDetails!,
    addFavoris: addToFavoris,
    removeToFavoris: removeToFavoris,
    favoris_loading: favoris_loading,
    in_favoris_list: inFavorisList,
    navigateToGalerie: navigateToGalerie,
    navigateToRoom: navigateToRoom,
    addToBlocked: addToBlocked,
    removeToBlocked: removetoBlocked,
    blocked_loading: blocked_loading,
    in_blocked_list: inBlockedList,
  };
}
