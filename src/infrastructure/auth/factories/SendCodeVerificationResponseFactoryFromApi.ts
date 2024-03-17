import {SendCodeVerificationResponse} from '../../../features/auth/thunks/activateAccount/sendCodeVerification/SendCodeVerificationResponse';

export const SendCodeVerificationResponseFactoryFromApi = (data: any) => {
  return {
    email: data.email,
  } as SendCodeVerificationResponse;
};
