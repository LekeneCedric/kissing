import {ActivateAccountResponse} from '../../../features/auth/thunks/activateAccount/activateAccount/ActivateAccountResponse';

export const ActivateAccountResponseFactoryFromApi = (data: any) => {
  return {
    token: data.token,
    refreshToken: data.refreshToken,
  } as ActivateAccountResponse;
};
