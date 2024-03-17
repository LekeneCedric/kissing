import {FlatList, View} from 'react-native';
import Conversation from '../Messages/Conversation/Conversation';
import Favorite from './Favorite/Favorite';
import {useFavoritesView} from './useFavoritesView';

const Favorites = () => {
  const {favorites} = useFavoritesView();
  return (
    <FlatList
      showsHorizontalScrollIndicator={true}
      data={favorites}
      keyExtractor={(item, index) => index.toString()}
      renderItem={info => (
        <Favorite
          userName={info.item.user!.username!}
          userId={info.item.user!.id!}
          imageUri={info.item.images![0]?.image}
        />
      )}
    />
  );
};

export default Favorites;
