import { AddBlockedUserCommand } from "../../features/Blocked/thunks/Add/AddBlockedUserCommand.ts";
import { AddBlockedUserResponse } from "../../features/Blocked/thunks/Add/AddBlockedUserResponse.ts";
import { RemoveBlockedUserCommand } from "../../features/Blocked/thunks/Remove/RemoveBlockedUserCommand.ts";
import { RemoveBlockedUserResponse } from "../../features/Blocked/thunks/Remove/RemoveBlockedUserResponse.ts";
import { GetAllBlockedUserCommand } from "../../features/Blocked/thunks/GetAll/GetAllBlockedUserCommand.ts";
import { GetAllBlockedUserResponse } from "../../features/Blocked/thunks/GetAll/GetAllBlockedUserResponse.ts";

export interface BlockedApiGateway {
  addBlockedUser: (addBlockedUserCommand: AddBlockedUserCommand) => Promise<AddBlockedUserResponse>;
  remove: (removeBlockedUserCommand: RemoveBlockedUserCommand)=> Promise<RemoveBlockedUserResponse>;
  all: (getAllBlockedUserCommand: GetAllBlockedUserCommand)=> Promise<GetAllBlockedUserResponse>;
}
