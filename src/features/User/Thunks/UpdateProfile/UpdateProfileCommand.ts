export interface UpdateProfileCommand {
  id: number,
  city: string;
  birthday: Date;
  about: string;
  sex: string;
  search_type: string;
  interests: number[];
}
