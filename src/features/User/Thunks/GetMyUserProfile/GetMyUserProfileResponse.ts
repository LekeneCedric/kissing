import {Image, User} from '../../../../domain/User/User';
import {Interest} from '../../../../domain/Interest/Interest';

export interface GetMyUserProfileResponse {
  user: User;
  birthday: string;
  age?: number;
  city: string;
  about: string;
  interests: Interest[];
  sex: string;
  search_type: string;
  images: Image[];
}
