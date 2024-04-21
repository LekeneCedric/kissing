import { User, UserDetail } from "../../domain/User/User";
import { LoadingState } from "../../shared/enum/LoadingState";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createProfileAsync } from "./Thunks/CreateProfile/CreateProfileAsync";
import { CreateProfileResponse } from "./Thunks/CreateProfile/CreateProfileResponse";
import { UploadProfileImageAsync } from "./Thunks/UploadProfileImage/UploadProfileImageAsync";
import { UploadProfileImageResponse } from "./Thunks/UploadProfileImage/UploadProfileImageResponse";
import { GetUserProfileResponse } from "./Thunks/GetUserProfile/GetUserProfileResponse";
import { GetUserProfileAsync } from "./Thunks/GetUserProfile/GetUserProfileAsync";
import { useAppDispatch } from "../../app/hook";
import { setProfileIsComplete } from "../auth/thunks/AuthenticationSlice";
import { GetMyUserProfileResponse } from "./Thunks/GetMyUserProfile/GetMyUserProfileResponse";
import { removeProfileImageAsync } from "./Thunks/RemoveProfileImage/RemoveProfileImageAsync.ts";
import { RemoveProfileImageResponse } from "./Thunks/RemoveProfileImage/RemoveProfileImageResponse.ts";
import { UploadProfilePhotoAsync } from "./Thunks/UploadProfilePhoto/UploadProfilePhotoAsync.ts";
import { UpdateProfileAsync } from "./Thunks/UpdateProfile/UpdateProfileAsync.ts";
import { UpdateProfileResponse } from "./Thunks/UpdateProfile/UpdateProfileResponse.ts";
import { UpdateProfileCommand } from "./Thunks/UpdateProfile/UpdateProfileCommand.ts";
import { BASEURL } from "../../ui/routes/ApiRoutes.ts";

interface UserState {
  loading: LoadingState;
  user?: User;
  userDetails?: UserDetail;
}

const initialState: UserState = {
  loading: LoadingState.idle,
  user: {
    username: undefined,
    age: undefined,
    email: undefined,
    city: undefined,
    phone_number: undefined,
    birthday: undefined,
    about: undefined,
    sex: undefined,
    image_profile: undefined,
    search_type: undefined,
    interests: [],
    images: []
  }
};

export const UserSlice = createSlice({
  name: "userSlice",
  initialState: initialState,
  reducers: {
    cleanUser: state => {
      state.loading = LoadingState.idle;
      state.user!.username = undefined;
      state.user!.email = undefined;
      state.user!.city = undefined;
      state.user!.phone_number = undefined;
      state.user!.birthday = undefined;
      state.user!.about = undefined;
      state.user!.sex = undefined;
      state.user!.search_type = undefined;
      state.user!.interests = [];
      state.user!.images = [];
    },
    updateProfile: (state, {payload}: PayloadAction<UpdateProfileCommand>) => {
      state.user = {
        ...state.user,
        city: payload.city,
        about: payload.about,
        search_type: payload.search_type,
        interests: payload.interests
      }
    },
    removeImage: (state, { payload }: PayloadAction<{ id: number }>) => {
      let filteredImages = state.user?.images!.filter(
        img => img.id !== payload.id
      );
      state.user = {
        ...state.user,
        images: filteredImages
      };
    },
    addInterest: (state, { payload }: PayloadAction<{ id: number }>) => {
      if (!state.user?.interests?.includes(payload.id)) {
        state.user = {
          ...state.user,
          interests: [...state.user?.interests!, payload.id]
        };
      } else {
        let newInterests = state.user?.interests?.filter(
          int => int !== payload.id
        );
        state.user = {
          ...state.user,
          interests: newInterests
        };
      }
    },

    setProfileIsComplete: state => {
      const dispatch = useAppDispatch();
      dispatch(setProfileIsComplete());
    },
    setupMyUserProfile: (state, {payload}:PayloadAction<GetMyUserProfileResponse>) => {
      state.user = {
          ...state.user!,
          id: payload.id,
          age: payload.age,
          username: payload.user.username,
          email: payload.user.email,
          birthday: payload.birthday,
          city: payload.city,
          about: payload.about,
          interests: payload.interests.map(i => i.id),
          sex: payload.sex,
          search_type: payload.search_type,
          images: payload.images.map(image => {
            return {id: image.id, image: BASEURL+image.image, is_main_photo: image.is_main_photo}
          }),
          image_profile: BASEURL+payload.images.find(i => i.is_main_photo)?.image,
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(createProfileAsync.pending, state => {
        state.loading = LoadingState.pending;
      })
      .addCase(
        createProfileAsync.fulfilled,
        (state, { payload }: PayloadAction<CreateProfileResponse>) => {
          state.loading = LoadingState.success;
          state.user = {
            ...state.user,
            birthday: payload.birthday,
            about: payload.about,
            age: payload.age!,
            sex: payload.sex,
            city: payload.city,
            search_type: payload.search_type,
            interests: payload.interests
          };
        }
      )
      .addCase(createProfileAsync.rejected, state => {
        state.loading = LoadingState.failed;
      });
    builder.addCase(UploadProfilePhotoAsync.pending, state => {
      state.loading = LoadingState.pending;
    })
      .addCase(UploadProfilePhotoAsync.fulfilled,
        (state, { payload }: PayloadAction<UploadProfileImageResponse>) => {
          state.loading = LoadingState.success;
          state.user = {
            ...state.user,
            image_profile: payload.image
          };
        })
      .addCase(UploadProfilePhotoAsync.rejected, state => {
        state.loading = LoadingState.failed;
      });
    builder
      .addCase(UploadProfileImageAsync.pending, state => {
        state.loading = LoadingState.pending;
      })
      .addCase(
        UploadProfileImageAsync.fulfilled,
        (state, { payload }: PayloadAction<UploadProfileImageResponse>) => {
          console.warn('upload',payload)
          state.loading = LoadingState.success;
          // console.warn(payload);
          // const imagesFiltered = state.user!.images!.filter(i => {
          //     return i.is_main_photo === false
          // });
          // const newImages = [
          //   ...imagesFiltered,
          // ]
          // if (!payload.is_main_photo) {
          //   newImages.push(
          //     { id: payload.id, image: payload.image, is_main_photo: payload.is_main_photo }
          //   )
          // }
          // state.user = {
          //   ...state.user,
          //   image_profile: payload.is_main_photo ? payload.image : state.user!.image_profile ,
          //   images: [
          //     ...newImages
          //   ]
          // };
          // console.warn(state.user.images!.filter(f => f.is_main_photo==true));
        }
      )
      .addCase(UploadProfileImageAsync.rejected, state => {
        state.loading = LoadingState.failed;
      });
    builder
      .addCase(GetUserProfileAsync.pending, state => {
        state.loading = LoadingState.pending;
      })
      .addCase(
        GetUserProfileAsync.fulfilled,
        (state, { payload }: PayloadAction<GetUserProfileResponse>) => {
          state.loading = LoadingState.success;
        }
      )
      .addCase(GetUserProfileAsync.rejected, state => {
        state.loading = LoadingState.failed;
      });
    builder
      .addCase(removeProfileImageAsync.pending, state => {
        state.loading = LoadingState.pending;
      })
      .addCase(removeProfileImageAsync.fulfilled,
        (state, { payload }: PayloadAction<RemoveProfileImageResponse>) => {
          state.loading = LoadingState.success;
          let updatedImages = state.user!.images!.filter(img => img.id !== payload.imageId);
          state.user = {
            ...state.user,
            images: updatedImages
          };
        })
      .addCase(removeProfileImageAsync.rejected, state => {
        state.loading = LoadingState.failed;
      });
    builder
      .addCase(UpdateProfileAsync.pending, (state) => {
        state.loading = LoadingState.pending;
      })
      .addCase(UpdateProfileAsync.fulfilled, (state, { payload }: PayloadAction<UpdateProfileResponse>) => {
        state.loading = LoadingState.success;
        state.user = {
          ...state.user,
          birthday: payload.birthday,
          about: payload.about,
          sex: payload.sex,
          search_type: payload.search_type,
          city: payload.city,
          interests: payload.interests
        };
      });
  }
});

export const {
  updateProfile,
  setupMyUserProfile,
  removeImage, addInterest, cleanUser } = UserSlice.actions;
export default UserSlice.reducer;
