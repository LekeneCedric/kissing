import {FlatList, View} from 'react-native';
import Conversation from './Conversation/Conversation';
import Matche from '../../../matches/components/Matche/Matche';
import { useMessagesView } from "./useMessagesView.ts";

const Messages = () => {
  const {
    conversations
  } = useMessagesView();
  return (
    <FlatList
      showsHorizontalScrollIndicator={true}
      data={conversations}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) =>
        <Conversation
          id={item.id}
          user={item.user}
          last_message={item.last_message}
          nb_unread_messages={item.nb_unread_messages}
        />}
    />
  );
};

export default Messages;
