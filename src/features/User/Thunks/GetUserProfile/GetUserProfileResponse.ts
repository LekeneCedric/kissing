import {Image, User} from '../../../../domain/User/User';
import {Interest} from '../../../../domain/Interest/Interest';

export interface GetUserProfileResponse {
  user: User;
  age: number;
  birthday: string;
  city: string;
  about: string;
  interests: Interest[];
  sex: string;
  search_type: string;
  images: Image[];
}
