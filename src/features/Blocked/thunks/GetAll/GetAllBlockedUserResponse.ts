import { UserDetail } from "../../../../domain/User/User.ts";

export interface GetAllBlockedUserResponse {
  blockeds: UserDetail[],
}
