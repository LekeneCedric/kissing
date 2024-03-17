import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {LoadingState} from '../../../shared/enum/LoadingState';
import {Auth} from '../../../domain/Auth/Auth';
import {SignUpResponse} from './signUp/SignUpResponse';
import {
  AccountActivatedEnum,
  CompleteProfileEnum,
} from '../../../domain/Auth/AuthEnum';
import {SignUpAsync} from './signUp/SignUpAsync';
import {SignInAsync} from './signIn/SignInAsync';
import {SignInResponse} from './signIn/SignInResponse';
import {SendCodeVerificationAsync} from './activateAccount/sendCodeVerification/SendCodeVerificationAsync';
import {ActivateAccountAsync} from './activateAccount/activateAccount/ActivateAccountAsync';
import {ActivateAccountResponse} from './activateAccount/activateAccount/ActivateAccountResponse';
import {GetMyUserProfileResponse} from '../../User/Thunks/GetMyUserProfile/GetMyUserProfileResponse';
import { RecoverPasswordSendEmailAsync } from "./RecoverPasswordSendEmail/RecoverPasswordSendEmailAsync.ts";
import { RecoverPasswordConfirmationAsync } from "./RecoverPasswordConfirmation/RecoverPasswordConfirmationAsync.ts";

interface AuthenticationState {
  loading: LoadingState;
  auth?: Auth;
}

const initialState: AuthenticationState = {
  loading: LoadingState.idle,
};
export const AuthenticationSlice = createSlice({
  name: 'authenticationSlice',
  initialState: initialState,
  reducers: {
    cleanAuth: state => {
      state.auth = undefined;
      state.loading = initialState.loading;
    },
    setupMyUserProfile: (
      state,
      {payload}: PayloadAction<GetMyUserProfileResponse>,
    ) => {
      console.log('code237-payload',payload);
      try {
        state.auth = {
          ...state.auth,
          user: {
            ...state.auth?.user!,
            id: payload.user.id,
            age: payload.age,
            username: payload.user.username,
            email: payload.user.email,
            birthday: payload.birthday,
            city: payload.city,
            about: payload.about,
            interests: payload.interests.map(i => i.id),
            sex: payload.sex,
            search_type: payload.search_type,
            images: payload.images,
          },
        };
      } catch (e) {
        console.log(e);
      }
    },
    updateCurrentUserInfo: (
      state,
      {payload}: PayloadAction<SignUpResponse>,
    ) => {
      state.auth = {
        ...state.auth,
        user: {
          ...state.auth?.user!,
          ...payload,
        },
      };
    },
    setAccountIsActivate: (
      state,
      {payload}: PayloadAction<AccountActivatedEnum>,
    ) => {
      state.auth = {...state.auth!, isActivated: payload};
    },
    setProfileIsComplete: state => {
      state.auth = {
        ...state.auth!,
        isCompleteProfile: CompleteProfileEnum.FURFILLED,
      };
    },
  },

  extraReducers: builder => {
    builder
      .addCase(SignUpAsync.pending, state => {
        state.loading = LoadingState.pending;
      })
      .addCase(
        SignUpAsync.fulfilled,
        (state, {payload}: PayloadAction<SignUpResponse>) => {
          state.loading = LoadingState.success;
          state.auth = {
            ...state.auth!,
            user: {
              ...state.auth?.user!,
              ...payload,
            },
          };
          state.auth.isActivated = AccountActivatedEnum.PENDING;
        },
      )
      .addCase(SignUpAsync.rejected, state => {
        state.auth = {
          ...state.auth!,
        };
        state.loading = LoadingState.failed;
      });
    builder
      .addCase(SignInAsync.pending, state => {
        state.loading = LoadingState.pending;
      })
      .addCase(
        SignInAsync.fulfilled,
        (state, {payload}: PayloadAction<SignInResponse>) => {
          state.loading = LoadingState.success;
          state.auth = {
            ...state.auth!,
            isActivated: AccountActivatedEnum.ACTIVATED,
            isLogIn: true,
            token: payload.token,
            refreshToken: payload.refreshToken,
            isCompleteProfile: CompleteProfileEnum.FURFILLED,
          };
        },
      )
      .addCase(SignInAsync.rejected, state => {
        state.auth = {
          ...state.auth!,
          isActivated: AccountActivatedEnum.NOT_ACTIVATED,
        };
        state.loading = LoadingState.failed;
      });
    builder
      .addCase(SendCodeVerificationAsync.pending, state => {
        state.loading = LoadingState.pending;
      })
      .addCase(SendCodeVerificationAsync.fulfilled, state => {
        state.loading = LoadingState.success;
        state.auth = {
          ...state.auth!,
          isActivated: AccountActivatedEnum.PENDING,
        };
      })
      .addCase(SendCodeVerificationAsync.rejected, state => {
        state.loading = LoadingState.failed;
      });
    builder
      .addCase(ActivateAccountAsync.pending, state => {
        state.loading = LoadingState.pending;
        state.auth = {
          ...state.auth!,
          isActivated: AccountActivatedEnum.PENDING,
        };
      })
      .addCase(
        ActivateAccountAsync.fulfilled,
        (state, {payload}: PayloadAction<ActivateAccountResponse>) => {
          state.loading = LoadingState.success;
          state.auth = {
            ...state.auth!,
            isActivated: AccountActivatedEnum.ACTIVATED,
            token: payload.token,
            refreshToken: payload.refreshToken,
            isCompleteProfile: CompleteProfileEnum.PENDING,
          };
        },
      )
      .addCase(ActivateAccountAsync.rejected, state => {
        state.loading = LoadingState.failed;
        state.auth = {
          ...state.auth!,
          isActivated: AccountActivatedEnum.PENDING,
        };
      });
    builder
      .addCase(RecoverPasswordSendEmailAsync.pending, state => {
        state.loading = LoadingState.pending;
      })
      .addCase(RecoverPasswordSendEmailAsync.fulfilled, state => {
        state.loading = LoadingState.success;
      })
      .addCase(RecoverPasswordSendEmailAsync.rejected, state => {
        state.loading = LoadingState.failed;
      });
    builder
      .addCase(RecoverPasswordConfirmationAsync.pending, state => {
        state.loading = LoadingState.pending;
      })
      .addCase(RecoverPasswordConfirmationAsync.fulfilled, state => {
        state.loading = LoadingState.success;
      })
      .addCase(RecoverPasswordConfirmationAsync.rejected, state => {
        state.loading = LoadingState.failed;
      })
  },
});

export const {cleanAuth, setProfileIsComplete, setupMyUserProfile} =
  AuthenticationSlice.actions;

export default AuthenticationSlice.reducer;
