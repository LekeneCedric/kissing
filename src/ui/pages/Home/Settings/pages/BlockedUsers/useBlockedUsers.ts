import { useAppDispatch, useAppSelector } from "../../../../../../app/hook.ts";
import { selectBlockedUsers } from "../../../../../../features/Blocked/BlockedSelectors.ts";
import { UserDetail } from "../../../../../../domain/User/User.ts";

interface useBlockedUsersBehavior {
  blockedUsers: UserDetail[],
}
export const useBlockedUsers = (): useBlockedUsersBehavior => {
  const dispatch = useAppDispatch();
  const blockedUsers = useAppSelector(selectBlockedUsers);
  return {
    blockedUsers: blockedUsers,
  }
}
