import { useAppSelector } from "../../../../../../app/hook.ts";
import { selectConversations } from "../../../../../../features/Messages/MessagesSelectors.ts";
import { IConversation } from "../../../../../../domain/Messages/Messages.ts";

interface useMessagesViewBehaviour {
  conversations: IConversation[]
}
export const useMessagesView = (): useMessagesViewBehaviour => {

  const conversations = useAppSelector(selectConversations)
  console.log(conversations);
  return {
    conversations: conversations,
  }
}
