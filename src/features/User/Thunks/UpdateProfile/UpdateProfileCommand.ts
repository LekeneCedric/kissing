export interface UpdateProfileCommand {
  id: number,
  city: string;
  birthday: string;
  about: string;
  sex: string;
  search_type: string;
  interests: number[];
}
