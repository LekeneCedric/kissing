import {Interest} from '../Interest/Interest';

export const SearchType = {
  serious_relationship: 'Relation sérieuse',
  friendship : 'Amitié',
  flirt : 'flirt',

  getValue(key: string): string {
    return this[key];
  }
}
export interface User {
  id?: number;
  username?: string;
  email?: string;
  city?: string;
  phone_number?: string;
  birthday?: string;
  age?: number;
  about?: string;
  sex?: string;
  search_type?: string;
  interests?: number[];
  images?: Image[];
  is_online?: boolean;
  image_profile?: string,
}
export interface UserDetail {
  id?: number;
  user?: User;
  birthday?: string;
  city?: string;
  about?: string;
  interests?: Interest[];
  sex?: string;
  search_type?: string;
  images?: Image[];
}
export interface Image {
  id: number;
  image: string;
  is_main_photo: boolean;
}

export interface Recommendation {
  id: number;
  user: {
    is_online: boolean;
    id: number;
    username: string;
    email: string;
    phone_number: string;
  };
  age: number;
  city: string;
  about: string;
  interests: [
    {
      id: number;
      name: string;
      icon_name: string;
    },
  ];
  sex: string;
  search_type: string;
  images: Image[];
}
export const DefaultRecommendationsParams = {
  NUMBER_PEER_PAGES: 15,
  MIN_OLD: 18,
  MAX_OLD: 77,
}
