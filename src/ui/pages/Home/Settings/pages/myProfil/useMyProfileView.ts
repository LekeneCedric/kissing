import { Image, User } from '../../../../../../domain/User/User';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hook';
import { selectAuth, selectUser } from "../../../../../../features/auth/thunks/AuthenticationSelectors";
import { useNavigation } from '@react-navigation/native';
import { useForm, UseFormReturn } from 'react-hook-form';
import { InputCompleteProfileForm } from '../../../../../../infrastructure/validators/form/completeProfile/InputCompleteProfileForm';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputCompleteProfileValidateSchema } from '../../../../../../infrastructure/validators/form/completeProfile/InputCompleteProfileValidateSchema';
import cameroonCities from '../../../../../../shared/constants/cameroonCities';
import { searchTypes } from '../../../../../../shared/constants/searchType';
import { Interest } from '../../../../../../domain/Interest/Interest';
import { LoadingState } from '../../../../../../shared/enum/LoadingState';
import {
  selectInterests,
  selectInterestsLoading,
} from '../../../../../../features/Interests/InterestsSelectors';
import React, { useEffect, useState } from 'react';
import { GetAllInterestAsync } from '../../../../../../features/Interests/thunks/GetAll/GetAllInterestAsync';
import {
  removeProfileImageAsync
} from "../../../../../../features/User/Thunks/RemoveProfileImage/RemoveProfileImageAsync.ts";
import { useToast } from "react-native-toast-notifications";
import { UpdateProfileCommand } from "../../../../../../features/User/Thunks/UpdateProfile/UpdateProfileCommand.ts";
import { UpdateProfileAsync } from "../../../../../../features/User/Thunks/UpdateProfile/UpdateProfileAsync.ts";
import { updateProfile } from "../../../../../../features/User/UserSlice.ts";
import { updateAuthUser } from "../../../../../../features/auth/thunks/AuthenticationSlice.ts";

interface updateProfileCommand {
  city: string,
  about: string,
  search_type: string,
  interests: number[]
}
interface useMyProfileViewBehaviour {
  user: User;
  goBack: () => void;
  form: UseFormReturn<InputCompleteProfileForm>;
  cameroonCitiesList: any[];
  searchTypeList: any[];
  interests: Interest[];
  interestLoading: LoadingState;
  navigateToGalerie: (image?: Image) => void;
  editMode: boolean;
  setEditMode: React.Dispatch<any>;
  onSubmit: (value: updateProfileCommand) => any;
  removeImage: (imageId: number) => void;
}
export default function useMyProfileView(): useMyProfileViewBehaviour {
  const navigation = useNavigation();
  const auth = useAppSelector(selectAuth);
  const user = useAppSelector(selectUser);
  const toast = useToast();
  const searchTypesList = searchTypes;
  const cameroonCitiesList = cameroonCities;
  const interestsLoading = useAppSelector(selectInterestsLoading);
  const interests = useAppSelector(selectInterests);
  const dispatch = useAppDispatch();
  const [editMode, setEditMode] = useState<boolean>(false);
  const form = useForm<InputCompleteProfileForm>({
    //@ts-ignore
    resolver: yupResolver(InputCompleteProfileValidateSchema),
  });

  const onSubmit = async (data: updateProfileCommand) => {
    const dat = {
      id: user!.id,
      sex: user!.sex!,
      city: data.city !== undefined ? data.city : user!.city,
      about: data.about !== undefined ? data.about : user!.about,
      search_type: data.search_type !== undefined ? data.search_type : user!.search_type,
      interests: data.interests !== undefined ? data.interests : user!.interests,
    } as UpdateProfileCommand;
    console.warn(dat);

    const response = await dispatch(UpdateProfileAsync(dat));

    if (UpdateProfileAsync.fulfilled.match(response)) {
      toast.show("Informations modifiés avec succès", {
        type: "success",
        placement: "top",
        duration: 2000,
        animationType: "slide-in",
      });
      dispatch(updateProfile(dat));
      dispatch(updateAuthUser(dat));
    }
    if (UpdateProfileAsync.rejected.match(response)) {
      toast.show("Une érreur est survenue lors du traitement de votre opération !", {
        type: "danger",
        placement: "top",
        duration: 4000,
        animationType: "slide-in",
      });
    }
    setEditMode(!editMode);
  };
  const goBack = () => {
    navigation.goBack();
  };

  const navigateToGalerie = (image?: Image) => {
    if (!image) {
      let new_images = user?.images!.map(
        i => {return {image: i.image, is_main_photo:true}})
      //@ts-ignore
      navigation.navigate('galerie', { images: new_images });
    }
    if (image) {
      //@ts-ignore
      navigation.navigate('galerie', { images: [{ ...image, is_main_photo: true }] });
    }
  };
  const removeImageToGalerie = async (imageId: number) => {
    const response = await dispatch(removeProfileImageAsync({ imageId: imageId }))
    if (removeProfileImageAsync.fulfilled.match(response)) {
      toast.show("Image supprimée avec succès", {
        type: "success",
        placement: "top",
        duration: 2000,
        animationType: "slide-in",
      });
    }
    if (!removeProfileImageAsync.fulfilled.match(response)) {
      toast.show("impossible de supprimer l'image , reesayez plus-tard !", {
        type: "danger",
        placement: "top",
        duration: 4000,
        animationType: "slide-in",
      });
    }
  }



  useEffect(() => {
    dispatch(GetAllInterestAsync());
    console.log(user!.images)
    console.log(user!.image_profile)
  }, []);
  return {
    user: user!,
    goBack: goBack,
    form: form,
    cameroonCitiesList: cameroonCitiesList,
    searchTypeList: searchTypesList,
    interests: interests,
    interestLoading: interestsLoading,
    navigateToGalerie: navigateToGalerie,
    editMode: editMode,
    setEditMode: setEditMode,
    onSubmit: onSubmit,
    removeImage: removeImageToGalerie
  };
}
