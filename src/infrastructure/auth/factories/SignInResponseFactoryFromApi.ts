import {SignInResponse} from '../../../features/auth/thunks/signIn/SignInResponse';

export const SignInResponseFactoryFromApi = (data: any) => {
  return {
    token: data.token,
    refreshToken: data.refreshToken,
  } as SignInResponse;
};
