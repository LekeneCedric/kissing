import {SignUpResponse} from '../../../features/auth/thunks/signUp/SignUpResponse';

export const SignUpResponseFactoryFromApi = (data: any): SignUpResponse => {
  return {
    username: data.username,
    email: data.email,
    phone_number: data.phone_number,
  } as SignUpResponse;
};
