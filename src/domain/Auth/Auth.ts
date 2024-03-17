import {AccountActivatedEnum, CompleteProfileEnum} from './AuthEnum';
import {User} from '../User/User';

export interface Auth {
  isLogIn?: boolean;
  isLogOut?: boolean;
  token?: string;
  refreshToken?: string;
  user?: User;
  isActivated?: AccountActivatedEnum;
  isCompleteProfile?: CompleteProfileEnum;
  message?: string;
}
