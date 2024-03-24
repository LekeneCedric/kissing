import { useAppDispatch, useAppSelector } from "../../../../../../app/hook.ts";
import { selectBlockedUsers } from "../../../../../../features/Blocked/BlockedSelectors.ts";
import { UserDetail } from "../../../../../../domain/User/User.ts";
import { RemoveBlockedUserAsync } from "../../../../../../features/Blocked/thunks/Remove/RemoveBlockedUserAsync.ts";
import { AddBlockedUserAsync } from "../../../../../../features/Blocked/thunks/Add/AddBlockedUserAsync.ts";
import { AddBlockedUser, RemoveBlockedUser } from "../../../../../../features/Blocked/BlockedSlice.ts";
import colors from "../../../../../constants/colors.ts";
import { useToast } from "react-native-toast-notifications";

interface useBlockedUsersBehavior {
  blockedUsers: UserDetail[],
  deblockUser: (userId: number) => void,
}
export const useBlockedUsers = (): useBlockedUsersBehavior => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const blockedUsers = useAppSelector(selectBlockedUsers);
  const deblockUser = async (userId: number) => {
    const response = await dispatch(RemoveBlockedUserAsync({user_id: userId}));

    if (RemoveBlockedUserAsync.fulfilled.match(response)) {
      dispatch(RemoveBlockedUser(userId));
      toast.show("Débloquer avec succès !", {
        type: "success",
        placement: "top",
        duration: 3000,
        animationType: "slide-in",
        successColor: colors.principal
      });
    }
  }
  return {
    blockedUsers: blockedUsers,
    deblockUser: deblockUser,
  }
}
