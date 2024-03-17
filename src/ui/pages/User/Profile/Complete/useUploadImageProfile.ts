import {Asset, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-picker';
import {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../../app/hook';
import {
  selectImages,
  selectUserLoading,
} from '../../../../../features/User/UserSelectors';
import {Image} from '../../../../../domain/User/User';
import {removeImage} from '../../../../../features/User/UserSlice';
import {UploadProfileImageCommand} from '../../../../../features/User/Thunks/UploadProfileImage/UploadProfileImageCommand';
import {SignUpAsync} from '../../../../../features/auth/thunks/signUp/SignUpAsync';
import {UploadProfileImageAsync} from '../../../../../features/User/Thunks/UploadProfileImage/UploadProfileImageAsync';
import {useToast} from 'react-native-toast-notifications';
import {LoadingState} from '../../../../../shared/enum/LoadingState';
import {Platform} from 'react-native';
import {
  UploadProfilePhotoAsync
} from "../../../../../features/User/Thunks/UploadProfilePhoto/UploadProfilePhotoAsync.ts";

export interface useUploadImageProfileBehavior {
  images?: Image[];
  uploadImages: () => void;
  removeImages: (index: number) => void;
  loading: LoadingState;
}
const useUploadImageProfile = (): useUploadImageProfileBehavior => {
  const dispatch = useAppDispatch();
  const images = useAppSelector(selectImages);
  const loading = useAppSelector(selectUserLoading);
  const toast = useToast();
  const uploadProfileImage = async (data: UploadProfileImageCommand) => {
    const response = await dispatch(UploadProfilePhotoAsync(data));
    if (UploadProfilePhotoAsync.fulfilled.match(response)) {
      toast.show('Image importée avec succès', {
        type: 'success',
        placement: 'top',
        duration: 2000,
        animationType: 'slide-in',
      });
    }
    if (!UploadProfilePhotoAsync.fulfilled.match(response)) {
      toast.show(
        'Votre image semble être incompatible , reessayez avec une autre !',
        {
          type: 'danger',
          placement: 'top',
          duration: 4000,
          animationType: 'slide-in',
        },
      );
    }
  }
  const uploadImage = async (data: UploadProfileImageCommand) => {
    const response = await dispatch(UploadProfileImageAsync(data));
    if (UploadProfileImageAsync.fulfilled.match(response)) {
      toast.show('Image importée avec succès', {
        type: 'success',
        placement: 'top',
        duration: 2000,
        animationType: 'slide-in',
      });
    }
    if (!UploadProfileImageAsync.fulfilled.match(response)) {
      toast.show(
        'Votre image semble être incompatible , reessayez avec une autre !',
        {
          type: 'danger',
          placement: 'top',
          duration: 4000,
          animationType: 'slide-in',
        },
      );
    }
  };
  const uploadImageAction = async () => {
    const result = await launchImageLibrary({
      quality: 1,
      mediaType: 'photo',
      includeBase64: true,
      selectionLimit: 5,
    });
    if (result.assets?.length! < 5) {
      toast.show(
        'Sélectionner 5 images de vous !',
        {
          type: 'danger',
          placement: 'top',
          duration: 4000,
          animationType: 'slide-in',
        },
      );
    } else if (result.assets?.length! > 5) {
      toast.show(
        'Ne sélectionnez pas plus de 5 images de vous !',
        {
          type: 'danger',
          placement: 'top',
          duration: 4000,
          animationType: 'slide-in',
        },
      );
    } else {
      result.assets?.map((image, index) => {
        if (index == 0) {
          const imageObject: UploadProfileImageCommand = {
            name: image.fileName!,
            type: image.type!,
            uri:
              Platform.OS == 'ios'
                ? image.uri?.replace('file://', '')!
                : image.uri!,
          };
          uploadProfileImage(imageObject);
        } else {
          const imageObject: UploadProfileImageCommand = {
            name: image.fileName!,
            type: image.type!,
            uri:
              Platform.OS == 'ios'
                ? image.uri?.replace('file://', '')!
                : image.uri!,
          };
          uploadImage(imageObject);
        }

      });
    }

  };

  const removeImageAction = async (image_id: number) => {
    dispatch(removeImage({id: image_id}));
  };

  return {
    images: images,
    uploadImages: uploadImageAction,
    removeImages: removeImageAction,
    loading: loading,
  };
};

export default useUploadImageProfile;
